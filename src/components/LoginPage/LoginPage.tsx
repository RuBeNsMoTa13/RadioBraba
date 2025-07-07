import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Mail, Lock, LogIn} from "lucide-react";
import { supabase } from "@/services/supabaseClient"; // Certifique-se de que este caminho está correto
import { useState } from "react"; // Importar useState

const loginFormSchema = z.object({
  email: z.string().email({
    message: "Email inválido.",
  }),
  password: z.string().min(6, {
    message: "A senha deve ter pelo menos 6 caracteres.",
  }),
});

export function LoginPage() {
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento
  const [message, setMessage] = useState<string | null>(null); // Estado para mensagens de feedback

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setLoading(true); // Inicia o estado de carregamento
    setMessage(null); // Limpa mensagens anteriores

    const { email, password } = values;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false); // Finaliza o estado de carregamento

    if (error) {
      console.error("Erro ao fazer login:", error);
      // Exibe uma mensagem de erro amigável para o usuário
      setMessage(`Erro ao fazer login: ${error.message}`);
    } else if (data.user) {
      console.log("Login bem-sucedido:", data.user);
      setMessage("Login bem-sucedido! Redirecionando...");
      // TODO: Implementar redirecionamento para a página inicial ou dashboard
      // Ex: router.push('/dashboard');
    } else {
       // Isso pode acontecer se não houver erro, mas também não houver usuário (cenário menos comum para signInWithPassword)
       setMessage("Login falhou. Verifique suas credenciais.");
    }

    // form.reset(); // Opcional: resetar o formulário após a tentativa de login
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
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </Form>

        {message && (
          <div className="mt-4 text-center">
            <p className={`text-sm ${message.includes("Erro") ? "text-red-500" : "text-green-500"}`}>
              {message}
            </p>
          </div>
        )}

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