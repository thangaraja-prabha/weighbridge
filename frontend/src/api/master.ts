const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
    };
};

export const masterApi = {
    // Get all modes
    getModes: async () => {
        const response = await fetch(`${API_BASE_URL}/master/modes`, {
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch modes');
        return response.json();
    },

    // Materials
    getMaterials: async (search: string = '', page = 1, limit = 10) => {
        const params = new URLSearchParams({
            search,
            page: page.toString(),
            limit: limit.toString()
        });
        const response = await fetch(`${API_BASE_URL}/master/materials?${params}`, {
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch materials');
        return response.json();
    },

    createMaterial: async (data: { mname: string; mdetail?: string }) => {
        const response = await fetch(`${API_BASE_URL}/master/materials`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to create material');
        return response.json();
    },

    updateMaterial: async (id: number, data: { mname: string; mdetail?: string }) => {
        const response = await fetch(`${API_BASE_URL}/master/materials/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to update material');
        return response.json();
    },

    deleteMaterial: async (id: number) => {
        const response = await fetch(`${API_BASE_URL}/master/materials/${id}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to delete material');
        return response.json();
    },

    // Customers
    getCustomers: async (search: string = '', page = 1, limit = 10) => {
        const params = new URLSearchParams({
            search,
            page: page.toString(),
            limit: limit.toString()
        });
        const response = await fetch(`${API_BASE_URL}/master/customers?${params}`, {
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch customers');
        return response.json();
    },

    createCustomer: async (data: { cname: string; cadd?: string; cnum?: string; crem?: string }) => {
        const response = await fetch(`${API_BASE_URL}/master/customers`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to create customer');
        return response.json();
    },

    updateCustomer: async (id: number, data: { cname: string; cadd?: string; cnum?: string; crem?: string }) => {
        const response = await fetch(`${API_BASE_URL}/master/customers/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to update customer');
        return response.json();
    },

    deleteCustomer: async (id: number) => {
        const response = await fetch(`${API_BASE_URL}/master/customers/${id}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to delete customer');
        return response.json();
    },

    // Suppliers
    getSuppliers: async (search: string = '', page = 1, limit = 10) => {
        const params = new URLSearchParams({
            search,
            page: page.toString(),
            limit: limit.toString()
        });
        const response = await fetch(`${API_BASE_URL}/master/suppliers?${params}`, {
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch suppliers');
        return response.json();
    },

    createSupplier: async (data: { sname: string; sadd?: string; snum?: string; srem?: string }) => {
        const response = await fetch(`${API_BASE_URL}/master/suppliers`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to create supplier');
        return response.json();
    },

    updateSupplier: async (id: number, data: { sname: string; sadd?: string; snum?: string; srem?: string }) => {
        const response = await fetch(`${API_BASE_URL}/master/suppliers/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to update supplier');
        return response.json();
    },

    deleteSupplier: async (id: number) => {
        const response = await fetch(`${API_BASE_URL}/master/suppliers/${id}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to delete supplier');
        return response.json();
    },

    // Transporters
    getTransporters: async (search: string = '', page = 1, limit = 10) => {
        const params = new URLSearchParams({
            search,
            page: page.toString(),
            limit: limit.toString()
        });
        const response = await fetch(`${API_BASE_URL}/master/transporters?${params}`, {
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch transporters');
        return response.json();
    },

    createTransporter: async (data: { tnum?: string; tname: string; tadd?: string; tmob?: string; trem?: string }) => {
        const response = await fetch(`${API_BASE_URL}/master/transporters`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create transporter');
        }
        return response.json();
    },

    updateTransporter: async (id: number, data: { tnum?: string; tname: string; tadd?: string; tmob?: string; trem?: string }) => {
        const response = await fetch(`${API_BASE_URL}/master/transporters/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to update transporter');
        }
        return response.json();
    },

    deleteTransporter: async (id: number) => {
        const response = await fetch(`${API_BASE_URL}/master/transporters/${id}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to delete transporter');
        return response.json();
    },

    // Transporters search (for autocomplete)
    searchTransporters: async (query: string) => {
        const response = await fetch(`${API_BASE_URL}/master/transporters/search?q=${encodeURIComponent(query)}`, {
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to search transporters');
        return response.json();
    },

    // Vehicles
    getVehicles: async (search: string = '', page = 1, limit = 10) => {
        const params = new URLSearchParams({
            search,
            page: page.toString(),
            limit: limit.toString()
        });
        const response = await fetch(`${API_BASE_URL}/master/vehicles?${params}`, {
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch vehicles');
        return response.json();
    },

    createVehicle: async (data: { vnum: string; twt: number }) => {
        const response = await fetch(`${API_BASE_URL}/master/vehicles`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create vehicle');
        }
        return response.json();
    },

    updateVehicle: async (id: number, data: { vnum: string; twt: number }) => {
        const response = await fetch(`${API_BASE_URL}/master/vehicles/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to update vehicle');
        }
        return response.json();
    },

    deleteVehicle: async (id: number) => {
        const response = await fetch(`${API_BASE_URL}/master/vehicles/${id}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to delete vehicle');
        return response.json();
    },

    // Vehicles search (for autocomplete)
    searchVehicles: async (query: string) => {
        const response = await fetch(`${API_BASE_URL}/master/vehicles/search?q=${encodeURIComponent(query)}`, {
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to search vehicles');
        return response.json();
    }
};
