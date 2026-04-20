import {Link} from "react-router";
import {useState} from "react";
import {useAuth} from "../context/AuthContext.tsx";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const {signInWithGitHub,signOut,user} = useAuth()
    const displayName = user?.user_metadata.user_name || user?.email
    return(
        <nav className="fixed top-0 w-full z-40 bg-[#1A1A1B] border-b border-[#27272A]">
            <div className="max-w-5xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="font-bold text-2xl text-white">
                        reddit<span className="text-[#FF4500]">knockoff</span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/"
                            className="text-[#D7DADC] hover:text-white transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            to="/create"
                            className="text-[#D7DADC] hover:text-white transition-colors"
                        >
                            Create Post
                        </Link>
                        <Link
                            to="/communities"
                            className="text-[#D7DADC] hover:text-white transition-colors"
                        >
                            Communities
                        </Link>
                        <Link
                            to="/community/create"
                            className="text-[#D7DADC] hover:text-white transition-colors"
                        >
                            Create Community
                        </Link>
                    </div>

                    {/* Desktop Auth */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-4">
                                {user.user_metadata?.avatar_url && (
                                    <img
                                        src={user.user_metadata.avatar_url}
                                        alt="User Avatar"
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                )}
                                <span className="text-[#D7DADC]">{displayName}</span>
                                <button
                                    onClick={signOut}
                                    className="bg-[#FF4500] hover:bg-[#FF571A] px-5 py-1.5 rounded-full text-sm font-medium transition-colors"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={signInWithGitHub}
                                className="bg-[#FF4500] hover:bg-[#FF571A] px-5 py-1.5 rounded-full text-sm font-medium transition-colors"
                            >
                                Sign in with GitHub
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMenuOpen((prev) => !prev)}
                            className="text-[#D7DADC]"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {menuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-[#1A1A1B] border-t border-[#27272A]">
                    <div className="px-4 py-3 space-y-1">
                        <Link
                            to="/"
                            className="block px-4 py-3 text-[#D7DADC] hover:bg-[#27272A] rounded-lg"
                        >
                            Home
                        </Link>
                        <Link
                            to="/create"
                            className="block px-4 py-3 text-[#D7DADC] hover:bg-[#27272A] rounded-lg"
                        >
                            Create Post
                        </Link>
                        <Link
                            to="/communities"
                            className="block px-4 py-3 text-[#D7DADC] hover:bg-[#27272A] rounded-lg"
                        >
                            Communities
                        </Link>
                        <Link
                            to="/community/create"
                            className="block px-4 py-3 text-[#D7DADC] hover:bg-[#27272A] rounded-lg"
                        >
                            Create Community
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    )
}