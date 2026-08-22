import { envValues } from '@/constants/envValues';
import { type ConnectFormValues } from '@/lib/schemas';

interface SaveConnectionResponse {
  message: string;
  data: [];
}

export const saveContact = async (cardId: string, values: ConnectFormValues): Promise<SaveConnectionResponse> => {
  const formData = new FormData();
  formData.append('card_id', cardId);
  formData.append('name', values.name || '');
  formData.append('mobile', values.phone || '');
  formData.append('email', values.email || '');
  formData.append('job', values.jobTitle || '');
  formData.append('company', values.company || '');
  formData.append('note', values.notes || '');

  const response = await fetch(envValues.apiUrl + '/save_connection', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to save connection');
  }

  return response.json();
};
