import React, { useState, useEffect } from 'react';
import { weighmentApi } from '../api/weighment';

interface WeighOutProps {
    type?: 'internal' | 'external';
}

const WeighOut: React.FC<WeighOutProps> = ({ type = 'internal' }) => {
    const [pendingList, setPendingList] = useState<any[]>([]);
    const [selectedRecord, setSelectedRecord] = useState<any>(null);
    const [wt2, setWt2] = useState('');
    const [remarks, setRemarks] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        loadPending();
    }, []);

    const loadPending = async () => {
        try {
            // Filter pending list by weighment type if needed
            const list = await weighmentApi.getPending();
            const filteredList = list?.data?.filter((item: any) => item.type === type) || [];
            setPendingList(filteredList);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSelect = (record: any) => {
        setSelectedRecord(record);
        setWt2('');
        setRemarks(record.remarks || '');
        setMessage('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            const res = await weighmentApi.createSecond({
                id: selectedRecord.id,
                wt2,
                remarks
            });
            if (res.success) {
                setMessage(`Second Weighment Saved! Net Weight: ${res.netWeight} kg`);
                setSelectedRecord(null);
                loadPending(); // Refresh list
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
        <div className="max-w-6xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Second Weighment (Outbound)</h2>

            {message && (
                <div className={`p-4 rounded-md ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {message}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Pending List */}
                <div className="lg:col-span-1 bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-4 py-3 bg-gray-50 border-b">
                        <h3 className="text-lg font-medium text-gray-900">Pending Vehicles</h3>
                    </div>
                    <div className="overflow-y-auto h-[600px]">
                        <ul className="divide-y divide-gray-200">
                            {pendingList.length === 0 ? (
                                <li className="p-4 text-center text-gray-500">No pending vehicles</li>
                            ) : (
                                pendingList.map(item => (
                                    <li
                                        key={item.id}
                                        onClick={() => handleSelect(item)}
                                        className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedRecord?.id === item.id ? 'bg-sky-50 border-l-4 border-primary' : ''}`}
                                    >
                                        <div className="flex justify-between">
                                            <span className="font-bold text-gray-900">{item.vnum}</span>
                                            <span className="text-xs text-gray-500">{item.wt1at.split(' ')[0]}</span>
                                        </div>
                                        <div className="text-sm text-gray-600 mt-1">{item.mname}</div>
                                        <div className="text-xs text-gray-400 mt-1">Ticket: {item.id}</div>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>

                {/* Details & Form */}
                <div className="lg:col-span-2">
                    {selectedRecord ? (
                        <div className="bg-white shadow rounded-lg p-6 space-y-6">
                            <div className="border-b pb-4">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Ticket #{selectedRecord.id} - {selectedRecord.vnum}</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div><span className="text-gray-500">Material:</span> <span className="font-medium">{selectedRecord.mname}</span></div>
                                    <div><span className="text-gray-500">Transporter:</span> <span className="font-medium">{selectedRecord.tname}</span></div>
                                    <div><span className="text-gray-500">Supplier:</span> <span className="font-medium">{selectedRecord.sname}</span></div>
                                    <div><span className="text-gray-500">Customer:</span> <span className="font-medium">{selectedRecord.cname}</span></div>
                                    <div><span className="text-gray-500">First Weight:</span> <span className="font-medium">{selectedRecord.wt1} kg</span></div>
                                    <div><span className="text-gray-500">Time In:</span> <span className="font-medium">{selectedRecord.wt1at}</span></div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Second Weight (KG)</label>
                                    <input
                                        type="number"
                                        value={wt2}
                                        onChange={e => setWt2(e.target.value)}
                                        required
                                        autoFocus
                                        placeholder="Enter Second Weight"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-4 font-mono text-2xl font-bold text-right"
                                    />
                                </div>
                                {wt2 && (
                                    <div className="text-right text-sm font-medium text-gray-600">
                                        Net Weight: {Math.abs(parseFloat(wt2) - parseFloat(selectedRecord.wt1))} kg
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Remarks</label>
                                    <textarea
                                        rows={3}
                                        value={remarks}
                                        onChange={e => setRemarks(e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2"
                                    ></textarea>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 font-bold text-lg"
                                    >
                                        {loading ? 'Processing...' : 'Complete Weighment'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="bg-white shadow rounded-lg p-10 text-center text-gray-500">
                            Select a vehicle from the pending list to proceed with second weighment.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WeighOut;
