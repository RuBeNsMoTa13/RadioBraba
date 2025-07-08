// Tem que fazer logica de add fotos pelo user adm
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { galleryImages } from "@/lib/data";

export function GalleryPreview() {
  // Show only the first 6 images for the preview
  const previewImages = galleryImages.slice(0, 6);
  
  return (
    <section className="page-container">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-primary">GALERIA DE FOTOS</h2>
          <p className="text-xl text-secondary">Confira os melhores momentos, bastidores e registros especiais da Rádio Braba.</p>
        </div>
      <div className="flex justify-end items-baseline mb-6">
        <Link to="/galeria" className="font-semibold text-pink-600 underline-offset-4 decoration-pink-400 transition-all duration-300 hover:text-pink-800 hover:underline hover:scale-105">
          Ver Todas
        </Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {previewImages.map((image) => (
          <Link 
            key={image.id}
            to="/galeria" 
            className="overflow-hidden rounded-lg group"
          >
            <AspectRatio ratio={1 / 1} className="bg-muted">
              <img
                src={image.src}
                alt={image.alt}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <p className="text-white text-sm font-medium">{image.title}</p>
              </div>
            </AspectRatio>
          </Link>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Button 
        asChild
      size="lg"
      className="font-semibold bg-primary border-[1px] border-primary shadow-lg rounded-full px-8 py-4 transition-all duration-300 hover:bg-pink-500 hover:text-white hover:scale-105 text-foreground"
        >
          <Link to="/galeria" className="">Ver Galeria Completa</Link>
        </Button>
      </div>

    </section>
  );
}