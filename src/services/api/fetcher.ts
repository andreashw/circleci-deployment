import { HOSTNAME } from '@helper/environments';
import axios from 'axios';
import Cookies from 'js-cookie';

export interface IPayload {
  method: 'POST' | 'GET' | 'DELETE' | 'PUT';
  body: FormData | object;
  params: object;
}

export async function fetcher(url: string, payload?: IPayload) {
  const token = Cookies.get('token');
  try {
    const fetchData = await axios({
      baseURL: HOSTNAME,
      url,
      method: payload?.method,
      data: payload?.body,
      params: payload?.params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return fetchData.data;
  } catch (error) {
    return null;
  }
}
