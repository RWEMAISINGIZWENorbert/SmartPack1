import React, { useState, useEffect } from 'react';
import Header from "../../components/Header";
import Card from "../../components/Card";
import Spinner from "../../components/Spinner";
import Table from "../../components/Table";
import Button from "../../components/Button";
import { snackbar } from "../../components/Snackbar";
import { useNavigate } from "react-router-dom";
import departmentService from "../../services/departmentService";
import employeeService from "../../services/employeeService";
import salaryService from "../../services/salaryService";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    departments: 0,
    employees: 0,
    salary: 0,
    recentEmployees: [],
    recentSalaries: []
  });
  const [isLoading, setIsLoading] = useState(true);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-RW', { 
      style: 'currency', 
      currency: 'RWF',
      maximumFractionDigits: 0 
    }).format(val || 0);
  };

  const fetchSummary = async () => {
    setIsLoading(true);
    try {
      const [departmentRes, employeeRes, salaryRes] = await Promise.all([
        departmentService.getAll(),
        employeeService.getAll(),
        salaryService.getAll()
      ]);

      // Sort and take top 5
      const recentEmployees = [...employeeRes.data]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      const recentSalaries = [...salaryRes.data]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      setStats({
        departments: departmentRes.data.length,
        employees: employeeRes.data.length,
        salary: salaryRes.data.reduce((total, s) => total + (s.netSalary || 0), 0),
        recentEmployees,
        recentSalaries
      });

    } catch (err) {
      snackbar.error("Failed to load dashboard statistics");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const employeeColumns = [
    { header: 'Name', render: (row) => `${row.firstName} ${row.lastName}` },
    { header: 'Position', accessor: 'position' },
    { header: 'Hired Date', render: (row) => new Date(row.hiredDate).toLocaleDateString() },
  ];

  const salaryColumns = [
    { header: 'Employee', render: (row) => row.employee ? `${row.employee.firstName} ${row.employee.lastName}` : 'N/A' },
    { header: 'Net Salary', render: (row) => <span className="font-bold text-success">{formatCurrency(row.netSalary)}</span> },
    { header: 'Month', accessor: 'month' },
  ];


  return (
    <div className="space-y-10 animate-in fade-in duration-700 bg-grid min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <Header label="Enterprise Overview" />
          <p className="text-sm text-text-low mt-1">Real-time management and payroll insights.</p>
        </div>
        <div className="flex gap-3">
           <Button text="Add Employee" variant="primary" onClick={() => navigate('/dashboard/employees')} className="!rounded-lg !h-10 text-xs font-bold" />
           <Button text="Process Salary" variant="secondary" onClick={() => navigate('/dashboard/salary')} className="!rounded-lg !h-10 text-xs font-bold border-border bg-muted/50" />
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
           <Spinner size="large" color="primary" inline={true} />
        </div>
      ) : (
        <>
          {/* Neo-Enterprise Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Total Employees', value: stats.employees, icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', color: 'text-primary' },
              { label: 'Departments', value: stats.departments, icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', color: 'text-secondary' },
              { label: 'Monthly Payroll', value: formatCurrency(stats.salary), icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'text-warning' }
            ].map((item, i) => (
              <Card key={i} className="!p-0 border-border bg-card/50 backdrop-blur-sm group hover:border-primary/50 transition-colors">
                <div className="p-6 flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold text-text-low uppercase tracking-widest">{item.label}</p>
                    <h2 className="text-3xl font-bold text-text-high mt-3">{item.value}</h2>
                  </div>
                  <div className={`p-3 rounded-xl bg-muted/50 ${item.color} group-hover:bg-primary/10 transition-colors`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}/></svg>
                  </div>
                </div>
                <div className="px-6 py-3 bg-muted/20 border-t border-border/50">
                   <span className="text-[10px] font-bold text-text-low uppercase tracking-widest">Live System Data</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Structured Data Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-12">
            <Card className="border-border bg-card/50 backdrop-blur-sm" title="Recent Personnel" action={<button onClick={() => navigate('/dashboard/employees')} className="text-xs font-bold text-primary hover:underline">View Directory</button>}>
              <Table 
                columns={employeeColumns} 
                data={stats.recentEmployees} 
              />
            </Card>

            <Card className="border-border bg-card/50 backdrop-blur-sm" title="Financial Activity" action={<button onClick={() => navigate('/dashboard/salary')} className="text-xs font-bold text-primary hover:underline">Full Ledger</button>}>
              <Table 
                columns={salaryColumns} 
                data={stats.recentSalaries} 
              />
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
