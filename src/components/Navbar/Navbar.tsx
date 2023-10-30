export const Navbar = () => {
    return (
        <header className="border-b w-full px-16 fixed z-[22222222222]">
            <nav className="m-auto flex items-center justify-between p-4 bg-white w-full">
                    <h1 className="text-3xl font-sans font-semibold text-[#1b0b3b]">Hour.ly</h1>
                <ul className="flex items-center gap-16">
                    <li>About</li>
                    <li>Pricing</li>
                    <li>Contact</li>
                </ul>
                <div className="flex gap-4">
                    <button className="flex rounded-full items-center justify-center bg-gradient-to-t from-violet-600 to-violet-400 px-[2px] py-[2px]">
                            <div className="bg-white py-2 px-8 rounded-full text-violet-600 font-medium">
                                Login
                            </div>
                    </button>
                    <button className="bg-gradient-to-t from-violet-600 to-violet-400 text-white px-8 py-2 rounded-full font-medium">Register</button>
                </div>
            </nav>
        </header>
    );
};
