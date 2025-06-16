import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-var(--navbar-height)-var(--footer-height))]">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Cadastro</CardTitle>
          <CardDescription className="text-center">Crie sua conta para ter acesso total.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" type="text" placeholder="Seu nome" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" required />
              </div>
               <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirmar Senha</Label>
                <Input id="confirm-password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Cadastrar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
