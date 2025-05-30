'use client'
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function CursorResetter() {
  const pathname = usePathname();
  useEffect(() => {
    document.body.style.cursor = 'default';
  }, [pathname]);
  return null;
}