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

    // Get materials with search
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

    // Get customers with search
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

    // Get suppliers with search
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

    // Get transporters (for autocomplete, using search endpoint)
    searchTransporters: async (query: string) => {
        const response = await fetch(`${API_BASE_URL}/master/transporters/search?q=${encodeURIComponent(query)}`, {
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to search transporters');
        return response.json();
    }
};
