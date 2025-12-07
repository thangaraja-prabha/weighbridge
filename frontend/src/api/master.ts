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

    // Machines
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

    // Delete Generic
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
