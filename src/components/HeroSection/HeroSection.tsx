import Image from 'next/image'

export const HeroSection = () => {
    return (
        <>
            <div className="w-full h-screen flex items-center justify-between p-16 z-[222]">
                <div className="flex flex-col items-start justify-start text-left gap-8 z-[222]">
                    <h1 className="text-6xl font-bold text-[#1b0b3b]">Create your team, <br /> we'll handle the rest</h1>
                    <p className="text-2xl font-medium text-[#1b0b3b]/50 max-w-[60%]">Made for teams big and small. Hour.ly takes complexity of managing to make it easier</p>
                    <div className="flex items-center justify-center gap-4">
                        <button className="bg-gradient-to-t from-violet-600 to-violet-400 text-white px-8 py-4 rounded-lg font-medium text-xl">Create team</button>
                    </div>
                </div>
                
                <div className='w-[50vw] rounded-lg shadow-[0_0_150px_20px_rgba(127,95,255,0.3)]'>
                    <Image className='rounded-lg' src="/Hero_image.png" width={2000} height={2000} alt="" />
                </div>
                <Image className='absolute rotate-[15deg] -top-[45%] -left-[50%] -z-50' src="/Lines.svg" width={2000} height={1000} alt="" />
            </div>
        </>
    )
}