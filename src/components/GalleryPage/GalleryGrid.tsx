import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { GalleryImage } from "@/lib/types";
import { Calendar } from "lucide-react";

interface GalleryGridProps {
  images: GalleryImage[];
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((image) => (
        <Dialog key={image.id}>
          <DialogTrigger asChild>
            <div 
              className="relative group overflow-hidden rounded-lg cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <AspectRatio ratio={4 / 3} className="bg-muted">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                  <h3 className="text-white font-medium">{image.title}</h3>
                  <div className="flex items-center text-white/80 text-sm mt-1">
                    <Calendar className="h-3 w-3 mr-1" /> {image.date}
                  </div>
                </div>
                <Badge variant="secondary" className="absolute top-2 right-2">
                  {image.event}
                </Badge>
              </AspectRatio>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            {selectedImage && (
              <div>
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-auto rounded-lg"
                />
                <div className="mt-4">
                  <h2 className="text-2xl font-bold">{selectedImage.title}</h2>
                  <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" /> {selectedImage.date}
                    </div>
                    <Badge variant="secondary">{selectedImage.event}</Badge>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}