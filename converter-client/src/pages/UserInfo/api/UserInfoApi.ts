import { getConfig } from '../../../utils/config';

const { BACKEND_BASE_URL } = getConfig();

export const updatePassword = async (
  accessToken: string,
  oldPassword: string,
  newPassword: string
) => {
  const response = await fetch(`${BACKEND_BASE_URL}/user/update-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ oldPassword, newPassword }),
  });
  return response;
};
