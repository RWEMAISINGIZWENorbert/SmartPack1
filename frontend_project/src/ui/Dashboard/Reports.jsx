import React, { useState, useEffect } from 'react';
import Header from "../../components/Header";
import Button from "../../components/Button";
import Table from "../../components/Table";
import Spinner from "../../components/Spinner";
import { snackbar } from "../../components/Snackbar";
import departmentService from "../../services/departmentService";
import salaryService from "../../services/salaryService";
import Card from "../../components/Card";

// PDF Imports
import { PDFDownloadLink } from '@react-pdf/renderer';
import AdminSummaryPDF from '../../reports/PDF/AdminSummaryPDF';

const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-RW', { style: 'currency', currency: 'RWF' }).format(val || 0);
};

const Reports = () => {
  const [reportData, setReportData] = useState([]);
  const [summaryStats, setSummaryStats] = useState({
    grossSalary: 0,
    totalDeduction: 0,
    departments: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toLocaleString('default', { month: 'long' }));

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const fetchReportData = async () => {
    setIsLoading(true);
    try {
      const [deptRes, salaryRes] = await Promise.all([
        departmentService.getAll(),
        salaryService.getAll()
      ]);

      if (deptRes.success && salaryRes.success) {
        let totalGross = 0;
        let totalDeductionsAll = 0;

        // Filter salaries by selected month
        const filteredSalaries = salaryRes.data.filter(s => s.month === selectedMonth);

        const combinedData = deptRes.data.map(dept => {
          const deptSalaries = filteredSalaries.filter(s => 
            (s.departmentId?.id || s.departmentId) === dept.id
          );

          const totalDeductions = deptSalaries.reduce((sum, s) => sum + (s.totalDeduction || 0), 0);
          
          // Accumulate totals
          totalGross += (dept.GrossSalary || 0);
          totalDeductionsAll += totalDeductions;

          return {
            ...dept,
            TotalDeduction: totalDeductions
          };
        });

        setReportData(combinedData);
        setSummaryStats({
          grossSalary: totalGross,
          totalDeduction: totalDeductionsAll,
          departments: deptRes.data.length
        });
      }
    } catch (err) {
      snackbar.error("Failed to load report data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, [selectedMonth]); // Refetch when month changes

  const columns = [
    { header: 'Dept Code', accessor: 'DepartementCode' },
    { header: 'Department Name', accessor: 'DepartementName' },
    { 
      header: 'Head of Department', 
      render: (row) => row.employee ? `${row.employee.firstName} ${row.employee.lastName}` : 'N/A'
    },
    { 
      header: 'Gross Salary', 
      render: (row) => `RWF ${row.GrossSalary?.toLocaleString()}` 
    },
    { 
      header: 'Deductions (' + selectedMonth + ')', 
      render: (row) => (
        <span className="text-red-500 font-bold">
          RWF {row.TotalDeduction?.toLocaleString()}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-10 p-2 animate-in fade-in duration-700 bg-grid min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border pb-8">
        <div>
           <Header label="Monthly Reports" />
           <p className="text-sm text-text-low mt-1">Financial performance for {selectedMonth}.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
           {/* Month Selector */}
           <div className="flex items-center gap-3 bg-muted/50 border border-border px-4 py-2 rounded-lg">
              <span className="text-[10px] font-bold text-text-low uppercase tracking-widest">Select Period:</span>
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-transparent text-sm font-bold text-white outline-none cursor-pointer"
              >
                {months.map(m => <option key={m} value={m} className="bg-background">{m}</option>)}
              </select>
           </div>

           {!isLoading && (
            <PDFDownloadLink
              document={<AdminSummaryPDF data={summaryStats} payments={reportData} />}
              fileName={`Payroll_Report_${selectedMonth}_${new Date().getFullYear()}.pdf`}
            >
              {({ loading }) => (
                <Button 
                  text={loading ? "Generating..." : "Download " + selectedMonth + " Report"} 
                  variant="primary" 
                  disabled={loading}
                  className="!rounded-lg !h-10 text-xs font-bold shadow-none"
                />
              )}
            </PDFDownloadLink>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner size="large" color="primary" inline={true} />
        </div>
      ) : (
         <>
          {/* Summary Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2">
            {[
              { label: 'Projected Gross', value: formatCurrency(summaryStats.grossSalary), color: 'text-text-high' },
              { label: 'Active Deductions', value: formatCurrency(summaryStats.totalDeduction), color: 'text-error' },
              { label: 'Net Distribution', value: formatCurrency(summaryStats.grossSalary - summaryStats.totalDeduction), color: 'text-primary' }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-2 border-l border-border pl-6">
                <span className="text-[10px] font-bold text-text-low uppercase tracking-[0.2em]">{stat.label}</span>
                <span className={`${stat.color} text-3xl font-bold tracking-tighter`}>{stat.value}</span>
              </div>
            ))}
          </div>

          {/* Report Content Table */}
          <Card className="!p-0 border-border bg-card/50 backdrop-blur-sm mt-12 overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-muted/20">
               <h3 className="text-xs font-bold text-text-low uppercase tracking-widest">Departmental Summary - {selectedMonth}</h3>
            </div>
            <Table 
              columns={columns} 
              data={reportData} 
            />
          </Card>
        </>
      )}
    </div>
  );
};

export default Reports;
