'use client'
import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"



function Nav() {
  const { setTheme, theme } = useTheme();


  return (
    <div className="flex items-center justify-center md:justify-around pt-2 ">
        <div>
            <Link href='/'><p className=" md:text-4xl font-logo ">BLOCKTREND</p></Link>
        </div>
        <div className="flex gap-6 justify-between rounded-2xl border-2 p-2 shadow-2xl">
            <Link href='#home'><p className="px-2 py-1 shadow-2xl hover:underline">Home</p></Link>
            <Link href='/'><p className="px-2 py-1 shadow-2xl hover:underline">Trending</p></Link>
            <Link href='/'><p className="px-2 py-1 shadow-2xl hover:underline">News</p></Link>
            <Link href='/'><p className="px-2 py-1 shadow-2xl hover:underline">About</p></Link>
            <Link href='/'><p className="px-2 py-1 shadow-2xl hover:underline">Contact</p></Link>
        </div>
        <div className="hidden md:flex gap-2 p-2 border-2 rounded-xl items-center">
            <Link href='/auth/signin'><p className="text-xl hover:underline font-mono">Signin</p></Link>
            <p className="text-xl font-mono">/</p>
            <Link href='/auth/signup'><p className="text-xl hover:underline font-mono">Signup</p></Link>
        </div>
        <div>
          <Button variant='outline' size='icon' onClick={()=>theme === 'light' ? setTheme('dark'): setTheme('light')} >{theme === 'light' ? <Moon/> : <Sun/>} </Button>
        </div>
    </div>
  )
}

export default Nav