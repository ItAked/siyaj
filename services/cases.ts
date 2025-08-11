import api from "../src/utils/api"

export async function readCasesStatus () {
    try {
        const response = await api.get('/cases/status')
        return response.data
    } catch (error) {
        console.error('failed to fetch cases status: ', error)
    }
}

export async function getCases(value?: string, search?: string, page: number = 1) {
    const params: Record<string, unknown> = {page};
    if (value) params.value = value;
    if (search) params.search = search;
    const response = await api.get('/cases', { params });
    return response.data;
}

export async function createCase(newCase: FormData) {
    try {
        const response = await api.post('/create-case', newCase);
        return response.data
    } catch (error) {
        console.error('failed to create case: ', error)
    }
}

export async function updateCaseStatus(id: number, data: { status: string }) {
    try {
        const response = await api.post(`/update-case-status/${id}`, data);
        return response;
    } catch (error) {
        console.error('failed to update cases status: ', error)
    }
}