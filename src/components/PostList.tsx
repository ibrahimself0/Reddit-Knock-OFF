import {useQuery}from "@tanstack/react-query"
import {supabase} from "../supabase-client.ts";
import {PostItem} from "./PostItem.tsx";


export interface Post {
    id: number;
    title: string;
    content: string;
    created_at: string;
    image_url: string;
    avatar_url?: string;
}
const fetchPosts = async ():Promise<Post[]> => {
    const {data,error} = await supabase.from("posts")
        .select("*").order("created_at",{ascending: false})
    if (error) throw new Error(error.message);

    return data as Post[];
}
const PostList = ()=>{
    const {data,error,isLoading} = useQuery<Post[],Error>({queryKey:["posts"],queryFn:fetchPosts})
    if(isLoading){
        return <div className="text-white text-center py-12">Loading Posts...</div>
    }
    if(error){
        return <div className="text-red-500 text-center py-12">{error.message}</div>
    }

    return(
        <div className="flex flex-wrap gap-6 justify-center bg-[#0F0F10] min-h-screen pb-12">
            {data?.map((post) => (
                <PostItem post={post} key={post.id} />
            ))}
        </div>

    )
}
export default PostList;