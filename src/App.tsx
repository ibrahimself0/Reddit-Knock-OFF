import {Route, Routes} from "react-router";
import {Home} from "./pages/Home.tsx";
import {Navbar} from "./components/Navbar.tsx";
import { AuthProvider } from "./context/AuthContext";
import {CreatePostPage} from "./pages/CreatePostPage.tsx";
import {PostPage} from "./pages/PostPage.tsx";
import {CreateCommunityPage} from "./pages/CreateCommunity.tsx";
import {CommunitiesPage} from "./pages/CommunitiesPage.tsx";
import {CommunityPage} from "./pages/CommunityPage.tsx";

function App() {
    return (
        <div className="min-h-screen bg-[#0F0F10] text-[#D7DADC]">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/create" element={<CreatePostPage/>} />
                        <Route path="/post/:id" element={<PostPage/>}/>
                        <Route path="/community/create" element={<CreateCommunityPage/>}/>
                        <Route path="/communities" element={<CommunitiesPage/>}/>
                        <Route path="/community/:id" element={<CommunityPage/>}/>
                    </Routes>
                </AuthProvider>
            </div>
        </div>
    )
}

export default App;