'use client';

import {useState} from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

export default function ReportMonth() {
  const searchParams = useSearchParams()
  const pathname = usePathname();
  const { replace } = useRouter()
  let today = new Date()
  const [reportMonth, setReportMonth] = useState(today.toISOString().slice(0,7))

  const handleSearch = e=>{
    setReportMonth(e.target.value)
    const params = new URLSearchParams(searchParams)
    params.set('reportMonth', e.target.value)
    replace(`${pathname}?${params.toString()}`)
  }
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <div>
        <input type="month" id="report-month" name="start" min="2023-01" value={reportMonth} onChange={(e)=> handleSearch(e)} className="peer block bg-blue-500 w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 "/>
			</div>
    </div>
  );
}