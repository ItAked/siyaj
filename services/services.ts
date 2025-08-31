import api from "../utils/api";

export async function createService(data: {title: string, description: string, type: string, price: number}) {
    const response = await api.post('/create-service', data)
    return response.data
}

export async function readServices(page: number = 1) {
    const params: Record<string, unknown> = {page};
    const response = await api.get('/services', { params })
    return response.data
}

export async function updateService(id: number, data: {title: string, description: string, type: string, price: number}) {
    const response = await api.post(`/update-service/${id}`, data)
    return response.data
}

export async function removeService(id: number) {
    const response = await api.delete(`/remove-service/${id}`)
    return response.data
}