import {CommunityList} from "../components/CommunitiesList.tsx";

export const CommunitiesPage = () => {
    return (
        <div className="pt-20">
            <h2 className="text-5xl font-bold mb-10 text-center text-[#FF4500]">
                Communities
            </h2>
            <CommunityList />
        </div>
    );
};