import { UserButton } from '@clerk/nextjs'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-screen w-full relative'>
      <aside className='absolute w-[200px] top-0 right-0 h-full border-l border-black/10'>
        سایدبار
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
