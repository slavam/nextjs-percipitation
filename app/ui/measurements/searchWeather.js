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
    <div className="rounded-md bg-blue-500 p-4 md:p-6  text-gray-800">
      <table className="hidden min-w-full text-gray-900 md:table">
        <thead className="rounded-lg text-left text-sm font-normal">
          <tr>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">Дата измерения</th>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">Срок</th>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">Пост</th>
          </tr>
        </thead>
        <tbody>
          <tr className="w-full border-b py-3 text-sm last-of-type:border-none ">
            <td>
              <input id="observ-date" type='date' value={observDate} onChange={(e)=> handleSearch(e)} className="peer block text-gray-800 w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 "/></td>
            <td>
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
            </td>
            <td>
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
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}