import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const links = [
  { href: '/', label: "خانه" },
  { href: '/journal', label: "ژورنال" }
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-screen w-full relative'>
      <aside className='absolute w-[200px] top-0 right-0 h-full border-l border-black/10'>
        <div className="px-4 my-4">
          <span className="text-3xl">مودسنج</span>
        </div>
        <div>
          <ul className="px-4">
            {links.map((link) => (
              <li key={link.label} className="text-xl my-4">
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div className="mr-[200px]">
        <header className='h-[60px] border-b border-black/10'>
          <div className="h-full w-full px-6 flex items-center justify-end">
            <UserButton />
          </div>
        </header>
        <div className='h-[calc(100vh-60px)]'>{children}</div>
      </div>
    </div>
  )
}
