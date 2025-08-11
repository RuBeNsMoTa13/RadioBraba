const API_KEY = import.meta.env.VITE_API_KEY as string;
const CHANNEL_ID = import.meta.env.VITE_CHANNEL_ID as string;

interface YoutubeVideo {
    id: {
        videoId: string
    };
    snippet: {
        title: string;
        description: string;
        thumbnails: { high: { url: string; }; };
    };
}

export async function getVideos(): Promise<YoutubeVideo[]> {
 try {
    const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10&type=video`
);

    if (!response.ok) {
        throw new Error('Videos não encontrados');
    }

    const data = await response.json();
    console.log("Dados do YouTube:", data.items);
    return data.items;
} catch (error) {
    console.error("Erro ao buscar vídeos do YouTube:", error);
    throw error;
  }
};

interface PlayerYoutubeProps {
    videoId: string;
}

const PlayerYoutube: React.FC<PlayerYoutubeProps> = ({ videoId }) => {
    if (!videoId) {
        return <div className="w-full h-64 flex items-center justify-center">Nenhum vídeo disponível</div>;
    }
    return (
        <div className="w-full flex items-center justify-center mt-8">
            <div className="relative w-full max-w-3xl aspect-video">
                <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://youtube.com/embed/${videoId}?rel=0`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default PlayerYoutube;
