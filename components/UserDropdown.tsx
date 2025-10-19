"use client"
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { Ghost, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import NavItems from './NavItems'

const UserDropdown = () => {
  const router=useRouter()

  const handleSignOut=async()=>{
    router.push("/sign-in")
  }
  const user={name:'Sayan', email:"sayan@gmail.com"}
  return (
    <div>
      <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant={'ghost'}  className='flex items-center gap-3 text-gray-400 hover:bg-yellow-500'>
     <Avatar className='h-8 w-8'>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback className='bg-yellow-500 text-yellow-900 text-gray-4 hover:text-yellow-500'>
        {user.name[0]}
        </AvatarFallback>
      </Avatar>
      <div className='hidden md:flex flex-col  items-start'>
        <span className='text-base font-medium text-gray-400'>
         {user.name}
        </span>
        </div> 
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className='text-gray-400'>
  <DropdownMenuLabel>
     <div className='flex relative items-center gap-3 p-2'>
 <Avatar className='h-20 w-20'>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback className='bg-yellow-500 text-yellow-900 text-gray-4 hover:text-yellow-500'>
        {user.name[0]}
        </AvatarFallback>
      </Avatar>
       <div className='flex flex-col  items-start'>
        <span className='text-base font-medium text-gray-400'>
         {user.name}
        </span>
        <span className='text-sm text-gray-400'>
             {user.email}
        </span>
        </div>
    </div>

  </DropdownMenuLabel>
  
   <DropdownMenuSeparator className='bg-gray-400' />
   <DropdownMenuItem onClick={handleSignOut} className='text-gray-100
   text-md font-medium focus:bg-transparent focus:text-yellow-500 
   transition-colors cursor-pointer'>
    <LogOut className='h-4 w-4 mr-2 hidden sm:block' />
    Logout
   </DropdownMenuItem>
    <DropdownMenuSeparator className='hidden sm:block bg-gray-400' />
    <nav className='sm:hidden'>
     <NavItems />
    </nav>
  </DropdownMenuContent>
</DropdownMenu>
    </div>
  )
}

export default UserDropdown
