import { MagnifyingGlassIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { deleteMeasurement, viewMeasurement } from '@/app/lib/actions'
export function CreateMeasurement() {
    return (
      <Link
        href="/dashboard/measurements/create"
        className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <span className="hidden md:block">Создать измерение</span>{' '}
        <PlusIcon className="h-5 md:ml-4" />
      </Link>
    );
  }

export function DeleteMeasurement({ id }) {
  const deleteMeasurementWithId = deleteMeasurement.bind(null, id)
  return (
    <form action={deleteMeasurementWithId}>                                                                                       
      <button className="rounded-md border p-1 hover:bg-gray-400">
        <TrashIcon className="h-5" />
      </button>                                                                                                             
    </form>
  )
} 

// export function ViewMeasurement({id}){
//   const viewMeasurementWithId = viewMeasurement.bind(null, id)
//   return (
//     <form action={viewMeasurementWithId}>                                                                                       
//       <button className="rounded-md border p-1 hover:bg-gray-400">
//           <MagnifyingGlassIcon className="h-5" />
//       </button>                                                                                                             
//     </form>
//   )
// }
export function ViewMeasurement({ id }) {
  return (
    <Link
      href={`/dashboard/measurements/${id}/view`}
      // className="rounded-md border p-0 hover:bg-gray-400"
    >
      <MagnifyingGlassIcon className="h-5" />
    </Link>
  );
}