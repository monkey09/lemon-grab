import {NextRequest} from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
 
export default async function middleware(request: NextRequest) {
  const [, locale, ...segments] = request.nextUrl.pathname.split('/')
  const loggedin = request.cookies.get('token')
  
  if (loggedin && segments.join('/') === 'login') {
    request.nextUrl.pathname = `/${locale}/`
  }

  if (!loggedin && segments.join('/') !== 'login') {
    request.nextUrl.pathname = `/${locale}/login/`
  }
  
  const handleI18nRouting = createIntlMiddleware({
    locales: ['en', 'ar'],
    defaultLocale: 'en'
  })
  const response = handleI18nRouting(request)
  return response
}
 
export const config = {
  matcher: ['/', '/(ar|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
}