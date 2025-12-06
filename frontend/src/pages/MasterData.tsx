import React, { useState, useEffect } from 'react';
import { masterApi } from '../api/master';

interface SectionProps {
    title: string;
    data: any[];
    columns: { key: string, label: string }[];
    onAdd: (data: any) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
    loading: boolean;
    addFields: { name: string, label: string, type?: string }[];
}

const GenericSection: React.FC<SectionProps> = ({ title, data, columns, onAdd, onDelete, loading, addFields }) => {
    const [formData, setFormData] = useState<any>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onAdd(formData);
            setFormData({}); // Reset form
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>

            {/* Add Form */}
            <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-md shadow-sm border flex flex-wrap gap-4 items-end">
                {addFields.map(field => (
                    <div key={field.name} className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                        <input
                            type={field.type || "text"}
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={handleChange}
                            required
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2"
                        />
                    </div>
                ))}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                >
                    {isSubmitting ? 'Adding...' : 'Add New'}
                </button>
            </form>

            {/* List */}
            <div className="bg-white shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {columns.map(col => (
                                <th key={col.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {col.label}
                                </th>
                            ))}
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr><td colSpan={columns.length + 1} className="text-center py-4">Loading...</td></tr>
                        ) : data.length === 0 ? (
                            <tr><td colSpan={columns.length + 1} className="text-center py-4">No records found</td></tr>
                        ) : (
                            data.map((item) => (
                                <tr key={item.id}>
                                    {columns.map(col => (
                                        <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {item[col.key]}
                                        </td>
                                    ))}
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => onDelete(item.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

interface MasterDataProps {
    defaultTab?: string;
}

const MasterData: React.FC<MasterDataProps> = ({ defaultTab = 'dept' }) => {
    const [activeTab, setActiveTab] = useState(defaultTab);
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const tabs = [
        { id: 'dept', label: 'Departments' },
        { id: 'shift', label: 'Shifts' },
        { id: 'nop', label: 'Nature of Problem' },
        { id: 'machine', label: 'Machine Details' }, // mdetail (mname)
        { id: 'vehicle', label: 'Vehicles' },
        { id: 'transporter', label: 'Transporters' },
        { id: 'supplier', label: 'Suppliers' },
        { id: 'customer', label: 'Customers' },
    ];

    useEffect(() => {
        loadData();
    }, [activeTab]);

    const loadData = async () => {
        setLoading(true);
        try {
            let res;
            switch (activeTab) {
                case 'dept': res = await masterApi.getDepts(); break;
                case 'shift': res = await masterApi.getShifts(); break;
                case 'nop': res = await masterApi.getNops(); break;
                case 'machine': res = await masterApi.getMachines(); break;
                case 'vehicle': res = await masterApi.getVehicles(); break;
                case 'transporter': res = await masterApi.getTransporters(); break;
                case 'supplier': res = await masterApi.getSuppliers(); break;
                case 'customer': res = await masterApi.getCustomers(); break;
            }
            setData(res || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (formData: any) => {
        switch (activeTab) {
            case 'dept': await masterApi.createDept(formData.dept); break;
            case 'shift': await masterApi.createShift(formData.shift, formData.stshift, formData.edshift); break;
            case 'nop': await masterApi.createNop(formData.nop); break;
            case 'machine': await masterApi.createMachine(formData.mname); break;
            case 'vehicle': await masterApi.createVehicle(formData.vnum); break;
            case 'transporter': await masterApi.createTransporter(formData.tname); break;
            case 'supplier': await masterApi.createSupplier(formData.sname); break;
            case 'customer': await masterApi.createCustomer(formData.cname); break;
        }
        loadData();
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure?')) return;

        let type = activeTab; // map tab id to api type if different
        if (activeTab === 'shift') type = 'shifts'; // API route is /shifts? No, DELETE uses singular usually or whatever route defined.
        // Route is /api/master/:type/:id. type in server.ts: 'dept', 'shifts', 'nop', 'mdetail', 'vehicle', 'transporter', 'supplier', 'customer'.
        // My tabs ids match these except 'shift' -> 'shifts' and 'machine' -> 'mdetail'.

        if (activeTab === 'shift') type = 'shifts';
        if (activeTab === 'machine') type = 'mdetail';

        await masterApi.deleteItem(type, id);
        loadData();
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dept':
                return <GenericSection
                    title="Manage Departments" data={data} loading={loading} onAdd={handleAdd} onDelete={handleDelete}
                    columns={[{ key: 'dept', label: 'Department' }, { key: 'username', label: 'Created By' }]}
                    addFields={[{ name: 'dept', label: 'Department Name' }]}
                />;
            case 'shift':
                return <GenericSection
                    title="Manage Shifts" data={data} loading={loading} onAdd={handleAdd} onDelete={handleDelete}
                    columns={[{ key: 'shift', label: 'Shift Name' }, { key: 'stshift', label: 'Start Time' }, { key: 'edshift', label: 'End Time' }]}
                    addFields={[
                        { name: 'shift', label: 'Shift Name' },
                        { name: 'stshift', label: 'Start Time (HH:MM)', type: 'time' },
                        { name: 'edshift', label: 'End Time (HH:MM)', type: 'time' }
                    ]}
                />;
            case 'nop':
                return <GenericSection
                    title="Nature of Problem" data={data} loading={loading} onAdd={handleAdd} onDelete={handleDelete}
                    columns={[{ key: 'nop', label: 'Problem Description' }]}
                    addFields={[{ name: 'nop', label: 'Description' }]}
                />;
            case 'machine':
                return <GenericSection
                    title="Machine Details" data={data} loading={loading} onAdd={handleAdd} onDelete={handleDelete}
                    columns={[{ key: 'mname', label: 'Machine Name' }]}
                    addFields={[{ name: 'mname', label: 'Machine Name' }]}
                />;
            case 'vehicle':
                return <GenericSection
                    title="Vehicles" data={data} loading={loading} onAdd={handleAdd} onDelete={handleDelete}
                    columns={[{ key: 'vnum', label: 'Vehicle Number' }]}
                    addFields={[{ name: 'vnum', label: 'Vehicle Number' }]}
                />;
            case 'transporter':
                return <GenericSection
                    title="Transporters" data={data} loading={loading} onAdd={handleAdd} onDelete={handleDelete}
                    columns={[{ key: 'tname', label: 'Transporter Name' }]}
                    addFields={[{ name: 'tname', label: 'Transporter Name' }]}
                />;
            case 'supplier':
                return <GenericSection
                    title="Suppliers" data={data} loading={loading} onAdd={handleAdd} onDelete={handleDelete}
                    columns={[{ key: 'sname', label: 'Supplier Name' }]}
                    addFields={[{ name: 'sname', label: 'Supplier Name' }]}
                />;
            case 'customer':
                return <GenericSection
                    title="Customers" data={data} loading={loading} onAdd={handleAdd} onDelete={handleDelete}
                    columns={[{ key: 'cname', label: 'Customer Name' }]}
                    addFields={[{ name: 'cname', label: 'Customer Name' }]}
                />;
            default: return null;
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
                <div className="border-b border-gray-200 mb-6">
                    <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                                    ${activeTab === tab.id
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                                `}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>
                {renderContent()}
            </div>
        </div>
    );
};

export default MasterData;
