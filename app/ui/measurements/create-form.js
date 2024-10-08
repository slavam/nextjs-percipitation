'use client'

// import { CustomerField } from '@/app/lib/definitions';
import { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useFormStatus } from "react-dom"

// import { createMeasurement } from '@/app/lib/actions'
// import { useActionState } from 'react'

export default function Form({ posts }) {
  const terms = [1,7,13,19]
  let today = new Date()
  const { pending } = useFormStatus()
  // const createWithWeather = createMeasurement.bind(null, weather)
  const initialState = { message: null, errors: {} }
  // const [state, formAction] = useActionState(createMeasurement, initialState)
  const [observDate, setObservDate] = useState(today.toISOString().slice(0,10))
  const searchParams = useSearchParams()
  const pathname = usePathname();
  const { replace } = useRouter()
  const handleDate = e=>{
    setObservDate(e.target.value)
    const params = new URLSearchParams(searchParams)
    params.set('reportDate', e.target.value)
    replace(`${pathname}?${params.toString()}`)
  }
  return (
    // <form action={createWithWeather}>
    // <form action={formAction}>
    <form >
      <div className="rounded-md bg-gray-500 p-4 md:p-6  text-gray-800">
        
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="term" className="mb-2 block text-sm font-medium">
            Срок
          </label>
          <div className="relative">
            <select
              id="term"
              name="term"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 text-gray-500"
              defaultValue="1"
              // aria-describedby="term-error"
            >
              {terms.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          
        </div>

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <button type="submit" disabled={pending}>
          {pending ? "Сохранение..." : "Создать"}
        </button>
        <Button type="submit">Создать</Button>
      </div>
    </form>
  );
}
