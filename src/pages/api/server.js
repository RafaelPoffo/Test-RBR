require('dotenv').config();
const express = require('express');
const { Employee } = require('../../models/Employee');
const cors = require('cors');
const { mongooseConnect } = require('../../lib/mongoose');

const app = express();
app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await mongooseConnect();
    next();
  } catch (error) {
    console.error('Erro ao se conectar ao MongoDB:', error);
    res.status(500).json({ error: 'Falha ao conectar com o banco de dados' });
  }
});

app.use(
  cors({
    origin: 'http://localhost:3001',
  }),
);

app.get('/api/employees', async (_, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/employeesById/:id', async (req, res) => {
  try {
    const employee = await Employee.findOne({ _id: req.params.id });
    if (!employee) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/createEmployee', async (req, res) => {
  try {
    const { name, role, department, date } = req.body;
    const employeeDoc = await Employee.create({
      name,
      role,
      department,
      date,
    });
    res.json(employeeDoc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/updateEmployee', async (req, res) => {
  try {
    const { name, role, department, date, _id } = req.body;
    const updatedEmployee = await Employee.updateOne(
      { _id },
      { name, role, department, date },
    );
    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/deleteEmployee/:id', async (req, res) => {
  try {
    await Employee.deleteOne({ _id: req.params.id });
    res.json({ message: 'Funcionário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`O servidor está rodando na porta: ${PORT}`);
});
