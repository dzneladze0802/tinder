import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { LanguageEnum, PRIVATE_ROUTES, RESTRICTED_ROUTES } from "./constants";

const LOCALE = LanguageEnum.ENGLISH;

export function middleware(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const isAuthenticated = !!cookies().get("access_token");

  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${LOCALE}${pathname}`, req.url));
  }

  for (const route of PRIVATE_ROUTES) {
    if (pathname.includes(route)) {
      if (!isAuthenticated) {
        return NextResponse.redirect(new URL(`/${LOCALE}/login`, req.url));
      }
    }
  }

  for (const route of RESTRICTED_ROUTES) {
    if (pathname.includes(route)) {
      if (isAuthenticated) {
        return NextResponse.redirect(new URL(`/${LOCALE}/profile`, req.url));
      }
    }
  }

  return NextResponse.next();
}
