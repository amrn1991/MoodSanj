import React from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-screen w-screen relative'>
      <div className="mr-[200px]">
        <header className='h-[60px] border-b border-black/10'>
          هدر
        </header>
        <div>{children}</div>
      </div>
      <aside className='absolute w-[200px] top-0 right-0 h-full border-l border-black/10'>
        سایدبار
      </aside>
    </div>
  )
}
