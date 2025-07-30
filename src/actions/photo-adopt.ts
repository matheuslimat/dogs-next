'use server';

import { PHOTO_ADOPT } from '@/functions/api';
import apiError from '@/functions/api-error';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function photoAdopt(id: string) {
  const token = cookies().get('token')?.value;
  try {
    if (!token) throw new Error('Token inválido');
    const { url } = PHOTO_ADOPT(id);
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (!response.ok) throw new Error('Erro ao marcar a foto como adotado.');
  } catch (error: unknown) {
    return apiError(error);
  }
  revalidateTag('photos');
  redirect('/conta');
}