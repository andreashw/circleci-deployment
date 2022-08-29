import { HOSTNAME } from '@helper/environments';
import axios from 'axios';
import Cookies from 'js-cookie';

export async function AutomobileGet(): Promise<any> {
  const url = `${HOSTNAME}/api/v1/automobiles/`;
  const token = Cookies.get('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const promise = await axios.get(url, config);
  return promise.data;

  // const response = await httpRequestFormData<any>(url, 'POST', formData);
}
