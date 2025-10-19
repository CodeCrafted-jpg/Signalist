"use client"
import { NAV_ITEMS } from '@/lib/constamts'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


const NavItems = () => {
    const pathname=usePathname()
    const isActive=(path:string)=>{
        if(path==='/') return pathname==="/";
        return pathname.startsWith(path)
    }
  return (
   <ul className=' flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium'>
    {NAV_ITEMS.map(({href,label})=>(
      <li key={href}>
        <Link className={`hover:text-yellow-500 transition-colors ${isActive(href)? 'text-gray-400': ''}`} href={href}>
        {label}
        </Link>
      </li>  
    ))}     
   </ul>
  )
}

export default NavItems
 