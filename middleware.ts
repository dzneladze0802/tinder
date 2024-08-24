import { NextRequest, NextResponse } from "next/server";
import { LanguageEnum } from "./constants";

export function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(`/${LanguageEnum.ENGLISH}${pathname}`, req.url)
    );
  }

  return NextResponse.next();
}
