import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export type EmployeeFormProps = {
  name?: string;
  role?: string;
  department?: string;
  date?: string;
  id?: string;
  formType: string;
};

export default function EmployeeForm({
  name: existingName,
  role: existingRole,
  department: existingDepartment,
  date: existingDate,
  id: employeeId,
  formType,
}: EmployeeFormProps) {
  const [name, setName] = useState<string>(existingName || '');
  const [role, setRole] = useState<string>(existingRole || '');
  const [department, setDepartment] = useState<string>(
    existingDepartment || '',
  );
  const [date, setDate] = useState<string>(existingDate || '');
  const [goToEmployees, setGoToEmployees] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>(null);
  const router = useRouter();

  useEffect(() => {
    if (employeeId) {
      setName(existingName || '');
      setRole(existingRole || '');
      setDepartment(existingDepartment || '');
      setDate(existingDate || '');
    }
  }, [
    employeeId,
    existingName,
    existingRole,
    existingDepartment,
    existingDate,
  ]);

  async function saveEmployee(ev) {
    ev.preventDefault();

    if (!name || !role || !department || !date) {
      setFormError('Por favor, preencha todos os campos.');
      return;
    }

    const data = { name, role, department, date };
    if (employeeId) {
      await fetch('http://localhost:3000/api/updateEmployee', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, _id: employeeId }),
      });
    } else {
      await fetch('http://localhost:3000/api/createEmployee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    }
    setGoToEmployees(true);
  }

  if (goToEmployees) {
    router.push('/');
  }

  return (
    <Box p={8}>
      <form onSubmit={saveEmployee}>
        <Heading mb={4}>
          {formType === 'edit' ? 'Editar Funcionário' : 'Adicionar Funcionário'}
        </Heading>
        <Stack spacing={4}>
          <FormControl id="name">
            <FormLabel>Nome</FormLabel>
            <Input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
          </FormControl>
          <FormControl id="role">
            <FormLabel>Cargo</FormLabel>
            <Input
              type="text"
              placeholder="Cargo"
              value={role}
              onChange={(ev) => setRole(ev.target.value)}
            />
          </FormControl>
          <FormControl id="department">
            <FormLabel>Departamento</FormLabel>
            <Input
              type="text"
              placeholder="Departamento"
              value={department}
              onChange={(ev) => setDepartment(ev.target.value)}
            />
          </FormControl>
          <FormControl id="date">
            <FormLabel>Data de Admissão</FormLabel>
            <Input
              type="date"
              value={date.toString().split('T')[0]}
              onChange={(ev) => setDate(ev.target.value)}
            />
          </FormControl>
          {formError && <p style={{ color: 'red' }}>{formError}</p>}{' '}
          {/* Exibir mensagem de erro, se houver */}
          <Button type="submit" colorScheme="blue">
            {formType === 'edit'
              ? 'Editar Funcionário'
              : 'Adicionar Funcionário'}
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
