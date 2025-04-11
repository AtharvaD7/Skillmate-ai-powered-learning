"use client"
import React, { useContext } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Rocket, UserCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { CourseCountContext } from '@/app/_context/CourseCountContext'
import { toast } from 'sonner';

function SideBar() {
  const MenuList = [
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard'
    },
    {
      name: 'Upgrade',
      icon: Rocket,
      path: '/dashboard/upgrade'
    },
    {
      name: 'Profile',
      icon: UserCircle,
      path: '/dashboard/profile'
    },
  ]

  const { totalCourse } = useContext(CourseCountContext)
  const path = usePathname()
  const maxCredits = 5
  const creditsUsedUp = totalCourse >= maxCredits

  const handleCreateClick = (e) => {
    if (creditsUsedUp) {
      toast("Upgrade to create more!")  // ✅ just a message, not styled as error
    }
  }

  return (
    <div className='h-screen shadow-md p-5 relative'>
      <div className='flex gap-2 items-center'>
        <Image src={'/cleanlogo.svg'} alt='logo' width={40} height={40} />
        <h2 className='font-bold text-2xl'>SkillMate</h2>
      </div>

      <div className='mt-10'>
        <Link href={creditsUsedUp ? '#' : '/create'} className="w-full" onClick={handleCreateClick}>
          <Button
            className="w-full cursor-pointer"
            disabled={creditsUsedUp}
          >
            + Create New
          </Button>
        </Link>

        <div className='mt-5'>
          {MenuList.map((menu, index) => (
            <Link
              key={index}
              href={menu.path}
              className={`flex gap-5 items-center p-3 hover:bg-slate-200 rounded-lg cursor-pointer mt-3 ${path === menu.path ? 'bg-blue-100' : ''}`}
            >
              <menu.icon />
              <h2>{menu.name}</h2>
            </Link>
          ))}
        </div>
      </div>

      <div className='border p-3 bg-slate-100 rounded-lg absolute bottom-10 w-[85%]'>
        <h2 className='text-lg mb-2'>Available Credits: {maxCredits}</h2>
        <Progress value={(totalCourse / maxCredits) * 100} />
        <h2 className='text-sm'>{totalCourse} Out of {maxCredits} Credits Used</h2>

        <Link href={'/dashboard/upgrade'} className='text-blue-600 text-xs mt-3 block'>
          Upgrade to create more
        </Link>
      </div>
    </div>
  )
}

export default SideBar
