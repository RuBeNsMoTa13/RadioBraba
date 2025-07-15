// import React from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// export function LoginPage() {
//   return (
//     <div className="flex items-center justify-center min-h-[calc(100vh-var(--navbar-height)-var(--footer-height))]">
//       <Card className="w-[350px]">
//         <CardHeader>
//           <CardTitle className="text-2xl text-center">Login</CardTitle>
//           <CardDescription className="text-center">Entre com sua conta para acessar recursos exclusivos.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form>
//             <div className="grid gap-4">
//               <div className="grid gap-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input id="email" type="email" placeholder="m@example.com" required />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="password">Senha</Label>
//                 <Input id="password" type="password" required />
//               </div>
//               <Button type="submit" className="w-full">
//                 Entrar
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Mail, Lock, LogIn} from "lucide-react";
import Google from "@/components/google"; 

// Esquema de validação do formulário com Zod
const loginFormSchema = z.object({
  email: z.string().email({
    message: "Email inválido.",
  }),
  password: z.string().min(6, {
    message: "A senha deve ter pelo menos 6 caracteres.",
  }),
});

export function LoginPage() {

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    console.log("Credenciais de login:", values);
    form.reset(); 
    // Aqui você faria a lógica de autenticação real 
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-gray-900 dark:text-gray-100 transition-colors duration-500 p-4">
      <div className="w-full max-w-md bg-card rounded-xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-shadow duration-300 relative">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">LOGIN</h1>
          <p className="text-gray-600 dark:text-gray-400">Entre com sua conta para acessar recursos exclusivos</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300 font-medium flex items-center">
                    <Mail size={16} className="mr-2 text-[#F63A9C]" />
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="seu@email.com"
                      type="email"
                      className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-[#F63A9C] focus:border-[#F63A9C] rounded-lg transition-colors duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300 font-medium flex items-center">
                    <Lock size={16} className="mr-2 text-[#F63A9C]" />
                    Senha
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Sua senha secreta"
                      type="password"
                      className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-[#F63A9C] focus:border-[#F63A9C] rounded-lg transition-colors duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-[#F63A9C] hover:bg-[#FF2C69] text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center text-base"
            >
              <LogIn size={18} className="mr-2" />
              Entrar
            </Button>
          </form>
        </Form>
    <Google /> 
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600 dark:text-gray-400">
            Esqueceu sua senha?{" "}
            <a href="#" className="text-[#F63A9C] hover:text-[#FF2C69] font-medium transition-colors duration-200">
              Clique aqui
            </a>
          </p>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Não tem uma conta?{" "}
            <a href="/cadastro" className="text-[#F63A9C] hover:text-[#FF2C69] font-medium transition-colors duration-200">
              Cadastre-se
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}