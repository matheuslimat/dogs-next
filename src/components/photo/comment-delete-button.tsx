'use client';
import React from 'react';
import styles from './photo-comments.module.css';
import commentDelete from '@/actions/comment-delete';
import { Comment } from '@/actions/photo-get';
import { useRouter } from 'next/navigation';

type CommentUpdater = React.Dispatch<React.SetStateAction<Comment[]>>;

export default function CommentDeleteButton({
  id,
  setComments,
}: {
  id: string;
  setComments: CommentUpdater;
}) {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  async function handleClick() {
    setLoading(true);
    const { ok } = await commentDelete(id);
    setLoading(false);

    if (ok) {
      // Remove o comentário da lista na tela instantaneamente
      setComments((currentComments) =>
        currentComments.filter((comment) => comment.id !== id),
      );
      // Força a sincronização dos dados da página em segundo plano
      router.refresh();
    }
  }

  return (
    <>
      {loading ? (
        <button className={styles.deleteButton} disabled>
          Deletando...
        </button>
      ) : (
        <button className={styles.deleteButton} onClick={handleClick}>
          Deletar
        </button>
      )}
    </>
  );
}