import Image from "next/image";

interface SocialProofProps {
    className?: string;
    children?: React.ReactNode;
    title: string;
    position: string;
    story: string;
    hero: string;
    workerName: string;
    companyLogoImage: string;
    workerImage: string;
}

export const SocialProof = ({
    className,
    workerImage,
    children,
    title,
    position,
    story,
    hero,
    workerName,
    companyLogoImage
}: SocialProofProps) => {
    return (
        <>
            <div className="flex items-center justify-between gap-8 max-lg:flex-col">
                <div className="w-full gap-12 flex flex-col z-[222] max-md:gap-8">
                    <div>
                        {children}
                    </div>
                    <h3 className="text-3xl font-bold max-w-[70%] max-md:text-xl">{title}</h3>
                    <p className="text-black/70 text-lg max-md:text-base">{hero}</p>
                    <div className="bg-gradient-to-r from-pink-200 to-violet-200 p-8 rounded-lg flex gap-8">
                        <Image src={companyLogoImage} className="w-16 max-w-[50px] max-h-[50px]" width={1000} height={1000} alt="" />
                        <div className="flex flex-col gap-4">
                            <p className="text-black/70 tracking-wide text-lg">{story}</p>
                            <div>
                                <p className="font-semibold">{workerName}</p>
                                <p className="text-black/70 text-base"> {position}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Image src={workerImage} className="rounded-lg object-cover w-[50%] self-end max-lg:hidden" alt="" width={1000} height={1000} />
            </div>
        </>
    )
}