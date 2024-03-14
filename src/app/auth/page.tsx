import { redirect } from 'next/navigation'
import { AuthForm } from './_components/auth-form'
import { auth } from '@/services/auth'

export default async function Page() {
  const session = await auth()
  if (session?.user) return redirect('/app')
  return <AuthForm />
}
