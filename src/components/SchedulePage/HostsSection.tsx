import { Card, CardContent } from "@/components/ui/card";
import { hostsData } from "@/lib/data";
import { Instagram, Twitter, Facebook } from "lucide-react";
import { cn } from "@/lib/utils";

export function HostsSection() {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Nossos Locutores</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {hostsData.map((host) => (
          <Card key={host.id} className={cn("overflow-hidden group")}>
            <div className="aspect-square relative overflow-hidden">
              <img
                src={host.image}
                alt={host.name}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="flex gap-2">
                  {host.socialMedia.instagram && (
                    <a
                      href={host.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-primary transition-colors"
                    >
                      <Instagram size={20} />
                    </a>
                  )}
                  {host.socialMedia.twitter && (
                    <a
                      href={host.socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-primary transition-colors"
                    >
                      <Twitter size={20} />
                    </a>
                  )}
                  {host.socialMedia.facebook && (
                    <a
                      href={host.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-primary transition-colors"
                    >
                      <Facebook size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-1">{host.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{host.shows.join(", ")}</p>
              <p className="text-sm">{host.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}