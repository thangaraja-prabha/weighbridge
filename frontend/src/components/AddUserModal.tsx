import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { userApi, Role, Privilege } from '../api/user';
import Select from 'react-select';
import { handleMobileInputChange, getMobileValidationError, formatMobileNumber } from '../utils/validation';

// Reusable Checkbox component
/*const Checkbox = ({
  checked,
  onChange,
  label,
  className = ''
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  className?: string;
}) => (
  <label className={`flex items-center space-x-2 cursor-pointer ${className}`}>
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
    />
    <span className="text-sm text-gray-700">{label}</span>
  </label>
);*/

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void; // Callback to refresh parent data
  user?: any;
}

interface FormData {
  uname: string;
  pass: string;
  fname: string;
  email: string;
  mobile: string;
  rid: number;
  pid: number[]; // Changed to array for multiple privileges
  comname: string;
  comadd: string;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onSuccess, user }) => {
  const [formData, setFormData] = useState<FormData>({
    uname: '',
    pass: '',
    fname: '',
    email: '',
    mobile: '+91 ',
    rid: 1,
    pid: [], // Initialize as empty array
    comname: '',
    comadd: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
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
          mobile: user.mobile ? formatMobileNumber(user.mobile) : '+91 ',
          rid: user.rid || 1,
          pid: user.privileges || [],
          comname: user.comname || '',
          comadd: user.comadd || ''
        });
      } else {
        // Reset form for new user
        setFormData({
          uname: '', pass: '', fname: '', email: '', mobile: '+91 ',
          rid: 1, pid: [], comname: '', comadd: ''
        });
      }
    }
  }, [isOpen, user]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    // Special handling for checkboxes and other specific fields
    if (name === 'pid') {
      // pid is handled separately in the checkbox onChange
      return;
    }

    // Special handling for mobile number
    if (name === 'mobile') {
      handleMobileInputChange(value, (newValue) => {
        setFormData(prev => ({
          ...prev,
          [name]: newValue
        }));

        // Clear error when user starts typing
        if (errors.mobile) {
          setErrors(prev => ({ ...prev, mobile: undefined }));
        }
      });
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: (name === 'rid') ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate mobile number
    const mobileError = getMobileValidationError(formData.mobile);
    if (mobileError) {
      setErrors(prev => ({ ...prev, mobile: mobileError }));
      toast.error(mobileError);
      return;
    }

    // Validate required fields for new users
    if (!user && !formData.pass) {
      toast.error('Password is required for new users');
      return;
    }

    setLoading(true);

    try {
      let data;
      if (user) {
        // For updates, only include password if it was changed
        const { pass, ...updateData } = formData;
        const payload = pass ? { ...updateData, pass } : updateData;

        data = await userApi.updateUser(user.id, payload);
      } else {
        // Create new user
        data = await userApi.createUser({
          ...formData,
          ...formData,
          comnum: 'DEFAULT',
          comail: 'default@company.com',
          comname: user ? user.comname : (JSON.parse(localStorage.getItem('user') || '{}').comname || '')
        });
      }

      if (data.success) {
        toast.success(user ? 'User updated successfully!' : 'User created successfully!');
        // Call onSuccess callback to refresh parent data
        if (onSuccess) {
          onSuccess();
        }
        setTimeout(() => {
          onClose();
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
                required={!user} // Only required for new users
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                placeholder={user ? 'Leave blank to keep current password' : 'Enter password'}
              />
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
                className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm ${errors.mobile ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="+91 "
              />
              {errors.mobile && (
                <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>
              )}
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

            {/* Privileges */}
            <div className="md:col-span-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Privileges *</label>
                <Select
                  isMulti
                  options={privileges.map(p => ({
                    label: p.name,
                    value: p.id
                  }))}
                  value={formData.pid.map(id => ({
                    value: id,
                    label: privileges.find(p => p.id === id)?.name || ''
                  }))}
                  onChange={(selected: any) => {
                    setFormData(prev => ({
                      ...prev,
                      pid: selected ? selected.map((item: any) => item.value) : []
                    }));
                  }}
                  placeholder="Select privileges..."
                  className="text-sm"
                  styles={{
                    menu: (provided) => ({
                      ...provided,
                      zIndex: 50
                    }),
                    control: (provided) => ({
                      ...provided,
                      minHeight: '42px',
                      borderColor: '#d1d5db',
                      '&:hover': {
                        borderColor: '#9ca3af'
                      },
                      '&:focus-within': {
                        borderColor: '#3b82f6',
                        boxShadow: '0 0 0 1px #3b82f6'
                      }
                    })
                  }}
                />
                {formData.pid.length === 0 && (
                  <p className="text-xs text-red-500 mt-1">Please select at least one privilege</p>
                )}
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
