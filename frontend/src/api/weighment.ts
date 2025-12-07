import { API_URL } from './auth';

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
});

export const weighmentApi = {
    createFirst: async (data: any) => {
        const response = await fetch(`${API_URL}/weighment/first`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        return response.json();
    },

    getPending: async (page = 1, limit = 10) => {
        const response = await fetch(`${API_URL}/weighment/pending?page=${page}&limit=${limit}`, { headers: getHeaders() });
        return response.json();
    },

    getById: async (id: number) => {
        const response = await fetch(`${API_URL}/weighment/${id}`, { headers: getHeaders() });
        return response.json();
    },

    createSecond: async (data: any) => {
        const response = await fetch(`${API_URL}/weighment/second`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        return response.json();
    }
};
