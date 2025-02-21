import axios from 'axios';
import { toast } from 'react-toastify';

interface Config {
  headers: {
    'Content-Type': string;
    authorization?: string;
  };
  method: string;
  body?: string;
  token?: string;
}

export const client = async (
  endpoint: string,
  { body, token, ...customConfig }: { body?: string; token?: string } = {}
) => {
  const usertoken = localStorage.getItem('access_token');

  const config: Config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (body) {
    config.body = body;
  }

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }

  if (!token && usertoken) {
    config.headers.authorization = `Bearer ${usertoken}`;
  }

  const res = await fetch(endpoint, config);
  const data = await res.json();
  // if (res.status !== 200) {
  //   return toast(data.message);
  // }
  // console.log('ok');
  // console.log(data);
  return data;
};
