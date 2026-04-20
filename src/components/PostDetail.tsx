import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import type {Post} from "./PostList.tsx";
import {LikeButton} from "./LikeButton.tsx";
import CommentSection from "./CommentSection.tsx";



interface Props {
    postId: number;
}

const fetchPostById = async (id: number): Promise<Post> => {
    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

    if (error) throw new Error(error.message);

    return data as Post;
};

export const PostDetail = ({ postId }: Props) => {
    const { data, error, isLoading } = useQuery<Post, Error>({
        queryKey: ["post", postId],
        queryFn: () => fetchPostById(postId),
    });

    if (isLoading) {
        return <div className="text-white text-center py-12">Loading post...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center py-12">Error: {error.message}</div>;
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 bg-[#0F0F10] min-h-screen text-white">
            <h1 className="text-4xl font-bold text-[#FF4500] mb-6">
                {data?.title}
            </h1>

            {data?.image_url && (
                <img
                    src={data.image_url}
                    alt={data?.title}
                    className="w-full rounded-xl mb-6"
                />
            )}

            <p className="text-[#D7DADC] leading-relaxed text-[17px] mb-6">
                {data?.content}
            </p>

            <p className="text-[#818384] text-sm mb-8">
                Posted on: {new Date(data!.created_at).toLocaleDateString()}
            </p>

            <LikeButton postId={postId}/>
            <CommentSection postId={postId}/>
        </div>
    );
};