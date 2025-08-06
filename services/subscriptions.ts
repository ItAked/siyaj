import api from "../src/utils/api";

export async function assignSubscription(form: FormData) {
    try {
        const response = await api.post('/subscribe', form);
        return response.data
    } catch (error) {
        console.error('failed to subscribe: ', error)
    }
}

export async function readLastSubscribe(page: number = 1) {
    try {
        const params: Record<string, unknown> = {page};
        const response = await api.get('/subscribe/showSubscribe', { params });
        return response.data
    } catch (error) {
        console.error('failed to read last subscription: ', error)
    }
}

export async function readSubscriptions(page: number = 1) {
    const params: Record<string, unknown> = {page};
    const response = await api.get('/subscriptions', { params });
    return response.data
}