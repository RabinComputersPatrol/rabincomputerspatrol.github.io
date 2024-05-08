"use client"
import { useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, getAllDocuments } from '../api/firebase';
import { useRouter,usePathname } from 'next/navigation';

const LoginAuthListener = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/pages/dashboard');
      } else {
        router.push('/pages/login');
      }
    });

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      signOut(auth).then(() => {
        console.log("User signed out.");
      }).catch((error) => {
        console.error("Error signing out:", error);
      });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      unsubscribe();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [router]);

  return null;
};

export default LoginAuthListener;


export const DashboardAuthListener = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      const authorized = await getAllDocuments('members');
      return authorized;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const members = await fetchData();
          const email = user.email
        for (const member of members) {
          const memberEmail = member.id;
          if (email == memberEmail) {
            router.replace('/pages/dashboard');
            return;
          }
        }
        router.replace('/pages/login')
        await signOut(auth);
      } else {
        router.replace('/pages/support'); 
      }
    });

    return () => {
      unsubscribe();
    };
  }, [router]);

  return null;
};


