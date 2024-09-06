'use client';

// import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {useState} from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'


export default function Search({ placeholder }) {
  const searchParams = useSearchParams()
  const pathname = usePathname();
  const { replace } = useRouter()
  let today = new Date()
  const [currYear, setCurrYear] = useState(today.getFullYear())

  // function handleSearch(term: string) {
  const handleSearch = useDebouncedCallback((term) => {
    // console.log(`Searching... ${term}`);
    const params = new URLSearchParams(searchParams)
    params.set('page', '1')
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`)
  }, 500)
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
				<input className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-100"
        defaultValue={searchParams.get('query')?.toString()}
        type='number' min='2023' step='1' max={today.getFullYear()} value={currYear} onChange={(e) => {
          handleSearch(e.target.value);
        }}/>
			</div>
      {/* <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      /> */}
      {/* <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
    </div>
  );
}
