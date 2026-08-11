// web/src/ui/Dashboard/Reports/PDF/AdminSummaryPDF.jsx
import React from 'react';
import { Page, Text, View, Document } from '@react-pdf/renderer';
import { styles } from './PDFStyles.js';

const AdminSummaryPDF = ({ data, payments, occupancy, filter }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* 1. BRANDED HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.brand}>SMART PARK</Text>
          <Text style={{ color: '#64748b' }}>Payroll Management System</Text>
        </View>
        <View style={{ textAlign: 'right' }}>
          <Text style={styles.reportTitle}>Payroll Summary Report</Text>
          {/* <Text style={{ fontSize: 8 }}>Filter: {filter} | Date: {new Date().toLocaleDateString()}</Text> */}
        </View>
      </View>

      {/* 2. REUSABLE METRICS GRID */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Gross Salaries</Text>
          <Text style={styles.statValue}>RWF {data.grossSalary.toLocaleString()}</Text>
        </View>
        <View style={[styles.statCard, { borderLeftColor: '#22c55e' }]}>
          <Text style={styles.statLabel}>Total Deductions</Text>
          <Text style={styles.statValue}>{"RWF " + data.totalDeduction.toLocaleString()}</Text>
        </View>
        <View style={[styles.statCard, { borderLeftColor: '#f59e0b' }]}>
          <Text style={styles.statLabel}>Total Departments</Text>
          <Text style={styles.statValue}>{data.departments}</Text>
        </View>
      </View>

      {/* 3. STALL MATRIX TABLE
      <Text style={styles.sectionTitle}>Stall Occupancy Matrix</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableCell, styles.bold]}>Stall</Text>
          <Text style={[styles.tableCell, styles.bold]}>Status</Text>
          <Text style={[styles.tableCell, styles.bold]}>Current Assignee</Text>
        </View>
        {occupancy.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.stall}</Text>
            <Text style={styles.tableCell}>{item.status}</Text>
            <Text style={styles.tableCell}>{item.vendor}</Text>
          </View>
        ))}
      </View> */}

      {/* 4. REVENUE DETAILS TABLE */}
      <Text style={styles.sectionTitle}>Departments & Payroll Marking</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableCell, styles.bold]}>Dept Code</Text>
          <Text style={[styles.tableCell, styles.bold]}>Dept Name</Text>
          <Text style={[styles.tableCell, styles.bold]}>Gross Salary</Text>
          <Text style={[styles.tableCell, styles.bold]}>Total Deductions</Text>
        </View>
        {payments.map((p, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{p.DepartementCode}</Text>
            <Text style={styles.tableCell}>{p.DepartementName}</Text>
            <Text style={styles.tableCell}>{"RWF " + p.GrossSalary.toLocaleString()}</Text>
            <Text style={styles.tableCell}>{"RWF " + p.TotalDeduction.toLocaleString()}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default AdminSummaryPDF;
