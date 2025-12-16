import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth';

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

        // Validate passwords match
        if (formData.newPassword !== formData.confirmPassword) {
            setMessage({ type: 'error', text: 'New passwords do not match' });
            return;
        }

        // Validate password strength (optional)
        if (formData.newPassword.length < 8) {
            setMessage({ type: 'error', text: 'Password must be at least 8 characters long' });
            return;
        }

        setLoading(true);

        try {
            await authApi.changePassword({
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword
            });

            setMessage({ 
                type: 'success', 
                text: 'Password updated successfully! Redirecting to dashboard...' 
            });
            
            // Clear form
            setFormData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });

            // Redirect after delay
            setTimeout(() => navigate('/dashboard'), 2000);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to update password';
            setMessage({ type: 'error', text: errorMessage });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-lg border border-gray-100 mt-10">
            <div className="bg-primary px-6 py-4">
                <h2 className="text-xl font-bold text-white">Change Password</h2>
            </div>
            <div className="p-6">
                {message.text && (
                    <div className={`mb-4 p-4 rounded-md ${
                        message.type === 'error' 
                            ? 'bg-red-50 text-red-700' 
                            : 'bg-green-50 text-green-700'
                    }`}>
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
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            required
                            minLength={8}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 border"
                            value={formData.newPassword}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            Password must be at least 8 characters long
                        </p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            minLength={8}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 border"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            disabled={loading}
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