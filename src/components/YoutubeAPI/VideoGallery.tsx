import React, { useEffect, useState } from 'react';
import PlayerYoutube from './YoutubeAPI';
import { getVideos } from './YoutubeAPI';


interface DisplayVideo {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
}

const VideoGallery: React.FC = () => {
    const [videos, setVideos] = useState<DisplayVideo[]>([]);
    const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setLoading(true);
                setError(null);

                // Tenta carregar do localStorage
                const cached = localStorage.getItem('videos');
                if (cached) {
                    const cachedVideos: DisplayVideo[] = JSON.parse(cached);
                    setVideos(cachedVideos);
                    if (cachedVideos.length > 0) setSelectedVideoId(cachedVideos[0].id);
                    setLoading(false);
                    return;
                }

                // Se não houver cache, busca da API
                const fetchedRawVideos = await getVideos();
                const formattedVideos: DisplayVideo[] = fetchedRawVideos.map(video => ({
                    id: video.id.videoId,
                    title: video.snippet.title,
                    description: video.snippet.description,
                    thumbnailUrl: video.snippet.thumbnails.high.url,
                }));

                setVideos(formattedVideos);
                localStorage.setItem('videos', JSON.stringify(formattedVideos));
                if (formattedVideos.length > 0) setSelectedVideoId(formattedVideos[0].id);
            } catch (err) {
                console.error("Erro ao carregar vídeos:", err);
                setError("Não foi possível carregar os vídeos do YouTube. Tente novamente mais tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-black">
                Carregando vídeos...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-red-500">
                {error}
            </div>
        );
    }

    if (videos.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-400">
                Nenhum vídeo encontrado no canal do YouTube.
            </div>
        );
    }

    return (
        <section className="container mx-auto p-4 md:p-8 min-h-screen">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-primary">Vídeos da Rádio Braba</h2>

            <div className="mb-12">
                <PlayerYoutube videoId={selectedVideoId || ''} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {videos.map((video) => (
                    <div
                        key={video.id}
                        className={`
              bg-white rounded-lg shadow-md overflow-hidden
              transition-transform transform hover:scale-105 duration-300
              cursor-pointer border-1 hover:shadow-lg transition-shadow duration-300
              ${selectedVideoId === video.id ? 'border-primary' : 'border-transparent'}
            `}
                        onClick={() => setSelectedVideoId(video.id)}
                    >
                        <img
                            src={video.thumbnailUrl}
                            alt={video.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold text-primary mb-2 line-clamp-2">
                                {video.title}
                            </h3>
                            <p className="text-gray-400 text-sm line-clamp-3">
                                {video.description}
                            </p>
                            <a className="text-primary text-sm line-clamp-3 mt-1"
                                key={video.id}
                                href={`http://youtube.com/watch?v=${video.id}`}
                                target="_blank"
                                rel="noopener noreferrer" >
                                <h3>Acessar Video</h3>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default VideoGallery;