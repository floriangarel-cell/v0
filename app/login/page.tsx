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
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Loader2 } from "lucide-react"
import type { UserType } from "@/lib/auth-context"

const schema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caracteres"),
  userType: z.enum(["creator", "brand"], {
    required_error: "Veuillez selectionner votre type de compte",
  }),
  remember: z.boolean().optional(),
})

type FormValues = z.infer<typeof schema>

export default function LoginPage() {
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "", userType: "creator", remember: false },
  })

  async function onSubmit(data: FormValues) {
    setLoading(true)
    try {
      await login(data.email, data.password, data.userType as UserType)
      toast.success("Connexion reussie !")
    } catch {
      toast.error("Email ou mot de passe incorrect.")
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
            <CardTitle className="text-xl">Connexion</CardTitle>
            <CardDescription>
              Accedez a votre espace CollabWithMe.
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
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Mot de passe</FormLabel>
                        <Link
                          href="/forgot-password"
                          className="text-xs text-primary hover:underline"
                        >
                          Mot de passe oublie ?
                        </Link>
                      </div>
                      <FormControl>
                        <Input type="password" placeholder="Votre mot de passe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="userType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type de compte</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selectionnez" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="creator">Createur</SelectItem>
                          <SelectItem value="brand">Marque</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="remember"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal text-muted-foreground !mt-0">
                        Se souvenir de moi
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="mt-2 w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Se connecter
                </Button>
              </form>
            </Form>

            <div className="mt-6 flex flex-col items-center gap-2 text-sm">
              <p className="text-muted-foreground">
                Pas encore de compte ?{" "}
                <Link href="/signup/creator" className="font-medium text-primary hover:underline">
                  Createur
                </Link>
                {" ou "}
                <Link href="/signup/brand" className="font-medium text-primary hover:underline">
                  Marque
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
