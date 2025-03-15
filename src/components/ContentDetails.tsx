import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Plus, Check, X, Star, Clock, Calendar } from 'lucide-react';
import { useWatchlist } from '../contexts/WatchlistContext';
import ReactPlayer from 'react-player';
import { useState } from 'react';
import { cn } from '../lib/utils';
import toast from 'react-hot-toast';
import { IContentDetailsProps } from './types';

export function ContentDetails({ content }: IContentDetailsProps) {
    //   const { id } = useParams();
    const navigate = useNavigate();
    const [isPlaying, setIsPlaying] = useState(false);
    const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

    // Mock data - In a real app, this would come from your content context or API
    //   const content = {
    //     id,
    //     title: "Inception",
    //     description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    //     image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1200",
    //     trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    //     rating: 8.8,
    //     year: 2010,
    //     duration: "2h 28min",
    //     director: "Christopher Nolan",
    //     cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    //     genres: ["Action", "Sci-Fi", "Thriller"],
    //     maturityRating: "PG-13",
    //     quality: ["4K", "HDR"],
    //     language: "English",
    //     subtitles: ["English", "Spanish", "French"],
    //     relatedContent: [
    //       {
    //         id: "interstellar",
    //         title: "Interstellar",
    //         image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500"
    //       },
    //       {
    //         id: "tenet",
    //         title: "Tenet",
    //         image: "https://images.unsplash.com/photo-1597002973885-8c90683fa6e0?w=500"
    //       }
    //     ]
    //   };

    const inWatchlist = isInWatchlist(content.id);

    const handleWatchlistClick = () => {
        if (inWatchlist) {
            removeFromWatchlist(content.id);
            toast.success('Removed from My List');
        } else {
            addToWatchlist({ id: content.id, title: content.title, image: content.image, categories: content.categories });
            toast.success('Added to My List');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-black pt-16"
        >
            <div className="relative h-[70vh]">
                {isPlaying ? (
                    <div className="absolute inset-0 bg-black">
                        <ReactPlayer
                            url={content.trailerUrl}
                            width="100%"
                            height="100%"
                            playing={isPlaying}
                            controls
                        />
                    </div>
                ) : (
                    <img
                        src={content.image}
                        alt={content.title}
                        className="w-full h-full object-cover"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent">
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-8"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
                            <p className="text-gray-300 text-lg mb-6">{content.description}</p>

                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-yellow-400" />
                                    <span>{content.rating}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-gray-400" />
                                    <span>{content.duration}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-gray-400" />
                                    <span>{content.year}</span>
                                </div>
                                <span className="px-2 py-1 bg-gray-800 rounded text-sm">
                                    {content.maturityRating}
                                </span>
                                {content.quality && content.quality.map(q => (
                                    <span key={q} className="px-2 py-1 bg-gray-800 rounded text-sm">
                                        {q}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-4 mb-8">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsPlaying(true)}
                                    className="flex items-center gap-2 px-6 py-3 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    <Play className="w-5 h-5" />
                                    Play
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleWatchlistClick}
                                    className={cn(
                                        "flex items-center gap-2 px-6 py-3 rounded-lg transition-colors",
                                        inWatchlist
                                            ? "bg-green-600 hover:bg-green-700"
                                            : "bg-gray-800 hover:bg-gray-700"
                                    )}
                                >
                                    {inWatchlist ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                    {inWatchlist ? 'Added to List' : 'Add to List'}
                                </motion.button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Cast</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {content.cast && content.cast.map(actor => (
                                            <span key={actor} className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                                                {actor}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Director</h3>
                                    <span className="text-gray-300">{content.director}</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Genres</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {content.categories.map(genre => (
                                            <span key={genre} className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                                                {genre}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">More Like This</h3>
                            <div className="grid gap-4">
                                {content.relatedContent && content.relatedContent.map(item => (
                                    <motion.div
                                        key={item.id}
                                        whileHover={{ scale: 1.05 }}
                                        className="relative rounded-lg overflow-hidden cursor-pointer"
                                        onClick={() => navigate(`/content/${item.id}`)}
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full aspect-video object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                                            <h4 className="text-lg font-medium">{item.title}</h4>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}