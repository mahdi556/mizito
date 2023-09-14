import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
    const token = cookies().get('token');
     if (!token) {
        return NextResponse.json({ message: { 'err': ['Not Authorized'] } }, { status: 403 });
    }
    const resApi = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}panel/auth/me`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token.value}`
        }
    });
    const data = await resApi.json();
    
    if (resApi.ok) {
        return NextResponse.json({ user: data.data,token:token.value }, { status: 200 })
    } else {
        return NextResponse.json({ message: { 'err': ['User Forbidden'] } }, { status: resApi.status })
    }
}