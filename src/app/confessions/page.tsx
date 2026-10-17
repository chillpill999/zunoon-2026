import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Redirecting to LNJPIT Confessions...',
  description: 'Official LNJPIT Chapra Confessions Page.',
};

export default function ConfessionsRedirectPage() {
  redirect('https://www.confessionlnjpit.in/');
}
