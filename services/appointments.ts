import api from "../utils/api"

export async function getAppointments () {
    try {
        const response = await api.get('/appointments')
        return response
    } catch (error) {
        console.error('failed to fetch appointments: ', error)
    }
}