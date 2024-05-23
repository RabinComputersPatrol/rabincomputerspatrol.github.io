"use client"
import { useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, getAllDocuments } from '../api/firebase';
import { useRouter,usePathname } from 'next/navigation';


const fetchData = async () => {
  const cachedData = localStorage.getItem('authorizedMembers');
  const cachedExpiry = localStorage.getItem('authorizedMembersExpiry');
 
  if (cachedData && cachedExpiry && Date.now() < Number(cachedExpiry)) {
     return JSON.parse(cachedData);
  }
 
  const authorized = await getAllDocuments('members');
  localStorage.setItem('authorizedMembers', JSON.stringify(authorized)); 
  localStorage.setItem('authorizedMembersExpiry', (Date.now() + 60000).toString()); // 1 minute
  return authorized;
};
 

const LoginAuthListener = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const members = await fetchData();
        const email = user.email
        for (const member of members) {
          const memberEmail = member.id;
          if (email == memberEmail) {
            router.push('/pages/dashboard');
            router.refresh();
            return;
          }
        }
        router.push("/pages/support");
        router.refresh();
        signOut(auth);
      } else {
      }
    });

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      signOut(auth).then(() => {
      }).catch((error) => {
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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const members = await fetchData();
        const email = user.email;
        let isMember = false;
        for (const member of members) {
          const memberEmail = member.id;
          if (email === memberEmail) {
            isMember = true;
            break;
          }
        }
        if (isMember) {
          // Check if the current pathname contains '/dashboard'
          if (pathname.includes('/dashboard')) {
            // Allow access to nested dashboard pages
            return;
          } else {
            // Redirect to dashboard if logged in but not on a nested dashboard page
            router.push('/pages/dashboard');
            router.refresh();
            return;
          }
        } else {
          router.push('/pages/login');
          router.refresh();
          await signOut(auth);
        }
      } else {
        router.push('/pages/support'); 
        router.refresh();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [router, pathname]);

  return null;
};



