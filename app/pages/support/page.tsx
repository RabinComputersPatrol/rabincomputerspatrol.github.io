"use client"

import SupportPage from './support.server';
import SupportForm from './support.client';
import { useRouter } from 'next/navigation';
import { ReportPage } from '../dashboard/reports/report';

export default function Support() {
  const router = useRouter()
  return (    
    <div className="container">
      <SupportPage />
      <SupportForm />
      <footer className="footer" onClick={() => router.push('/pages/login')}>
        © 2024 נועם ולט. כל הזכויות שמורות.
      </footer>
    </div>
  );
}