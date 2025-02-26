import { NextRequest, NextResponse } from "next/server";
import jsonwetoken from 'jsonwebtoken';

const generateToken = (email: string , password: string) => {
    return jsonwetoken.sign({email,password},"secret",{expiresIn: '5h'})
}

export async function POST(req: NextRequest){
    try {
        const {name,email,password} = await req.json();

    if(!name || !email || !password){
        return NextResponse.json({
            message:'Missing Fields',
            status:400
        });
    }
    if(name === 'test' && email === 'test@gmail.com' && password==='12345'){
        const res =  NextResponse.json({
            message:'User Created Sucessfully',
            status:201,
        })
        res.cookies.set('token',generateToken(email,password),{httpOnly:true})
        return res
    }
    return NextResponse.json({
        message:'Something went Wrong',
        status:404
    })
    } catch (error: any) {
        return NextResponse.json({
            message: 'Internal Server Error',
            status: 500,
            error: error.message
        })        
    }
}