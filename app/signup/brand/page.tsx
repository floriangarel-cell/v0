"use client"

import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth-context"
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
import { ArrowLeft, Loader2 } from "lucide-react"

const schema = z
  .object({
    company: z.string().min(2, "Le nom de l'entreprise doit contenir au moins 2 caracteres"),
    name: z.string().min(2, "Le nom doit contenir au moins 2 caracteres"),
    email: z.string().email("Adresse email invalide"),
    password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  })

type FormValues = z.infer<typeof schema>

export default function SignupBrandPage() {
  const { signup } = useAuth()
  const [loading, setLoading] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { company: "", name: "", email: "", password: "", confirmPassword: "" },
  })

  async function onSubmit(data: FormValues) {
    setLoading(true)
    try {
      await signup({
        name: data.name,
        email: data.email,
        password: data.password,
        company: data.company,
        userType: "brand",
      })
      toast.success("Compte cree avec succes !")
    } catch {
      toast.error("Une erreur est survenue. Veuillez reessayer.")
    } finally {
      setLoading(false)
    }
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
            <CardTitle className="text-xl">Creer un compte marque</CardTitle>
            <CardDescription>
              Trouvez les meilleurs createurs pour vos campagnes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom de l&apos;entreprise</FormLabel>
                      <FormControl>
                        <Input placeholder="GreenBeauty" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom du responsable</FormLabel>
                      <FormControl>
                        <Input placeholder="Marie Dupont" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email professionnel</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="contact@greenbeauty.fr" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mot de passe</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Min. 8 caracteres" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmer le mot de passe</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Confirmez votre mot de passe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="mt-2 w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Creer mon compte
                </Button>
              </form>
            </Form>

            <div className="mt-6 flex flex-col items-center gap-2 text-sm">
              <p className="text-muted-foreground">
                Deja un compte ?{" "}
                <Link href="/login" className="font-medium text-primary hover:underline">
                  Se connecter
                </Link>
              </p>
              <p className="text-muted-foreground">
                Vous etes createur ?{" "}
                <Link href="/signup/creator" className="font-medium text-primary hover:underline">
                  Inscription createur
                </Link>
              </p>
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
