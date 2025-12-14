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

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
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


            </Routes>
        </Router>
    );
}

export default App;
