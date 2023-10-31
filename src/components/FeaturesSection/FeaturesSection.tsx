import { Content } from "./Content"
import Image from "next/image";

export const FeaturesSection = () => {
    return (
        <>
            <div id="features" className="max-w-[1200px] w-full m-auto gap-8 min-h-screen grid grid-cols-3 grid-rows-2 [&>*]:shadow-lg">
                <Content title="Follow recruitment progress"
                    description="Effortlessly monitor your hiring journey"
                    className="col-span-2 border flex flex-col gap-4 items-start justify-center p-8 rounded-lg relative overflow-hidden z-[222] hover:outline hover:outline-violet-400 hover:scale-105 duration-200"
                ><Image src="/Dupa.png" alt="" width={1000} height={1000} className="object-cover absolute -right-32 -top-40 z-0 opacity-80" /></Content>
                <Content title="Generate PDF's"
                    description="Effortless document creation and management with our templates"
                    className="col-span-1 border flex flex-col gap-4 items-start justify-end p-8 rounded-lg relative overflow-hidden hover:outline hover:outline-violet-400 hover:scale-105 duration-200"
                ><Image src="/Pdf.png" alt="" width={700} height={700} className="object-cover absolute top-0 z-0 left-0" /></Content>
                <Content title="Tasks tracking"
                    description="Streamline task management with precision"
                    className="col-span-1 border flex flex-col gap-4 items-start justify-end p-8 rounded-lg relative overflow-hidden hover:outline hover:outline-violet-400 hover:scale-105 duration-200"
                ><Image src="/Tasks.png" alt="" width={700} height={700} className="object-cover absolute top-0 -bottom- z-0" /></Content>
                <Content title={`Easy to use schedule`}
                    description="Empower your workforce with task scheduling"
                    className="col-span-2 border flex flex-col gap-4 items-start justify-center p-8 rounded-lg relative overflow-hidden hover:outline hover:outline-violet-400 hover:scale-105 duration-200"
                ><Image src="/Calendar.png" alt="" width={600} height={600} className="object-cover absolute -right-32 -bottom-40 z-0 opacity-80" /></Content>
            </div>
        </>
    )
}