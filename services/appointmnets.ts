import api from "../src/utils/api"

export async function getAppointments () {
    const response = await api.get('/appointments')
    return response.data
}

export async function createAppointment(data: unknown) {
    console.log(data);
    const response = await api.post('/create-appointment', data)
    return response.data
}

export async function updateAppointment(data: unknown, id:number) {
    const response = await api.post(`/update-appointment/${id}`, data)
    return response.data
}