import axios from "axios";

export async function contactUs (data: FormData) {
    const response = await axios.post('http://127.0.0.1:8000/api/contact-us', data)

    return response.data
}