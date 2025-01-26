import { useEffect, useState } from 'react';

interface MediumPost {
  title: string;
  content: string;
  thumbnail: string;
  pubDate: string;
  link: string;
  guid: string;
}

interface MediumRSSItem {
  title: string;
  description: string;
  thumbnail: string;
  pubDate: string;
  link: string;
  guid: string;
  content: string;
}

const MEDIUM_RSS_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@0xapenft';

export const useMediumPosts = () => {
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const extractFirstImage = (content: string): string => {  
      const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
      return imgMatch?.[1] ?? '';
    };

    const fetchPosts = async () => {
      try {
        const response = await fetch(MEDIUM_RSS_URL);
        const data = await response.json();
        
        if (data.items) {
          const formattedPosts = data.items.map((item: MediumRSSItem) => {
            const firstImage = extractFirstImage(item.content);
            return {
              title: item.title,
              content: item.description.replace(/<[^>]*>/g, ''),
              thumbnail: item.thumbnail || firstImage,
              pubDate: new Date(item.pubDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }),
              link: item.link,
              guid: item.guid
            };
          });
          setPosts(formattedPosts);
        }
      } catch (err) {
        setError('Failed to fetch Medium posts');
        console.error('Error fetching Medium posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
}; 