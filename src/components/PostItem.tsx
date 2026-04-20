import { Link } from "react-router";
import type {Post} from "./PostList.tsx";


interface Props {
    post: Post;
}

export const PostItem = ({ post }: Props) => {
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
            </div>
        </Link>
    );
};