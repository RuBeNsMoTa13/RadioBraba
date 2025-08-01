import { useEffect, useState } from "react";

type InstagramPost = {
  id: string;
  media_url: string;
  permalink: string;
  caption?: string;
};

export function InstaFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = 'EACJ6bPjuZBYQBPMujojxWDDPv86N8JG2YNdZCr8kAzZBa4yHWNWMFtLaYjFWyUVWngYy5IqHZC0nYrYDCCZCGCdyJXzOYZAl6rnB2nV9JAqwQtVZAGlF85ejHbSZBEfkPgAuzf7onOgDIPt2UEoOQQ5pNLQ4rc2Sz4UZCOV0VZAbAUtwK82rr4XmDjwfGft7sk';
    const fields = 'id,media_url,permalink,caption';
    const apiUrl = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${accessToken}`;

    async function fetchInstaFeed() {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Falha ao buscar posts do Instagram.');
        }
        const data = await response.json();
        setPosts(data.data);
      } catch (error) {
        setError("Erro ao buscar dados do Instagram.");
      }
    }

    fetchInstaFeed();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-wrap gap-4">
      {posts.map(post => (
        <a
          key={post.id}
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="block max-w-xs"
        >
          <img
            src={post.media_url}
            alt={post.caption || "Instagram post"}
            className="w-full rounded shadow"
          />
          {post.caption && (
            <p className="mt-2 text-sm text-gray-700">{post.caption}</p>
          )}
        </a>
      ))}
    </div>
  );
}