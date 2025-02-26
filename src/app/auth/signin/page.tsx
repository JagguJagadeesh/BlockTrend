'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import axios from "axios"


function Signin() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const handleSubmit = ()=>{
        // console.log(formData)
        axios.post('/api/auth/signin',formData)
           .then(async (res)=>{
                console.log(res.data)
                localStorage.setItem('token',res.data.token)
           })
           .catch((err)=>{
               console.log(err)
           })

    }

  return (
    <div className="flex justify-center items-center mt-28">
        <Card className="w-[28rem]">
            <CardHeader>
                <CardTitle className="text-center">Sign In</CardTitle>
                <CardDescription>
                <p className="text-center">Do Not have Account <Link href='/auth/signup' className="underline">Signup</Link></p>
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Input placeholder="Email" value={formData.email} onChange={(e)=>{setFormData({...formData,email:e.target.value})}}/>
                <Input placeholder="Full Name" value={formData.password} onChange={(e)=>{setFormData({...formData,password:e.target.value})}}/>
            </CardContent>
            <CardFooter>
                <Button onClick={handleSubmit}>Sign Up</Button>
            </CardFooter>
        </Card>
    </div>
  )
}

export default Signin