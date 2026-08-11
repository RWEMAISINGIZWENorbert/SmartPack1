import React, { useState, useEffect } from 'react';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';
import departmentService from '../../services/departmentService';
import employeeService from '../../services/employeeService';
import { snackbar } from '../../components/Snackbar';

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State - matching detpartmentModel.js fields
  const initialFormState = {
    DepartementCode: '',
    DepartementName: '',
    GrossSalary: ''
  };
  const [formData, setFormData] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [deptRes, empRes] = await Promise.all([
        departmentService.getAll(),
        employeeService.getAll()
      ]);

      if (deptRes.success) setDepartments(deptRes.data);
      if (empRes.success) setEmployees(empRes.data);
      
    } catch (error) {
      snackbar.error(error.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOpenModal = (dept = null) => {
    if (dept) {
      setEditingId(dept.id);
      setFormData({
        DepartementCode: dept.DepartementCode,
        DepartementName: dept.DepartementName,
        GrossSalary: dept.GrossSalary
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
        response = await departmentService.update(editingId, formData);
      } else {
        response = await departmentService.create(formData);
      }

      if (response.success) {
        snackbar.success(editingId ? 'Department updated' : 'Department created');
        setIsModalOpen(false);
        fetchData();
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
    if (!window.confirm('Delete this department?')) return;
    try {
      const response = await departmentService.delete(id);
      if (response.success) {
        snackbar.success('Department deleted');
        fetchData();
      }
    } catch (error) {
      snackbar.error('Delete failed');
    }
  };

  // Format employees for Select component
  const employeeOptions = employees.map(emp => ({
    value: emp.id,
    label: `${emp.firstName} ${emp.lastName} (${emp.employeeNumber})`
  }));

  const columns = [
    { header: 'Code', accessor: 'DepartementCode' },
    { header: 'Department Name', accessor: 'DepartementName' },
    { 
      header: 'Gross Salary', 
      render: (row) => `RWF ${row.GrossSalary?.toLocaleString()}` 
    },
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
          <h1 className="text-4xl font-bold tracking-tight text-white">Departmental Structure</h1>
          <p className="text-text-low text-sm mt-2">Manage organizational units and fiscal allocation.</p>
        </div>
        <Button 
          text="+ Add Department" 
          onClick={() => handleOpenModal()} 
          className="!rounded-lg !h-11 px-8 text-xs font-bold shadow-xl shadow-primary/20"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full shadow-lg shadow-primary/20" /></div>
      ) : (
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl overflow-hidden shadow-2xl">
           <Table columns={columns} data={departments} />
        </div>
      )}

      {/* Department Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Edit Department" : "New Department"}
        footer={
          <>
            <Button text="Cancel" variant="secondary" onClick={() => setIsModalOpen(false)} disabled={isSubmitting} />
            <Button text={editingId ? "Update" : "Save"} onClick={handleSubmit} loading={isSubmitting} />
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            label="Department Code" 
            name="DepartementCode" 
            value={formData.DepartementCode} 
            onChange={handleInputChange} 
            placeholder="e.g. IT-001"
          />
          <Input 
            label="Department Name" 
            name="DepartementName" 
            value={formData.DepartementName} 
            onChange={handleInputChange} 
            placeholder="e.g. Information Technology"
          />
          <Input 
            label="Gross Salary (Glossary)" 
            name="GrossSalary" 
            type="number"
            value={formData.GrossSalary} 
            onChange={handleInputChange} 
            placeholder="0.00"
          />
        </form>
      </Modal>
    </div>
  );
};

export default Department;
