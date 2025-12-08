import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import ChangePassword from './pages/ChangePassword';
import MasterData from './pages/MasterData';
import Users from './pages/Users';
import Reports from './pages/Reports';
import WeighIn from './pages/WeighIn';
import WeighOut from './pages/WeighOut';
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

                {/* Master Data Routes */}
                <Route
                    path="/dept"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <MasterData defaultTab="dept" />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/mdetail"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <MasterData defaultTab="machine" />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/shifts"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <MasterData defaultTab="shift" />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/nop"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <MasterData defaultTab="nop" />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route path="/master" element={<ProtectedRoute><Layout><MasterData /></Layout></ProtectedRoute>} />

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
                <Route
                    path="/registration"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Users />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                {/* Reports - Pivot Views */}
                <Route
                    path="/rdash"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Reports defaultGroupBy="stat" title="Dashboard Report (Status)" />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/ddash"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Reports defaultGroupBy="dept" title="Department Wise Report" />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/mdash"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Reports defaultGroupBy="item_description1" title="Machine Wise Report" />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/sdash"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Reports defaultGroupBy="stype" title="Shift Wise Report" />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/edash"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Reports defaultGroupBy="username" title="User Wise Report" />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/nop-report"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Reports defaultGroupBy="nop" title="Nature of Problem Report" />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                {/* Reports - List Views */}
                <Route
                    path="/mcomp"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Reports defaultView="list" fixedFilter={{ stat: 'Completed' }} title="Completed Maintenance" />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/mpend"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Reports defaultView="list" fixedFilter={{ stat: 'Pending' }} title="Pending Maintenance" />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/cust"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Reports defaultView="list" title="Custom Date Range Report" />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/logs"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Reports defaultView="list" title="Maintenance Logs" />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/status"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Reports defaultGroupBy="stat" title="Status Report" />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/reports"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Reports defaultGroupBy="stat" />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                {/* Weighment Operations */}
                {/* Internal Weighment */}
                <Route
                    path="/int/weighin"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <WeighIn type="internal" />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/int/weighout"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <WeighOut type="internal" />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                {/* External Weighment */}
                <Route
                    path="/ext/weighin"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <WeighIn type="external" />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/ext/weighout"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <WeighOut type="external" />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/weighout"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <WeighOut />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </Router>
    );
}

export default App;
