import { useState } from "react";
import { GalleryGrid } from "@/components/GalleryPage/GalleryGrid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { galleryImages } from "@/lib/data";
import { GalleryImage } from "@/lib/types";
import { Search } from "lucide-react";

export function GalleryPage() {
  // State for search filter
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter images based on search term
  const filteredImages = galleryImages.filter((image: GalleryImage) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      image.title.toLowerCase().includes(searchLower) ||
      image.event.toLowerCase().includes(searchLower) ||
      image.date.toLowerCase().includes(searchLower)
    );
  });
  
  return (
    <div className="page-container">
      <h1 className="page-title">Galeria de Fotos</h1>
      
      <div className="relative max-w-md mx-auto mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar por evento, data ou título..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
            onClick={() => setSearchTerm("")}
          >
            ×
          </Button>
        )}
      </div>
      
      {filteredImages.length > 0 ? (
        <GalleryGrid images={filteredImages} />
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">
            Nenhuma imagem encontrada com esse termo.
          </p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => setSearchTerm("")}
          >
            Limpar Busca
          </Button>
        </div>
      )}
    </div>
  );
}