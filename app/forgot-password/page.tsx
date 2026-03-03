"use client"

import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Loader2, MailCheck } from "lucide-react"

const schema = z.object({
  email: z.string().email("Adresse email invalide"),
})

type FormValues = z.infer<typeof schema>

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  })

  async function onSubmit(_data: FormValues) {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setLoading(false)
    setSent(true)
    toast.success("Email envoye !")
  }

  if (sent) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-secondary px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              CollabWithMe
            </Link>
          </div>

          <Card>
            <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <MailCheck className="h-7 w-7 text-primary" />
              </div>
              <CardTitle className="text-xl">Email envoye !</CardTitle>
              <CardDescription>
                Verifiez votre boite de reception. Si un compte existe avec cette adresse, vous recevrez un lien de reinitialisation.
              </CardDescription>
              <Button variant="outline" className="mt-2" asChild>
                <Link href="/login">Retour a la connexion</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            CollabWithMe
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Mot de passe oublie</CardTitle>
            <CardDescription>
              Entrez votre adresse email pour recevoir un lien de reinitialisation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="votre@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Envoyer le lien
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm">
              <Link href="/login" className="font-medium text-primary hover:underline">
                Retour a la connexion
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Retour a l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  )
}
