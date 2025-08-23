import api from "../src/utils/api";
import { removeToken } from "../src/utils/auth";

export async function readSetting() {
    const response = await api.get('/setting');
    return response.data
}

export async function updateSetting(data: { name: string|undefined; email: string|undefined; phone: string|undefined; license: string|undefined; medical: string|undefined
    employer: string|undefined;
}) {    
    const response = await api.post(`/update-setting`, data);
    return response.data
}

export async function deleteAccount() {
    const response = await api.delete('/delete-account')
    removeToken()
    return response.data
}