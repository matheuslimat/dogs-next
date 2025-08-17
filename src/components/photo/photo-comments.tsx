'use client';

import React from 'react';
import PhotoCommentsForm from './photo-comments-form';
import PhotoCommentsFormGuest from './photo-comments-form-guest';
import styles from './photo-comments.module.css';
import { useUser } from '@/context/user-context';
import { Comment } from '@/actions/photo-get';
import { Photo } from '@/actions/photos-get';
import CommentDeleteButton from './comment-delete-button'; // 1. Importa o novo botão

const PhotoComments = (props: {
  single: boolean;
  id: number;
  comments: Comment[];
  photo: Photo;
}) => {
  const [comments, setComments] = React.useState(() => props.comments);
  const commentsSection = React.useRef<HTMLUListElement>(null);
  const { user } = useUser();

  React.useEffect(() => {
    setComments(props.comments);
  }, [props.comments]);

  React.useEffect(() => {
    if (commentsSection.current) {
      commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
    }
  }, [comments]);

  return (
    <>
      <ul
        ref={commentsSection}
        className={`${styles.comments} ${props.single ? styles.single : ''}`}
      >
        {comments.map((comment) => (
          // 2. Cada comentário agora é envolvido por uma div para controlar o hover
          <div key={comment.id} className={styles.commentItem}>
            <li>
              <b>{comment.author}: </b>
              <span>{comment.comment}</span>
            </li>
            {/* 3. O botão de deletar só aparece se o usuário logado for o autor */}
            {user && user.username === comment.author && (
              <CommentDeleteButton id={comment.id} setComments={setComments} />
            )}
          </div>
        ))}
      </ul>
      {user ? (
        <PhotoCommentsForm
          single={props.single}
          id={props.id}
          setComments={setComments}
          photo={props.photo}
        />
      ) : (
        <PhotoCommentsFormGuest
          single={props.single}
          photo={props.photo}
        />
      )}
    </>
  );
};

export default PhotoComments;