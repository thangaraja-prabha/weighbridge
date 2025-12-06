import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth';

const Login: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        personName: '',
        email: '',
        mobile: '',
        rights: '',
        smsOpt: 'no',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (!isLogin && formData.password !== formData.confirmPassword) {
                throw new Error("Passwords do not match");
            }

            let data;

            if (isLogin) {
                data = await authApi.login({
                    username: formData.username,
                    password: formData.password
                });

                localStorage.setItem('token', data.data.token);
                localStorage.setItem('user', JSON.stringify(data.data.user));
                navigate('/dashboard');
            } else {
                await authApi.register({
                    username: formData.username,
                    password: formData.password,
                    personName: formData.personName,
                    email: formData.email,
                    mobile: formData.mobile,
                    rights: formData.rights,
                    smsOpt: formData.smsOpt
                });

                setIsLogin(true);
                alert('Registration successful! Please login.');
                setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-3xl"></div>
                <div className="absolute top-[40%] right-[0%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-3xl"></div>
            </div>

            <div className="max-w-md w-full space-y-8 relative z-10 bg-white p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-gray-100">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {isLogin ? 'Sign in to your account' : 'Create your account'}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        {isLogin ? 'Welcome back! Please enter your details.' : 'Fill in the details below to get started.'}
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="rounded-md bg-red-50 p-4 border border-red-200">
                            <div className="flex">
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="username" className="sr-only">Username</label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition duration-300"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>

                            {!isLogin && (
                                <>
                                    <div>
                                        <label htmlFor="personName" className="sr-only">Person Name</label>
                                        <input
                                            id="personName"
                                            name="personName"
                                            type="text"
                                            required
                                            className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition duration-300"
                                            placeholder="Full Name"
                                            value={formData.personName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="sr-only">Email address</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition duration-300"
                                            placeholder="Email address"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="mobile" className="sr-only">Mobile Number</label>
                                        <input
                                            id="mobile"
                                            name="mobile"
                                            type="tel"
                                            className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition duration-300"
                                            placeholder="Mobile Number"
                                            value={formData.mobile}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="rights" className="sr-only">User Role</label>
                                        <select
                                            id="rights"
                                            name="rights"
                                            required
                                            className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition duration-300"
                                            value={formData.rights}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Role</option>
                                            <option value="Admin">Admin</option>
                                            <option value="Users">User</option>
                                            <option value="Managers">Manager</option>
                                        </select>
                                    </div>
                                </>
                            )}

                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition duration-300"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>

                            {!isLogin && (
                                <div>
                                    <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        required
                                        className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition duration-300"
                                        placeholder="Confirm Password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 shadow-lg"
                        >
                            {loading ? (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : null}
                            {isLogin ? 'Sign in' : 'Create Account'}
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setError('');
                                    setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
                                }}
                                className="font-medium text-secondary hover:text-orange-600 transition-colors duration-200"
                            >
                                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
