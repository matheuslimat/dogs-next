'use client';

import Link from 'next/link';
import styles from './header.module.css';
import Image from 'next/image';
import { useUser } from '@/context/user-context';
import ThemeToggle from './theme-toggle';
import CoracaoIcon from '@/icons/coracao-icon';

export default function Header() {
  const { user } = useUser();

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} href={'/'}>
          <Image
            src={'/assets/dogs.svg'}
            alt="Dogs"
            width={36}
            height={30}
            priority
          />
        </Link>
        <div className={styles.rightSection}>
          <Link className={styles.donateButton} href={'/doacao'}>
            <CoracaoIcon />
            <span>Doar</span>
          </Link>
          <ThemeToggle />
          {user ? (
            <Link className={styles.login} href={'/conta'}>
              {user.username}
            </Link>
          ) : (
            <Link className={styles.login} href={'/login'}>
              Login / Criar
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
