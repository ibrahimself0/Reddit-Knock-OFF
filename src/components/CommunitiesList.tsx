import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { Link } from "react-router";

export interface Community {
    id: number;
    name: string;
    description: string;
    created_at: string;
}

export const fetchCommunities = async (): Promise<Community[]> => {
    const { data, error } = await supabase
        .from("communities")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data as Community[];
};

export const CommunityList = () => {
    const { data, error, isLoading } = useQuery<Community[], Error>({
        queryKey: ["communities"],
        queryFn: fetchCommunities,
    });

    if (isLoading)
        return <div className="text-white text-center py-12">Loading communities...</div>;
    if (error)
        return (
            <div className="text-red-500 text-center py-12">
                Error: {error.message}
            </div>
        );

    return (
        <div className="max-w-5xl mx-auto space-y-4 bg-[#0F0F10] pb-12">
            {data?.map((community) => (
                <div
                    key={community.id}
                    className="bg-[#1A1A1B] border border-[#27272A] p-6 rounded-xl hover:border-[#FF4500] transition-colors"
                >
                    <Link
                        to={`/community/${community.id}`}
                        className="text-2xl font-bold text-[#FF4500] hover:underline"
                    >
                        r/{community.name}
                    </Link>
                    <p className="text-[#D7DADC] mt-3 leading-relaxed">
                        {community.description}
                    </p>
                </div>
            ))}
        </div>
    );
};