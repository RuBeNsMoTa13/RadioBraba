const API_KEY = "AIzaSyAaXUX_Fri-mVfOG2j7KatLp1ZlpjJweG4";
const CHANNEL_ID = "UCFB5fmqPC0XilvMTFnzxFig";

interface YoutubeVideo {
    id: {
        videoId: string
    };
    snippet: {
        title: string;
        description: string;
        thumbnails: {
            high: {
                url: string;
            };
        };
    };
}

export async function getVideos(): Promise<YoutubeVideo[]> {
 try {
    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10`
    );

    if (!response.ok) {
        const ErrorData = await response.json();
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
        <div className="w-full h-64">
            <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default PlayerYoutube;
