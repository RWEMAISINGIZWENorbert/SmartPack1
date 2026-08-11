import React, { useState, useEffect } from 'react';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';
import salaryService from '../../services/salaryService';
import employeeService from '../../services/employeeService';
import departmentService from '../../services/departmentService';
import { snackbar } from '../../components/Snackbar';

const Salary = () => {
  const [salaries, setSalaries] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State - matching salaryModel.js fields
  const initialFormState = {
    employeeId: '',
    departmentId: '',
    grossSalary: '',
    totalDeduction: '',
    netSalary: '',
    month: ''
  };
  const [formData, setFormData] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [salaryRes, empRes, deptRes] = await Promise.all([
        salaryService.getAll(),
        employeeService.getAll(),
        departmentService.getAll()
      ]);

      if (salaryRes.success) setSalaries(salaryRes.data);
      if (empRes.success) setEmployees(empRes.data);
      if (deptRes.success) setDepartments(deptRes.data);
      
    } catch (error) {
      snackbar.error(error.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    
    // Auto-calculate Net Salary if Gross or Deduction changes
    if (name === 'grossSalary' || name === 'totalDeduction') {
      const gross = parseFloat(updatedForm.grossSalary) || 0;
      const deduction = parseFloat(updatedForm.totalDeduction) || 0;
      updatedForm.netSalary = (gross - deduction).toString();
    }
    
    setFormData(updatedForm);
  };

  const handleOpenModal = (salary = null) => {
    if (salary) {
      setEditingId(salary.id);
      setFormData({
        employeeId: salary.employeeId?.id || salary.employeeId,
        departmentId: salary.departmentId?.id || salary.departmentId,
        grossSalary: salary.grossSalary.toString(),
        totalDeduction: salary.totalDeduction.toString(),
        netSalary: salary.netSalary.toString(),
        month: salary.month
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
        response = await salaryService.update(editingId, formData);
      } else {
        response = await salaryService.create(formData);
      }

      if (response.success) {
        snackbar.success(editingId ? 'Salary updated' : 'Salary record created');
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
    if (!window.confirm('Delete this record?')) return;
    try {
      const response = await salaryService.delete(id);
      if (response.success) {
        snackbar.success('Record deleted');
        fetchData();
      }
    } catch (error) {
      snackbar.error('Delete failed');
    }
  };

    const columns = [
    { 
      header: 'Employee', 
      render: (row) => row.employee ? `${row.employee.firstName} ${row.employee.lastName}` : 'Unknown'
    },
    { 
      header: 'Department', 
      render: (row) => row.department?.DepartementName || 'N/A'
    },
    { header: 'Month', accessor: 'month' },
    { 
      header: 'Gross Salary', 
      render: (row) => `RWF ${row.grossSalary?.toLocaleString()}` 
    },
    { 
      header: 'Deductions', 
      render: (row) => (
        <span className="text-red-500 font-medium">
          - RWF {row.totalDeduction?.toLocaleString()}
        </span>
      )
    },
    { 
      header: 'Net Salary', 
      render: (row) => (
        <span className="text-success font-bold">
          RWF {row.netSalary?.toLocaleString()}
        </span>
      )
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
          <h1 className="text-4xl font-bold tracking-tight text-white">Payroll Ledger</h1>
          <p className="text-text-low text-sm mt-2">Oversee employee compensation and tax compliance.</p>
        </div>
        <Button 
          text="+ Process Salary" 
          onClick={() => handleOpenModal()} 
          className="!rounded-lg !h-11 px-8 text-xs font-bold shadow-xl shadow-primary/20"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full shadow-lg shadow-primary/20" /></div>
      ) : (
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl overflow-hidden shadow-2xl">
           <Table columns={columns} data={salaries} />
        </div>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Edit Salary Record" : "New Salary Record"}
        footer={
          <>
            <Button text="Cancel" variant="secondary" onClick={() => setIsModalOpen(false)} disabled={isSubmitting} />
            <Button text={editingId ? "Update" : "Save"} onClick={handleSubmit} loading={isSubmitting} />
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Select 
              label="Employee" 
              value={formData.employeeId} 
              onChange={(val) => setFormData(prev => ({...prev, employeeId: val}))}
              options={employees.map(e => ({ value: e.id, label: `${e.firstName} ${e.lastName}` }))}
              placeholder="Select employee"
            />
            <Select 
              label="Department" 
              value={formData.departmentId} 
              onChange={(val) => setFormData(prev => ({...prev, departmentId: val}))}
              options={departments.map(d => ({ value: d.id, label: d.DepartementName }))}
              placeholder="Select dept"
            />
          </div>
          
          <Select 
            label="Reporting Month" 
            value={formData.month} 
            onChange={(val) => setFormData(prev => ({...prev, month: val}))}
            options={["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]}
            placeholder="Select month"
          />

          <div className="grid grid-cols-3 gap-4">
            <Input label="Gross Salary" name="grossSalary" type="number" value={formData.grossSalary} onChange={handleInputChange} />
            <Input label="Deductions" name="totalDeduction" type="number" value={formData.totalDeduction} onChange={handleInputChange} />
            <Input label="Net Salary" name="netSalary" type="number" value={formData.netSalary} readOnly className="opacity-70" />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Salary;
