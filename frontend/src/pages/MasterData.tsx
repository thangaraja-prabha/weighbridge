import React, { useState, useEffect } from 'react';
import { masterApi } from '../api/master';
import PaginationControls from '../components/PaginationControls';
import { 
  Building2, 
  Clock, 
  AlertCircle, 
  Cpu, 
  Truck, 
  TruckIcon, 
  Package, 
  Users, 
  Plus, 
  Trash2, 
  Edit as EditIcon, 
  Save
  
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';


interface SectionProps {
    title: string;
    data: any[];
    columns: { key: string, label: string }[];
    onAdd: (data: any) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
    loading: boolean;
    addFields: { name: string, label: string, type?: string }[];
    pagination: { page: number, total: number, next: any, previous: any };
    onPageChange: (newPage: number) => void;
}

const GenericSection: React.FC<SectionProps> = ({ title, data, columns, onAdd, onDelete, loading, addFields, pagination, onPageChange }) => {
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
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                >
                    {isSubmitting ? (
                        <>
                            <Save className="w-4 h-4 animate-spin" />
                            <span>Saving...</span>
                        </>
                    ) : (
                        <>
                            <Plus className="w-4 h-4" />
                            <span>Add New</span>
                        </>
                    )}
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
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                    <button 
                                      //  onClick={() => onEdit(item)} 
                                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                                        title="Edit"
                                    >
                                        <EditIcon className="w-4 h-4" />
                                        <span className="sr-only">Edit</span>
                                    </button>
                                    <button 
                                        onClick={() => onDelete(item.id)} 
                                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        <span className="sr-only">Delete</span>
                                    </button>
                                </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                {/* Pagination */}
                <div className="p-4 border-t border-gray-200">
                    {pagination && (
                        <PaginationControls
                            currentPage={pagination.page || 1}
                            hasNext={!!pagination.next}
                            hasPrev={!!pagination.previous}
                            onNext={() => onPageChange((pagination.page || 1) + 1)}
                            onPrev={() => onPageChange((pagination.page || 1) - 1)}
                            total={pagination.total || 0}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

interface MasterDataProps {
    defaultTab?: string;
}

// ... (keep all the imports and GenericSection component as is)

const MasterData: React.FC<MasterDataProps> = ({ defaultTab = 'dept' }) => {
    const [activeTab, setActiveTab] = useState(defaultTab);
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState<any>({ page: 1, total: 0, next: null, previous: null });

    const tabs = [
        { id: 'dept', label: 'Departments', icon: Building2 },
        { id: 'shift', label: 'Shifts', icon: Clock },
        { id: 'nop', label: 'Nature of Problem', icon: AlertCircle },
        { id: 'machine', label: 'Materials', icon: Cpu },
        { id: 'vehicle', label: 'Vehicles', icon: Truck },
        { id: 'transporter', label: 'Transporters', icon: TruckIcon },
        { id: 'supplier', label: 'Suppliers', icon: Package },
        { id: 'customer', label: 'Customers', icon: Users },
    ];

    useEffect(() => {
        setPage(1); // Reset page on tab change
    }, [activeTab]);

    useEffect(() => {
        loadData();
    }, [activeTab, page]);

    const loadData = async () => {
        setLoading(true);
        const loadingToast = toast.loading('Loading data...');
        try {
            let res;
            switch (activeTab) {
                case 'dept': res = await masterApi.getDepts(page); break;
                case 'shift': res = await masterApi.getShifts(page); break;
                case 'nop': res = await masterApi.getNops(page); break;
                case 'machine': res = await masterApi.getMaterials(page); break;
                case 'vehicle': res = await masterApi.getVehicles(page); break;
                case 'transporter': res = await masterApi.getTransportersNew(page); break;
                case 'supplier': res = await masterApi.getSuppliersNew(page); break;
                case 'customer': res = await masterApi.getCustomersNew(page); break;
            }
            if (res) {
                setData(res.data || []);
                setPagination({
                    page: page,
                    total: res.total,
                    next: res.next,
                    previous: res.previous
                });
                toast.dismiss(loadingToast);
                if (res.data && res.data.length === 0) {
                    toast('No records found', { icon: 'ℹ️' });
                }
            }
        } catch (err) {
            console.error(err);
            toast.dismiss(loadingToast);
            toast.error('Failed to load data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (formData: any) => {
        const loadingToast = toast.loading('Adding new item...');
        try {
            let message = '';
            switch (activeTab) {
                case 'dept': 
                    await masterApi.createDept(formData.dept);
                    message = 'Department added successfully';
                    break;
                case 'shift': 
                    await masterApi.createShift(formData.shift, formData.stshift, formData.edshift);
                    message = 'Shift added successfully';
                    break;
                case 'nop': 
                    await masterApi.createNop(formData.nop);
                    message = 'Nature of Problem added successfully';
                    break;
                case 'machine': 
                    await masterApi.createMaterial(formData.mname, formData.mdetail || '');
                    message = 'Material added successfully';
                    break;
                case 'vehicle': 
                    await masterApi.createVehicle(formData.vnum);
                    message = 'Vehicle added successfully';
                    break;
                case 'transporter': 
                    await masterApi.createTransporterNew(formData.tnum || '', formData.tname, formData.tadd || '', formData.tmob || '', formData.trem || '');
                    message = 'Transporter added successfully';
                    break;
                case 'supplier': 
                    await masterApi.createSupplierNew(formData.sname, formData.sadd || '', formData.snum || '', formData.srem || '');
                    message = 'Supplier added successfully';
                    break;
                case 'customer': 
                    await masterApi.createCustomerNew(formData.cname, formData.cadd || '', formData.cnum || '', formData.crem || '');
                    message = 'Customer added successfully';
                    break;
            }
            await loadData();
            toast.dismiss(loadingToast);
            toast.success(message);
        } catch (error) {
            console.error('Error adding item:', error);
            toast.dismiss(loadingToast);
            toast.error(`Failed to add ${activeTab}. Please try again.`);
        }
    };

    const handleDelete = async (id: number) => {
        const userConfirmed = window.confirm('Are you sure you want to delete this item?');
        if (!userConfirmed) {
            toast('Deletion cancelled', { icon: 'ℹ️' });
            return;
        }
        
        const loadingToast = toast.loading('Deleting item...');
        try {
            let type = activeTab;
            if (activeTab === 'shift') type = 'shifts';
            if (activeTab === 'machine') type = 'materials';
            if (activeTab === 'transporter') type = 'transporters';
            if (activeTab === 'supplier') type = 'suppliers';
            if (activeTab === 'customer') type = 'customers';
            
            await masterApi.deleteItem(type, id);
            await loadData();
            
            toast.dismiss(loadingToast);
            toast.success('Item deleted successfully');
        } catch (error) {
            console.error('Error deleting item:', error);
            toast.dismiss(loadingToast);
            toast.error('Failed to delete item. Please try again.');
        }
    };

    const renderContent = () => {
        const commonProps = {
            data, 
            loading, 
            onAdd: handleAdd, 
            onDelete: handleDelete, 
            pagination, 
            onPageChange: setPage
        };

        switch (activeTab) {
            case 'dept':
                return <GenericSection
                    title="Manage Departments" {...commonProps}
                    columns={[{ key: 'dept', label: 'Department' }, { key: 'username', label: 'Created By' }]}
                    addFields={[{ name: 'dept', label: 'Department Name' }]}
                />;
            case 'shift':
                return <GenericSection
                    title="Manage Shifts" {...commonProps}
                    columns={[
                        { key: 'shift', label: 'Shift Name' }, 
                        { key: 'stshift', label: 'Start Time' }, 
                        { key: 'edshift', label: 'End Time' }
                    ]}
                    addFields={[
                        { name: 'shift', label: 'Shift Name' },
                        { name: 'stshift', label: 'Start Time (HH:MM)', type: 'time' },
                        { name: 'edshift', label: 'End Time (HH:MM)', type: 'time' }
                    ]}
                />;
            case 'nop':
                return <GenericSection
                    title="Nature of Problem" {...commonProps}
                    columns={[{ key: 'nop', label: 'Problem Description' }]}
                    addFields={[{ name: 'nop', label: 'Description' }]}
                />;
            case 'machine':
                return <GenericSection
                    title="Materials" {...commonProps}
                    columns={[{ key: 'mname', label: 'Material Name' }, { key: 'mdetail', label: 'Details' }]}
                    addFields={[{ name: 'mname', label: 'Material Name' }, { name: 'mdetail', label: 'Details' }]}
                />;
            case 'vehicle':
                return <GenericSection
                    title="Vehicles" {...commonProps}
                    columns={[{ key: 'vnum', label: 'Vehicle Number' }]}
                    addFields={[{ name: 'vnum', label: 'Vehicle Number' }]}
                />;
            case 'transporter':
                return <GenericSection
                    title="Transporters" {...commonProps}
                    columns={[{ key: 'tname', label: 'Transporter Name' }, { key: 'tadd', label: 'Address' }, { key: 'tmob', label: 'Mobile' }]}
                    addFields={[{ name: 'tname', label: 'Transporter Name' }, { name: 'tadd', label: 'Address' }, { name: 'tmob', label: 'Mobile' }, { name: 'trem', label: 'Remarks' }]}
                />;
            case 'supplier':
                return <GenericSection
                    title="Suppliers" {...commonProps}
                    columns={[{ key: 'sname', label: 'Supplier Name' }, { key: 'sadd', label: 'Address' }, { key: 'snum', label: 'Mobile' }]}
                    addFields={[{ name: 'sname', label: 'Supplier Name' }, { name: 'sadd', label: 'Address' }, { name: 'snum', label: 'Mobile' }, { name: 'srem', label: 'Remarks' }]}
                />;
            case 'customer':
                return <GenericSection
                    title="Customers" {...commonProps}
                    columns={[{ key: 'cname', label: 'Customer Name' }, { key: 'cadd', label: 'Address' }, { key: 'cnum', label: 'Mobile' }]}
                    addFields={[{ name: 'cname', label: 'Customer Name' }, { name: 'cadd', label: 'Address' }, { name: 'cnum', label: 'Mobile' }, { name: 'crem', label: 'Remarks' }]}
                />;
            default: 
                return null;
        }
    };

    return (
        <div className="space-y-6 relative">
            <Toaster 
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                    success: {
                        duration: 3000,
                        iconTheme: {
                            primary: '#10B981',
                            secondary: 'white',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#EF4444',
                            secondary: 'white',
                        },
                    },
                    loading: {
                        style: {
                            background: '#1F2937',
                        },
                    },
                }}
            />
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8 overflow-x-auto">
                    {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`whitespace-nowrap py-4 px-3 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                            activeTab === tab.id
                                ? 'bg-white border-b-2 border-secondary' // Using custom classes
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                        {React.createElement(tab.icon, { className: 'w-4 h-4' })}
                        <span>{tab.label}</span>
                </button>
                    ))}
                </nav>
            </div>

            {renderContent()}
        </div>
    );
};

export default MasterData;
