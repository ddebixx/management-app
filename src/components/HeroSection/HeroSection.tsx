import Image from 'next/image'

interface HeroProps {
    title: string;
    description: string;
}

export const HeroSection = ({ title, description }: HeroProps) => {
    return (
        <>
            <div className="w-full h-screen flex gap-8 items-center justify-between max-w-[1200px] m-auto z-[222] relative max-[1200px]:px-8 max-[480px]:h-[60vh] max-[480px]:px-4 overflow-clip">
                <div className="flex flex-col items-start justify-start text-left gap-8 z-[222] max-lg:gap-4 ">
                    <h1 className="text-6xl font-bold text-[#1b0b3b] tracking-tight max-w-[50%] max-lg:text-5xl max-[480px]:text-3xl">{title}</h1>
                    <p className="text-xl text-[#1b0b3b]/50 max-w-[60%] max-lg:text-lg max-[480px]:text-base">{description}</p>
                    <div className="flex items-center justify-center gap-4">
                        <button className="bg-gradient-to-b from-violet-600 to-violet-500 text-white px-8 py-4 rounded-lg font-medium text-xl hover:scale-95 duration-300 max-lg:px-6 max-lg:py-3 max-lg:text-base">Create team</button>
                    </div>
                </div>
                <Image className='left-[55%] rounded-lg shadow-[0_0_100px_20px_rgba(127,95,255,0.3)] absolute max-lg:m-auto max-lg:w-full max-md:hidden' src="/Hero_image.png" width={2000} height={2000} alt="" />
                <Image className='min-w-[1000px] absolute rotate-[15deg] -top-[25%] -left-[50%] -z-50 max-lg:-top-48 max-lg:-left-[25%] max-md:-left-[50%]' src="/Lines.svg" width={2000} height={2000} alt="" />
            </div>
        </>
    )
}