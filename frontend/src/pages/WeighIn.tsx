import React, { useState, useEffect } from 'react';
import { masterApi } from '../api/master';
import { weighmentApi } from '../api/weighment';
import { useNavigate } from 'react-router-dom';

interface WeighInProps {
    type?: 'internal' | 'external';
}

const WeighIn: React.FC<WeighInProps> = ({ type = 'internal' }) => {
    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState<any[]>([]);
    const [machines, setMachines] = useState<any[]>([]);
    const [transporters, setTransporters] = useState<any[]>([]);
    const [suppliers, setSuppliers] = useState<any[]>([]);
    const [customers, setCustomers] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        type: type,
        vnum: '',
        mname: '',
        tname: '',
        sname: '',
        cname: '',
        remarks: '',
        wt1: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        loadMasterData();
    }, []);

    const loadMasterData = async () => {
        try {
            const [v, m, t, s, c] = await Promise.all([
                masterApi.getVehicles(),
                masterApi.getMaterials(),
                masterApi.getTransportersNew(),
                masterApi.getSuppliersNew(),
                masterApi.getCustomersNew()
            ]);
            setVehicles(v);
            setMachines(m);
            setTransporters(t);
            setSuppliers(s);
            setCustomers(c);
        } catch (err) {
            console.error("Failed to load master data", err);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            const res = await weighmentApi.createFirst(formData);
            if (res.success) {
                setMessage('First Weighment Saved successfully!');
                setFormData({ 
                    type: type,
                    vnum: '', 
                    mname: '', 
                    tname: '', 
                    sname: '', 
                    cname: '', 
                    remarks: '', 
                    wt1: '' 
                });
            } else {
                setMessage('Error: ' + res.error);
            }
        } catch (err: any) {
            setMessage('Error: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">First Weighment (Inbound)</h2>

            {message && (
                <div className={`p-4 rounded-md ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Vehicle Number</label>
                        <div className="flex space-x-2">
                            <select name="vnum" value={formData.vnum} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2">
                                <option value="">-- Select --</option>
                                {vehicles.map(v => <option key={v.id} value={v.vnum}>{v.vnum}</option>)}
                            </select>
                            <button type="button" onClick={() => navigate('/master?tab=vehicle')} className="text-primary hover:text-sky-700 p-1">+</button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Material / Item</label>
                        <div className="flex space-x-2">
                            <select name="mname" value={formData.mname} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2">
                                <option value="">-- Select --</option>
                                {machines.map(m => <option key={m.id} value={m.mname}>{m.mname}</option>)}
                            </select>
                            <button type="button" onClick={() => navigate('/master?tab=machine')} className="text-primary hover:text-sky-700 p-1">+</button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Transporter</label>
                        <div className="flex space-x-2">
                            <select name="tname" value={formData.tname} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2">
                                <option value="">-- Select --</option>
                                {transporters.map(t => <option key={t.id} value={t.tname}>{t.tname}</option>)}
                            </select>
                            <button type="button" onClick={() => navigate('/master?tab=transporter')} className="text-primary hover:text-sky-700 p-1">+</button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Supplier (Source)</label>
                        <div className="flex space-x-2">
                            <select name="sname" value={formData.sname} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2">
                                <option value="">-- Select --</option>
                                {suppliers.map(s => <option key={s.id} value={s.sname}>{s.sname}</option>)}
                            </select>
                            <button type="button" onClick={() => navigate('/master?tab=supplier')} className="text-primary hover:text-sky-700 p-1">+</button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Customer (Consignee)</label>
                        <div className="flex space-x-2">
                            <select name="cname" value={formData.cname} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2">
                                <option value="">-- Select --</option>
                                {customers.map(c => <option key={c.id} value={c.cname}>{c.cname}</option>)}
                            </select>
                            <button type="button" onClick={() => navigate('/master?tab=customer')} className="text-primary hover:text-sky-700 p-1">+</button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Weight (KG)</label>
                        <input
                            type="number"
                            name="wt1"
                            value={formData.wt1}
                            onChange={handleChange}
                            required
                            placeholder="Enter Weight from Scale"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2 font-mono text-lg font-bold text-right"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Remarks</label>
                    <textarea
                        name="remarks"
                        rows={3}
                        value={formData.remarks}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2"
                    ></textarea>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-primary text-white px-6 py-2 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 font-bold"
                    >
                        {loading ? 'Saving...' : 'Save Weighment'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default WeighIn;
