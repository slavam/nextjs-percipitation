'use client'
import { useState } from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

export default function SearchWeather({posts}) {
  let today = new Date()
  const [observDate, setObservDate] = useState(today.toISOString().slice(0,10))
  const searchParams = useSearchParams()
  const pathname = usePathname();
  const { replace } = useRouter()
  function handleSearch(e) {
    const params = new URLSearchParams(searchParams)
    if (e.target.id ==='term') {
      params.set('term', e.target.value);
    } else if(e.target.id==='post'){
      params.set('post', e.target.value);
    }else{
      setObservDate(e.target.value)
      params.set('observDate', e.target.value)
    }
    replace(`${pathname}?${params.toString()}`)
  }
  const terms = [1,7,13,19]
  return (
    <div className="relative ">
      {/* <div> */}
        <label htmlFor ="observ-date" className='mb-2 block text-sm font-medium'>
          Дата измерения
        </label>
        <input id="observ-date" type='date' value={observDate} onChange={(e)=> handleSearch(e)} className="peer block text-gray-800 w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 "/>
      {/* </div> */}
      <div className="mb-4">
          <label htmlFor="term" className="mb-2 block text-sm font-medium">
            Срок
          </label>
          {/* <div className="relative"> */}
            <select
              id="term"
              name="term"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 text-gray-800"
              defaultValue="1"
              onChange={(e) => {
                handleSearch(e);
              }}
            >
              {terms.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            {/* <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" /> */}
          </div>
      {/* </div> */}
      <div className="mb-4">
      <label htmlFor="post" className="mb-2 block text-sm font-medium">
        Пост
      </label>
      <select
        id="post"
        name="post"
        className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 text-gray-800"
        defaultValue={searchParams.get('post')?.toString()}
        onChange={(e) => {
          handleSearch(e);
        }}
      >
        {posts.map(p => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>
      </div>
      {/* <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      /> */}
    </div>
  );
}