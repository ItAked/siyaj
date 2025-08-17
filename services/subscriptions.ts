import api from "../utils/api";

export async function readSubscriptions(page: number = 1) {
    const params: Record<string, unknown> = {page};
    const response = await api.get('/subscriptions', { params });
    return response.data
}

export async function createSubscriptions(data: { name: string; price: number; }) {
    try {
        const response = await api.post('/create-subscription', data);
        return response.data
    } catch (error) {
        console.error('failed to create new subscription: ', error)
    }
}

export async function deleteSubscriptions(id: number) {
    const response = await api.delete(`/delete-subscription/${id}`);

    return response
}

export async function updateSubscription(id: number, data: { name: string; price: number; }) {
    const response = await api.put(`/update-subscription/${id}`, data);
    return response.data
}