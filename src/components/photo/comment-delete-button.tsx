'use client';
import React from 'react';
import styles from './photo-comments.module.css';
import commentDelete from '@/actions/comment-delete';

type CommentUpdater = React.Dispatch<React.SetStateAction<any[]>>;

export default function CommentDeleteButton({ id, setComments }: { id: string, setComments: CommentUpdater }) {
  const [loading, setLoading] = React.useState(false);

  async function handleClick() {
    const confirm = window.confirm('Tem certeza que deseja deletar este comentário?');
    if (confirm) {
      setLoading(true);
      const { ok } = await commentDelete(id);
      if (ok) {
        setComments(comments => comments.filter(comment => comment.comment_ID !== id));
      }
      setLoading(false);
    }
  }

  return (
    <>
      {loading ? (
        <button className={styles.deleteButton} disabled>Deletando...</button>
      ) : (
        <button className={styles.deleteButton} onClick={handleClick}>Deletar</button>
      )}
    </>
  );
}