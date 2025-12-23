import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Switch from 'react-switch';
import { wlogApi } from '../../api/wlog';
import { masterApi } from '../../api/master';
import { SingleWeightFormData, SuggestionsState } from './types';

interface SingleWeightProps {
    modes: any[];
    liveWeight: string;
}

const SingleWeight: React.FC<SingleWeightProps> = ({ modes, liveWeight }) => {
    const [singleWeightFormData, setSingleWeightFormData] = useState<SingleWeightFormData>({
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
        twt: '',
        twtdt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 16),
        swt: '',
        swtdt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 16),
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
        if (!singleWeightFormData.mode && modes.length > 0) {
            const internalMode = modes.find((m: any) => m.mode.toLowerCase() === 'internal');
            if (internalMode) {
                setSingleWeightFormData(prev => ({ ...prev, mode: internalMode.id.toString() }));
            }
        }
    }, [modes, singleWeightFormData.mode]);

    const handleSingleWeightVehicleSearch = async (query: string) => {
        setSingleWeightFormData((prev) => ({ ...prev, vnumDisplay: query, vid: '' }));
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

    const selectSingleWeightVehicle = async (vehicle: any) => {
        setSingleWeightFormData((prev) => ({
            ...prev,
            vid: vehicle.id,
            vnumDisplay: vehicle.vnum,
            twt: vehicle.twt ? vehicle.twt.toString() : prev.twt,
        }));
        setSuggestions((prev) => ({ ...prev, vehicles: [] }));
    };

    const handleSingleWeightTransporterSearch = async (query: string) => {
        setSingleWeightFormData((prev) => ({ ...prev, transporterName: query, tid: '' }));
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

    const selectSingleWeightTransporter = (transporter: any) => {
        setSingleWeightFormData((prev) => ({
            ...prev,
            tid: transporter.id.toString(),
            transporterName: transporter.tname,
            transporterAddress: transporter.tadd || '',
            transporterContact: transporter.tmob || '',
        }));
        setSuggestions((prev) => ({ ...prev, transporters: [] }));
    };

    const handleSingleWeightMaterialSearch = async (query: string) => {
        setSingleWeightFormData((prev) => ({ ...prev, mnameDisplay: query, mid: '' }));
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

    const selectSingleWeightMaterial = (item: any) => {
        setSingleWeightFormData((prev) => ({ ...prev, mid: item.id.toString(), mnameDisplay: item.mname }));
        setSuggestions((prev) => ({ ...prev, materials: [] }));
    };

    const handleSingleWeightSupplierSearch = async (query: string) => {
        setSingleWeightFormData((prev) => ({ ...prev, snameDisplay: query, sid: '' }));
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

    const selectSingleWeightSupplier = (item: any) => {
        setSingleWeightFormData((prev) => ({ ...prev, sid: item.id, snameDisplay: item.sname }));
        setSuggestions((prev) => ({ ...prev, suppliers: [] }));
    };

    const handleSingleWeightCustomerSearch = async (query: string) => {
        setSingleWeightFormData((prev) => ({ ...prev, cnameDisplay: query, cid: '' }));
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

    const selectSingleWeightCustomer = (item: any) => {
        setSingleWeightFormData((prev) => ({ ...prev, cid: item.id, cnameDisplay: item.cname }));
        setSuggestions((prev) => ({ ...prev, customers: [] }));
    };

    const handleGrossWeightCapture = () => {
        const now = new Date();
        const currentDateTime = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);

        setSingleWeightFormData((prev) => ({
            ...prev,
            swt: liveWeight,
            swtdt: currentDateTime
        }));
    };

    const handleSingleWeightSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (!singleWeightFormData.vid || !singleWeightFormData.mid || !singleWeightFormData.mode) {
                toast.error('Please fill in all required fields (Vehicle, Material, Mode)');
                setIsSubmitting(false);
                return;
            }

            const tareWeight = parseFloat(singleWeightFormData.twt);
            const grossWeight = parseFloat(singleWeightFormData.swt);

            const payload = {
                vid: parseInt(singleWeightFormData.vid, 10),
                mid: parseInt(singleWeightFormData.mid, 10),
                mode: parseInt(singleWeightFormData.mode, 10),
                tid: singleWeightFormData.tid ? parseInt(singleWeightFormData.tid, 10) : undefined,
                sid: singleWeightFormData.sid ? parseInt(singleWeightFormData.sid, 10) : undefined,
                cid: singleWeightFormData.cid ? parseInt(singleWeightFormData.cid, 10) : undefined,
                twt: !isNaN(tareWeight) && tareWeight > 0 ? tareWeight : 0,
                twtdt: singleWeightFormData.twtdt.replace('T', ' '),
                swt: !isNaN(grossWeight) && grossWeight > 0 ? grossWeight : 0,
                swtdt: singleWeightFormData.swtdt.replace('T', ' '),
                remarks: singleWeightFormData.remarks,
            };

            await wlogApi.createWlogEntry(payload);
            toast.success('Single weight entry created successfully!');

            const internalMode = modes.find((m: any) => m.mode.toLowerCase() === 'internal');
            setSingleWeightFormData({
                mode: internalMode ? internalMode.id.toString() : '',
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
                twt: '',
                twtdt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 16),
                swt: '',
                swtdt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 16),
                remarks: '',
                showSupplier: false,
            });
        } catch (error) {
            console.error('Error submitting single weight:', error);
            toast.error('Failed to submit weight entry');
        } finally {
            setIsSubmitting(false);
        }
    };

    const tareWt = parseFloat(singleWeightFormData.twt || '0');
    const grossWt = parseFloat(singleWeightFormData.swt || '0');
    const netWt = grossWt && tareWt ? (grossWt - tareWt).toFixed(2) : '-';

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">Single Weight Entry</h3>
                <form onSubmit={handleSingleWeightSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mode</label>
                            <div className="grid grid-cols-2 gap-4 mt-1">
                                {modes.map((m: any) => (
                                    <label key={m.id} className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="singleWeightMode"
                                            value={m.id}
                                            checked={singleWeightFormData.mode === m.id.toString()}
                                            onChange={() =>
                                                setSingleWeightFormData((prev) => ({ ...prev, mode: m.id.toString() }))
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
                                        setSingleWeightFormData((prev) => ({ ...prev, showSupplier: checked }))
                                    }
                                    checked={singleWeightFormData.showSupplier}
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

                    {!singleWeightFormData.showSupplier ? (
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Customer</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Search customer..."
                                value={singleWeightFormData.cnameDisplay}
                                onChange={(e) => handleSingleWeightCustomerSearch(e.target.value)}
                            />
                            {suggestions.customers.length > 0 && !singleWeightFormData.showSupplier && (
                                <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto mt-1">
                                    {suggestions.customers.map((c: any) => (
                                        <li
                                            key={c.id}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => selectSingleWeightCustomer(c)}
                                        >
                                            {c.cname}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ) : (
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Supplier</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Search supplier..."
                                value={singleWeightFormData.snameDisplay}
                                onChange={(e) => handleSingleWeightSupplierSearch(e.target.value)}
                            />
                            {suggestions.suppliers.length > 0 && singleWeightFormData.showSupplier && (
                                <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto mt-1">
                                    {suggestions.suppliers.map((s: any) => (
                                        <li
                                            key={s.id}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => selectSingleWeightSupplier(s)}
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
                            <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Number</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Search vehicle..."
                                value={singleWeightFormData.vnumDisplay}
                                onChange={(e) => handleSingleWeightVehicleSearch(e.target.value)}
                                required
                            />
                            {suggestions.vehicles.length > 0 && (
                                <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto mt-1">
                                    {suggestions.vehicles.map((v: any) => (
                                        <li
                                            key={v.id}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => selectSingleWeightVehicle(v)}
                                        >
                                            {v.vnum}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="relative col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Transporter Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Search transporter..."
                                value={singleWeightFormData.transporterName || ''}
                                onChange={(e) => handleSingleWeightTransporterSearch(e.target.value)}
                                required
                            />
                            {suggestions.transporters.length > 0 && (
                                <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto mt-1">
                                    {suggestions.transporters.map((t: any) => (
                                        <li
                                            key={t.id}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => selectSingleWeightTransporter(t)}
                                        >
                                            {t.tname}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="relative col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Transporter Address</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Transporter address"
                                value={singleWeightFormData.transporterAddress || ''}
                                readOnly
                            />
                        </div>

                        <div className="relative col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Transporter Contact</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Transporter contact"
                                value={singleWeightFormData.transporterContact || ''}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Search material..."
                            value={singleWeightFormData.mnameDisplay}
                            onChange={(e) => handleSingleWeightMaterialSearch(e.target.value)}
                            required
                        />
                        {suggestions.materials.length > 0 && (
                            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto mt-1">
                                {suggestions.materials.map((m: any) => (
                                    <li
                                        key={m.id}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => selectSingleWeightMaterial(m)}
                                    >
                                        {m.mname}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <h4 className="font-semibold text-gray-700 border-b pb-2">Tare Weight</h4>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    value={singleWeightFormData.twt}
                                    onChange={(e) => setSingleWeightFormData({ ...singleWeightFormData, twt: e.target.value })}
                                    required
                                    step="0.01"
                                    placeholder="Enter tare weight"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                                <input
                                    type="datetime-local"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    value={singleWeightFormData.twtdt}
                                    onChange={(e) => setSingleWeightFormData({ ...singleWeightFormData, twtdt: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200 shadow-sm">
                            <h4 className="font-semibold text-blue-800 border-b border-blue-200 pb-2">Gross Weight</h4>
                            <div>
                                <label className="block text-sm font-medium text-blue-800 mb-1">Weight (kg)</label>
                                <div className="flex space-x-2">
                                    <input
                                        type="number"
                                        className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        value={singleWeightFormData.swt}
                                        onChange={(e) => setSingleWeightFormData({ ...singleWeightFormData, swt: e.target.value })}
                                        required
                                        step="0.01"
                                        placeholder="Enter gross weight"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleGrossWeightCapture}
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
                                    value={singleWeightFormData.swtdt}
                                    onChange={(e) => setSingleWeightFormData({ ...singleWeightFormData, swtdt: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-4 p-4 bg-green-50 rounded-lg border border-green-200 flex flex-col justify-center items-center">
                            <h4 className="font-semibold text-green-700 border-b border-green-200 pb-2 w-full text-center">Net Weight</h4>
                            <div className="flex-1 flex items-center justify-center">
                                <span className="text-4xl font-bold text-green-800">
                                    {netWt} kg
                                </span>
                            </div>
                            <div className="text-xs text-gray-500 text-center">
                                Gross - Tare
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
                        <textarea
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
                            value={singleWeightFormData.remarks || ''}
                            onChange={(e) => setSingleWeightFormData({ ...singleWeightFormData, remarks: e.target.value })}
                            placeholder="Enter any remarks..."
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Single Weight Entry'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SingleWeight;
