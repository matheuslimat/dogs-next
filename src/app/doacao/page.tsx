import { Metadata } from 'next';
import DoacaoContent from '@/components/doacao/doacao-content';

export const metadata: Metadata = {
  title: 'Doação | Dogs',
  description: 'Ajude a manter o Dogs funcionando com sua doação.',
};

export default function DoacaoPage() {
  return (
    <section className="container mainContainer">
      <DoacaoContent />
    </section>
  );
}