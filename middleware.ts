import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  
  // Protéger les routes d'administration
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token || !['523928544859127838', '237342193340252161'].includes(token.id as string)) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  
  // Protéger les routes d'API de modification
  if (
    request.nextUrl.pathname.startsWith('/api/articles/create') ||
    request.nextUrl.pathname.startsWith('/api/articles/update') ||
    request.nextUrl.pathname.startsWith('/api/articles/delete')
  ) {
    if (!token || !['523928544859127838', '237342193340252161'].includes(token.id as string)) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/articles/:path*']
}
