'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Button from '@/components/forms/button';
import Input from '@/components/forms/input';
import ErrorMessage from '../helper/error-message';
import React from 'react';
import styles from './conta-photo-post.module.css';
import photoPost from '@/actions/photo-post';

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled={pending}>Enviando...</Button>
      ) : (
        <Button>Enviar</Button>
      )}
    </>
  );
}

export default function ContaPhotoPost() {
  const [state, action] = useFormState(photoPost, {
    ok: false,
    error: '',
    data: null,
  });

  const [img, setImg] = React.useState('');
  const [telefone, setTelefone] = React.useState('');
  function handleImgChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    if (target.files) {
      setImg(URL.createObjectURL(target.files[0]));
    }
  }

    // Função para aplicar a máscara de telefone
  function handleTelefoneChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    // Remove todos os caracteres que não são dígitos
    const onlyNums = value.replace(/\D/g, '');

    // Aplica a máscara (99) 99999-9999
    let maskedValue = onlyNums
      .replace(/^(\d{2})/, '($1) ')
      .replace(/(\d{5})(\d)/, '$1-$2');
    
    // Limita o tamanho máximo do campo
    if (maskedValue.length > 15) {
      maskedValue = maskedValue.substring(0, 15);
    }
    
    setTelefone(maskedValue);
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <form action={action}>
        <Input label="Nome" name="nome" type="text" required/>
        <Input label="Peso" name="peso" type="number" required/>
        <Input label="Idade" name="idade" type="number" required/>
        <Input label="Cidade" name="cidade" type="text" required/>
        <Input label="Bairro" name="bairro" type="text" required/>
        <Input
          label="Celular (WhatsApp)"
          name="telefone" // O 'name' é importante para o FormData da ação
          type="text"
          placeholder="(99) 99999-9999"
          value={telefone} // O valor é controlado pelo estado
          onChange={handleTelefoneChange} // A máscara é aplicada no 'onChange'
          maxLength={15}
          required
        />
        <input
          onChange={handleImgChange}
          type="file"
          name="img"
          id="img"
          className={styles.file}
          required
        />
        <ErrorMessage error={state.error} />
        <FormButton />
      </form>
      <div>
        <div
          className={styles.preview}
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      </div>
    </section>
  );
}