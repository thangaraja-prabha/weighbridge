const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export interface DropdownData {
    materials: { id: number; value: string }[];
    transporters: { id: number; value: string }[];
    suppliers: { id: number; value: string }[];
    customers: { id: number; value: string }[];
}

export interface WeighInPayload {
    vnum: string;
    mname: string;
    tname: string;
    sname: string;
    cname: string;
    remarks: string;
}

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export const dashboardApi = {
    getLiveWeight: async (): Promise<string> => {
        // This endpoint can be public or private, sticking to public read for now or user specific?
        // Let's use auth just in case, but live display usually needs to be fast.
        const response = await fetch(`${API_URL}/dashboard/live-weight`, {
            method: 'GET',
            headers: getHeaders(), // Optional if public
        });
        const data = await response.json();
        return data.weight;
    },

} 
