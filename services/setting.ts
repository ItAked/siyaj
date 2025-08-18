import api from "../src/utils/api";

export async function readSetting() {
    const response = await api.get('/setting');
    return response.data
}

export async function updateSetting(data: { name: string|undefined; email: string|undefined; phone: string|undefined; }) {
    console.log(data);
    
    const response = await api.post(`/update-setting`, data);
    return response.data
}