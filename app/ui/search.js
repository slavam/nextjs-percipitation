'use client';

import {useState} from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

export default function Search() {
  const searchParams = useSearchParams()
  const pathname = usePathname();
  const { replace } = useRouter()
  let today = new Date()
  const [reportDate, setReportDate] = useState(today.toISOString().slice(0,10))

  const handleSearch = e=>{
    setReportDate(e.target.value)
    const params = new URLSearchParams(searchParams)
    params.set('reportDate', e.target.value)
    replace(`${pathname}?${params.toString()}`)
  }
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <div>
        <label htmlFor ="search">
          Отчетный месяц
        </label>
        <input id="search" type='date' value={reportDate} onChange={(e)=> handleSearch(e)} className="peer block bg-blue-500 w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-100"/>
			</div>
    </div>
  );
}
