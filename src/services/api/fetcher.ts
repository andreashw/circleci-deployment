import axios from 'axios';
import Cookies from 'js-cookie';
import Router from 'next/router';

export interface IPayload {
  method?: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';
  body?: FormData | object;
  params?: object;
}

export async function fetcher<T>(url: string, payload?: IPayload, formdata: boolean = false, blob = false): Promise<T> {
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
        'Content-Type': formdata ? 'multipart/form-data' : '',
      },
      responseType: blob ? 'blob' : 'json',
    });

    return fetchData.data?.data || fetchData.data?.response || fetchData.data;
  } catch (error: any) {
    console.log(error.response.status, 'tes');
    if (error.response.status === 401) {
      Cookies.remove('token');
      Router.replace('/login');
    } else if (error.response.status === 400) {
      throw error.response;
    } else if (error.response.status === 500) {
      throw error.response;
    } else if (error.response.status === 404) {
      console.log('====================================');
      console.log(error.response);
      console.log('====================================');
      throw error.response;
    } else {
      throw error.response;
    }
    throw error.response;
  }
}
