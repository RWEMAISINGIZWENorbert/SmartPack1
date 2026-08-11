import React, { useState, useEffect } from 'react';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';
import employeeService from '../../services/employeeService';
import { snackbar } from '../../components/Snackbar';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const initialFormState = {
    employeeNumber: '',
    firstName: '',
    lastName: '',
    position: '',
    address: '',
    telephone: '',
    gender: ''
  };
  const [formData, setFormData] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await employeeService.getAll();
      if (response.success) {
        setEmployees(response.data);
      } else {
        snackbar.error(response.message || 'Failed to fetch employees');
      }
    } catch (error) {
      snackbar.error(error.message || 'An error occurred while fetching employees');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOpenModal = (employee = null) => {
    if (employee) {
      setEditingId(employee.id);
      setFormData({
        employeeNumber: employee.employeeNumber,
        firstName: employee.firstName,
        lastName: employee.lastName,
        position: employee.position,
        address: employee.address,
        telephone: employee.telephone,
        gender: employee.gender
      });
    } else {
      setEditingId(null);
      setFormData(initialFormState);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let response;
      if (editingId) {
        response = await employeeService.update(editingId, formData);
      } else {
        // Match backend parameters exactly
        response = await employeeService.create(formData);
      }

      if (response.success) {
        snackbar.success(editingId ? 'Employee updated' : 'Employee added');
        setIsModalOpen(false);
        fetchEmployees();
      } else {
        snackbar.error(response.msg || 'Action failed');
      }
    } catch (error) {
      snackbar.error(error.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      const response = await employeeService.delete(id);
      if (response.success) {
        snackbar.success('Employee deleted');
        fetchEmployees();
      }
    } catch (error) {
      snackbar.error('Delete failed');
    }
  };

  const columns = [
    { header: 'ID', accessor: 'employeeNumber' },
    { 
      header: 'Full Name', 
      render: (row) => `${row.firstName} ${row.lastName}` 
    },
    { header: 'Position', accessor: 'position' },
    { header: 'Gender', accessor: 'gender' },
    { header: 'Phone', accessor: 'telephone' },
    {
      header: 'Actions',
      render: (row) => (
        <div className="flex gap-4">
          <button onClick={() => handleOpenModal(row)} className="text-primary hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">Edit</button>
          <button onClick={() => handleDelete(row.id)} className="text-red-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">Delete</button>
        </div>
      )
    }
  ];

  return (
    <div className="p-8 space-y-10 bg-grid min-h-screen animate-in fade-in duration-700">
      <div className="flex justify-between items-end border-b border-border pb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">Personnel Directory</h1>
          <p className="text-text-low text-sm mt-2">Manage company staff records and assignments.</p>
        </div>
        <Button 
          text="+ Register Employee" 
          onClick={() => handleOpenModal()} 
          className="!rounded-lg !h-11 px-8 text-xs font-bold shadow-xl shadow-primary/20"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full shadow-lg shadow-primary/20" /></div>
      ) : (
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl overflow-hidden shadow-2xl">
           <Table columns={columns} data={employees} />
        </div>
      )}

      {/* Employee Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Edit Employee" : "Add New Employee"}
        footer={
          <>
            <Button text="Cancel" variant="secondary" onClick={() => setIsModalOpen(false)} disabled={isSubmitting} />
            <Button text={editingId ? "Update" : "Save"} onClick={handleSubmit} loading={isSubmitting} />
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            label="Employee Number" 
            name="employeeNumber" 
            value={formData.employeeNumber} 
            onChange={handleInputChange} 
            placeholder="EMP001"
            disabled={!!editingId} // Usually ID shouldn't be changed
          />
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} />
            <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} />
          </div>
          <Input label="Position" name="position" value={formData.position} onChange={handleInputChange} />
          <Input label="Address" name="address" value={formData.address} onChange={handleInputChange} />
          <Input label="Telephone" name="telephone" value={formData.telephone} onChange={handleInputChange} />
          <Select 
            label="Gender" 
            value={formData.gender} 
            onChange={(val) => setFormData(prev => ({...prev, gender: val}))}
            options={['Male', 'Female', 'Other']}
          />
        </form>
      </Modal>
    </div>
  );
};

export default Employees;
