import api from "../utils/api";

export async function readLawyers(search?: string, page: number = 1) {
    const params: Record<string, unknown> = {page};
    if (search) params.search = search;

    try {
        const response = await api.get('/lawyers', { params });
        return response;
    } catch (error) {
        console.error('failed to fetch lawyers: ', error)
    }

    
}

export async function createLawyer(data:FormData) {
    try {
        const response = await api.post('/create-lawyer', data)
        return response.data
    } catch (error) {
        console.error('failed to add lawyer: ', error)
    }
}