'use server';

import { PHOTO_POST } from '@/functions/api';
import apiError from '@/functions/api-error';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function photoPost(state: {}, formData: FormData) {
  const token = cookies().get('token')?.value;
  const nome = formData.get('nome') as string | null;
  const idade = formData.get('idade') as string | null;
  const peso = formData.get('peso') as string | null;
  const img = formData.get('img') as File;
  const cidade = formData.get('cidade') as string | null;
  const bairro = formData.get('bairro') as string | null;
  const telefone = formData.get('telefone') as string | null;

  try {
    if (!token || !nome || !idade || !peso || !cidade || !bairro || !telefone || img.size === 0)
      throw new Error('Preencha todos os dados.');
      
    const { url } = PHOTO_POST();

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    });
    if (!response.ok) throw new Error('Ops! Algo deu errado... Mas não se preocupe, tente novamente daqui a pouquinho use o formato da foto .jpg ou .jpeg');
  } catch (error: unknown) {
    return apiError(error);
  }
  revalidateTag('photos');
  redirect('/conta');
}