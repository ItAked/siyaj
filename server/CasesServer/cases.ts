import axios from "axios"

export async function getCases(value?: string, search?: string, page: number = 1) {
  const params: Record<string, unknown> = {page};

  if (value) params.value = value;
  if (search) params.search = search;

  const response = await axios.get('http://127.0.0.1:8000/api/cases', { params, headers:{Authorization:`Bearer ${localStorage.getItem('token')}`} });
  return response.data;
}
