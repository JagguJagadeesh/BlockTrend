import { NextRequest, NextResponse } from "next/server";
import jsonwebtoken from 'jsonwebtoken';


const generateToken = (email: string , password: string) => {
    return jsonwebtoken.sign({email,password},"secret",{expiresIn: '5h'})
}


export async function POST(req: NextRequest){
    const { email, password} = await req.json();

    if(!email || !password){
        return NextResponse.json({
            error: "Email and password are required",
             status: 400 
        });
    }
    if(email === 'test@gmail.com' && password === '12345'){
        const res =  NextResponse.json({
            success: true,
            status: 200,
        });
        res.cookies.set('token',generateToken(email,password),{httpOnly:true})
        return res
    }
    return NextResponse.json({
        error: "Invalid email or password",
        status: 400
    })
}