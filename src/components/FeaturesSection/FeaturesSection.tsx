import { Content } from "./Content"
import Image from "next/image";

export const FeaturesSection = () => {
    return (
        <>
            <div id="features" className="max-w-[1200px] w-full m-auto gap-8 min-h-screen grid grid-cols-3 grid-rows-2 [&>*]:shadow-lg max-lg:grid-cols-1 max-[1200px]:px-8 max-[480px]:px-4 max-sm:py-32">
                <Content title="Follow recruitment progress"
                    description="Effortlessly monitor your hiring journey"
                    className="col-span-2 border flex flex-col gap-4 items-start justify-center p-8 rounded-lg relative overflow-hidden z-[222] hover:outline hover:outline-violet-400 hover:scale-105 duration-200 max-lg:col-span-2 max-lg:h-[300px] max-lg:justify-end"
                ><Image src="/Recruitment.png" alt="" width={1000} height={1000} className="object-cover absolute -right-32 -top-40 z-0 opacity-80 max-lg:bottom-0 max-lg:min-w-[450px] max-sm:min-w-[400px] max-sm:top-1/2 max-sm:left-1/2 max-sm:transform max-sm:-translate-x-1/2 max-sm:-translate-y-1/2" /></Content>
                <Content title="Generate PDF's"
                    description="Effortless document creation and management with our templates"
                    className="col-span-1 border flex flex-col gap-4 items-start justify-end p-8 rounded-lg relative overflow-hidden hover:outline hover:outline-violet-400 hover:scale-105 duration-200 max-lg:col-span-2 max-lg:h-[300px]"
                ><Image src="/Pdf.png" alt="" width={700} height={700} className="object-cover absolute -right-0 -top-0 z-0 opacity-80 max-lg:min-w-[450px] max-lg:-top-12 max-sm:min-w-[400px] max-sm:top-1/2 max-sm:left-1/2 max-sm:transform max-sm:-translate-x-1/2 max-sm:-translate-y-48 max-[480px]:min-w-[300px]" /></Content>
                <Content title="Tasks tracking"
                    description="Streamline task management with precision"
                    className="col-span-1 border flex flex-col gap-4 items-start justify-end p-8 rounded-lg relative overflow-hidden hover:outline hover:outline-violet-400 hover:scale-105 duration-200 max-lg:col-span-2 max-lg:h-[300px] max-lg:justify-end"
                ><Image src="/Tasks.png" alt="" width={700} height={700} className="object-cover absolute -right-32 -top-0 z-0 opacity-80 max-lg:min-w-[450px] max-sm:min-w-[400px] max-sm:top-1/2 max-sm:left-1/2 max-sm:transform max-sm:-translate-x-1/2 max-sm:-translate-y-1/2 max-[480px]:min-w-[300px]" /></Content>
                <Content title={`Easy to use schedule`}
                    description="Empower your workforce with task scheduling"
                    className="col-span-2 border flex flex-col gap-4 items-start justify-center p-8 rounded-lg relative overflow-hidden z-[222] hover:outline hover:outline-violet-400 hover:scale-105 duration-200 max-lg:col-span-2 max-lg:h-[300px] max-lg:justify-end"
                ><Image src="/Calendar.png" alt="" width={700} height={700} className="object-cover absolute -right-32 -top-8 z-0 max-lg:min-w-[450px] max-sm:min-w-[400px] max-sm:top-1/2 max-sm:left-1/2 max-sm:transform max-sm:-translate-x-1/2 max-sm:-translate-y-1/2 max-[480px]:min-w-[300px]" /></Content>
            </div>
        </>
    )
}