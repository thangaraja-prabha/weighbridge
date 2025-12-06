import React, { useState, useEffect } from 'react';
import { reportsApi } from '../api/reports';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface ReportsProps {
    defaultGroupBy?: 'stat' | 'dept' | 'nop' | 'item_description1' | 'stype' | 'username';
    defaultView?: 'pivot' | 'list';
    fixedFilter?: any; // e.g., { stat: 'Completed' }
    title?: string;
}

const Reports: React.FC<ReportsProps> = ({ defaultGroupBy = 'stat', defaultView = 'pivot', fixedFilter = {}, title }) => {
    const [viewMode, setViewMode] = useState<'pivot' | 'list'>(defaultView);

    // Pivot State
    const [year, setYear] = useState(new Date().getFullYear());
    const [groupBy, setGroupBy] = useState<string>(defaultGroupBy);
    const [pivotData, setPivotData] = useState<any>({});
    const [pivotLoading, setPivotLoading] = useState(false);

    // List State
    const [listData, setListData] = useState<any[]>([]);
    const [listLoading, setListLoading] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Drill Down Modal State
    const [showDrill, setShowDrill] = useState(false);
    const [drillTitle, setDrillTitle] = useState('');

    // Initialize dates for list view
    useEffect(() => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        // Format as DD-MM-YYYY for backend API expectations (if needed) or Date Input (YYYY-MM-DD)
        // Backend API expects DD-MM-YYYY. Input type="date" uses YYYY-MM-DD.
        // We'll manage state as YYYY-MM-DD (for input) and convert for API.

        // Helper to format YYYY-MM-DD
        const toYMD = (d: Date) => d.toISOString().split('T')[0];
        setStartDate(toYMD(start));
        setEndDate(toYMD(end));
    }, []);

    useEffect(() => {
        if (viewMode === 'pivot') {
            loadStats();
        } else {
            // If fixedFilter exists (e.g., mcomp/mpend/cust), load list immediately?
            // Only if dates are set.
            if (startDate && endDate) loadList();
        }
    }, [viewMode, year, groupBy, startDate, endDate]);

    const loadStats = async () => {
        setPivotLoading(true);
        try {
            const res = await reportsApi.getMaintenanceStats(year, groupBy);
            setPivotData(res);
        } catch (err) {
            console.error(err);
        } finally {
            setPivotLoading(false);
        }
    };

    const loadList = async () => {
        setListLoading(true);
        try {
            // Convert YYYY-MM-DD to DD-MM-YYYY
            const toDMY = (ymd: string) => {
                const [y, m, d] = ymd.split('-');
                return `${d}-${m}-${y}`;
            };

            const filters: any = {
                stdate: toDMY(startDate),
                eddate: toDMY(endDate),
                ...fixedFilter
            };

            // If viewing specific list type without fixed stat, maybe apply group filters?
            // For now, list view uses Date Range + Fixed Filter.

            const res = await reportsApi.getList(filters);
            setListData(res);
        } catch (err) {
            console.error(err);
        } finally {
            setListLoading(false);
        }
    };

    const handleCellClick = async (groupKey: string, monthIndex: number) => {
        const m = monthIndex;
        const monthStr = m < 10 ? `0${m}` : `${m}`;
        const sDate = `01-${monthStr}-${year}`;
        const lastDay = new Date(year, m, 0).getDate();
        const eDate = `${lastDay}-${monthStr}-${year}`;

        setDrillTitle(`${groupKey} - ${MONTHS[m - 1]} ${year}`);
        setShowDrill(true);
        setListLoading(true);

        try {
            const filters: any = { stdate: sDate, eddate: eDate };
            // Apply grouping filter
            if (groupBy === 'stat') filters.stat = groupKey;
            if (groupBy === 'dept') filters.dept = groupKey;
            // ... strict backend filtering only supports stat/dept for now in 'list' endpoint explicitly?
            // Actually my backend reports.ts /list uses:
            // if (stat) query.where(eq(mlog.stat, stat))
            // if (dept) query.where(eq(mlog.dept, dept))
            // It DOES NOT support filtering by 'nop', 'machine', 'shift' yet in /list.
            // I need to use client side filtering for those OR update backend.
            // I'll use client side filtering here for consistency with previous implementation.

            const list = await reportsApi.getList(filters);

            let filteredList = list;
            if (groupBy === 'nop') filteredList = list.filter((i: any) => i.nop === groupKey);
            if (groupBy === 'item_description1') filteredList = list.filter((i: any) => i.item_description1 === groupKey);
            if (groupBy === 'stype') filteredList = list.filter((i: any) => i.stype === groupKey);
            if (groupBy === 'username') filteredList = list.filter((i: any) => i.username === groupKey);

            setListData(filteredList);
            setListLoading(false); // Modal uses listData
        } catch (err) {
            console.error(err);
            setListLoading(false);
        }
    };

    // Render Table Helper
    const renderTable = (data: any[], loading: boolean) => (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Dept</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Problem</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Machine</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tech</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {loading ? (
                        <tr><td colSpan={6} className="text-center py-4">Loading...</td></tr>
                    ) : data.length === 0 ? (
                        <tr><td colSpan={6} className="text-center py-4">No records found</td></tr>
                    ) : (
                        data.map((item: any, idx) => (
                            <tr key={idx}>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{item.stdate}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{item.dept}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{item.nop}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{item.item_description1}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.stat === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {item.stat}
                                    </span>
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{item.username}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <h2 className="text-xl font-bold text-gray-800">{title || 'Analyze Reports'}</h2>

                    <div className="flex flex-wrap gap-2">
                        {/* View Switcher only if not forced to list mode? Actually keeping it flexible is fine but let's hide pivot options if fixed list mode */}
                        {!fixedFilter.stat && (
                            <div className="flex bg-gray-100 rounded p-1">
                                <button
                                    onClick={() => setViewMode('pivot')}
                                    className={`px-3 py-1 rounded ${viewMode === 'pivot' ? 'bg-white shadow' : 'text-gray-600'}`}
                                >Pivot</button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`px-3 py-1 rounded ${viewMode === 'list' ? 'bg-white shadow' : 'text-gray-600'}`}
                                >List</button>
                            </div>
                        )}

                        {viewMode === 'pivot' ? (
                            <>
                                <select
                                    value={year} onChange={e => setYear(parseInt(e.target.value))}
                                    className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2"
                                >
                                    {[2022, 2023, 2024, 2025].map(y => <option key={y} value={y}>{y}</option>)}
                                </select>
                                <select
                                    value={groupBy} onChange={e => setGroupBy(e.target.value)}
                                    className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2"
                                >
                                    <option value="stat">By Status</option>
                                    <option value="dept">By Department</option>
                                    <option value="nop">By Nature of Problem</option>
                                    <option value="item_description1">By Machine</option>
                                    <option value="stype">By Shift</option>
                                    <option value="username">By User</option>
                                </select>
                            </>
                        ) : (
                            // List View Filters
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">From:</span>
                                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="border p-1 rounded" />
                                <span className="text-sm text-gray-600">To:</span>
                                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="border p-1 rounded" />
                                <button onClick={loadList} className="bg-primary text-white px-3 py-1 rounded">Go</button>
                            </div>
                        )}
                    </div>
                </div>

                {viewMode === 'pivot' ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 border">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider border">
                                        {groupBy}
                                    </th>
                                    {MONTHS.map(m => (
                                        <th key={m} className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border">
                                            {m}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {pivotLoading ? (
                                    <tr><td colSpan={13} className="text-center py-4">Loading...</td></tr>
                                ) : (
                                    Object.keys(pivotData).length === 0 ? (
                                        <tr><td colSpan={13} className="text-center py-4">No data found</td></tr>
                                    ) : (
                                        Object.keys(pivotData).map(rowKey => (
                                            <tr key={rowKey}>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-gray-900 border bg-gray-50">{rowKey}</td>
                                                {MONTHS.map((_, idx) => {
                                                    const count = pivotData[rowKey]?.[idx + 1] || 0;
                                                    return (
                                                        <td key={idx} className="px-2 py-4 whitespace-nowrap text-center text-sm text-gray-500 border">
                                                            {count > 0 ? (
                                                                <button onClick={() => handleCellClick(rowKey, idx + 1)} className="text-primary hover:underline font-medium">
                                                                    {count}
                                                                </button>
                                                            ) : '-'}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    // List View
                    renderTable(listData, listLoading)
                )}
            </div>

            {/* Drill Down Modal (Only for Pivot Cell Clicks) */}
            {showDrill && (
                <div className="fixed z-50 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" onClick={() => setShowDrill(false)}><div className="absolute inset-0 bg-gray-500 opacity-75"></div></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="flex justify-between mb-4">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">{drillTitle}</h3>
                                    <button onClick={() => setShowDrill(false)} className="text-gray-400 hover:text-gray-500 text-2xl">&times;</button>
                                </div>
                                {renderTable(listData, listLoading)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reports;
