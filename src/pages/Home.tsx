import PostList from "../components/PostList.tsx";

export const Home = () => {
    return (
        <div className="pt-10">
            <h2 className="text-5xl font-bold mb-8 text-center text-[#FF4500]">
                Recent Posts
            </h2>
            <div>
                <PostList />
            </div>
        </div>
    );
};