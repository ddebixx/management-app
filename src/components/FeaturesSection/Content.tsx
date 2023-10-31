import Image from "next/image";

interface ContentProps {
    title: string;
    description: string;
    className?: string;
    children?: React.ReactNode;
}

export const Content = ({
    title,
    description,
    className,
    children
}: ContentProps) => {
    return (
        <div className={`${className} z-[222] bg-white`}>
            <div className="flex">
                <div className="flex flex-col items-start justify-center gap-4">
                    <h2 className="text-4xl font-semibold z-[222]">
                        {title}
                    </h2>
                    <p className="max-w-[80%] z-[222] text-black/70">{description}</p>
                </div>
                {children}
            </div>
        </div>
    )
}