import api from "../src/utils/api"

export async function readCasesStatus () {
    const response = await api.get('/cases/status')
    return response.data
}

export async function getCases(value?: string, search?: string, page: number = 1) {
    const params: Record<string, unknown> = {page};
    if (value) params.value = value;
    if (search) params.search = search;
    const response = await api.get('/cases', { params });
    return response.data;
}

export async function createCase(newCase: FormData) {
    const response = await api.post('/create-case', newCase);
    return response.data
}

export async function updateCaseStatus(id: number, data: { status: string }) {
    const response = await api.post(`/update-case-status/${id}`, data);
    return response.data;
}

export async function readCaseById(id: number) {
    console.log(id);
    
    const response = await api.get(`/case/${id}`);
    return response.data
}

export async function updateCaseById(form: FormData, id: number) {
    const response = await api.post(`/update-case/${id}`, form)
    return response.data
}