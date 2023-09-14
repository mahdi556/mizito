import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  const { id } = await req.json();
  const resApi = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}panel/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       cellphone,password
      }),
    }
  );
  
  const data = await resApi.json();
  if (resApi.status == 200) {
    cookies().set({
      name: "token",
      value: data.data.token,
      httpOnly: true,
      path: "/",
    });
    return NextResponse.json(
      { user: data.data.user, token: data.data.token },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { message: data.message },
      { status: resApi.status }
    );
  }
}
