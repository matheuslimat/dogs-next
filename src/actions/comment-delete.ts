'use server';

import { COMMENT_DELETE } from '@/functions/api';
import apiError from '@/functions/api-error';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export default async function commentDelete(id: string) {
  const token = cookies().get('token')?.value;
  try {
    if (!token) throw new Error('Token inválido');
    const { url } = COMMENT_DELETE(id);
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (!response.ok) throw new Error('Erro ao deletar o comentário.');
    revalidateTag('comment');
    return { ok: true, error: '' };
  } catch (error: unknown) {
    return apiError(error);
  }
}