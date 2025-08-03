import api from "../src/utils/api";

export async function getPractitioners (status? :string, search?: string, page: number = 1) {
    try {
        const params: Record<string, unknown> = {page};
        if(status) params.status = status
        if(search) params.search = search
        const response = await api.get('/practitioners', { params })
        return response.data
    } catch (error) {
        console.error('failed to fetch practitioner: ', error)
    }
}