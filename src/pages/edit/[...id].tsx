import EmployeeForm, { EmployeeFormProps } from '../../components/EmployeeForm';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function EditEmployeePage() {
  const [employeeInfo, setEmployeeInfo] = useState<EmployeeFormProps>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }

    fetch(`http://localhost:3000/api/employeesById/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setEmployeeInfo(data);
      })
      .catch((error) => {
        console.error('Error fetching employee information:', error);
      });
  }, [id]);

  if (!employeeInfo) {
    return null;
  }

  return (
    <>
      {employeeInfo && (
        <EmployeeForm formType="edit" {...employeeInfo} id={id as string} />
      )}
    </>
  );
}
