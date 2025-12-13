import React, { useState, useEffect } from 'react';

import toast from 'react-hot-toast';
import { userApi, Role, Privilege } from '../api/user';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: any;
}

interface FormData {
  uname: string;
  pass: string;
  fname: string;
  email: string;
  mobile: string;
  rid: number;
  pid: number;
  comname: string;
  comadd: string;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, user }) => {
  const [formData, setFormData] = useState<FormData>({
    uname: '',
    pass: '',
    fname: '',
    email: '',
    mobile: '',
    rid: 1,
    pid: 1,
    comname: '',
    comadd: ''
  });
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const [privileges, setPrivileges] = useState<Privilege[]>([]);

  // Fetch roles and privileges on component mount
  useEffect(() => {
    const fetchRolesAndPrivileges = async () => {
      try {
        const [rolesData, privilegesData] = await Promise.all([
          userApi.getRoles(),
          userApi.getPrivileges()
        ]);
        setRoles(rolesData);
        setPrivileges(privilegesData);
      } catch (error) {
        toast.error('Failed to load roles and privileges');
      }
    };

    if (isOpen) {
      fetchRolesAndPrivileges();
      if (user) {
        setFormData({
          uname: user.username || '',
          pass: '', // Don't populate password
          fname: user.empname || user.username || '',
          email: user.email || '',
          mobile: user.mobile || '',
          rid: user.rid || 1,
          pid: user.pid || 1,
          comname: user.comname || '',
          comadd: user.comadd || ''
        });
      } else {
        // Reset form for new user
        setFormData({
          uname: '', pass: '', fname: '', email: '', mobile: '',
          rid: 1, pid: 1, comname: '', comadd: ''
        });
      }
    }
  }, [isOpen, user]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: (name === 'rid' || name === 'pid') ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let data;
      if (user) {
        // Update existing user
        data = await userApi.updateUser(user.id, {
          ...formData,
          // Only send password if it's not empty, assuming backend handles that. 
          // If backend requires password always, then we must strictly validate.
          // For now sending as is.
        });
      } else {
        // Create new user
        data = await userApi.createUser({
          ...formData,
          comnum: 'DEFAULT', // Start with default, backend will overwrite if using /addUser logic but let's keep consistent
          comail: 'default@company.com'
        });
      }

      if (data.success) {
        toast.success(user ? 'User updated successfully!' : 'User created successfully!');
        setTimeout(() => {
          onClose();
          // Navigate/refresh is handled by parent reloading
        }, 1000);
      } else {
        toast.error(data.message || (user ? 'Failed to update user' : 'Failed to create user'));
      }
    } catch (err: any) {
      toast.error(err.message || (user ? 'Failed to update user' : 'Failed to create user'));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{user ? 'Edit User' : 'Add New User'}</h2>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Username *</label>
              <input
                type="text"
                name="uname"
                value={formData.uname}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Enter username"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password *</label>
              <input
                type="password"
                name="pass"
                value={formData.pass}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Enter password"
              />
              {user && <p className="text-xs text-gray-500 mt-1">Leave blank to keep current password</p>}
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name *</label>
              <input
                type="text"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Enter full name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Enter email"
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Enter mobile number"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Role *</label>
              <select
                name="rid"
                value={formData.rid}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              >
                {roles.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                name="comname"
                value={formData.comname}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Enter company name"
              />
            </div>

            {/* Company Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Company Address</label>
              <textarea
                name="comadd"
                value={formData.comadd}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Enter company address"
              />
            </div>

            {/* Privileges */}
            <div className="md:col-span-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Privilege *</label>
                <select
                  name="pid"
                  value={formData.pid}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                >
                  {privileges.map(privilege => (
                    <option key={privilege.id} value={privilege.id}>
                      {privilege.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            >
              {loading ? (user ? 'Updating...' : 'Creating...') : (user ? 'Update User' : 'Create User')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
