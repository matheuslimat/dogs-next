'use client';

import React from 'react';
import PhotoCommentsForm from './photo-comments-form';
import styles from './photo-comments.module.css';
import { useUser } from '@/context/user-context';
import { Comment } from '@/actions/photo-get';
import { Photo } from '@/actions/photos-get';

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
          <li key={comment.id}> 
            <b>{comment.author}: </b>
            <span>{comment.comment}</span>
          </li>
        ))}
      </ul>
      {user && (
        <PhotoCommentsForm
          single={props.single}
          id={props.id}
          setComments={setComments}
          photo={props.photo}
        />
      )}
    </>
  );
};

export default PhotoComments;