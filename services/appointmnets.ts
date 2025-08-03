import api from "../src/utils/api"

export async function getAppointments () {
    try {
        const response = await api.get('/appointments')
        return response.data
    } catch (error) {
        console.error('failed to fetch appointments: ', error)
    }
}

export async function createAppointment(data: unknown) {
    try {
        const response = await api.post('/create-appointment', data)
        return response.data
    } catch (error) {
        console.error('failed to create appointment: ', error)
    }
}

export async function updateAppointment(data: unknown, id:number) {
    try {
        const response = await api.put(`/update-appointment/${id}`, data)
        return response.data
    } catch (error) {
        console.error('failed to update appointment: ', error)
    }
}