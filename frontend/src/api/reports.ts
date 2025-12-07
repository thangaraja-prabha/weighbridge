import { API_URL } from './auth';

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
});

export const reportsApi = {
    getMaintenanceStats: async (year: number, groupBy: string) => {
        const response = await fetch(`${API_URL}/reports/maintenance?year=${year}&groupBy=${groupBy}`, {
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch report stats');
        return response.json();
    },

    getList: async (filters: { stdate?: string, eddate?: string, stat?: string, dept?: string, page?: number, limit?: number }) => {
        const params = new URLSearchParams();
        if (filters.stdate) params.append('stdate', filters.stdate);
        if (filters.eddate) params.append('eddate', filters.eddate);
        if (filters.stat) params.append('stat', filters.stat);
        if (filters.dept) params.append('dept', filters.dept);
        if (filters.page) params.append('page', filters.page.toString());
        if (filters.limit) params.append('limit', filters.limit.toString());

        const response = await fetch(`${API_URL}/reports/list?${params.toString()}`, {
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch report list');
        return response.json();
    }
};
