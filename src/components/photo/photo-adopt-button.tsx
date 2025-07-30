'use client';
import React from 'react';
import styles from './photo-adopt-button.module.css';
import photoAdopt from '@/actions/photo-adopt';

export default function PhotoAdoptButton({ id }: { id: string }) {
  const [loading, setLoading] = React.useState(false);
  async function handleClick() {
    setLoading(true);
    const confirm = window.confirm('Tem certeza que deseja marcar como adotado?');
    if (confirm) {
      await photoAdopt(id);
    }
    setLoading(false);
  }
  return (
    <>
      {loading ? (
        <button className={styles.adopt} disabled>
          Adotando...
        </button>
      ) : (
        <button className={styles.adopt} onClick={handleClick}>
          Adotado
        </button>
      )}
    </>
  );
}