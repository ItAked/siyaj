import api from "../utils/api"

export const readNotifications = async () => {
    try {
        const response = await api.get('/notifications')

        return response.data;

    } catch (error) {
        console.error('get notifications failed: ', error)
    }
}