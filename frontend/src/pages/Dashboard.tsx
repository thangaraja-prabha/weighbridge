import React, { useState, useEffect, useRef } from 'react';
import { dashboardApi, DropdownData, WeighInPayload } from '../api/dashboard';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [liveWeight, setLiveWeight] = useState<string>('Loading...');
    const lastWeightRef = useRef<string>('');
    const [weightColor, setWeightColor] = useState<string>('text-green-500');

    // Ticket No
    const [ticketNo, setTicketNo] = useState<number | string>('...');

    // Dropdown Data
    const [dropdowns, setDropdowns] = useState<DropdownData>({
        vehicles: [],
        materials: [],
        transporters: [],
        suppliers: [],
        customers: []
    });

    // Form State
    const [formData, setFormData] = useState<WeighInPayload>({
        vnum: '',
        mname: '',
        tname: '',
        sname: '',
        cname: '',
        remarks: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Fetch live weight safely
    useEffect(() => {
        let isMounted = true;
        let timeoutId: any;

        const pollWeight = async () => {
            // try {
            //     const weight = await dashboardApi.getLiveWeight(); // Real API call
            //     if (isMounted) {
            //         setLiveWeight(weight);

            //         if (weight !== lastWeightRef.current) {
            //             setWeightColor('text-red-600');
            //             setTimeout(() => {
            //                 if (isMounted) setWeightColor('text-green-500');
            //             }, 1000);
            //             lastWeightRef.current = weight;
            //         }
            //     }
            // } catch (err) {
            //     console.error("Failed to fetch weight", err);
            // } finally {
            //     if (isMounted) {
            //         timeoutId = setTimeout(pollWeight, 1000); // 1s delay recursive
            //     }
            // }
        };

        pollWeight();

        return () => {
            isMounted = false;
            clearTimeout(timeoutId);
        };
    }, []);

    // Fetch initial data (Dropdowns & Ticket No)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [dd, tn] = await Promise.all([
                    dashboardApi.getDropdowns(),
                    dashboardApi.getNextTicketNo()
                ]);
                console.log(dd, tn);
                setDropdowns(dd);
                setTicketNo(tn);
            } catch (err) {
                console.error("Failed to load initial data", err);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await dashboardApi.submitWeighIn(formData);
            setSuccess('Weighment recorded successfully!');
            // Reset form
            setFormData({
                vnum: '',
                mname: '',
                tname: '',
                sname: '',
                cname: '',
                remarks: ''
            });
            // Refresh Ticket No
            const nextTn = await dashboardApi.getNextTicketNo();
            setTicketNo(nextTn);

            setTimeout(() => setSuccess(''), 3000);
        } catch (err: any) {
            setError(err.message || 'Failed to submit');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Live Weight Display */}
            <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-100">
                <div className="px-4 py-5 sm:p-6 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 uppercase tracking-widest">Live Weight</h3>
                    <div className={`mt-2 text-9xl font-mono font-bold transition-colors duration-300 ${weightColor}`}>
                        {liveWeight}<span className="text-4xl ml-4 text-gray-400">kg</span>
                    </div>
                </div>
            </div>

            {/* Weigh-in Form */}
            <div className="bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden">
                <div className="px-4 py-5 border-b border-gray-200 sm:px-6 bg-gray-50 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">First Weighment Entry</h3>
                        <p className="mt-1 text-sm text-gray-500">Enter vehicle details for inward/outward processing.</p>
                    </div>
                    <div className="bg-sky-100 px-4 py-2 rounded-md border border-sky-200">
                        <span className="text-sm text-sky-800 font-bold uppercase mr-2">Ticket No:</span>
                        <span className="text-xl font-mono font-bold text-sky-900">{ticketNo}</span>
                    </div>
                </div>

                <div className="px-4 py-5 sm:p-6">
                    {/* Feedback Messages */}
                    {error && (
                        <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {success && (
                        <div className="mb-4 bg-green-50 border-l-4 border-green-500 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-green-700">{success}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                        {/* Vehicle Number */}
                        <div>
                            <div className="flex justify-between">
                                <label htmlFor="vnum" className="block text-sm font-medium text-gray-700">Vehicle Number</label>
                                <button type="button" onClick={() => navigate('/master?tab=vehicle')} className="text-xs text-primary hover:underline font-bold">+ ADD</button>
                            </div>
                            <select
                                id="vnum"
                                name="vnum"
                                required
                                value={formData.vnum}
                                onChange={handleChange}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                            >
                                <option value="">-- Select --</option>
                                {dropdowns.vehicles.map(v => <option key={v} value={v}>{v}</option>)}
                            </select>
                        </div>

                        {/* Material */}
                        <div>
                            <div className="flex justify-between">
                                <label htmlFor="mname" className="block text-sm font-medium text-gray-700">Item Description</label>
                                <button type="button" onClick={() => navigate('/master?tab=machine')} className="text-xs text-primary hover:underline font-bold">+ ADD</button>
                            </div>
                            <select
                                id="mname"
                                name="mname"
                                required
                                value={formData.mname}
                                onChange={handleChange}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                            >
                                <option value="">-- Select --</option>
                                {dropdowns.materials.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                        </div>

                        {/* Transporter */}
                        <div>
                            <div className="flex justify-between">
                                <label htmlFor="tname" className="block text-sm font-medium text-gray-700">Transporter Details</label>
                                <button type="button" onClick={() => navigate('/master?tab=transporter')} className="text-xs text-primary hover:underline font-bold">+ ADD</button>
                            </div>
                            <select
                                id="tname"
                                name="tname"
                                required
                                value={formData.tname}
                                onChange={handleChange}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                            >
                                <option value="">-- Select --</option>
                                {dropdowns.transporters.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>

                        {/* Supplier */}
                        <div>
                            <div className="flex justify-between">
                                <label htmlFor="sname" className="block text-sm font-medium text-gray-700">Inward Details (Supplier)</label>
                                <button type="button" onClick={() => navigate('/master?tab=supplier')} className="text-xs text-primary hover:underline font-bold">+ ADD</button>
                            </div>
                            <select
                                id="sname"
                                name="sname"
                                required
                                value={formData.sname}
                                onChange={handleChange}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                            >
                                <option value="">-- Select --</option>
                                {dropdowns.suppliers.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>

                        {/* Customer */}
                        <div>
                            <div className="flex justify-between">
                                <label htmlFor="cname" className="block text-sm font-medium text-gray-700">Outward Details (Customer)</label>
                                <button type="button" onClick={() => navigate('/master?tab=customer')} className="text-xs text-primary hover:underline font-bold">+ ADD</button>
                            </div>
                            <select
                                id="cname"
                                name="cname"
                                required
                                value={formData.cname}
                                onChange={handleChange}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                            >
                                <option value="">-- Select --</option>
                                {dropdowns.customers.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        {/* Remarks */}
                        <div className="sm:col-span-2">
                            <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
                            <textarea
                                id="remarks"
                                name="remarks"
                                rows={3}
                                required
                                value={formData.remarks}
                                onChange={handleChange}
                                className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                placeholder="Enter any additional notes..."
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="sm:col-span-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                                    ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-sky-500'} 
                                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200`}
                            >
                                {loading ? 'Recording...' : 'Record First Weighment'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
