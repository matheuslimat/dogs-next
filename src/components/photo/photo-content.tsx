'use client';

import React from 'react';
import styles from './photo-content.module.css';
import PhotoComments from './photo-comments';
import PhotoDelete from './photo-delete';
import Link from 'next/link';
import { useUser } from '@/context/user-context';
import Image from 'next/image';
import { PhotoData } from '@/actions/photo-get';
import ExpandirIcon from '@/icons/ExpandirIcon';

const PhotoContent = ({
  data,
  single,
}: {
  data: PhotoData;
  single: boolean;
}) => {
  const { user } = useUser();
  const { photo, comments } = data;

  return (
    <div className={`${styles.photo} ${single ? styles.single : ''}`}>
      <div className={styles.img}>
        <Image
          src={photo.src}
          alt={photo.title}
          width={1000}
          height={1000}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </div>
      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            {user && user.username === photo.author ? (
              <PhotoDelete id={String(photo.id)} />
            ) : (
              <Link href={`/perfil/${photo.author}`}>@{photo.author}</Link>
            )}
            <span className={styles.visualizacoes}>
              {photo.acessos}
              {!single && (
                <a href={`/foto/${photo.id}`} className={styles.expandir}>
                  <ExpandirIcon />
                </a>
              )}
            </span>
          </p>
          <h1 className="title">
            <Link href={`/foto/${photo.id}`}>{photo.title}</Link>
          </h1>
          <ul className={styles.attributes}>
            <li>{photo.peso} kg</li>
            <li>{photo.idade} anos</li>
            {photo.cidade && photo.bairro && (
              <li>{`${photo.cidade} - ${photo.bairro}`}</li>
            )}
          </ul>
        </div>
      </div>
      <PhotoComments
        single={single}
        id={photo.id}
        comments={comments}
        photo={photo}
      />
    </div>
  );
};

export default PhotoContent;