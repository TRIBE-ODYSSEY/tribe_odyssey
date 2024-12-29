import { useMediumPosts } from '@src/lib/hooks/useMediumPosts';
import Card from '../common/card/Card';

const LatestNewsSection = () => {
  const { posts, loading, error } = useMediumPosts();

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">
          Latest Updates
        </h2>
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className="flex-1 animate-pulse bg-white/10 rounded-lg h-[400px]"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">
          Latest Updates
        </h2>
        <p className="text-center text-red-500">{error}</p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">
        Latest Updates
      </h2>

      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        {posts.slice(0, 3).map((post) => (
          <a
            key={post.guid}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex-1"
          >
            <Card
              height="auto"
              className="flex flex-col h-full overflow-hidden transition-transform duration-300 group-hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden bg-gray-900">
                {post.thumbnail && (
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-3 line-clamp-2 text-white/90">
                  {post.title}
                </h3>
                <p className="text-sm text-white/70 mb-4 line-clamp-3">
                  {post.content}
                </p>
                <time className="text-sm text-white/50 mt-auto">
                  {post.pubDate}
                </time>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
};

export default LatestNewsSection;
