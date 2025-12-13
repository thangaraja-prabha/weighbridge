import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth';
import { toast, Toaster } from 'react-hot-toast';

// Registration page – modern, responsive, Tailwind‑styled
const Register: React.FC = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        password: '',
        personName: '',
        email: '',
        mobile: '',
        rid: 1,
        pid: 1,
        comname: '',
        comadd: '',
        comnum: '',
        comail: '',

    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]:
                name === 'rid' || name === 'pid' || name === 'companyid'
                    ? Number(value)
                    : value,
        }));
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await authApi.register(form);
            toast.success('Registration successful!');
            // after successful registration, go to login page
            navigate('/login');
        } catch (err: any) {
            const msg = err.message || 'Registration failed';
            toast.error(msg);
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Toaster />
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
                <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-lg">
                    <h2 className="mb-6 text-2xl font-bold text-center text-primary">Create an Account</h2>
                    {error && (
                        <div className="mb-4 rounded bg-red-100 p-2 text-red-700">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Username */}
                        <input
                            name="username"
                            type="text"
                            placeholder="Username"
                            required
                            value={form.username}
                            onChange={handleChange}
                            className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        {/* Password */}
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            required
                            value={form.password}
                            onChange={handleChange}
                            className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        {/* Full Name */}
                        <input
                            name="personName"
                            type="text"
                            placeholder="Full Name"
                            required
                            value={form.personName}
                            onChange={handleChange}
                            className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        {/* Email */}
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        {/* Mobile */}
                        <input
                            name="mobile"
                            type="tel"
                            required
                            placeholder="Mobile"
                            value={form.mobile}
                            onChange={handleChange}
                            className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />

                        <input
                            name="comname"
                            type="text"
                            required
                            placeholder="Company Name *"
                            value={form.comname}
                            onChange={handleChange}
                            className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <textarea
                            name="comadd"
                            placeholder="Company Addres *"
                            value={form.comadd}
                            onChange={handleChange}
                            className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                            rows={3}
                        ></textarea>
                        <input
                            name="comnum"
                            type="text"
                            placeholder="Company Phone (optional)"
                            value={form.comnum}
                            onChange={handleChange}
                            className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <input
                            name="comail"
                            type="email"
                            placeholder="Company Email (optional)"
                            value={form.comail}
                            onChange={handleChange}
                            className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded bg-primary py-2 font-semibold text-white hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            {loading ? 'Creating…' : 'Register'}
                        </button>
                    </form>
                    <p className="mt-4 text-center text-sm">
                        Already have an account?{' '}
                        <span
                            className="cursor-pointer font-medium text-primary hover:underline"
                            onClick={() => navigate('/login')}
                        >
                            Log in
                        </span>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Register;
