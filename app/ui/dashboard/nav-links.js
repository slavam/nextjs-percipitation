'use client'

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Главная', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Осадки',
    href: '/dashboard/precipitation',
    icon: DocumentDuplicateIcon,
  },
  {
    name: 'Среднесуточная температура',
    href: '/dashboard/temperature',
    icon: DocumentDuplicateIcon,
  },
  {
    name: 'Среднесуточная температура с...',
    href: '/dashboard/dailyTempStartingFrom',
    icon: DocumentDuplicateIcon,
  },
  {
    name: 'Среднесуточная температура за месяц',
    href: '/dashboard/tempAvgMonth',
    icon: DocumentDuplicateIcon,
  },
  {
    name: 'Измерения',
    href: '/dashboard/measurements',
    icon: DocumentDuplicateIcon,
  },
  {
    name: 'Прогноз',
    href: '/dashboard/forecast',
    icon: DocumentDuplicateIcon,
  },
  {
    name: 'Hydro',
    href: '/dashboard/hydro',
    icon: DocumentDuplicateIcon,
  },
  // { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-400 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-700': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
