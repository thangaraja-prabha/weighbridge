const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export const transporterApi = {
    getTransporters: async (page: number = 1, limit: number = 10, search?: string) => {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
        });
        
        if (search) {
            params.append('search', search);
        }

        const response = await fetch(`${API_URL}/master/transporters?${params}`, {
            headers: getHeaders()
        });
        return response.json();
    },

    searchTransporters: async (query: string) => {
        const response = await fetch(`${API_URL}/master/transporters/search?q=${encodeURIComponent(query)}`, {
            headers: getHeaders()
        });
        return response.json();
    }
};
