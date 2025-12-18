import React, { useState, useEffect } from 'react';
import { masterApi } from '../api/master';
import toast from 'react-hot-toast';

interface Transporter {
    id: number;
    tnum?: string;
    tname: string;
    tadd?: string;
    tmob?: string;
    trem?: string;
}

const TransporterManagement: React.FC = () => {
    const [transporters, setTransporters] = useState<Transporter[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [showDialog, setShowDialog] = useState(false);
    const [editing, setEditing] = useState<Transporter | null>(null);
    const [formData, setFormData] = useState({ tnum: '', tname: '', tadd: '', tmob: '', trem: '' });

    useEffect(() => {
        loadData();
    }, [search]);

    const loadData = async () => {
        setLoading(true);
        try {
            const res = await masterApi.getTransporters(search, 1, 100);
            setTransporters(res?.data || []);
        } catch (err: any) {
            toast.error(err.message || 'Failed to load transporters');
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setEditing(null);
        setFormData({ tnum: '', tname: '', tadd: '', tmob: '', trem: '' });
        setShowDialog(true);
    };

    const handleEdit = (item: Transporter) => {
        setEditing(item);
        setFormData({ tnum: item.tnum || '', tname: item.tname, tadd: item.tadd || '', tmob: item.tmob || '', trem: item.trem || '' });
        setShowDialog(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editing) {
                await masterApi.updateTransporter(editing.id, formData);
                toast.success('Transporter updated successfully');
            } else {
                await masterApi.createTransporter(formData);
                toast.success('Transporter created successfully');
            }
            setShowDialog(false);
            loadData();
        } catch (err: any) {
            toast.error(err.message || 'Failed to save transporter');
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this transporter?')) return;
        try {
            await masterApi.deleteTransporter(id);
            toast.success('Transporter deleted successfully');
            loadData();
        } catch (err: any) {
            toast.error(err.message || 'Failed to delete transporter');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Transporter Management</h2>
                <button onClick={handleAdd} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-sky-600 transition-colors shadow-sm">
                    + Add Transporter
                </button>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <input
                        type="text"
                        className="block w-full max-w-md pl-3 pr-9 py-2 h-9 border border-gray-300 rounded-md bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                        placeholder="Search transporters..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading && <tr><td colSpan={5} className="text-center py-4">Loading...</td></tr>}
                            {!loading && transporters.length === 0 && <tr><td colSpan={5} className="text-center py-4 text-gray-500">No transporters found</td></tr>}
                            {!loading && transporters.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.tnum || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.tname}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{item.tadd || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.tmob || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleEdit(item)} className="text-indigo-600 hover:text-indigo-900 mr-4" title="Edit">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900" title="Delete">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">{editing ? 'Edit Transporter' : 'Add Transporter'}</h3>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Transporter Number</label>
                                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                                    value={formData.tnum} onChange={(e) => setFormData({ ...formData, tnum: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
                                <input type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                                    value={formData.tname} onChange={(e) => setFormData({ ...formData, tname: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                                    value={formData.tadd} onChange={(e) => setFormData({ ...formData, tadd: e.target.value })} rows={2} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                                    value={formData.tmob} onChange={(e) => setFormData({ ...formData, tmob: e.target.value })} maxLength={10} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                                    value={formData.trem} onChange={(e) => setFormData({ ...formData, trem: e.target.value })} rows={2} />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setShowDialog(false)} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-sky-600 transition-colors">{editing ? 'Update' : 'Create'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransporterManagement;
