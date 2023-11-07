import Image from 'next/image'

export const IntegrationsSection = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen gap-16 px-8 max-sm:py-32 max-[480px]:px-4">
                <h2 className='text-center text-3xl max-lg:text-2xl max-sm:text-xl min-[1024px]:max-w-[36%]'>
                    We integrate with all tools you already using, so you can run your business from a single place.
                </h2>
                <div className="grid grid-cols-6 gap-8 w-full max-lg:grid-cols-4 max-sm:grid-cols-3 max-sm:gap-4 max-[480px]:grid-cols-3">
                    <div className='border flex p-8 items-center justify-center rounded-lg hover:scale-105 duration-300 bg-white hover:outline hover:outline-violet-400 max-[480px]:p-4'>
                        <Image src="/Integrations/Slack_logo.png" alt="" className='min-w-[36px] max-w-[128px]' width={1000} height={1000} />
                    </div>
                    <div className='border flex p-8 items-center justify-center rounded-lg hover:scale-105 duration-300 bg-white hover:outline hover:outline-violet-400 max-[480px]:p-4'>
                        <Image src="/Integrations/Gmail_logo.png" alt="" className='min-w-[36px] max-w-[128px]' width={1000} height={1000} />
                    </div>
                    <div className='border flex p-8 items-center justify-center rounded-lg hover:scale-105 duration-300 bg-white hover:outline hover:outline-violet-400 max-[480px]:p-4'>
                        <Image src="/Integrations/GH_logo.png" alt="" className='min-w-[36px] max-w-[128px]' width={1000} height={1000} />
                    </div>
                    <div className='border flex p-8 items-center justify-center rounded-lg hover:scale-105 duration-300 bg-white hover:outline hover:outline-violet-400 max-[480px]:p-4'>
                        <Image src="/Integrations/ChurnZero_logo.png" alt="" className='min-w-[36px] max-w-[128px]' width={1000} height={1000} />
                    </div>
                    <div className='border flex p-8 items-center justify-center rounded-lg hover:scale-105 duration-300 bg-white hover:outline hover:outline-violet-400 max-[480px]:p-4'>
                        <Image src="/Integrations/GoogleCalendar_logo.png" alt="" className='min-w-[36px] max-w-[128px]' width={1000} height={1000} />
                    </div>
                    <div className='border flex p-8 items-center justify-center rounded-lg hover:scale-105 duration-300 bg-white hover:outline hover:outline-violet-400 max-[480px]:p-4'>
                        <Image src="/Integrations/GoogleDrive_logo.png" alt="" className='min-w-[36px] max-w-[128px]' width={1000} height={1000} />
                    </div>
                    <div className='border flex p-8 items-center justify-center rounded-lg hover:scale-105 duration-300 bg-white hover:outline hover:outline-violet-400 max-[480px]:p-4'>
                        <Image src="/Integrations/MSTeams_logo.png" alt="" className='min-w-[36px] max-w-[128px]' width={1000} height={1000} />
                    </div>
                    <div className='border flex p-8 items-center justify-center rounded-lg hover:scale-105 duration-300 bg-white hover:outline hover:outline-violet-400 max-[480px]:p-4'>
                        <Image src="/Integrations/Notion_logo.png" alt="" className='min-w-[36px] max-w-[128px]' width={1000} height={1000} />
                    </div>
                    <div className='border flex p-8 items-center justify-center rounded-lg hover:scale-105 duration-300 bg-white hover:outline hover:outline-violet-400 max-[480px]:p-4'>
                        <Image src="/Integrations/Obsidian_logo.png" alt="" className='min-w-[36px] max-w-[128px]' width={1000} height={1000} />
                    </div>
                    <div className='border flex p-8 items-center justify-center rounded-lg hover:scale-105 duration-300 bg-white hover:outline hover:outline-violet-400 max-[480px]:p-4'>
                        <Image src="/Integrations/Outlook_logo.png" alt="" className='min-w-[36px] max-w-[128px]' width={1000} height={1000} />
                    </div>
                    <div className='border flex p-8 items-center justify-center rounded-lg hover:scale-105 duration-300 bg-white hover:outline hover:outline-violet-400 max-[480px]:p-4'>
                        <Image src="/Integrations/BitBucket_logo.png" alt="" className='min-w-[36px] max-w-[128px]' width={1000} height={1000} />
                    </div>
                    <div className='border flex p-8 items-center justify-center rounded-lg hover:scale-105 duration-300 bg-white hover:outline hover:outline-violet-400 max-[480px]:p-4'>
                        <Image src="/Integrations/VSC_logo.png" alt="" className='min-w-[36px] max-w-[128px]' width={1000} height={1000} />
                    </div>
                </div>
                <button className="flex rounded-full text-violet-600 border-2 font-medium border-violet-600 items-center justify-center px-16 py-4 hover:scale-95 duration-300 max-md:px-4 max-md:text-md">
                    See all integrations
                </button>
            </div>
        </>
    )
}