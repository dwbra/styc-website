import { NextResponse } from 'next/server';

export function GET(request) {
  console.log(request);
  return NextResponse.json(
    {
      body: request.body,
      path: request.nextUrl.pathname,
      query: request.nextUrl.search,
      query2: request.nextUrl,
      //   cookies: request.cookies.getAll(),
    },
    {
      status: 200,
    }
  );
}
