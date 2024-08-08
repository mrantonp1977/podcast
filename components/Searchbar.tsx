"use client";

import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation';
import { useDebounce } from '@/lib/useDebounce';

const Searchbar = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const debouncedValue = useDebounce(search, 600);

  useEffect(() => {
    if (debouncedValue) {
      router.push(`/discover?search=${debouncedValue}`)
    } else if (!debouncedValue && pathname === '/discover') {
      router.push('/discover')
    }
  }, [debouncedValue, pathname,router])



  return (
    <div className="relative mt-8 block">
      <Input 
        placeholder="Search for podcasts"
        className="input-class py-6 pl-12 focus-visible:ring-offset-orange-1"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onLoad={() => setSearch('')}
      />
      <Image 
        src="/icons/search.svg"
        alt="search icon"
        width={20}
        height={20}
        className="absolute left-4 top-3.5"
      />
    </div>
  )
}

export default Searchbar