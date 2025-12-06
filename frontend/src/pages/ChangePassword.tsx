import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChangePassword: React.FC = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        if (formData.newPassword !== formData.confirmPassword) {
            setMessage({ type: 'error', text: 'New passwords do not match' });
            return;
        }

        setLoading(true);
        // Simulate API call - In real app, call backend endpoint
        setTimeout(() => {
            setLoading(false);
            setMessage({ type: 'success', text: 'Password updated successfully!' });
            setTimeout(() => navigate('/dashboard'), 2000);
        }, 1500);
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-lg border border-gray-100 mt-10">
            <div className="bg-primary px-6 py-4">
                <h2 className="text-xl font-bold text-white">Change Password</h2>
            </div>
            <div className="p-6">
                {message.text && (
                    <div className={`mb-4 p-4 rounded-md ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                        {message.text}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Current Password</label>
                        <input
                            type="password"
                            name="currentPassword"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 border"
                            value={formData.currentPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 border"
                            value={formData.newPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 border"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:bg-gray-400"
                        >
                            {loading ? 'Updating...' : 'Update Password'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
