import Image from 'next/image'

interface HeroProps {
    title: string;
    description: string;
}

export const HeroSection = ({title, description}: HeroProps) => {
    return (
        <>
            <div className="w-full h-screen flex gap-8 items-center justify-between max-w-[1200px] m-auto z-[222] relative max-lg:p-8 max-[1200px]:px-4">
                <div className="flex flex-col items-start justify-start text-left gap-8 z-[222] max-lg:gap-4">
                    <h1 className="text-6xl font-bold text-[#1b0b3b] tracking-tight max-w-[55%] max-lg:text-4xl">{title}</h1>
                    <p className="text-xl text-[#1b0b3b]/50 max-w-[60%] max-lg:text-base">{description}</p>
                    <div className="flex items-center justify-center gap-4">
                        <button className="bg-gradient-to-t from-violet-600 to-violet-400 text-white px-8 py-4 rounded-lg font-medium text-xl hover:scale-95 duration-300 max-lg:px-6 max-lg:py-3 max-lg:text-base">Create team</button>
                    </div>
                </div>
                <div className='w-[60vw] left-[50%] rounded-lg shadow-[0_0_100px_20px_rgba(127,95,255,0.3)] absolute max-lg:m-auto max-lg:w-full'>
                    <Image className='rounded-lg' src="/Hero_image.png" width={2000} height={2000} alt="" />
                </div>
                <Image className='absolute rotate-[15deg] -top-[25%] -left-[50%] -z-50 max-lg:-top-24 max-lg:-left-[25%]' src="/Lines.svg" width={2000} height={2000} alt="" />
            </div>
        </>
    )
}