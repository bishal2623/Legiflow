
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoaderCircle } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login');
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <LoaderCircle className="h-10 w-10 animate-spin" />
    </div>
  );
}
