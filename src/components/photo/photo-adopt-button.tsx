'use client';
import React from 'react';
import styles from './photo-adopt-button.module.css';
import photoAdopt from '@/actions/photo-adopt';

// O botão agora recebe o status inicial de adoção
export default function PhotoAdoptButton({
  id,
  initialAdopted,
}: {
  id: string;
  initialAdopted: boolean;
}) {
  const [loading, setLoading] = React.useState(false);
  const [adopted, setAdopted] = React.useState(initialAdopted);

  async function handleClick() {
    setLoading(true);
    const confirmationMessage = adopted
      ? 'Deseja marcar como "não adotado"?'
      : 'Deseja marcar como "adotado"?';

    if (window.confirm(confirmationMessage)) {
      const { data, ok } = await photoAdopt(id);
      if (ok && data) {
        // Atualiza o estado com a resposta do servidor
        setAdopted(data.adotado);
      }
    }
    setLoading(false);
  }

  // Define a classe e o texto do botão com base no estado 'adopted'
  const buttonClass = `${styles.button} ${adopted ? styles.adopted : ''}`;
  const buttonText = adopted ? 'Adotado' : 'Marcar Adoção';
  const loadingText = adopted ? 'Alterando...' : 'Adotando...';

  return (
    <button onClick={handleClick} className={buttonClass} disabled={loading}>
      {loading ? loadingText : buttonText}
    </button>
  );
}