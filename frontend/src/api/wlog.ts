const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export interface WlogEntry {
    id: number;
    fwt?: number; // First weight
    lwt?: number; // Last weight  
    swt?: number; // Standard weight
    mode?: number;
    vnum?: string; // Vehicle number
    mname?: string; // Material name
    tname?: string; // Transporter name
    cname?: string; // Customer name
    sname?: string; // Supplier name
    apikey?: string;
    uid?: number;
    udt?: string; // Updated date time
    driver?: string;
    remarks?: string;
    fwtdt?: string;
}

export interface WlogResponse {
    data: WlogEntry[];
    next?: { page: number; limit: number } | null;
    previous?: { page: number; limit: number } | null;
    total?: number;
}

class WlogApi {
    private getAuthHeaders() {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` })
        };
    }

    // Get weight log entries with pagination and search
    async getWlogEntries(page: number = 1, limit: number = 10, search?: string): Promise<WlogResponse> {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString()
        });

        if (search) {
            params.append('search', search);
        }

        const response = await fetch(`${API_BASE_URL}/wlog?${params}`, {
            headers: this.getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch wlog entries: ${response.statusText}`);
        }

        return response.json();
    }

    // Create new weight log entry
    async createWlogEntry(entry: Partial<WlogEntry>): Promise<WlogEntry> {
        const response = await fetch(`${API_BASE_URL}/wlog`, {
            method: 'POST',
            headers: this.getAuthHeaders(),
            body: JSON.stringify(entry)
        });

        if (!response.ok) {
            throw new Error(`Failed to create wlog entry: ${response.statusText}`);
        }

        return response.json();
    }

    // Update weight log entry
    async updateWlogEntry(id: number, entry: Partial<WlogEntry>): Promise<WlogEntry> {
        const response = await fetch(`${API_BASE_URL}/wlog/${id}`, {
            method: 'PUT',
            headers: this.getAuthHeaders(),
            body: JSON.stringify(entry)
        });

        if (!response.ok) {
            throw new Error(`Failed to update wlog entry: ${response.statusText}`);
        }

        return response.json();
    }

    // Delete weight log entry
    async deleteWlogEntry(id: number): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/wlog/${id}`, {
            method: 'DELETE',
            headers: this.getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error(`Failed to delete wlog entry: ${response.statusText}`);
        }
    }

    // Get weight log entry by ID
    async getWlogEntryById(id: number): Promise<WlogEntry> {
        const response = await fetch(`${API_BASE_URL}/wlog/${id}`, {
            headers: this.getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch wlog entry: ${response.statusText}`);
        }

        return response.json();
    }
}

export const wlogApi = new WlogApi();
