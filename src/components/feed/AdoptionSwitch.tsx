'use client';

import React from 'react';
import styles from './AdoptionSwitch.module.css';

interface AdoptionSwitchProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AdoptionSwitch({
  checked,
  onChange,
}: AdoptionSwitchProps) {
  return (
    <div className={styles.switchContainer}>
      <span className={styles.label}>Filtrar adotados</span>
      <label className={styles.switch}>
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
}