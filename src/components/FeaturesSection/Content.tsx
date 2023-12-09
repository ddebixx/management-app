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
            <div className="flex max-lg">
                <div className="flex flex-col items-start justify-center gap-4">
                    <h2 className="text-4xl font-semibold z-[222] max-lg:text-3xl max-sm:text-2xl">
                        {title}
                    </h2>
                    <p className="max-w-[80%] z-[222] text-black/70 max-lg:hidden">{description}</p>
                </div>
                {children}
            </div>
        </div>
    )
}