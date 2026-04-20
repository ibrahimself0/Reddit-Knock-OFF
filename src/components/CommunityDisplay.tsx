import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { PostItem } from "./PostItem";
import type {Post} from "./PostList.tsx";

interface Props {
    communityId: number;
}

interface PostWithCommunity extends Post {
    communities: {
        name: string;
    };
}

export const fetchCommunityPost = async (
    communityId: number
): Promise<PostWithCommunity[]> => {
    const { data, error } = await supabase
        .from("posts")
        .select("*, communities(name)")
        .eq("community_id", communityId)
        .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data as PostWithCommunity[];
};

export const CommunityDisplay = ({ communityId }: Props) => {
    const { data, error, isLoading } = useQuery<PostWithCommunity[], Error>({
        queryKey: ["communityPost", communityId],
        queryFn: () => fetchCommunityPost(communityId),
    });

    if (isLoading)
        return <div className="text-white text-center py-12">Loading community...</div>;
    if (error)
        return (
            <div className="text-red-500 text-center py-12">
                Error: {error.message}
            </div>
        );

    const communityName = data && data.length > 0 ? data[0].communities.name : "";

    return (
        <div className="bg-[#0F0F10] min-h-screen pb-12">
            <h2 className="text-5xl font-bold mb-10 text-center text-[#FF4500]">
                r/{communityName}
            </h2>

            {data && data.length > 0 ? (
                <div className="flex flex-wrap gap-6 justify-center">
                    {data.map((post) => (
                        <PostItem key={post.id} post={post} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-[#818384] text-lg py-12">
                    No posts in this community yet.
                </p>
            )}
        </div>
    );
};