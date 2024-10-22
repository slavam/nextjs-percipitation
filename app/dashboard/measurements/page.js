import Pagination from '@/app/ui/measurements/pagination';
// import Search from '@/app/ui/search';
import Table from '@/app/ui/measurements/table';
import { CreateMeasurement } from '@/app/ui/measurements/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchMeasurementsPages } from '@/app/lib/data'
 
export default async function Page({searchParams}) {
  const currentPage = Number(searchParams?.page) || 1
  const totalPages = await fetchMeasurementsPages()
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Измерения</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {/* <Search placeholder="Search invoices..." /> */}
        <CreateMeasurement />
      </div>
      <Suspense key={currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}