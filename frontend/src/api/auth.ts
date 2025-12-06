export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterData {
    username: string;
    password: string;
    personName: string;
    email: string;
    mobile: string;
    rights: string;
    smsOpt: string;
}

export const authApi = {
    login: async (credentials: LoginCredentials) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'An error occurred during login');
        }

        return data;
    },

    register: async (userData: RegisterData) => {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'An error occurred during registration');
        }

        return data;
    }
};
