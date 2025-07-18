'use client';

import photosGet, { Photo } from '@/actions/photos-get';
import FeedPhotos from './feed-photos';
import React from 'react';
import Loading from '@/components/helper/loading';
import styles from './feed.module.css';
import RotatingHeadline from './RotatingHeadline';
import { Spectral } from 'next/font/google';
import AdoptionSwitch from './AdoptionSwitch';
import FeedAdotados from './FeedAdotados';
import { motion, AnimatePresence } from 'framer-motion';
import FilterIcon from '@/icons/FilterIcon';

const spectral = Spectral({
  weight: ['700'],
  subsets: ['latin'],
  display: 'swap',
});

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    position: 'absolute',
  }),
  center: {
    x: 0,
    opacity: 1,
    position: 'relative',
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    position: 'absolute',
  }),
};

export default function Feed({
  photos,
  user,
}: {
  photos: Photo[];
  user?: 0 | string;
}) {
  const [photosFeed, setPhotosFeed] = React.useState<Photo[]>(photos);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [infinite, setInfinite] = React.useState(photos.length >= 6);

  const [view, setView] = React.useState<'default' | 'adopted'>('default');
  const [direction, setDirection] = React.useState(0);

  // Estados para o filtro de cidade
  const [filteredPhotos, setFilteredPhotos] = React.useState<Photo[]>(photos);
  const [showCityFilter, setShowCityFilter] = React.useState(false);
  const [city, setCity] = React.useState('');

  const headlineTexts = [
    'Adote - Salve uma vida ❤️',
    'Encontre seu melhor amigo 🐾',
    'Um ato de amor, uma vida de alegria ✨',
    'Eles só precisam de uma chance 🙏',
    'Abra seu coração, adote um pet 🏡',
    'Adoção é o elo que nos une 🔗',
    'Mude uma vida para sempre. Adote! 💖',
    'Menos um na rua, mais amor na sua casa 🏠',
    'Encontre a felicidade de quatro patas 🐕',
    'Seja o herói na vida de um animal 🦸',
  ];

  const fetching = React.useRef(false);
  function infiniteScroll() {
    if (fetching.current || view === 'adopted' || city.trim() !== '') return; // Desabilita scroll infinito se estiver filtrando
    fetching.current = true;
    setLoading(true);
    setTimeout(() => {
      setPage((currentPage) => currentPage + 1);
      fetching.current = false;
      setLoading(false);
    }, 1000);
  }

  const handleFilterChange = () => {
    if (view === 'default') {
      setDirection(1);
      setView('adopted');
    } else {
      setDirection(-1);
      setView('default');
    }
  };

  React.useEffect(() => {
    if (page === 1) return;
    async function getPagePhotos(page: number) {
      const actionData = await photosGet(
        { page, total: 6, user: 0 },
        { cache: 'no-store' },
      );
      if (actionData && actionData.data !== null) {
        const { data } = actionData;
        setPhotosFeed((currentPhotos) => [...currentPhotos, ...data]);
        if (data.length < 6) setInfinite(false);
      }
    }
    getPagePhotos(page);
  }, [page]);

  React.useEffect(() => {
    if (infinite && view === 'default') {
      window.addEventListener('scroll', infiniteScroll);
      window.addEventListener('wheel', infiniteScroll);
    } else {
      window.removeEventListener('scroll', infiniteScroll);
      window.removeEventListener('wheel', infiniteScroll);
    }
    return () => {
      window.removeEventListener('scroll', infiniteScroll);
      window.removeEventListener('wheel', infiniteScroll);
    };
  }, [infinite, view]);

  React.useEffect(() => {
    if (city.trim() === '') {
      setFilteredPhotos(photosFeed);
    } else {
      const newFilteredPhotos = photosFeed.filter((photo) =>
        photo.cidade.toLowerCase().includes(city.toLowerCase()),
      );
      setFilteredPhotos(newFilteredPhotos);
    }
  }, [city, photosFeed]);

  return (
    <div>
      <div className={styles.feedHeader}>
        <RotatingHeadline
          texts={headlineTexts}
          fontClassName={spectral.className}
        />
        {/* Container para agrupar os filtros */}
        <div className={styles.filtersContainer}>
          <AdoptionSwitch
            checked={view === 'adopted'}
            onChange={handleFilterChange}
          />
          <button
            className={styles.filterButton}
            onClick={() => setShowCityFilter(!showCityFilter)}
            aria-label="Filtrar por cidade"
          >
            <FilterIcon />
          </button>
        </div>
      </div>

      {/* Input do filtro que aparece/desaparece */}
      <AnimatePresence>
        {showCityFilter && (
          <motion.div
            className={styles.cityFilterContainer}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Digite o nome da cidade..."
              className={styles.cityFilterInput}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.feedContainer}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={view}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'tween', ease: 'easeInOut', duration: 0.5 },
              opacity: { ease: 'easeInOut', duration: 0.5 },
            }}
            className={styles.motionDiv}
          >
            {view === 'default' ? (
              <>
                {/* Renderiza as fotos FILTRADAS */}
                <FeedPhotos photos={filteredPhotos} />
                <div className={styles.loadingWrapper}>
                  {infinite && !city ? ( // Só mostra loading se não estiver filtrando
                    loading && <Loading />
                  ) : (
                    <p>
                      {filteredPhotos.length === 0 && city
                        ? `Nenhum resultado para "${city}".`
                        : 'Não existem mais postagens.'}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <FeedAdotados />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}