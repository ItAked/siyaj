import api from "../src/utils/api";

export async function getPayments(page: number = 1) {
    try {
        const params: Record<string, unknown> = {page};
        const response = await api.get('/subscribes', { params })
        return response.data;
    } catch (error) {
        console.error('failed to fetch payments: ', error)
    }
}