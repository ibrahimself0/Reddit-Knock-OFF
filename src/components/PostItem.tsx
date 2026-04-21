import { Link } from "react-router";
import type {Post} from "./PostList.tsx";
import {useQuery} from "@tanstack/react-query";
import {fetchVotes, type Vote} from "./LikeButton.tsx";


interface Props {
    post: Post;
}

export const PostItem = ({ post }: Props) => {
    const {
        data: votes,
    } = useQuery<Vote[], Error>({
        queryKey: ["votes", post.id],
        queryFn: () => fetchVotes(post.id),
        refetchInterval: 5000,
    });
    const likes = votes?.filter((v) => v.vote === 1).length || 0;
    const dislikes = votes?.filter((v) => v.vote === -1).length || 0;
    return (
        <Link to={`/post/${post.id}`} className="block">
            <div className="w-80 bg-[#1A1A1B] border border-[#27272A] rounded-xl overflow-hidden hover:border-[#FF4500] transition-colors">
                {/* Header */}
                <div className="flex items-center gap-3 p-4 border-b border-[#27272A]">
                    {post.avatar_url ? (
                        <img
                            src={post.avatar_url}
                            alt="User Avatar"
                            className="w-9 h-9 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-9 h-9 rounded-full bg-[#FF4500]" />
                    )}
                    <div className="text-white font-medium text-[17px] line-clamp-1">
                        {post.title}
                    </div>
                </div>

                {/* Image */}
                <div className="aspect-video bg-black">
                    <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex items-center justify-between px-4 py-3 border-t border-[#27272A] text-[#D7DADC]">
                    <div className="flex items-center gap-2">
                        <span className="text-green-500">▲</span>
                        <span className="text-sm">{likes}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-red-500">▼</span>
                        <span className="text-sm">{dislikes}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};