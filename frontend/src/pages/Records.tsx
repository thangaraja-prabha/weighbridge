import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { wlogApi } from '../api/wlog';
import { masterApi } from '../api/master';
import Pagination from '../components/Pagination';

interface PaginationState {
    currentPage: number;
    totalPages: number;
    total: number;
    limit: number;
}

interface WlogData {
    id: number;
    mode?: number;
    vnum?: string;
    mname?: string;
    cname?: string;
    sname?: string;
    tname?: string;
    fwt?: number;
    fwtdt?: string;
    remarks?: string;
}

const Records: React.FC = () => {
    const [tableData, setTableData] = useState<WlogData[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [pagination, setPagination] = useState<PaginationState>({
        currentPage: 1,
        totalPages: 1,
        total: 0,
        limit: 10,
    });
    const [modes, setModes] = useState<any[]>([]);

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

    useEffect(() => {
        loadTableData();
    }, [pagination.currentPage, pagination.limit]);

    const loadTableData = async () => {
        try {
            setLoading(true);
            const response = await wlogApi.getWlogEntries(pagination.currentPage, pagination.limit, searchQuery);
            setTableData(response.data);
            const totalEntries = response.total || 0;
            setPagination(prev => ({
                ...prev,
                totalPages: Math.ceil(totalEntries / pagination.limit),
                total: totalEntries,
            }));
        } catch (error) {
            toast.error('Failed to load weight log entries');
            console.error('Error loading wlog data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        setPagination(prev => ({ ...prev, currentPage: 1 }));
        await loadTableData();
    };

    const handlePageChange = (page: number) => {
        setPagination(prev => ({ ...prev, currentPage: page }));
    };

    const handlePrint = async (id: number) => {
        try {
            const response = await fetch(`/api/wlog/${id}/pdf`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/pdf',
                },
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `ticket-${id}.pdf`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
                toast.success('PDF downloaded successfully');
            } else {
                toast.error('Failed to generate PDF');
            }
        } catch (error) {
            toast.error('Error generating PDF');
            console.error('Error generating PDF:', error);
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <Toaster position="top-right" />
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Weight Records</h1>

                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">
                            Records
                        </h3>
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
                                                                    onClick={() => handlePrint(item.id)}
                                                                    className="text-green-600 hover:text-green-900"
                                                                >
                                                                    Print
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
                </div>
            </div>
        </div>
    );
};

export default Records;
