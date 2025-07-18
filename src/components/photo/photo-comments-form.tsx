'use client';

import { useFormState, useFormStatus } from 'react-dom';
import styles from './photo-comments-form.module.css';
import EnviarIcon from '@/icons/enviar-icon';
import ErrorMessage from '../helper/error-message';
import { Comment } from '@/actions/photo-get'; // Importa Comment
import { Photo } from '@/actions/photos-get'; // Importa Photo
import commentPost from '@/actions/comment-post';
import React from 'react';
import PawHandsIcon from '@/icons/PawHandsIcon';

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.button} disabled={pending}>
      <EnviarIcon />
    </button>
  );
}

export default function PhotoCommentsForm({
  single,
  id,
  setComments,
  photo,
}: {
  single: boolean;
  id: number;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  photo: Photo;
}) {
  const [state, action] = useFormState(commentPost, {
    ok: false,
    data: null,
    error: '',
  });

  const [comment, setComment] = React.useState('');

  React.useEffect(() => {
    if (state.ok && state.data) {
      setComments((comments) => [...comments, state.data]);
      setComment('');
    }
  }, [state, setComments]);

  // logica de whatsapp
  function handleAdoptClick() {

    const phoneNumberWithCountryCode = `55${photo.telefone}`;
    
    const cleanPhoneNumber = phoneNumberWithCountryCode.replace(/\D/g, ''); 
    const message = `Olá! Vi seu anúncio no site Adopt-me App - Tenho interesse em adotar o pet "${photo.title}", que pesa ${photo.peso}kg e tem ${photo.idade} anos.`;
    const whatsappUrl = `https://wa.me/${cleanPhoneNumber}?text=${encodeURIComponent(
      message,
    )}`;
    window.open(whatsappUrl, '_blank');
  }

  return (
    <form
      action={action}
      className={`${styles.form} ${single ? styles.single : ''}`}
    >
      <input type="hidden" name="id" id="id" value={id} />
      <textarea
        className={styles.textarea}
        name="comment"
        id="comment"
        placeholder="Comente..."
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      ></textarea>

      <div className={styles.actionsContainer}>
        <FormButton />
        <button
          type="button"
          className={styles.button}
          onClick={handleAdoptClick}
          aria-label="Adotar"
        >
          <PawHandsIcon />
        </button>
      </div>

      <ErrorMessage error={state.error} />
    </form>
  );
}