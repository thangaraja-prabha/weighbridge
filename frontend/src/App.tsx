import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import ChangePassword from './pages/ChangePassword';
import Users from './pages/Users';
import Customers from './pages/Customers';
import Register from './pages/Register';
import Settings from './pages/Wlog';
import Layout from './components/Layout';
import Records from './pages/Records';
import Lookups from './pages/Lookups';
import VehicleManagement from './pages/VehicleManagement';
import TransporterManagement from './pages/TransporterManagement';
import MaterialManagement from './pages/MaterialManagement';
import CustomerManagement from './pages/CustomerManagement';
import SupplierManagement from './pages/SupplierManagement';

import { SerialProvider } from './context/SerialContext';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    // Wrap authenticated routes in SerialProvider so connection persists across pages
    return (
        <SerialProvider>
            {children}
        </SerialProvider>
    );
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Dashboard />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
// ... rest of the file stays same structure, wrapping happens in ProtectedRoute


                {/* Change Password */}
                <Route
                    path="/cpwd"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <ChangePassword />
                            </Layout>
                        </ProtectedRoute>
                    }
                />


                {/* User Management */}
                <Route
                    path="/employees"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Users />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                {/* Settings */}
                <Route
                    path="/wlog"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Settings />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                {/* Records */}
                <Route
                    path="/records"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Records />
                            </Layout>
                        </ProtectedRoute>
                    }
                />



                {/* Table Management Routes */}
                <Route
                    path="/customers"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Customers />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                {/* Lookup Management Routes */}
                <Route
                    path="/lookups"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Lookups />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/lookups/vehicles"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <VehicleManagement />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/lookups/transporters"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <TransporterManagement />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/lookups/materials"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <MaterialManagement />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/lookups/customers"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <CustomerManagement />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/lookups/suppliers"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <SupplierManagement />
                            </Layout>
                        </ProtectedRoute>
                    }
                />


            </Routes>
        </Router>
    );
}

export default App;
