import { API_ACCESS_TOKEN } from '@env';

export const options = (
  method: 'GET' | 'POST' = 'GET',
  accept: string = 'application/json',
) => {
  return {
    method,
    headers: {
      accept,
      Authorization: `Bearer ${API_ACCESS_TOKEN}`,
    },
  };
};
