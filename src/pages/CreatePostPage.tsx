import { CreatePost } from "../components/CreatePost";

export const CreatePostPage = () => {
    return (
        <div className="pt-20">
            <h2 className="text-5xl font-bold mb-10 text-center text-[#FF4500]">
                Create New Post
            </h2>
            <CreatePost />
        </div>
    );
};