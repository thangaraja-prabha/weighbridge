import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { wlogApi } from '../api/wlog';
import { masterApi } from '../api/master';
import Pagination from '../components/Pagination';
import Switch from 'react-switch';

type TabId = 'firstWeight' | 'secondWeight' | 'summary';

interface PaginationState {
    currentPage: number;
    totalPages: number;
    total: number;
    limit: number;
}

interface SuggestionsState {
    vehicles: any[];
    materials: any[];
    suppliers: any[];
    customers: any[];
}

interface FormData {
    mode: string;
    vid: string;
    vnumDisplay: string;
    transporterName: string;
    transporterAddress: string;
    transporterContact: string;
    mid: string;
    mnameDisplay: string;
    sid: string;
    snameDisplay: string;
    cid: string;
    cnameDisplay: string;
    driverName: string;
    firstWeight: string;
    firstWeightDate: string;
    firstWeightTime: string;
    remarks: string;
    showSupplier: boolean;
}

const Wlog: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabId>('firstWeight');
    const [liveWeight] = useState<string>('No Device');

    const [tableData, setTableData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [pagination, setPagination] = useState<PaginationState>({
        currentPage: 1,
        totalPages: 1,
        total: 0,
        limit: 10,
    });

    const [modes, setModes] = useState<any[]>([]);
    // const [materials, setMaterials] = useState<any[]>([]);
    // const [customers, setCustomers] = useState<any[]>([]);
    // const [suppliers, setSuppliers] = useState<any[]>([]);
    // const [transporters, setTransporters] = useState<any[]>([]);

    const [formData, setFormData] = useState<FormData>({
        mode: '',
        vid: '',
        vnumDisplay: '',
        transporterName: '',
        transporterAddress: '',
        transporterContact: '',
        mid: '',
        mnameDisplay: '',
        sid: '',
        snameDisplay: '',
        cid: '',
        cnameDisplay: '',
        driverName: '',
        firstWeight: '',
        firstWeightDate: new Date().toISOString().split('T')[0],
        firstWeightTime: new Date().toTimeString().slice(0, 5),
        remarks: '',
        showSupplier: false,
    });

    const [suggestions, setSuggestions] = useState<SuggestionsState>({
        vehicles: [],
        materials: [],
        suppliers: [],
        customers: [],
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const tabs: { id: TabId; label: string; icon: string }[] = [
        { id: 'firstWeight', label: 'First Weight', icon: '⚖️' },
        { id: 'secondWeight', label: 'Second Weight', icon: '🏋️' },
        { id: 'summary', label: 'Summary', icon: '📊' },
    ];

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
        if (activeTab === 'secondWeight') {
            loadTableData(1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);

    useEffect(() => {
        const fetchModes = async () => {
            try {
                const data = await masterApi.getModes();
                setModes(data);
            } catch (error) {
                console.error('Error loading modes:', error);
            }
        };
        fetchModes();
    }, []);

    const handleVehicleSearch = async (query: string) => {
        setFormData((prev) => ({ ...prev, vnumDisplay: query }));
        if (query.length > 1) {
            try {
                const results = await masterApi.searchTransporters(query);
                setSuggestions((prev) => ({ ...prev, vehicles: results }));
            } catch (error) {
                console.error('Error searching vehicles:', error);
            }
        } else {
            setSuggestions((prev) => ({ ...prev, vehicles: [] }));
        }
    };

    const handleMaterialSearch = async (query: string) => {
        setFormData((prev) => ({ ...prev, mnameDisplay: query }));
        if (query.length > 1) {
            try {
                const response = await masterApi.getMaterials(query, 1, 10);
                setSuggestions((prev) => ({ ...prev, materials: response.data }));
            } catch (error) {
                console.error('Error searching materials:', error);
            }
        } else {
            setSuggestions((prev) => ({ ...prev, materials: [] }));
        }
    };

    const handleSupplierSearch = async (query: string) => {
        setFormData((prev) => ({ ...prev, snameDisplay: query }));
        if (query.length > 1) {
            try {
                const response = await masterApi.getSuppliers(query, 1, 10);
                setSuggestions((prev) => ({ ...prev, suppliers: response.data }));
            } catch (error) {
                console.error('Error searching suppliers:', error);
            }
        } else {
            setSuggestions((prev) => ({ ...prev, suppliers: [] }));
        }
    };

    const handleCustomerSearch = async (query: string) => {
        setFormData((prev) => ({ ...prev, cnameDisplay: query }));
        if (query.length > 1) {
            try {
                const response = await masterApi.getCustomers(query, 1, 10);
                setSuggestions((prev) => ({ ...prev, customers: response.data }));
            } catch (error) {
                console.error('Error searching customers:', error);
            }
        } else {
            setSuggestions((prev) => ({ ...prev, customers: [] }));
        }
    };

    const selectMaterial = (item: any) => {
        setFormData((prev) => ({ ...prev, mid: item.id, mnameDisplay: item.mname }));
        setSuggestions((prev) => ({ ...prev, materials: [] }));
    };

    const selectSupplier = (item: any) => {
        setFormData((prev) => ({ ...prev, sid: item.id, snameDisplay: item.sname }));
        setSuggestions((prev) => ({ ...prev, suppliers: [] }));
    };

    const selectCustomer = (item: any) => {
        setFormData((prev) => ({ ...prev, cid: item.id, cnameDisplay: item.cname }));
        setSuggestions((prev) => ({ ...prev, customers: [] }));
    };

    const selectVehicle = (vehicle: any) => {
        setFormData((prev) => ({
            ...prev,
            vid: vehicle.id,
            vnumDisplay: vehicle.tnum || vehicle.tname,
            transporterName: vehicle.tname || '',
            transporterAddress: vehicle.tadd || '',
            transporterContact: vehicle.tmob || '',
        }));
        setSuggestions((prev) => ({ ...prev, vehicles: [] }));
    };

    const handleFirstWeightSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (!formData.vid || !formData.mid || !formData.mode) {
                toast.error('Please fill in all required fields (Vehicle, Material, Mode)');
                setIsSubmitting(false);
                return;
            }

            const liveWeightVal = parseFloat(liveWeight.replace(' kg', '')) || 0;
            const manualFirstWeight = parseFloat(formData.firstWeight);

            const payload = {
                vid: parseInt(formData.vid, 10),
                mid: parseInt(formData.mid, 10),
                mode: parseInt(formData.mode, 10),
                sid: formData.sid ? parseInt(formData.sid, 10) : undefined,
                cid: formData.cid ? parseInt(formData.cid, 10) : undefined,
                fwt: !isNaN(manualFirstWeight) && manualFirstWeight > 0 ? manualFirstWeight : liveWeightVal,
                driver: formData.driverName,
                remarks: formData.remarks,
                fwtdt: `${formData.firstWeightDate} ${formData.firstWeightTime}`,
            };

            await wlogApi.createWlogEntry(payload);
            toast.success('First weight entry created successfully!');

            setFormData({
                mode: '',
                vid: '',
                vnumDisplay: '',
                transporterName: '',
                transporterAddress: '',
                transporterContact: '',
                mid: '',
                mnameDisplay: '',
                sid: '',
                snameDisplay: '',
                cid: '',
                cnameDisplay: '',
                driverName: '',
                firstWeight: '',
                firstWeightDate: new Date().toISOString().split('T')[0],
                firstWeightTime: new Date().toTimeString().slice(0, 5),
                remarks: '',
                showSupplier: false,
            });
            //setActiveTab('secondWeight');
        } catch (error) {
            console.error('Error submitting first weight:', error);
            toast.error('Failed to submit weight entry');
        } finally {
            setIsSubmitting(false);
        }
    };

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
        console.log('Edit weight entry:', entry);
        alert('Edit functionality will be implemented soon');
    };

    const handleAddNew = () => {
        console.log('Add new weight entry');
        alert('Add functionality will be implemented soon');
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'firstWeight':
                return (
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-6 text-gray-800">First Weight Entry</h3>
                            <form onSubmit={handleFirstWeightSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Mode</label>
                                        <div className="grid grid-cols-2 gap-4 mt-1">
                                            {modes.map((m: any) => (
                                                <label key={m.id} className="flex items-center space-x-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="mode"
                                                        value={m.id}
                                                        checked={formData.mode === m.id.toString()}
                                                        onChange={() =>
                                                            setFormData((prev) => ({ ...prev, mode: m.id.toString() }))
                                                        }
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                        required
                                                    />
                                                    <span className="text-gray-700">{m.mode}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-end">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                                        <div className="flex items-center justify-between w-full max-w-xs">
                                            <span className="text-sm font-medium text-gray-700 mr-0">Customer</span>
                                            <Switch
                                                onChange={(checked: boolean) =>
                                                    setFormData((prev) => ({ ...prev, showSupplier: checked }))
                                                }
                                                checked={formData.showSupplier}
                                                onColor="#3B82F6"
                                                offColor="#00ff00"
                                                checkedIcon={false}
                                                uncheckedIcon={false}
                                                height={20}
                                                width={40}
                                                handleDiameter={18}
                                                className="react-switch mx-1"
                                            />
                                            <span className="text-sm font-medium text-grey-700 ml-2">Supplier</span>
                                        </div>
                                    </div>
                                </div>

                                {!formData.showSupplier ? (
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Customer
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Search customer..."
                                            value={formData.cnameDisplay}
                                            onChange={(e) => handleCustomerSearch(e.target.value)}
                                        />
                                        {suggestions.customers.length > 0 && !formData.showSupplier && (
                                            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto mt-1">
                                                {suggestions.customers.map((c: any) => (
                                                    <li
                                                        key={c.id}
                                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                        onClick={() => selectCustomer(c)}
                                                    >
                                                        {c.cname}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Supplier
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Search supplier..."
                                            value={formData.snameDisplay}
                                            onChange={(e) => handleSupplierSearch(e.target.value)}
                                        />
                                        {suggestions.suppliers.length > 0 && formData.showSupplier && (
                                            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto mt-1">
                                                {suggestions.suppliers.map((s: any) => (
                                                    <li
                                                        key={s.id}
                                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                        onClick={() => selectSupplier(s)}
                                                    >
                                                        {s.sname}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="relative col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Vehicle Number
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Search vehicle..."
                                            value={formData.vnumDisplay}
                                            onChange={(e) => handleVehicleSearch(e.target.value)}
                                            required
                                        />
                                        {suggestions.vehicles.length > 0 && (
                                            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto mt-1">
                                                {suggestions.vehicles.map((v: any) => (
                                                    <li
                                                        key={v.id}
                                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                        onClick={() => selectVehicle(v)}
                                                    >
                                                        {v.tnum} - {v.tname}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                    <div className="relative col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Transporter Name
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Transporter name"
                                            value={formData.transporterName || ''}
                                            readOnly
                                        />
                                    </div>

                                    <div className="relative col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Transporter Address
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Transporter address"
                                            value={formData.transporterAddress || ''}
                                            readOnly
                                        />
                                    </div>

                                    <div className="relative col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Transporter Contact
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Transporter contact"
                                            value={formData.transporterContact || ''}
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Material
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Search material..."
                                        value={formData.mnameDisplay}
                                        onChange={(e) => handleMaterialSearch(e.target.value)}
                                        required
                                    />
                                    {suggestions.materials.length > 0 && (
                                        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto mt-1">
                                            {suggestions.materials.map((m: any) => (
                                                <li
                                                    key={m.id}
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => selectMaterial(m)}
                                                >
                                                    {m.mname}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            First Weight (kg)
                                        </label>
                                        <input
                                            type="number"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter weight"
                                            value={formData.firstWeight || ''}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    firstWeight: e.target.value,
                                                }))
                                            }
                                            required
                                            step="0.01"
                                            min="0"
                                        />
                                    </div>

                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            First Weight Date
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            value={formData.firstWeightDate || ''}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    firstWeightDate: e.target.value,
                                                }))
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            First Weight Time
                                        </label>
                                        <input
                                            type="time"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            value={formData.firstWeightTime || ''}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    firstWeightTime: e.target.value,
                                                }))
                                            }
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="col-span-1 md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Remarks
                                    </label>
                                    <textarea
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
                                        placeholder="Enter any remarks here..."
                                        value={formData.remarks || ''}
                                        onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, remarks: e.target.value }))
                                        }
                                    />
                                </div>

                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Saving...' : 'Save First Weight'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                );

            case 'secondWeight':
                return (
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">
                                Weight Log Entries
                            </h3>

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
                                <button
                                    onClick={handleAddNew}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Add New Entry
                                </button>
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
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
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
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.driver || '-'}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.fwt ? `${item.fwt} kg` : '-'}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.fwtdt || '-'}</td>
                                                            <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={item.remarks}>{item.remarks || '-'}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                <button
                                                                    onClick={() => handleEdit(item)}
                                                                    className="text-blue-600 hover:text-blue-900 mr-3"
                                                                >
                                                                    Edit
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
                    </div>
                );

            case 'summary':
                return (
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">
                                Summary Settings
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Report Format
                                    </label>
                                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                        <option>Standard</option>
                                        <option>Detailed</option>
                                        <option>Compact</option>
                                        <option>Custom</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Date Format
                                    </label>
                                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                        <option>DD/MM/YYYY</option>
                                        <option>MM/DD/YYYY</option>
                                        <option>YYYY-MM-DD</option>
                                        <option>Custom</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Decimal Places
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="4"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Number of decimal places"
                                        defaultValue={2}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Time Zone
                                    </label>
                                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                        <option>UTC</option>
                                        <option>Local Time</option>
                                        <option>GMT+5:30</option>
                                        <option>GMT-5:00</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Display Options
                                </label>
                                <div className="space-y-3">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="mr-2 rounded text-blue-600"
                                            defaultChecked
                                        />
                                        <span className="text-sm text-gray-700">
                                            Show vehicle information
                                        </span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="mr-2 rounded text-blue-600"
                                            defaultChecked
                                        />
                                        <span className="text-sm text-gray-700">
                                            Show weight calculations
                                        </span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="mr-2 rounded text-blue-600"
                                            defaultChecked
                                        />
                                        <span className="text-sm text-gray-700">
                                            Include timestamp on all entries
                                        </span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2 rounded text-blue-600" />
                                        <span className="text-sm text-gray-700">Enable export to PDF</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2 rounded text-blue-600" />
                                        <span className="text-sm text-gray-700">
                                            Include charts in summary
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <Toaster position="top-right" />
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Weight Log</h1>

                <div className="mb-6 bg-black overflow-hidden shadow-2xl rounded-xl border border-gray-800">
                    <div className="px-4 py-5 sm:p-6 text-center">
                        <h1 className="text-lg leading-6 font-medium text-green-400 uppercase tracking-widest font-orbitron">
                            Live Weight
                        </h1>
                        <div
                            className="mt-2 text-9xl font-bold text-green-400 font-orbitron"
                            style={{ textShadow: '0 0 10px #00ff00, 0 0 20px #00ff00' }}
                        >
                            {liveWeight}
                            <span className="text-4xl ml-4 text-green-300">kg</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600 bg-blue-50'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <span className="mr-2 text-lg">{tab.icon}</span>
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                <div className="transition-all duration-300 ease-in-out">{renderTabContent()}</div>


            </div>
        </div>
    );
};

export default Wlog;
