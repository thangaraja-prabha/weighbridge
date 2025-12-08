import { API_URL } from './auth';

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
});

export const masterApi = {
    // Departments
    getDepts: async (page = 1, limit = 10) => {
        const response = await fetch(`${API_URL}/master/dept?page=${page}&limit=${limit}`, { headers: getHeaders() });
        return response.json();
    },
    createDept: async (dept: string) => {
        const response = await fetch(`${API_URL}/master/dept`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ dept })
        });
        return response.json();
    },

    // Shifts
    getShifts: async (page = 1, limit = 10) => {
        const response = await fetch(`${API_URL}/master/shifts?page=${page}&limit=${limit}`, { headers: getHeaders() });
        return response.json();
    },
    createShift: async (shift: string, stshift: string, edshift: string) => {
        const response = await fetch(`${API_URL}/master/shifts`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ shift, stshift, edshift })
        });
        return response.json();
    },

    // NOP
    getNops: async (page = 1, limit = 10) => {
        const response = await fetch(`${API_URL}/master/nop?page=${page}&limit=${limit}`, { headers: getHeaders() });
        return response.json();
    },
    createNop: async (nop: string) => {
        const response = await fetch(`${API_URL}/master/nop`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ nop })
        });
        return response.json();
    },

    // Machines (New relational table)
    getMaterials: async (page = 1, limit = 10) => {
        const response = await fetch(`${API_URL}/master/materials?page=${page}&limit=${limit}`, { headers: getHeaders() });
        return response.json();
    },
    createMaterial: async (mname: string, mdetail: string) => {
        const response = await fetch(`${API_URL}/master/materials`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ mname, mdetail })
        });
        return response.json();
    },

    // Customers (New relational table)
    getCustomersNew: async (page = 1, limit = 10) => {
        const response = await fetch(`${API_URL}/master/customers?page=${page}&limit=${limit}`, { headers: getHeaders() });
        return response.json();
    },
    createCustomerNew: async (cname: string, cadd: string, cnum: string, crem: string) => {
        const response = await fetch(`${API_URL}/master/customers`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ cname, cadd, cnum, crem })
        });
        return response.json();
    },

    // Suppliers (New relational table)
    getSuppliersNew: async (page = 1, limit = 10) => {
        const response = await fetch(`${API_URL}/master/suppliers?page=${page}&limit=${limit}`, { headers: getHeaders() });
        return response.json();
    },
    createSupplierNew: async (sname: string, sadd: string, snum: string, srem: string) => {
        const response = await fetch(`${API_URL}/master/suppliers`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ sname, sadd, snum, srem })
        });
        return response.json();
    },

    // Transporters (New relational table)
    getTransportersNew: async (page = 1, limit = 10) => {
        const response = await fetch(`${API_URL}/master/transporters?page=${page}&limit=${limit}`, { headers: getHeaders() });
        return response.json();
    },
    createTransporterNew: async (tnum: string, tname: string, tadd: string, tmob: string, trem: string) => {
        const response = await fetch(`${API_URL}/master/transporters`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ tnum, tname, tadd, tmob, trem })
        });
        return response.json();
    },

    // Legacy endpoints for backward compatibility
    getMachines: async (page = 1, limit = 10) => {
        const response = await fetch(`${API_URL}/master/mdetail?page=${page}&limit=${limit}`, { headers: getHeaders() });
        return response.json();
    },
    createMachine: async (mname: string) => {
        const response = await fetch(`${API_URL}/master/mdetail`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ mname })
        });
        return response.json();
    },

    // Vehicles
    getVehicles: async (page = 1, limit = 10) => {
        const response = await fetch(`${API_URL}/master/vehicle?page=${page}&limit=${limit}`, { headers: getHeaders() });
        return response.json();
    },
    createVehicle: async (vnum: string) => {
        const response = await fetch(`${API_URL}/master/vehicle`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ vnum })
        });
        return response.json();
    },

    // Transporters
    getTransporters: async (page = 1, limit = 10) => {
        const response = await fetch(`${API_URL}/master/transporter?page=${page}&limit=${limit}`, { headers: getHeaders() });
        return response.json();
    },
    createTransporter: async (tname: string) => {
        const response = await fetch(`${API_URL}/master/transporter`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ tname })
        });
        return response.json();
    },

    // Suppliers
    getSuppliers: async (page = 1, limit = 10) => {
        const response = await fetch(`${API_URL}/master/supplier?page=${page}&limit=${limit}`, { headers: getHeaders() });
        return response.json();
    },
    createSupplier: async (sname: string) => {
        const response = await fetch(`${API_URL}/master/supplier`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ sname })
        });
        return response.json();
    },

    // Customers
    getCustomers: async (page = 1, limit = 10) => {
        const response = await fetch(`${API_URL}/master/customer?page=${page}&limit=${limit}`, { headers: getHeaders() });
        return response.json();
    },
    createCustomer: async (cname: string) => {
        const response = await fetch(`${API_URL}/master/customer`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ cname })
        });
        return response.json();
    },

    // Delete Generic (updated to support new tables)
    deleteItem: async (type: string, id: number) => {
        const response = await fetch(`${API_URL}/master/${type}/${id}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        return response.json();
    },

    // Users
    getUsers: async (filter = '', page = 1, limit = 10) => {
        const response = await fetch(`${API_URL}/users?filter=${filter}&page=${page}&limit=${limit}`, { headers: getHeaders() });
        return response.json();
    }
};
