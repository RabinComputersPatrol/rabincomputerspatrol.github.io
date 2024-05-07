import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function NotFound() {
 const router = useRouter();

 useEffect(() => {
    router.push('/pages/support');
 }, []);

 return <div>Redirecting...</div>;
}
