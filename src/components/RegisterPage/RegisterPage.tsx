// import React from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// export function RegisterPage() {
//   return (
//     <div className="flex items-center justify-center min-h-[calc(100vh-var(--navbar-height)-var(--footer-height))]">
//       <Card className="w-[350px]">
//         <CardHeader>
//           <CardTitle className="text-2xl text-center">Cadastro</CardTitle>
//           <CardDescription className="text-center">Crie sua conta para ter acesso total.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form>
//             <div className="grid gap-4">
//               <div className="grid gap-2">
//                 <Label htmlFor="name">Nome</Label>
//                 <Input id="name" type="text" placeholder="Seu nome" required />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input id="email" type="email" placeholder="m@example.com" required />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="password">Senha</Label>
//                 <Input id="password" type="password" required />
//               </div>
//                <div className="grid gap-2">
//                 <Label htmlFor="confirm-password">Confirmar Senha</Label>
//                 <Input id="confirm-password" type="password" required />
//               </div>
//               <Button type="submit" className="w-full">
//                 Cadastrar
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast'; // Assuming this toast is from your shadcn/ui
import { User, Mail, Lock, CheckSquare, Sun, Moon, PlusCircle } from 'lucide-react'; // Lucide React Icons

// Zod validation schema for the registration form
const registerFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Nome deve ter pelo menos 2 caracteres.',
  }).max(50, {
    message: 'Nome não pode ter mais de 50 caracteres.',
  }),
  email: z.string().email({
    message: 'Email inválido.',
  }),
  password: z.string().min(6, {
    message: 'A senha deve ter pelo menos 6 caracteres.',
  }),
  confirmPassword: z.string().min(6, {
    message: 'Confirmação de senha deve ter pelo menos 6 caracteres.',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem.',
  path: ['confirmPassword'], // Set the error on the confirmPassword field
});

export function RegisterPage() {

  // Initialize the form with React Hook Form and Zod resolver
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // onSubmit function for the registration form
  function onSubmit(values: z.infer<typeof registerFormSchema>) {
    console.log('Dados de registro:', values);
    toast({
      title: 'Cadastro em progresso',
      description: 'Estamos registrando sua conta...',
    });
    // Here you would typically make an API call to register the user
    // For demonstration, we'll just reset the form after a short delay
    setTimeout(() => {
      toast({
        title: 'Cadastro realizado!',
        description: 'Sua conta foi criada com sucesso. Você já pode fazer login!',
      });
      form.reset(); // Clear the form upon "successful" submission
      // Optionally redirect to login page: router.push('/login');
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500 flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-shadow duration-300">
    
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">CADASTRO</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Crie sua conta para ter acesso geral</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300 font-medium flex items-center text-sm sm:text-base">
                    <User size={16} className="mr-2 text-[#F63A9C]" />
                    Nome Completo
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite seu nome completo"
                      type="text"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300 font-medium flex items-center text-sm sm:text-base">
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
                  <FormLabel className="text-gray-700 dark:text-gray-300 font-medium flex items-center text-sm sm:text-base">
                    <Lock size={16} className="mr-2 text-[#F63A9C]" />
                    Senha
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Crie sua senha"
                      type="password"
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
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300 font-medium flex items-center text-sm sm:text-base">
                    <CheckSquare size={16} className="mr-2 text-[#F63A9C]" />
                    Confirmar Senha
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirme sua senha"
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
              <PlusCircle size={18} className="mr-2" />
              Cadastrar
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600 dark:text-gray-400">
            Já tem uma conta?{" "}
            <a href="/login" className="text-[#F63A9C] hover:text-[#FF2C69] font-medium transition-colors duration-200">
              Faça login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}