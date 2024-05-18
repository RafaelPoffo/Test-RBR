import { useEffect, useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  InputGroup,
  InputLeftElement,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
} from '@chakra-ui/react';
import {
  ArrowUpDownIcon,
  EditIcon,
  DeleteIcon,
  AddIcon,
  SearchIcon,
} from '@chakra-ui/icons';
import Link from 'next/link';
import { format } from 'date-fns';

type employeesType = {
  _id: string;
  name: string;
  role: string;
  department: string;
  date: string;
};

export default function Home() {
  const [employees, setEmployees] = useState<employeesType[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<employeesType>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  }>({ key: null, direction: 'asc' });
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:3000/api/employees')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Conexão não funcionando');
        }
        return response.json();
      })
      .then((data) => {
        setEmployees(data);
      })
      .catch((error) => {
        console.error('Erro ao usar o fetch nos funcionários', error);
      });
  }, []);

  const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yyyy');
  };

  const handleDeleteEmployee = (employee) => {
    setEmployeeToDelete(employee);
    setDeleteModalOpen(true);
  };

  const confirmDeleteEmployee = async () => {
    await fetch(
      `http://localhost:3000/api/deleteEmployee/${employeeToDelete._id}`,
      {
        method: 'DELETE',
      },
    );
    setEmployees(
      employees.filter((employee) => employee._id !== employeeToDelete._id),
    );
    setDeleteModalOpen(false);
  };

  const closeModal = () => {
    setDeleteModalOpen(false);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) => {
    return (
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.role.toLowerCase().includes(search.toLowerCase()) ||
      employee.department.toLowerCase().includes(search.toLowerCase())
    );
  });

  const sortedEmployees = sortConfig.key
    ? [...filteredEmployees].sort((a, b) => {
        if (sortConfig.key === 'date') {
          const dateA = new Date(a[sortConfig.key]);
          const dateB = new Date(b[sortConfig.key]);

          if (sortConfig.direction === 'asc') {
            return dateA.getTime() - dateB.getTime();
          } else {
            return dateB.getTime() - dateA.getTime();
          }
        } else {
          const aKey = a[sortConfig.key] ? a[sortConfig.key].toLowerCase() : '';
          const bKey = b[sortConfig.key] ? b[sortConfig.key].toLowerCase() : '';
          if (aKey < bKey) {
            return sortConfig.direction === 'asc' ? -1 : 1;
          }
          if (aKey > bKey) {
            return sortConfig.direction === 'asc' ? 1 : -1;
          }
          return 0;
        }
      })
    : filteredEmployees;

  const renderSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? (
        <ArrowUpDownIcon />
      ) : (
        <ArrowUpDownIcon transform="rotate(180deg)" />
      );
    }
    return <ArrowUpDownIcon />;
  };

  return (
    <>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '10px',
          margin: '10px',
          marginBottom: '50px',
        }}
      >
        <Link href="/addEmployee">
          <Button
            colorScheme="blue"
            leftIcon={<AddIcon />}
            ml={4}
            mt={4}
            mb={4}
          >
            Adicionar Funcionário
          </Button>
        </Link>

        <InputGroup mb={4} ml={4} maxWidth="300px">
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            value={search}
            onChange={handleSearchChange}
            placeholder="Pesquisar funcionário"
            size="md"
          />
        </InputGroup>
      </div>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th sx={{ color: '#999' }}>
              <Box
                sx={{
                  color: '#000',
                  bg: '#fff',
                  px: 2,
                  py: 1,
                  borderRadius: '8px',
                  width: '85px',
                }}
              >
                <Button
                  variant="link"
                  onClick={() => handleSort('name')}
                  rightIcon={renderSortIcon('name')}
                >
                  Nome
                </Button>
              </Box>
            </Th>
            <Th sx={{ color: '#999' }}>
              <Box
                sx={{
                  color: '#000',
                  bg: '#fff',
                  px: 2,
                  py: 1,
                  borderRadius: '8px',
                  width: '85px',
                }}
              >
                <Button
                  variant="link"
                  onClick={() => handleSort('role')}
                  rightIcon={renderSortIcon('role')}
                >
                  Cargo
                </Button>
              </Box>
            </Th>
            <Th sx={{ color: '#999' }}>
              <Box
                sx={{
                  color: '#000',
                  bg: '#fff',
                  px: 2,
                  py: 1,
                  borderRadius: '8px',
                  width: '145px',
                }}
              >
                <Button
                  variant="link"
                  onClick={() => handleSort('department')}
                  rightIcon={renderSortIcon('department')}
                >
                  Departamento
                </Button>
              </Box>
            </Th>
            <Th sx={{ color: '#999' }}>
              <Box
                sx={{
                  color: '#000',
                  bg: '#fff',
                  px: 2,
                  py: 1,
                  borderRadius: '8px',
                  width: '175px',
                }}
              >
                <Button
                  variant="link"
                  onClick={() => handleSort('date')}
                  rightIcon={renderSortIcon('date')}
                >
                  Data de Admissão
                </Button>
              </Box>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortedEmployees.map((employee) => (
            <Tr key={employee._id}>
              <Td>{employee.name}</Td>
              <Td>{employee.role}</Td>
              <Td>{employee.department}</Td>
              <Td>{formatDate(employee.date)}</Td>
              <Td style={{ borderTop: '1px solid #999999' }}>
                <Link href={'/edit/' + employee._id}>
                  <Button
                    colorScheme="blue"
                    leftIcon={<EditIcon />}
                    ml={4}
                    mb={4}
                  >
                    Editar
                  </Button>
                </Link>
                <Button
                  colorScheme="blue"
                  leftIcon={<DeleteIcon />}
                  ml={4}
                  mb={4}
                  onClick={() => handleDeleteEmployee(employee)}
                >
                  Deletar
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={deleteModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader style={{ color: 'black' }}>
            Confirmação de Exclusão
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody style={{ color: 'gray' }}>
            Tem certeza que deseja deletar o funcionário{' '}
            <span style={{ color: 'red' }}>{employeeToDelete?.name}?</span>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={confirmDeleteEmployee}>
              Sim
            </Button>
            <Button variant="ghost" onClick={closeModal}>
              Não
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
