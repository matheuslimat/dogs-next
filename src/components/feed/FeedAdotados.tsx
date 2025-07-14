import React from 'react';
import styles from './feed.module.css';
import adoptedStyles from './FeedAdotados.module.css';

const mockAdoptedPhotos = [
  {
    id: 101,
    src: '/assets/adotado_1.png',
    title: 'Rex (Adotado)',
    acessos: '150',
  },
  {
    id: 102,
    src: '/assets/adotado_2.png',
    title: 'Luna (Adotada)',
    acessos: '200',
  },
  {
    id: 103,
    src: '/assets/adotado_3.png',
    title: 'Bolinha (Adotado)',
    acessos: '95',
  },
  {
    id: 104,
    src: '/assets/adotado_4.png',
    title: 'Bolinha (Adotado)',
    acessos: '95',
  },
  {
    id: 105,
    src: '/assets/adotado_5.png',
    title: 'Bolinha (Adotado)',
    acessos: '95',
  },
  {
    id: 105,
    src: '/assets/adotado_6.png',
    title: 'Bolinha (Adotado)',
    acessos: '95',
  },
];

export default function FeedAdotados() {
  return (
    <div>
      <h1 className="title">Cachorros que encontraram um lar</h1>
      <ul className={`${styles.feed} animeLeft`}>
        {mockAdoptedPhotos.map((photo, i) => (
          <li
            className={`${styles.photo} ${adoptedStyles.photoAdopted}`}
            key={photo.id + i}
          >
            <img src={photo.src} alt={photo.title} />
            <span className={adoptedStyles.adoptedOverlay}>Adotado</span>
          </li>
        ))}
      </ul>
    </div>
  );
}