import api from "../utils/api";

export async function readSetting() {
    try {
        const response = await api.get('/setting');
        return response.data
    } catch (error) {
        console.error('failed to fetch setting: ', error)
    }
}

export async function updateSetting(data: { name: string|undefined; email: string|undefined; phone: string|undefined; }) {
    try {
        const response = await api.put(`/update-setting`, data);
        return response
    } catch (error) {
        console.error('failed to update profile: ', error)
    }
}