import api from "../utils/api";

export async function getPractitioners (search?: string, page: number = 1) {
    const params: Record<string, unknown> = {page};
    if(search) params.search = search

    try {
        const response = await api.get('/practitioners', { params})
        return response
    } catch (error) {
        console.error('failed to fetch practitioners: ', error)
    }

}

export async function readPractitionerId(id: number) {
    try {
        const response = await api.get(`/practitioner/${id}`)
        return response.data
    } catch (error) {
        console.error('failed to fetch practitioner data: ', error)
    }
}