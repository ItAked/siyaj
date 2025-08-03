import api from "../utils/api";

export async function readSetting() {
    try {
        const response = await api.get('/setting');
        return response.data
    } catch (error) {
        console.error('failed to fetch setting: ', error)
    }
}

export async function updateSetting(data: FormData) {
    const response = await api.post(`/update-setting`, data);
    return response.data
}