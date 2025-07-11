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
  // Pegando os novos campos do formulário
  const cidade = formData.get('cidade') as string | null;
  const bairro = formData.get('bairro') as string | null;

  try {
    // Adicionando os novos campos na validação
    if (!token || !nome || !idade || !peso || !cidade || !bairro || img.size === 0)
      throw new Error('Preencha todos os dados.');
      
    const { url } = PHOTO_POST();

    // COMENTÁRIO: O backend (API) precisa ser atualizado para receber,
    // validar e salvar os novos campos 'cidade' e 'bairro' que
    // já estão sendo enviados no corpo da requisição (formData).
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    });
    if (!response.ok) throw new Error('Email ou usuário já cadastrado.');
  } catch (error: unknown) {
    return apiError(error);
  }
  revalidateTag('photos');
  redirect('/conta');
}