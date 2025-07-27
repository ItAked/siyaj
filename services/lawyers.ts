import api from "../src/utils/api";

export async function readAllLawyers(search?: string, page: number = 1) {
    try {
        const params: Record<string, unknown> = {page};
        if (search) params.search = search;
        const response = await api.get('/lawyers', { params });
        return response.data;
    } catch (error) {
        console.error('failed to fetch lawyers: ', error)
    }
}