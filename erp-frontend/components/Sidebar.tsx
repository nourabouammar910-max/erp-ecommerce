'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Products', href: '/products' },
  { name: 'Orders', href: '/orders' },
  { name: 'Purchases', href: '/purchases' },
  { name: 'Inventory', href: '/inventory' },
  { name: 'Users', href: '/users' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-10">
        ERP System
      </h1>

      <nav className="space-y-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block rounded-lg px-4 py-3 ${
              pathname === link.href
                ? 'bg-blue-600'
                : 'hover:bg-slate-700'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}