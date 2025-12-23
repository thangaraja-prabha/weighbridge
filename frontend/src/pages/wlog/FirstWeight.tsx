import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Switch from 'react-switch';
import { wlogApi } from '../../api/wlog';
import { masterApi } from '../../api/master';
import { FormData, SuggestionsState } from './types';

interface FirstWeightProps {
    modes: any[];
    liveWeight: string;
    onEntryCreated: () => void;
}

const FirstWeight: React.FC<FirstWeightProps> = ({ modes, liveWeight, onEntryCreated }) => {
    const [formData, setFormData] = useState<FormData>({
        mode: '',
        vid: '',
        vnumDisplay: '',
        tid: '',
        transporterName: '',
        transporterAddress: '',
        transporterContact: '',
        mid: '',
        mnameDisplay: '',
        sid: '',
        snameDisplay: '',
        cid: '',
        cnameDisplay: '',
        firstWeight: '',
        firstWeightDateTime: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 16),
        remarks: '',
        showSupplier: false,
    });

    const [suggestions, setSuggestions] = useState<SuggestionsState>({
        vehicles: [],
        materials: [],
        suppliers: [],
        transporters: [],
        customers: [],
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Set default mode if not set
        if (!formData.mode && modes.length > 0) {
            const internalMode = modes.find((m: any) => m.mode.toLowerCase() === 'internal');
            if (internalMode) {
                setFormData(prev => ({ ...prev, mode: internalMode.id.toString() }));
            }
        }
    }, [modes, formData.mode]);

    const handleVehicleSearch = async (query: string) => {
        setFormData((prev) => ({ ...prev, vnumDisplay: query, vid: '' }));
        if (query.length > 0) {
            try {
                const results = await masterApi.searchVehicles(query);
                setSuggestions((prev) => ({ ...prev, vehicles: results }));
            } catch (error) {
                console.error('Error searching vehicles:', error);
            }
        } else {
            setSuggestions((prev) => ({ ...prev, vehicles: [] }));
        }
    };

    const handleTransporterSearch = async (query: string) => {
        setFormData((prev) => ({ ...prev, transporterName: query, tid: '' }));
        if (query.length > 0) {
            try {
                const results = await masterApi.searchTransporters(query);
                setSuggestions((prev) => ({ ...prev, transporters: results }));
            } catch (error) {
                console.error('Error searching transporters:', error);
            }
        } else {
            setSuggestions((prev) => ({ ...prev, transporters: [] }));
        }
    };

    const handleMaterialSearch = async (query: string) => {
        setFormData((prev) => ({ ...prev, mnameDisplay: query, mid: '' }));
        if (query.length > 0) {
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
        setFormData((prev) => ({ ...prev, snameDisplay: query, sid: '' }));
        if (query.length > 0) {
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
        setFormData((prev) => ({ ...prev, cnameDisplay: query, cid: '' }));
        if (query.length > 0) {
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
        setFormData((prev) => ({ ...prev, mid: item.id.toString(), mnameDisplay: item.mname }));
        setSuggestions((prev) => ({ ...prev, materials: [] }));
    };

    const selectSupplier = (item: any) => {
        setFormData((prev) => ({ ...prev, sid: item.id.toString(), snameDisplay: item.sname }));
        setSuggestions((prev) => ({ ...prev, suppliers: [] }));
    };

    const selectCustomer = (item: any) => {
        setFormData((prev) => ({ ...prev, cid: item.id.toString(), cnameDisplay: item.cname }));
        setSuggestions((prev) => ({ ...prev, customers: [] }));
    };

    const selectVehicle = (vehicle: any) => {
        setFormData((prev) => ({
            ...prev,
            vid: vehicle.id.toString(),
            vnumDisplay: vehicle.vnum,
        }));
        setSuggestions((prev) => ({ ...prev, vehicles: [] }));
    };

    const selectTransporter = (transporter: any) => {
        setFormData((prev) => ({
            ...prev,
            tid: transporter.id.toString(),
            transporterName: transporter.tname,
            transporterAddress: transporter.tadd || '',
            transporterContact: transporter.tmob || '',
        }));
        setSuggestions((prev) => ({ ...prev, transporters: [] }));
    };

    const handleFirstWeightCapture = () => {
        const now = new Date();
        const currentDateTime = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);

        setFormData((prev) => ({
            ...prev,
            firstWeight: liveWeight,
            firstWeightDateTime: currentDateTime
        }));
    };

    const handleFirstWeightSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (!formData.vid || !formData.mid || !formData.mode) {
                toast.error('Please select valid Vehicle and Material from the suggestions list');
                setIsSubmitting(false);
                return;
            }

            const manualFirstWeight = parseFloat(formData.firstWeight);

            const payload = {
                vid: parseInt(formData.vid, 10),
                mid: parseInt(formData.mid, 10),
                mode: parseInt(formData.mode, 10),
                tid: formData.tid ? parseInt(formData.tid, 10) : undefined,
                sid: formData.sid ? parseInt(formData.sid, 10) : undefined,
                cid: formData.cid ? parseInt(formData.cid, 10) : undefined,
                fwt: !isNaN(manualFirstWeight) && manualFirstWeight > 0 ? manualFirstWeight : 0,
                remarks: formData.remarks,
                fwtdt: formData.firstWeightDateTime.replace('T', ' '),
            };

            await wlogApi.createWlogEntry(payload);
            toast.success('First weight entry created successfully!');
            onEntryCreated();

            setFormData({
                mode: formData.mode, // Keep mode
                vid: '',
                vnumDisplay: '',
                tid: '',
                transporterName: '',
                transporterAddress: '',
                transporterContact: '',
                mid: '',
                mnameDisplay: '',
                sid: '',
                snameDisplay: '',
                cid: '',
                cnameDisplay: '',
                firstWeight: '',
                firstWeightDateTime: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 16),
                remarks: '',
                showSupplier: false,
            });
        } catch (error) {
            console.error('Error submitting first weight:', error);
            toast.error('Failed to submit weight entry');
        } finally {
            setIsSubmitting(false);
        }
    };

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
                                <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto mt-1">
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
                                <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto mt-1">
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
                                <ul className="absolute z-[100] w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto mt-1">
                                    {suggestions.vehicles.map((v: any) => (
                                        <li
                                            key={v.id}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => selectVehicle(v)}
                                        >
                                            {v.vnum}
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
                                placeholder="Search transporter..."
                                value={formData.transporterName || ''}
                                onChange={(e) => handleTransporterSearch(e.target.value)}
                                required
                            />
                            {suggestions.transporters.length > 0 && (
                                <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto mt-1">
                                    {suggestions.transporters.map((t: any) => (
                                        <li
                                            key={t.id}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => selectTransporter(t)}
                                        >
                                            {t.tname}
                                        </li>
                                    ))}
                                </ul>
                            )}
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
                            <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto mt-1">
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
                            <div className="flex space-x-2">
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
                                <button
                                    type="button"
                                    onClick={handleFirstWeightCapture}
                                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                                >
                                    Capture
                                </button>
                            </div>
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                First Weight Date & Time
                            </label>
                            <input
                                type="datetime-local"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={formData.firstWeightDateTime || ''}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        firstWeightDateTime: e.target.value,
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
};

export default FirstWeight;
