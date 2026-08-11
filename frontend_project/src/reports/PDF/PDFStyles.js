// web/src/ui/Dashboard/Reports/PDF/PDFStyles.js
import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: { padding: 40, backgroundColor: '#FFFFFF', fontSize: 10, fontFamily: 'Helvetica' },
  header: { marginBottom: 20, borderBottom: 1, borderBottomColor: '#EEE', pb: 10, flexDirection: 'row', justifyContent: 'space-between' },
  brand: { fontSize: 18, fontWeight: 'bold', color: '#2563eb' }, // Your primary color
  reportTitle: { fontSize: 14, fontWeight: 'bold', marginTop: 10 },
  
  // Grid for Metrics
  statsGrid: { flexDirection: 'row', gap: 15, marginBottom: 30 },
  statCard: { flex: 1, padding: 10, borderLeft: 3, borderLeftColor: '#2563eb', backgroundColor: '#F8FAFC' },
  statLabel: { fontSize: 8, color: '#64748b', textTransform: 'uppercase', marginBottom: 4 },
  statValue: { fontSize: 16, fontWeight: 'bold' },

  // Table Styles
  table: { width: 'auto', marginTop: 15 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#F1F5F9', borderBottom: 1, borderBottomColor: '#CBD5E1', padding: 5 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E2E8F0', padding: 5, alignItems: 'center' },
  tableCell: { flex: 1 },
  bold: { fontWeight: 'bold' },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', marginTop: 20, marginBottom: 8, color: '#1e293b' }
});
