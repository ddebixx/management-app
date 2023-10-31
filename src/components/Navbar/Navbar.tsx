export const Navbar = () => {
    return (
        <header className="border-b w-full fixed z-[22222222222] backdrop-blur-xl max-lg:px-8 max-[1200px]:px-4">
            <nav className="m-auto flex items-center justify-between py-4 max-w-[1200px]">
                    <h1 className="text-3xl font-sans font-semibold text-[#1b0b3b] m-0 max-lg:text-2xl">Hour.ly</h1>
                <div className="flex gap-4">
                    <button className="flex rounded-full text-violet-600 border-2 font-medium border-violet-600 items-center justify-center px-8 py-2 hover:scale-95 duration-300 max-lg:text-sm max-lg:px-4 max-lg:py-1">
                                Login    
                    </button>
                    <button className="bg-gradient-to-t from-violet-600 to-violet-400 text-white px-8 py-2 rounded-full font-medium hover:scale-95 hover:opacity-80 duration-300 max-lg:text-sm max-lg:px-4 max-lg:py-1">Register</button>
                </div>
            </nav>
        </header>
    );
};
