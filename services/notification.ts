import api from "../src/utils/api"

export async function updateNotification(id: string) {
    const response = await api.post(`/notification/read/${id}`, {})
    return response
}

export async function readNotifications() {
    const response = await api.get('/notifications')
    return response.data
}