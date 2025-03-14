'use client';

import {useState} from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

export default function Search() {
  const searchParams = useSearchParams()
  const pathname = usePathname();
  const { replace } = useRouter()
  let today = new Date()
  // const reportDate = Number(searchParams.get('reportDate')) || today.toISOString().slice(0,10)
  // console.log(searchParams.get('reportDate'),'++++++++++++++++++')
  const [reportDate, setReportDate] = useState(Number(searchParams.get('reportDate')) || today.toISOString().slice(0,10))
  const maxDate = today.toISOString().slice(0,10)
  const params = new URLSearchParams(searchParams)
  const handleSearch = e=>{
    let d = e.target.value>maxDate? maxDate:e.target.value
    setReportDate(d)
    params.set('reportDate', d)
    replace(`${pathname}?${params.toString()}`)
  }
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      {/* <p>{reportDate}/{searchParams.get('reportDate')}</p> */}
      <div>
        <input id="search" type='date' 
        // defaultValue={reportDate} 
        value={reportDate}
        max={maxDate} onChange={(e)=> handleSearch(e)} className="peer block bg-blue-500 w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-100"/>
			</div>
    </div>
  );
}
