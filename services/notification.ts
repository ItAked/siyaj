import api from "../src/utils/api"

export async function readNotifications() {
    const response = await api.get('/notifications')
    return response.data
}