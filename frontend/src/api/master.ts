import { API_URL } from './auth';

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
});

export const masterApi = {
    // Departments
    getDepts: async () => {
        const response = await fetch(`${API_URL}/master/dept`, { headers: getHeaders() });
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
    getShifts: async () => {
        const response = await fetch(`${API_URL}/master/shifts`, { headers: getHeaders() });
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
    getNops: async () => {
        const response = await fetch(`${API_URL}/master/nop`, { headers: getHeaders() });
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
    getMachines: async () => {
        const response = await fetch(`${API_URL}/master/mdetail`, { headers: getHeaders() });
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
    getVehicles: async () => {
        const response = await fetch(`${API_URL}/master/vehicle`, { headers: getHeaders() });
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
    getTransporters: async () => {
        const response = await fetch(`${API_URL}/master/transporter`, { headers: getHeaders() });
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
    getSuppliers: async () => {
        const response = await fetch(`${API_URL}/master/supplier`, { headers: getHeaders() });
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
    getCustomers: async () => {
        const response = await fetch(`${API_URL}/master/customer`, { headers: getHeaders() });
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

    // Users (from previous steps)
    getUsers: async (filter?: string) => {
        const response = await fetch(`${API_URL}/users?filter=${filter || ''}`, { headers: getHeaders() });
        return response.json();
    }
};
