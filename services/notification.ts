import api from "../src/utils/api"

export async function updateNotification(id: string) {
    try {
        const response = await api.post(`/notification/read/${id}`, {})
        return response
    } catch (error) {
        console.error('failed to update: ', error)
    }
}

export async function readNotifications() {
    try {
        const response = await api.get('/notifications')
        return response.data
    } catch (error) {
        console.error('failed to fetch notifications: ', error)
    }
}