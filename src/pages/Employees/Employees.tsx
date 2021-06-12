import { useEffect, useState, useCallback } from 'react'
import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import DataTable from '../../components/DataTable/DataTable';
import { getEmployees, createEmployee } from '../../services/employee';
import { validateName, validateEmail, validatePosition } from './validators';
import './Employees.css';

type Employee = {
  id: string;
  name: string;
  email: string;
  position: string;
};

const DEFAULT_FORM_DATA = {
  name: '',
  email: '',
  position: '',
};
const DEFAULT_FORM_DATA_VALIDATORS = {
  name: '',
  email: '',
  position: '',
};

export default function Employees() {
  let [invalidForm, setInvalidForm] = useState(false);
  let [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  let [isLoading, setLoading] = useState(false);
  let [formValidators, setFormValidators] = useState(DEFAULT_FORM_DATA_VALIDATORS);
  let [employees, setEmployees] = useState([]);
  let [isShowModalCreate, setShowModalCreate] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleCloseCreateModal = useCallback(() => {
    setShowModalCreate(false);
    setFormData(DEFAULT_FORM_DATA);
    setFormValidators(DEFAULT_FORM_DATA_VALIDATORS);
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const result = await getEmployees();

      setEmployees(result)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  const handleCreateEmployee = useCallback(async () => {
    if (validateForm()) {
       try {
        await createEmployee(formData);
        handleCloseCreateModal();
        fetchEmployees();
      } catch (error) {
        console.log(error);
      }
    }
  }, [formData]);

  const validateForm = () => {
    setFormValidators({
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      position: validatePosition(formData.position),
    });

    if (
      validateName(formData.name) ||
      validateEmail(formData.email) ||
      validatePosition(formData.position)
    ) {
      setInvalidForm(true);
      return false
    } else {
      setInvalidForm(false);
      return true
    };
  }

  const handleInputChange = (value: string, field: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  }

  return (
    <>
      <DataTable
        columns={[{
          title: 'Name',
          key: 'name',
          dataIndex: 'name',
          icon: <i className="fab fa-adversal" />,
          render: (name) => <span className="employee-name">{name}</span>,
        }, {
          title: 'Email',
          key: 'email',
          dataIndex: 'email',
          icon: <i className="fas fa-at" />,
          render: (email) => <a href={`mailTo:${email}`} className="employee-email">{email}</a>,
        }, {
          title: 'Position',
          key: 'position',
          dataIndex: 'position',
          icon: <i className="fas fa-align-left" />,
          render: (position) => <span className="employee-position">{position}</span>,
        }]}
        data={(employees || []).map((employee: Employee) => ({
          ...employee,
          key: employee.id,
        }))}
        pagination={{
          pageSize: 5,
        }}
        renderFooter={() => (
          <div className="actions-container">
            <Button onClick={() => setShowModalCreate(true)}>+ New</Button>
          </div>
        )}
        isLoading={isLoading}
      />
      <Modal
        title="Create New Employee"
        isVisible={isShowModalCreate}
        okText="Create"
        onCancel={handleCloseCreateModal}
        onOk={handleCreateEmployee}
      >
        <>
          <Input
            name="name"
            title="Name"
            value={formData.name}
            error={formValidators.name}
            onChange={value => {
              handleInputChange(value, 'name');
              if (invalidForm) {
                setFormValidators({
                  ...formValidators,
                  name: validateName(value),
                });
              }
            }}
          />
          <Input
            name="email"
            title="Email"
            value={formData.email}
            error={formValidators.email}
            onChange={value => {
              handleInputChange(value, 'email');
              if (invalidForm) {
                setFormValidators({
                  ...formValidators,
                  email: validateName(value),
                });
              }
            }}
          />
          <Input
            name="position"
            title="Position"
            value={formData.position}
            error={formValidators.position}
            onChange={value => {
              handleInputChange(value, 'position');
              if (invalidForm) {
                setFormValidators({
                  ...formValidators,
                  position: validateName(value),
                });
              }
            }}
          />
        </>
      </Modal>
    </>
  )
}
