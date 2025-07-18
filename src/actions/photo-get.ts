'use server';

import { PHOTO_GET } from '@/functions/api';
import apiError from '@/functions/api-error';
import { Photo } from './photos-get';

export type Comment = {
  id: string;
  author: string;
  comment: string;
  date: string;
};

export type PhotoData = {
  photo: Photo;
  comments: Comment[];
};

export default async function photoGet(id: string) {
  try {
    const { url } = PHOTO_GET(id);
    const response = await fetch(url, {
      next: {
        revalidate: 60,
        tags: ['photos', 'comment'],
      },
    });
    if (!response.ok) throw new Error('Erro ao pegar a foto.');
    const data = (await response.json()) as PhotoData;
    return { data, ok: true, error: '' };
  } catch (error) {
    return apiError(error);
  }
}
