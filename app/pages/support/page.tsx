"use client"

import SupportPage from './support.server';
import SupportForm from './support.client';
import { useRouter } from 'next/navigation';

export default function Support() {
  const router = useRouter()
  return (    
    <div className="container">
      <SupportPage />
      <SupportForm />
      <footer className="footer" onClick={() => {
        router.push('/pages/login');
        router.refresh();
      }}>
                © 2024 כל הזכויות שמורות.
      </footer>
    </div>
  );
}