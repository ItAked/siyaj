import api from "../utils/api"

export const readCasesStatus = async () => {
    try {
        const response = await api.get('/cases/status')

        return response.data
    } catch (error) {
        console.error('get cases status failed: ', error)
    }
}

export const getCases = async (value?: string, search?: string, page: number = 1) => {
    const params: Record<string, unknown> = { page };
    if (value) params.value = value;
    if (search) params.search = search;

    try {
        const response = await api.get('/cases', { params });
        return response.data;
    } catch (error) {
        console.error('failed to read cases: ', error);
        throw error;
    }
}

export const assignCases = async (id: number, data: { cases: number[], is_checked: boolean }) => {
    try {
        const response = await api.post(`/assign-case/${id}`, data)
        return response
    } catch (error) {
        console.error('failed to assign cases: ', error)
    }
}

export const assignServices = async (id: number, data: { services: number[], is_checked: boolean }) => {
    const response = await api.post(`/assign-services/${id}`, data)
    return response.data
}

export async function readCaseById(id: number) {    
    const response = await api.get(`/case/${id}`);
    return response.data
}