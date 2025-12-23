import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { wlogApi } from '../../api/wlog';
import { masterApi } from '../../api/master';
import Pagination from '../../components/Pagination';
import { EditFormData, EditFirstWeightFormData, PaginationState } from './types';

interface SecondWeightProps {
    modes: any[];
    liveWeight: string;
}

const SecondWeight: React.FC<SecondWeightProps> = ({ modes, liveWeight }) => {
    const [tableData, setTableData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [pagination, setPagination] = useState<PaginationState>({
        currentPage: 1,
        totalPages: 1,
        total: 0,
        limit: 10,
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editFormData, setEditFormData] = useState<EditFormData | null>(null);
    const [isEditingFirstWeight, setIsEditingFirstWeight] = useState(false);
    const [editFirstWeightFormData, setEditFirstWeightFormData] = useState<EditFirstWeightFormData | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const loadTableData = async (page: number = pagination.currentPage) => {
        setLoading(true);
        try {
            const response = await wlogApi.getWlogEntries(page, pagination.limit, searchQuery);
            setTableData(response?.data || []);
            setPagination((prev) => ({
                ...prev,
                currentPage: page,
                totalPages: Math.ceil((response?.total || 0) / pagination.limit),
                total: response?.total || 0,
            }));
        } catch (error) {
            console.error('Error loading table data:', error);
            setTableData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTableData(1);
    }, []);

    const handleSearch = () => {
        setPagination((prev) => ({ ...prev, currentPage: 1 }));
        loadTableData(1);
    };

    const handlePageChange = (page: number) => {
        loadTableData(page);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this weight entry?')) return;
        try {
            await wlogApi.deleteWlogEntry(id);
            loadTableData(pagination.currentPage);
        } catch (error: any) {
            console.error('Error deleting weight entry:', error);
            alert('Failed to delete weight entry');
        }
    };

    const handleEdit = (entry: any) => {
        setIsEditing(true);
        setIsEditingFirstWeight(false);
        const now = new Date();
        const currentDateTime = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);

        const isSupplier = !!entry.sid || (!!entry.sname && !entry.cname);

        setEditFormData({
            id: entry.id,
            mode: entry.mode ? entry.mode.toString() : '',
            vid: entry.vid ? entry.vid.toString() : '',
            vnumDisplay: entry.vnum || '',
            tid: entry.tid ? entry.tid.toString() : '',
            transporterName: entry.tname || '',
            transporterAddress: entry.tadd || 'N/A',
            transporterContact: entry.tmob || 'N/A',
            mid: entry.mid ? entry.mid.toString() : '',
            mnameDisplay: entry.mname || '',
            sid: entry.sid ? entry.sid.toString() : '',
            snameDisplay: entry.sname || '',
            cid: entry.cid ? entry.cid.toString() : '',
            cnameDisplay: entry.cname || '',

            firstWeight: entry.fwt ? entry.fwt.toString() : '',
            firstWeightDateTime: entry.fwtdt ? `${entry.fwtdt.split(' ')[0]}T${entry.fwtdt.split(' ')[1]}` : '',
            remarks: entry.remarks,
            showSupplier: isSupplier,
            secondWeight: '',
            secondWeightDateTime: currentDateTime,
            netWeight: ''
        });
    };

    const handleEditFirstWeight = () => {
        if (!editFormData) return;
        setEditFirstWeightFormData({
            ...editFormData,
            id: editFormData.id,
            mode: editFormData.mode,
            vid: editFormData.vid,
            vnumDisplay: editFormData.vnumDisplay,
            tid: editFormData.tid,
            transporterName: editFormData.transporterName,
            transporterAddress: editFormData.transporterAddress,
            transporterContact: editFormData.transporterContact,
            mid: editFormData.mid,
            mnameDisplay: editFormData.mnameDisplay,
            sid: editFormData.sid,
            snameDisplay: editFormData.snameDisplay,
            cid: editFormData.cid,
            cnameDisplay: editFormData.cnameDisplay,
            firstWeight: editFormData.firstWeight,
            firstWeightDateTime: editFormData.firstWeightDateTime,
            remarks: editFormData.remarks,
            showSupplier: editFormData.showSupplier
        });
        setIsEditingFirstWeight(true);
    };

    const handleFirstWeightUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editFirstWeightFormData) return;

        // Validation
        if (!editFirstWeightFormData.vid || !editFirstWeightFormData.mid || !editFirstWeightFormData.mode) {
            toast.error('Please select valid Vehicle, Material, and Mode');
            return;
        }

        setIsSubmitting(true);
        try {
            const fwt = parseFloat(editFirstWeightFormData.firstWeight || '0');
            const fwtdt = editFirstWeightFormData.firstWeightDateTime.replace('T', ' ');

            const payload = {
                fwt: fwt,
                fwtdt: fwtdt,
                vid: parseInt(editFirstWeightFormData.vid, 10),
                mid: parseInt(editFirstWeightFormData.mid, 10),
                tid: editFirstWeightFormData.tid ? parseInt(editFirstWeightFormData.tid, 10) : undefined,
                sid: editFirstWeightFormData.sid ? parseInt(editFirstWeightFormData.sid, 10) : undefined,
                cid: editFirstWeightFormData.cid ? parseInt(editFirstWeightFormData.cid, 10) : undefined,
                mode: parseInt(editFirstWeightFormData.mode, 10),
                remarks: editFirstWeightFormData.remarks,
            };

            await wlogApi.updateWlogEntry(editFirstWeightFormData.id, payload);
            toast.success('First weight updated successfully!');
            setIsEditingFirstWeight(false);

            setEditFormData((prev) => prev ? ({
                ...prev,
                firstWeight: editFirstWeightFormData.firstWeight,
                firstWeightDateTime: editFirstWeightFormData.firstWeightDateTime,
                vnumDisplay: editFirstWeightFormData.vnumDisplay,
                mnameDisplay: editFirstWeightFormData.mnameDisplay,
                transporterName: editFirstWeightFormData.transporterName,
                snameDisplay: editFirstWeightFormData.snameDisplay,
                cnameDisplay: editFirstWeightFormData.cnameDisplay,
                mode: editFirstWeightFormData.mode,
                vid: editFirstWeightFormData.vid,
                mid: editFirstWeightFormData.mid,
                tid: editFirstWeightFormData.tid,
                sid: editFirstWeightFormData.sid,
                cid: editFirstWeightFormData.cid,
                remarks: editFirstWeightFormData.remarks,
                showSupplier: editFirstWeightFormData.showSupplier
            }) : null);

            loadTableData(pagination.currentPage);

        } catch (error) {
            console.error('Error updating first weight:', error);
            toast.error('Failed to update first weight');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSecondWeightCapture = () => {
        if (editFormData) {
            const now = new Date();
            const currentDateTime = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);

            setEditFormData({
                ...editFormData,
                secondWeight: liveWeight,
                secondWeightDateTime: currentDateTime
            });
        }
    };

    const handleSecondWeightSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editFormData) return;

        setIsSubmitting(true);
        try {
            const lwt = parseFloat(editFormData.secondWeight || '0');
            const lwtdt = editFormData.secondWeightDateTime.replace('T', ' ');

            const payload = {
                lwt: lwt,
                lwtdt: lwtdt,
                remarks: editFormData.remarks,
            };

            await wlogApi.updateWlogEntry(editFormData.id, payload);
            toast.success('Second weight saved successfully!');
            setIsEditing(false);
            setEditFormData(null);
            loadTableData(pagination.currentPage);
        } catch (error) {
            console.error('Error saving second weight:', error);
            toast.error('Failed to save second weight');
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderEditForm = () => {
        if (!editFormData) return null;

        const fwt = parseFloat(editFormData.firstWeight || '0');
        const lwt = parseFloat(editFormData.secondWeight || '0');
        const net = lwt ? Math.abs(fwt - lwt).toFixed(2) : '-';

        return (
            <div className="bg-white rounded-lg shadow-md p-6">
                {isEditingFirstWeight ? (
                    <div className="mb-6">
                        {/* <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-gray-800">Edit First Weight Entry</h3>
                            <button
                                onClick={() => setIsEditingFirstWeight(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                Cancel
                            </button>
                        </div> */}
                        <form onSubmit={handleFirstWeightUpdate} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="col-span-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Mode <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex space-x-4">
                                        {modes.map((m: any) => (
                                            <label key={m.id} className="inline-flex items-center">
                                                <input
                                                    type="radio"
                                                    className="form-radio text-blue-600"
                                                    name="editMode"
                                                    value={m.id.toString()}
                                                    checked={editFirstWeightFormData?.mode === m.id.toString()}
                                                    onChange={(e) => setEditFirstWeightFormData(prev => prev ? ({ ...prev, mode: e.target.value }) : null)}
                                                />
                                                <span className="ml-2">{m.mode}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col justify-end">
                                    <div className="flex space-x-4 bg-gray-100 p-1 rounded-lg w-fit">
                                        <button
                                            type="button"
                                            className={`px-4 py-2 rounded-md transition-all ${!editFirstWeightFormData?.showSupplier
                                                ? 'bg-white shadow text-blue-600 font-medium'
                                                : 'text-gray-500 hover:text-gray-700'
                                                }`}
                                            onClick={() => setEditFirstWeightFormData(prev => prev ? ({ ...prev, showSupplier: false }) : null)}
                                        >
                                            Customer
                                        </button>
                                        <button
                                            type="button"
                                            className={`px-4 py-2 rounded-md transition-all ${editFirstWeightFormData?.showSupplier
                                                ? 'bg-white shadow text-blue-600 font-medium'
                                                : 'text-gray-500 hover:text-gray-700'
                                                }`}
                                            onClick={() => setEditFirstWeightFormData(prev => prev ? ({ ...prev, showSupplier: true }) : null)}
                                        >
                                            Supplier
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {editFirstWeightFormData?.showSupplier ? 'Supplier' : 'Customer'}
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={editFirstWeightFormData?.showSupplier ? editFirstWeightFormData?.snameDisplay : editFirstWeightFormData?.cnameDisplay}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setEditFirstWeightFormData(prev => prev ? ({
                                            ...prev,
                                            [prev.showSupplier ? 'snameDisplay' : 'cnameDisplay']: val,
                                            [prev.showSupplier ? 'sid' : 'cid']: ''
                                        }) : null);
                                    }}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="relative col-span-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Number</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        value={editFirstWeightFormData?.vnumDisplay}
                                        onChange={(e) => setEditFirstWeightFormData(prev => prev ? ({ ...prev, vnumDisplay: e.target.value, vid: '' }) : null)}
                                    />
                                </div>
                                <div className="relative col-span-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        value={editFirstWeightFormData?.mnameDisplay}
                                        onChange={(e) => setEditFirstWeightFormData(prev => prev ? ({ ...prev, mnameDisplay: e.target.value, mid: '' }) : null)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">First Weight (kg)</label>
                                    <input
                                        type="number"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-lg"
                                        value={editFirstWeightFormData?.firstWeight}
                                        onChange={(e) => setEditFirstWeightFormData(prev => prev ? ({ ...prev, firstWeight: e.target.value }) : null)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Date & Time</label>
                                    <input
                                        type="datetime-local"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        value={editFirstWeightFormData?.firstWeightDateTime}
                                        onChange={(e) => setEditFirstWeightFormData(prev => prev ? ({ ...prev, firstWeightDateTime: e.target.value }) : null)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
                                <textarea
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    rows={3}
                                    value={editFirstWeightFormData?.remarks || ''}
                                    onChange={(e) => setEditFirstWeightFormData(prev => prev ? ({ ...prev, remarks: e.target.value }) : null)}
                                />
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsEditingFirstWeight(false)}
                                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Saving...' : 'Save First Weight'}
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-gray-800">Second Weight Entry</h3>
                            {/* <button
                                type="button"
                                onClick={handleEditFirstWeight}
                                className="text-blue-600 hover:text-blue-800 flex items-center gap-2 text-sm font-medium"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit First Weight
                            </button> */}
                        </div>

                        <form onSubmit={handleSecondWeightSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="col-span-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Mode</label>
                                    <div className="px-3 py-2 bg-gray-50 rounded border border-gray-200 text-gray-700 font-medium">
                                        {modes.find(m => m.id.toString() === editFormData.mode)?.mode || 'Unknown'}
                                    </div>
                                </div>
                                <div className="flex flex-col justify-end">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                                    <div className="px-3 py-2 bg-gray-50 rounded border border-gray-200 text-gray-700 font-medium">
                                        {editFormData.showSupplier ? 'Supplier' : 'Customer'}
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {editFormData.showSupplier ? 'Supplier' : 'Customer'}
                                </label>
                                <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 min-h-[42px]">
                                    {(editFormData.showSupplier ? editFormData.snameDisplay : editFormData.cnameDisplay) || 'N/A'}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="relative col-span-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Number</label>
                                    <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700">
                                        {editFormData.vnumDisplay}
                                    </div>
                                </div>
                                <div className="relative col-span-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Transporter Name</label>
                                    <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700">
                                        {editFormData.transporterName || 'N/A'}
                                    </div>
                                </div>
                                <div className="relative col-span-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Transporter Address</label>
                                    <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700">
                                        {editFormData.transporterAddress || 'N/A'}
                                    </div>
                                </div>
                                <div className="relative col-span-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Transporter Contact</label>
                                    <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700">
                                        {editFormData.transporterContact || 'N/A'}
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
                                <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700">
                                    {editFormData.mnameDisplay}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <h4 className="font-semibold text-gray-700 border-b pb-2">First Weight</h4>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                                        <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600">
                                            {editFormData.firstWeight}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                                        <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600">
                                            {editFormData.firstWeightDateTime ?
                                                `${editFormData.firstWeightDateTime.split('T')[0]} ${editFormData.firstWeightDateTime.split('T')[1]}` :
                                                'N/A'}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200 shadow-sm relative">
                                    <h4 className="font-semibold text-blue-800 border-b border-blue-200 pb-2">Second Weight</h4>
                                    <div>
                                        <label className="block text-sm font-medium text-blue-800 mb-1">Weight (kg)</label>
                                        <div className="flex space-x-2">
                                            <input
                                                type="number"
                                                className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                value={editFormData.secondWeight}
                                                onChange={(e) => setEditFormData({ ...editFormData, secondWeight: e.target.value })}
                                                required
                                                step="0.01"
                                                placeholder="Enter second weight"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleSecondWeightCapture}
                                                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                                            >
                                                Capture
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-blue-800 mb-1">Date & Time</label>
                                        <input
                                            type="datetime-local"
                                            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            value={editFormData.secondWeightDateTime}
                                            onChange={(e) => setEditFormData({ ...editFormData, secondWeightDateTime: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col justify-center items-center">
                                    <h4 className="font-semibold text-gray-700 border-b pb-2 w-full text-center">Net Weight</h4>
                                    <div className="flex-1 flex items-center justify-center">
                                        <span className="text-4xl font-bold text-gray-800">
                                            {net} kg
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
                                <textarea
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
                                    value={editFormData.remarks || ''}
                                    onChange={(e) => setEditFormData({ ...editFormData, remarks: e.target.value })}
                                />
                            </div>

                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Saving...' : 'Save Second Weight'}
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    Weight Log Entries
                </h3>
                {isEditing ? renderEditForm() : (
                    <div>
                        <div className="mb-4 flex justify-between items-center">
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    placeholder="Search entries..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button
                                    onClick={handleSearch}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Search
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            {loading ? (
                                <div className="text-center py-8">
                                    <div className="text-gray-500">Loading...</div>
                                </div>
                            ) : tableData.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="text-gray-500 text-lg">No data found</div>
                                    <div className="text-gray-400 text-sm mt-2">
                                        No vehicle entries available in the database
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mode</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer / Supplier</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transporter</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Weight</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">F.Wt Date</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {tableData.map((item) => {
                                                const modeName = modes.find(m => m.id === item.mode)?.mode || item.mode;
                                                return (
                                                    <tr key={item.id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{modeName || '-'}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.vnum || '-'}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.mname || '-'}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.cname}  {item.sname}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.tname || '-'}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.fwt ? `${item.fwt} kg` : '-'}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.fwtdt || '-'}</td>
                                                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={item.remarks}>{item.remarks || '-'}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                            <button
                                                                onClick={() => handleEdit(item)}
                                                                className="text-blue-600 hover:text-blue-900 mr-3"
                                                            >
                                                                Add Second Weight
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(item.id)}
                                                                className="text-red-600 hover:text-red-900"
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                    <Pagination
                                        currentPage={pagination.currentPage}
                                        totalPages={pagination.totalPages}
                                        total={pagination.total}
                                        limit={pagination.limit}
                                        onPageChange={handlePageChange}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SecondWeight;
