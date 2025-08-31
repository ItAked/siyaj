import api from "../utils/api";

export async function createService(data: {title: string, description: string, type: string, price: number}) {
    const response = await api.post('/create-service', data)
    return response.data
}