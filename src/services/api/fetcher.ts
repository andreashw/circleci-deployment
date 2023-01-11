import axios from 'axios';
import Cookies from 'js-cookie';
import Router from 'next/router';

export interface IPayload {
  method?: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';
  body?: FormData | object;
  params?: object;
}

export async function fetcher<T>(url: string, payload?: IPayload, blob = false): Promise<T> {
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
      responseType: blob ? 'blob' : 'json',
    });

    return fetchData.data?.data || fetchData.data?.response || fetchData.data;
  } catch (error: any) {
    console.log(error.response.status, 'tes');
    if (error.response.status === 401) {
      Router.push('/login');
      Cookies.remove('token');
    } else if (error.response.status === 400) {
      // throw new Error('Something Wrong');
      throw error.response;
    }
    throw error;
  }
}
