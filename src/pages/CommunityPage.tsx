import { useParams } from "react-router";
import { CommunityDisplay } from "../components/CommunityDisplay";

export const CommunityPage = () => {
    const { id } = useParams<{ id: string }>();
    return (
        <div className="pt-20 bg-[#0F0F10] min-h-screen">
            <CommunityDisplay communityId={Number(id)} />
        </div>
    );
};