import React, { useState, useEffect } from 'react';

interface Column {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'date';
}

interface DataTableProps {
  tableName: string;
  columns: Column[];
  apiEndpoint: string;
  canAdd?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
}

const DataTable: React.FC<DataTableProps> = ({ 
  tableName, 
  columns, 
  apiEndpoint, 
  canAdd = true, 
  canEdit = true, 
  canDelete = true 
}) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  // Fetch data
  const fetchData = async (page = 1, searchQuery = '') => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${apiEndpoint}?page=${page}&limit=10${searchQuery ? `&search=${searchQuery}` : ''}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      
      setData(result.data);
      setTotalPages(Math.ceil(result.total / result.limit));
      setCurrentPage(page);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiEndpoint]);

  // Handle search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchData(1, search);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [search]);

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this record?')) return;
    
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await fetch(`${apiEndpoint}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      
      setSuccess('Record deleted successfully');
      fetchData(currentPage, search);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const url = editingItem ? `${apiEndpoint}/${editingItem.id}` : apiEndpoint;
      const method = editingItem ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      
      setSuccess(`Record ${editingItem ? 'updated' : 'created'} successfully`);
      setShowAddModal(false);
      setEditingItem(null);
      setFormData({});
      fetchData(currentPage, search);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Open edit modal
  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData(item);
    setShowAddModal(true);
  };

  // Open add modal
  const handleAdd = () => {
    setEditingItem(null);
    setFormData({});
    setShowAddModal(true);
  };

  const renderCell = (item: any, column: Column) => {
    const value = item[column.key];
    
    if (column.type === 'date' && value) {
      return new Date(value).toLocaleDateString();
    }
    
    return value || '-';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 capitalize">{tableName}</h1>
          {canAdd && (
            <button
              onClick={handleAdd}
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-sky-600 transition-colors"
            >
              Add New
            </button>
          )}
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          />
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        {success && (
          <div className="mb-4 bg-green-50 border-l-4 border-green-500 p-4">
            <p className="text-green-700">{success}</p>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.label}
                  </th>
                ))}
                {(canEdit || canDelete) && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-6 py-4 text-center">
                    <div className="text-gray-500">Loading...</div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-6 py-4 text-center">
                    <div className="text-gray-500">No data found</div>
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    {columns.map((column) => (
                      <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {renderCell(item, column)}
                      </td>
                    ))}
                    {(canEdit || canDelete) && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {canEdit && (
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                          >
                            Edit
                          </button>
                        )}
                        {canDelete && (
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => fetchData(currentPage - 1, search)}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => fetchData(currentPage + 1, search)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingItem ? 'Edit' : 'Add'} {tableName}
            </h2>
            
            <form onSubmit={handleSubmit}>
              {columns.map((column) => (
                <div key={column.key} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {column.label}
                  </label>
                  <input
                    type={column.type === 'number' ? 'number' : 'text'}
                    value={formData[column.key] || ''}
                    onChange={(e) => setFormData({ ...formData, [column.key]: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    required={column.key !== 'id'}
                  />
                </div>
              ))}
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-sky-600 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : (editingItem ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
