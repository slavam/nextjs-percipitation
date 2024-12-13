'use client';
import { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

export default function SelectTerm({reportDate}) {
  const searchParams = useSearchParams()
  const pathname = usePathname();
  const { replace } = useRouter()
  const maxDate = new Date().toISOString().substring(0,10)
  const [startTerm, setStartTerm] = useState(0)
  // console.log(`${new Date().getUTCHours()}<<<<<<<<<<<<<<`)
  function handleSearch(e) {
    const term = ((reportDate>=maxDate) && (+e.target.value>new Date().getUTCHours()))? 0: +e.target.value
    setStartTerm(term)
    const params = new URLSearchParams(searchParams)
    params.set('startTerm', term)
    replace(`${pathname}?${params.toString()}`)
  }
  
  return(
    <div>
      <h2>Начальный срок</h2>
      <div className="relative flex flex-1 flex-shrink-0">
        <select
          id="term"
          name="term"
          className="peer block bg-blue-500 w-40 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2"
          value={startTerm}
          // defaultValue='0'
          onChange={(e) => {
            handleSearch(e);
          }}
        >
          {[0,3,6,9,12,15,18,21].map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
    </div>
  )
}