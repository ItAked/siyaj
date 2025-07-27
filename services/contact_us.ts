import api from "../src/utils/api"

export async function contactUs (data: FormData) {
    const response = await api.post('/contact-us', data)
    return response.data
}