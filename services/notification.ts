import api from "../utils/api"

export const readNotifications = async () => {
    try {
        const response = await api.get('/notifications')

        return response.data;

    } catch (error) {
        console.error('get notifications failed: ', error)
    }
}

export const updateNotification = async (id: string) => {
    try {
        const response = await api.put(`/notification/read/${id}`, {})

        return response
    } catch (error) {
        console.error('update notifications failed: ', error)
    }
}