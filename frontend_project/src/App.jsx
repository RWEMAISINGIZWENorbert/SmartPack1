import './App.css'
import Signup from './ui/auth/Signup';
import Signin from './ui/auth/Signin'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './ui/LandingPage/LandingPage';
import { SnackbarProvider } from './components/Snackbar';
import { ProtectedRoute, PublicRoute } from './components/routing/RouteGuards';
import DashboardLayout from './ui/Dashboard/DashboardLayout';

function App() {

    const payments = [
    {
        id: 1,
        vendor_id: { name: 'Vendor A' },
        amount: 100,
        createdAt: '2023-10-01'
    },
    {
        id: 2,
        vendor_id: { name: 'Vendor B' },
        amount: 200,
        createdAt: '2023-10-02'
    }
];

const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount);
};


  return (
    <>
        {/* <Table
        columns={[
          { header: 'Vendor', render: (row) => row.vendor_id?.name || 'Walk-in' },
          { header: 'Amount', render: (row) => <span className="font-bold text-primary">{formatCurrency(row.amount)}</span> },
          { header: 'Date', render: (row) => <span className="text-text-low">{new Date(row.createdAt).toLocaleDateString()}</span> },
        ]}
        data={payments}
      /> */}
      {/* <SignIn /> */}
      {/* <SignUp /> */}
      {/* <LandingPage /> */}
      {/* <Sidebar /> */}

      <AuthProvider>
      <BrowserRouter>
        <SnackbarProvider />
        <Routes>
          {/* ALL PUBLIC CONTENT IS ON "/" NOW */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<LandingPage />} />
          </Route>
          
          {/* PRIVATE ROUTES */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard/*" element={<DashboardLayout />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>

    </>
  )
}

export default App
