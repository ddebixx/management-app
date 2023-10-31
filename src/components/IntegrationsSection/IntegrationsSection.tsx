import Image from 'next/image'

export const IntegrationsSection = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen gap-16 bg-violet-50">
                <h2 className='text-center text-3xl'>
                    We integrate with all tools you already using, <br /> so you can run your business from a single place.
                </h2>
                <div className="grid grid-cols-6 gap-8 w-full px-8">
                    <div className='border flex items-center justify-center rounded-lg hover:scale-105 duration-300 bg-white hover:outline hover:outline-violet-400'>
                        <Image src="/Integrations/Slack_logo.png" alt="" className='w-24' width={1000} height={1000} />
                    </div>
                    <div className='border flex p-8 items-center justify-center rounded-lg hover:scale-105 duration-300 bg-white hover:outline hover:outline-violet-400'>
                        <Image src="/Integrations/Gmail_logo.png" alt="" className='w-24' width={1000} height={1000} />
                    </div>
                    <div className='border flex p-8 items-center justify-center rounded-lg hover:scale-105 duration-300 bg-white hover:outline hover:outline-violet-400'>
                        <Image src="/Integrations/GH_logo.png" alt="" className='w-24' width={1000} height={1000} />
                    </div>
                    <div className='border flex p-8 items-center justify-center rounded-lg hover:scale-105 duration-300 bg-white hover:outline hover:outline-violet-400'>
                        <Image src="/Integrations/ChurnZero_logo.png" alt="" className='w-24' width={1000} height={1000} />
                    </div>
                    <div className='border flex p-8 items-center justify-center rounded-lg hover:scale-105 duration-300 bg-white hover:outline hover:outline-violet-400'>
                        <Image src="/Integrations/GoogleCalendar_logo.png" alt="" className='w-24' width={1000} height={1000} />
                    </div>
                    <div className='border flex p-8 items-center justify-center rounded-lg hover:scale-105 duration-300 bg-white hover:outline hover:outline-violet-400'>
                        <Image src="/Integrations/GoogleDrive_logo.png" alt="" className='w-24' width={1000} height={1000} />
                    </div>
                    <div className='border flex p-8 items-center justify-center rounded-lg hover:scale-105 duration-300 bg-white hover:outline hover:outline-violet-400'>
                        <Image src="/Integrations/MSTeams_logo.png" alt="" className='w-24' width={1000} height={1000} />
                    </div>
                    <div className='border flex p-8 items-center justify-center rounded-lg hover:scale-105 duration-300 bg-white hover:outline hover:outline-violet-400'>
                        <Image src="/Integrations/Notion_logo.png" alt="" className='w-24' width={1000} height={1000} />
                    </div>
                    <div className='border flex p-8 items-center justify-center rounded-lg hover:scale-105 duration-300 bg-white hover:outline hover:outline-violet-400'>
                        <Image src="/Integrations/Obsidian_logo.png" alt="" className='w-24' width={1000} height={1000} />
                    </div>
                    <div className='border flex p-8 items-center justify-center rounded-lg hover:scale-105 duration-300 bg-white hover:outline hover:outline-violet-400'>
                        <Image src="/Integrations/Outlook_logo.png" alt="" className='w-24' width={500} height={500} />
                    </div>
                    <div className='border flex p-8 items-center justify-center rounded-lg hover:scale-105 duration-300 bg-white hover:outline hover:outline-violet-400'>
                        <Image src="/Integrations/Slack_logo.png" alt="" className='w-24' width={500} height={500} />
                    </div>
                    <div className='border flex p-8 items-center justify-center rounded-lg hover:scale-105 duration-300 bg-white hover:outline hover:outline-violet-400'>
                        <Image src="/Integrations/VSC_logo.png" alt="" className='w-24' width={500} height={500} />
                    </div>      
                </div>
                <button className="flex rounded-full text-violet-600 border-2 font-medium border-violet-600 items-center justify-center px-16 py-4 hover:scale-95 duration-300 max-lg:text-sm max-lg:px-4 max-lg:py-1">
                    See all integrations
                </button>
            </div>
        </>
    )
}