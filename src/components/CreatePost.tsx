import {type ChangeEvent, type FormEvent, useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {supabase} from "../supabase-client.ts";
import {useAuth} from "../context/AuthContext.tsx";
import {type Community, fetchCommunities} from "./CommunitiesList.tsx";

interface PostInput {
    title: string;
    content: string;
    avatar_url: string | null;
    community_id: number | null;
}

const createPost = async (post: PostInput, imageFile: File) => {
    const filePath = `${post.title}-${Date.now()}-${imageFile.name}`;

    const { error: uploadError } = await supabase.storage
        .from("post-images")
        .upload(filePath, imageFile);

    if (uploadError) throw new Error(uploadError.message);

    const { data: publicURLData } = supabase.storage
        .from("post-images")
        .getPublicUrl(filePath);

    const { data, error } = await supabase
        .from("posts")
        .insert([{ ...post, image_url: publicURLData.publicUrl}])

    if (error) throw new Error(error.message);

    return data;
};

export const CreatePost = () => {
    const {user} = useAuth()

    const { data :communities} = useQuery<Community[], Error>({
        queryKey: ["communities"],
        queryFn: fetchCommunities,
    });

    const [title,setTitle]= useState<string>("");
    const [content,setContent]= useState<string>("");
    const [selected,setSelected]=useState<File | null>(null);
    const [communityId, setCommunityId]=useState<number | null>(null);

    const {mutate,isPending,isError} = useMutation({
        mutationFn: (data: { post: PostInput; imageFile: File }) => {
            return createPost(data.post, data.imageFile);
        },
    });

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if(!selected){
            return;
        }
        mutate({post: {
                title, content, avatar_url: user?.user_metadata.avatar_url || null,
                community_id: communityId
            },imageFile:selected})
    }

    const handleFileOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files[0]) {
            setSelected(e.target.files[0]);
        }
    }

    const handleCommunityChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setCommunityId(value ? Number(value) : null);
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-[#1A1A1B] p-8 rounded-xl border border-[#27272A] space-y-6">
            <div>
                <label htmlFor="title" className="block mb-2 font-medium text-[#D7DADC]">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-[#27272A] border border-[#343536] text-white p-3 rounded-lg focus:outline-none focus:border-[#FF4500]"
                    required
                />
            </div>

            <div>
                <label htmlFor="content" className="block mb-2 font-medium text-[#D7DADC]">
                    Content
                </label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full bg-[#27272A] border border-[#343536] text-white p-3 rounded-lg focus:outline-none focus:border-[#FF4500]"
                    rows={6}
                    required
                />
            </div>

            <div>
                <label className="block mb-2 font-medium text-[#D7DADC]">
                    Select Community
                </label>
                <select
                    id="community"
                    onChange={handleCommunityChange}
                    className="w-full bg-[#27272A] border border-[#343536] text-white p-3 rounded-lg focus:outline-none focus:border-[#FF4500]"
                >
                    <option value="">-- Choose a Community --</option>
                    {communities?.map((community) => (
                        <option key={community.id} value={community.id}>
                            {community.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="image" className="block mb-2 font-medium text-[#D7DADC]">
                    Upload Image
                </label>
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleFileOnChange}
                    className="w-full bg-[#27272A] border border-[#343536] text-[#D7DADC] p-3 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-[#FF4500] file:text-white hover:file:bg-[#FF571A]"
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#FF4500] hover:bg-[#FF571A] text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-70"
            >
                {isPending ? "Creating post..." : "Create Post"}
            </button>

            {isError && <p className="text-red-500 text-center">Error Creating Post</p>}
        </form>
    );
};