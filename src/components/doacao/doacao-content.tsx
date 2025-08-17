'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './doacao-content.module.css';
import Image from 'next/image';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const qrCodeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      type: "spring" as const,
      stiffness: 100
    }
  }
};

export default function DoacaoContent() {
  const pixKey = "teste@exemplo.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pixKey);
    alert('Chave PIX copiada para a área de transferência!');
  };

  return (
    <motion.div
      className={styles.container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className={styles.header} variants={itemVariants}>
        <h1 className={styles.title}>Ajude o Adopt-me</h1>
        <p className={styles.subtitle}>
          Sua doação nos ajuda a manter a plataforma funcionando
        </p>
      </motion.div>

      <motion.div className={styles.content} variants={itemVariants}>
        <motion.div className={styles.qrSection} variants={qrCodeVariants}>
          <div className={styles.qrWrapper}>
            <Image
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMCIvPgogIDxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjZmZmIi8+CiAgPHJlY3QgeD0iNTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmZmYiLz4KICA8cmVjdCB4PSI3MCIgeT0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2ZmZiIvPgogIDxyZWN0IHg9IjkwIiB5PSIxMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZmZmIi8+CiAgPHJlY3QgeD0iMTEwIiB5PSIxMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZmZmIi8+CiAgPHJlY3QgeD0iMTMwIiB5PSIxMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZmZmIi8+CiAgPHJlY3QgeD0iMTYwIiB5PSIxMCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjZmZmIi8+CiAgPHJlY3QgeD0iMTAiIHk9IjUwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmZmYiLz4KICA8cmVjdCB4PSIzMCIgeT0iNTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2ZmZiIvPgogIDxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZmZmIi8+CiAgPHJlY3QgeD0iNzAiIHk9IjUwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmZmYiLz4KICA8cmVjdCB4PSI5MCIgeT0iNTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2ZmZiIvPgogIDxyZWN0IHg9IjExMCIgeT0iNTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2ZmZiIvPgogIDxyZWN0IHg9IjEzMCIgeT0iNTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2ZmZiIvPgogIDxyZWN0IHg9IjE2MCIgeT0iNTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2ZmZiIvPgogIDxyZWN0IHg9IjE4MCIgeT0iNTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2ZmZiIvPgogIDxyZWN0IHg9IjEwIiB5PSI3MCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZmZmIi8+CiAgPHJlY3QgeD0iMzAiIHk9IjcwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmZmYiLz4KICA8cmVjdCB4PSI1MCIgeT0iNzAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2ZmZiIvPgogIDxyZWN0IHg9IjcwIiB5PSI3MCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZmZmIi8+CiAgPHJlY3QgeD0iOTAiIHk9IjcwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmZmYiLz4KICA8cmVjdCB4PSIxMTAiIHk9IjcwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmZmYiLz4KICA8cmVjdCB4PSIxMzAiIHk9IjcwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmZmYiLz4KICA8cmVjdCB4PSIxNjAiIHk9IjcwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmZmYiLz4KICA8cmVjdCB4PSIxODAiIHk9IjcwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmZmYiLz4KICA8cmVjdCB4PSIxMCIgeT0iMTYwIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIGZpbGw9IiNmZmYiLz4KICA8cmVjdCB4PSI1MCIgeT0iMTYwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmZmYiLz4KICA8cmVjdCB4PSI3MCIgeT0iMTYwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmZmYiLz4KICA8cmVjdCB4PSI5MCIgeT0iMTYwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmZmYiLz4KICA8cmVjdCB4PSIxMTAiIHk9IjE2MCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZmZmIi8+CiAgPHJlY3QgeD0iMTMwIiB5PSIxNjAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2ZmZiIvPgogIDxyZWN0IHg9IjE2MCIgeT0iMTYwIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIGZpbGw9IiNmZmYiLz4KPC9zdmc+"
              alt="QR Code PIX"
              width={200}
              height={200}
              className={styles.qrCode}
            />
          </div>
          <p className={styles.qrLabel}>Escaneie o QR Code para doar</p>
        </motion.div>

        <motion.div className={styles.pixSection} variants={itemVariants}>
          <h3 className={styles.pixTitle}>Ou use a chave PIX:</h3>
          <div className={styles.pixKeyContainer}>
            <code className={styles.pixKey}>{pixKey}</code>
            <motion.button
              className={styles.copyButton}
              onClick={copyToClipboard}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Copiar
            </motion.button>
          </div>
        </motion.div>

        <motion.div className={styles.messageSection} variants={itemVariants}>
          <h3 className={styles.messageTitle}>Por que precisamos da sua ajuda?</h3>
          <div className={styles.messageContent}>
            <p>
              Adopt-me é uma plataforma gratuita que conecta pessoas a cachorros 
              que precisam de um lar. Mantemos os serviços funcionando através 
              de doações da comunidade.
            </p>
            <p>
              Sua contribuição nos ajuda a:
            </p>
            <ul className={styles.benefitsList}>
              <li>Manter os servidores funcionando</li>
              <li>Desenvolver novas funcionalidades</li>
              <li>Garantir que a plataforma seja sempre gratuita</li>
              <li>Ajudar mais cachorros a encontrarem um lar</li>
              <li>Comprar brinquedos para cachorros de rua</li>
            </ul>
            <p className={styles.gratitude}>
              Qualquer valor faz a diferença. Obrigado por ajudar! 🐕❤️
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}