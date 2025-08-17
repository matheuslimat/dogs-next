'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './photo-comments-form.module.css';
import EnviarIcon from '@/icons/enviar-icon';
import { Photo } from '@/actions/photos-get';
import PawHandsIcon from '@/icons/PawHandsIcon';

export default function PhotoCommentsFormGuest({
  single,
  photo,
}: {
  single: boolean;
  photo: Photo;
}) {
  const router = useRouter();
  const [comment, setComment] = React.useState('');

  function handleTextareaClick() {
    router.push('/login');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push('/login');
  }

  function handleAdoptClick() {
    router.push('/login');
  }

  function handleCommentSubmit() {
    router.push('/login');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.form} ${single ? styles.single : ''}`}
    >
      <textarea
        className={styles.textarea}
        placeholder="Faça login para comentar..."
        value={comment}
        onChange={({ target }) => setComment(target.value)}
        onClick={handleTextareaClick}
        readOnly
      ></textarea>

      <div className={styles.actionsContainer}>
        <button 
          type="button" 
          className={styles.button}
          onClick={handleCommentSubmit}
        >
          <EnviarIcon />
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={handleAdoptClick}
          aria-label="Adotar"
        >
          <PawHandsIcon />
        </button>
      </div>
    </form>
  );
}