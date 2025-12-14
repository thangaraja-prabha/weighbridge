const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export interface Role {
    id: number;
    name: string;
    description?: string;
}

export interface Privilege {
    id: number;
    name: string;
    description?: string;
}

export const userApi = {
    // Get all roles
    getRoles: async (): Promise<Role[]> => {
        const response = await fetch(`${API_URL}/users/roles`, {
            method: 'GET',
            headers: getHeaders(),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        return data.data;
    },

    // Get all privileges
    getPrivileges: async (): Promise<Privilege[]> => {
        const response = await fetch(`${API_URL}/users/privileges`, {
            method: 'GET',
            headers: getHeaders(),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        return data.data;
    },

    // Create user
    createUser: async (userData: any) => {
        const response = await fetch(`${API_URL}/auth/adduser`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        return data;
    },


    // Get all users
    getUsers: async (page = 1, limit = 10, search = '') => {
        const url = search 
            ? `${API_URL}/users/search?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`
            : `${API_URL}/users?page=${page}&limit=${limit}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: getHeaders(),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        return data;
    },

    // Search users (dedicated endpoint)
    searchUsers: async (search: string, page = 1, limit = 10) => {
        const response = await fetch(`${API_URL}/users/search?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`, {
            method: 'GET',
            headers: getHeaders(),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        return data;
    },

    // Update user
    updateUser: async (id: number, userData: any) => {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        return data;
    },

    // Delete user
    deleteUser: async (id: number) => {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        return data;
    }
};
