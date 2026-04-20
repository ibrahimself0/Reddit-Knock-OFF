import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../supabase-client";

interface CommunityInput {
    name: string;
    description: string;
}

const createCommunity = async (community: CommunityInput) => {
    const { error, data } = await supabase.from("communities").insert(community);

    if (error) throw new Error(error.message);
    return data;
};

export const CreateCommunity = () => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate, isPending, isError } = useMutation({
        mutationFn: createCommunity,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["communities"] });
            navigate("/communities");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate({ name, description });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-[#1A1A1B] p-8 rounded-xl border border-[#27272A] space-y-6">
            <h2 className="text-5xl font-bold mb-8 text-center text-[#FF4500]">
                Create New Community
            </h2>

            <div>
                <label htmlFor="name" className="block mb-2 font-medium text-[#D7DADC]">
                    Community Name
                </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#27272A] border border-[#343536] text-white p-3 rounded-lg focus:outline-none focus:border-[#FF4500]"
                    required
                />
            </div>

            <div>
                <label htmlFor="description" className="block mb-2 font-medium text-[#D7DADC]">
                    Description
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-[#27272A] border border-[#343536] text-white p-3 rounded-lg focus:outline-none focus:border-[#FF4500]"
                    rows={4}
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#FF4500] hover:bg-[#FF571A] text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-70"
            >
                {isPending ? "Creating..." : "Create Community"}
            </button>

            {isError && <p className="text-red-500 text-center">Error creating community.</p>}
        </form>
    );
};