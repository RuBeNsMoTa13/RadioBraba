import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { User, Mail, Lock, CheckSquare, PlusCircle } from 'lucide-react';
import { useState } from 'react'; // Importar useState
import { supabase } from '@/services/supabaseClient'; // Importar o cliente Supabase

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
  path: ['confirmPassword'],
});

export function RegisterPage() {
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento
  const [message, setMessage] = useState<string | null>(null); // Estado para mensagens de feedback

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Tornar a função onSubmit assíncrona para usar await
  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    setLoading(true); // Inicia o estado de carregamento
    setMessage(null); // Limpa mensagens anteriores
    console.log('Dados de registro:', values);

    const { name, email, password } = values;

    // Certifique-se de que 'supabase' está definido e é um objeto válido antes de usá-lo
    if (!supabase || typeof supabase.auth?.signUp !== 'function') {
        console.error("Supabase client is not initialized correctly.");
        setMessage("Erro interno: Cliente de autenticação não disponível.");
        setLoading(false);
        return; // Pare a execução se o cliente não for válido
    }

    // Chamar a função de registro do Supabase
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        // Opcional: Adicionar metadados do usuário, como o nome
        data: {
          name: name,
        },
      },
    });

    setLoading(false); // Finaliza o estado de carregamento

    if (error) {
      console.error('Erro ao registrar:', error);
      // Exibe uma mensagem de erro amigável para o usuário
      setMessage(`Erro ao registrar: ${error.message}`);
    } else if (data.user) {
      console.log('Registro bem-sucedido:', data.user);
      // Dependendo da sua configuração do Supabase, pode ser necessário confirmar o email
      setMessage('Registro bem-sucedido! Verifique seu email para confirmar sua conta.');
      form.reset(); // Resetar o formulário apenas em caso de sucesso
      // TODO: Implementar redirecionamento após registro/confirmação
      // Ex: router.push('/confirmacao-email');
    } else {
       // Este caso pode ocorrer se o registro for bem-sucedido, mas a confirmação de email for necessária
       // e nenhum usuário ou sessão for retornado imediatamente.
       setMessage('Registro bem-sucedido! Verifique seu email para confirmar sua conta.');
       form.reset(); // Resetar o formulário
    }
  }

  return (
    <div className="min-h-screen bg-background text-gray-900 dark:text-gray-100 transition-colors duration-500 flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-card rounded-xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-shadow duration-300">

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
              disabled={loading} // Desabilita o botão enquanto carrega
            >
              <PlusCircle size={18} className="mr-2" />
              {loading ? "Cadastrando..." : "Cadastrar"} {/* Altera o texto do botão */}
            </Button>
          </form>
        </Form>

        {/* Exibir mensagens de feedback */}
        {message && (
          <div className="mt-4 text-center">
            <p className={`text-sm ${message.includes("Erro") ? "text-red-500" : "text-green-500"}`}>
              {message}
            </p>
          </div>
        )}

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