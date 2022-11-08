import axios from 'axios';
import Cookies from 'js-cookie';

export interface IPayload {
  method?: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';
  body?: FormData | object;
  params?: object;
}

export async function fetcher<T>(url: string, payload?: IPayload): Promise<T> {
  const token = Cookies.get('token');
  try {
    const fetchData = await axios({
      baseURL: process.env.NEXT_PUBLIC_HOST,
      url,
      method: payload?.method,
      data: payload?.body,
      params: payload?.params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return fetchData.data?.data || fetchData.data;
  } catch (error) {
    throw new Error('Something Wrong');
  }
}
