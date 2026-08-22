import { envValues } from '@/constants/envValues';

interface AppointmentPayload {
  card_id: string;
  name: string;
  mobile: string;
  date_time: string;
  comments: string;
}

interface AppointmentResponse {
  message: string;
  data: [];
}

export async function saveAppointment(payload: AppointmentPayload): Promise<AppointmentResponse> {
  const formData = new FormData();
  formData.append('card_id', payload.card_id);
  formData.append('name', payload.name);
  formData.append('mobile', payload.mobile);
  formData.append('date_time', payload.date_time);
  formData.append('comments', payload.comments);

  const response = await fetch(`${envValues.apiUrl}/save_appointment`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to save appointment');
  }

  return response.json();
}
