import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Search, Radio, Music2, Headphones, Menu, X } from "lucide-react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2 mr-4">
                    <Radio className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
                        RadioBraba          </span>
                </div>

                <NavigationMenu className="hidden md:flex">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                                href="#"
                            >
                                Início
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Ouvir</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] grid-cols-2">
                                    <li className="row-span-3">
                                        <NavigationMenuLink asChild>
                                            <a
                                                href="#"
                                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-purple-500 to-indigo-700 p-6 no-underline outline-none focus:shadow-md"
                                            >
                                                <Radio className="h-6 w-6 text-white" />
                                                <div className="mb-2 mt-4 text-lg font-medium text-white">
                                                    Rádio ao Vivo
                                                </div>
                                                <p className="text-sm leading-tight text-white/90">
                                                    Ouça nossas estações com as últimas músicas e programas
                                                </p>
                                            </a>
                                        </NavigationMenuLink>
                                    </li>
                                    <ListItem href="#" title="Estações" icon={<Radio className="h-4 w-4" />}>
                                        Navegue por todas as nossas estações
                                    </ListItem>
                                    <ListItem href="#" title="Programas" icon={<Headphones className="h-4 w-4" />}>
                                        Veja nossa programação
                                    </ListItem>
                                    <ListItem href="#" title="Podcasts" icon={<Music2 className="h-4 w-4" />}>
                                        Ouça podcasts sob demanda
                                    </ListItem>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                                href="#"
                            >
                                Programação
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                                href="#"
                            >
                                Podcasts
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                                href="#"
                            >
                                Sobre
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="flex items-center gap-2">
                    {isSearchOpen ? (
                        <div className="flex items-center gap-2 animate-in slide-in-from-top-2 duration-200">
                            <Input
                                type="search"
                                placeholder="Buscar estações, programas..."
                                className="w-[200px] md:w-[300px]"
                                autoFocus
                            />
                            <button
                                onClick={() => setIsSearchOpen(false)}
                                className="text-muted-foreground hover:text-foreground transition"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-2 rounded-full hover:bg-accent transition"
                        >
                            <Search className="h-5 w-5" />
                        </button>
                    )}
                    <ModeToggle />

                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="p-2 rounded-full hover:bg-accent transition md:hidden">
                                <Menu className="h-5 w-5" />
                            </button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <div className="flex flex-col gap-6 py-8">
                                <div className="flex items-center gap-2">
                                    <Radio className="h-5 w-5 text-primary" />
                                    <span className="text-lg font-bold">RadioBraba</span>
                                </div>
                                <nav className="flex flex-col gap-4">
                                    <Button variant="link" asChild>
                                        <a href="#" className="text-lg font-medium">Início</a>
                                    </Button>
                                    <Button variant="link" asChild>
                                        <a href="#" className="text-lg font-medium">Estações</a>
                                    </Button>
                                    <Button variant="link" asChild>
                                        <a href="#" className="text-lg font-medium">Programação</a>
                                    </Button>
                                    <Button variant="link" asChild>
                                        <a href="#" className="text-lg font-medium">Podcasts</a>
                                    </Button>
                                    <Button variant="link" asChild>
                                        <a href="#" className="text-lg font-medium">Sobre</a>
                                    </Button>
                                </nav>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}

interface ListItemProps {
    className?: string;
    title: string;
    children: React.ReactNode;
    href: string;
    icon?: React.ReactNode;
}

const ListItem = ({ className, title, children, href, icon }: ListItemProps) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    href={href}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                >
                    <div className="flex items-center gap-2 text-sm font-medium leading-none">
                        {icon}
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
};