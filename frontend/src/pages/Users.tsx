import React, { useState, useEffect } from 'react';
import { masterApi } from '../api/master';
import { authApi } from '../api/auth';

const Users: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);

    // Registration Form
    const [regData, setRegData] = useState({
        username: '',
        password: '',
        personName: '',
        email: '',
        mobile: '',
        rights: 'Users',
        smsOpt: 'No'
    });

    useEffect(() => {
        loadUsers();
    }, [search]);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const res = await masterApi.getUsers(search);
            setUsers(res?.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await authApi.register(regData);

            setShowModal(false);
            setRegData({
                username: '', password: '', personName: '',
                email: '', mobile: '', rights: 'Users', smsOpt: 'No'
            });
            loadUsers();
            alert('User registered successfully');
        } catch (err: any) {
            alert(err.message || 'Registration failed');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-sky-600 transition-colors shadow-sm"
                >
                    + Add New User
                </button>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                    <div className="max-w-md w-full relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name / Username</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading && <tr><td colSpan={4} className="text-center py-4">Loading...</td></tr>}
                            {!loading && users.map((u: any) => (
                                <tr key={u.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 number-font bg-gray-200 flex items-center justify-center text-gray-500 font-bold rounded-full">
                                                {u.username.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{u.empname || u.username}</div>
                                                <div className="text-sm text-gray-500">@{u.username}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {u.rights}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div>{u.email}</div>
                                        <div>{u.mobile}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {u.empcode || '-'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed z-50 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setShowModal(false)}></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Register New User</h3>
                                <form onSubmit={handleRegister} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text" required placeholder="Username"
                                            className="w-full border p-2 rounded"
                                            value={regData.username} onChange={e => setRegData({ ...regData, username: e.target.value })}
                                        />
                                        <input
                                            type="password" required placeholder="Password"
                                            className="w-full border p-2 rounded"
                                            value={regData.password} onChange={e => setRegData({ ...regData, password: e.target.value })}
                                        />
                                    </div>
                                    <input
                                        type="text" required placeholder="Full Name (Emp Name)"
                                        className="w-full border p-2 rounded"
                                        value={regData.personName} onChange={e => setRegData({ ...regData, personName: e.target.value })}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="email" placeholder="Email"
                                            className="w-full border p-2 rounded"
                                            value={regData.email} onChange={e => setRegData({ ...regData, email: e.target.value })}
                                        />
                                        <input
                                            type="text" placeholder="Mobile"
                                            className="w-full border p-2 rounded"
                                            value={regData.mobile} onChange={e => setRegData({ ...regData, mobile: e.target.value })}
                                        />
                                    </div>
                                    <select
                                        className="w-full border p-2 rounded"
                                        value={regData.rights} onChange={e => setRegData({ ...regData, rights: e.target.value })}
                                    >
                                        <option value="Users">Users</option>
                                        <option value="Managers">Managers</option>
                                        <option value="Admin">Admin</option>
                                    </select>

                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                        <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-sky-700 sm:col-start-2 sm:text-sm">
                                            Register
                                        </button>
                                        <button type="button" onClick={() => setShowModal(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:col-start-1 sm:text-sm">
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;
