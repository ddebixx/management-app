import { Icon } from "@mui/material";
import React from "react";

export interface AdvantagesProps {
    icon: React.ElementType;
    title: string;
    description: string;
    className?: string;
}

export const Advantages = ({
    icon,
    title,
    description,
    className
}: AdvantagesProps) => {
    return (
        <>
            <div className="flex items-start gap-4 justify-center max-w-[1200px] w-full bg-gradient-to-r border p-8 rounded-lg duration-300 hover:bg-violet-100 max-[480px]:p-4">
                <Icon className="text-indigo-950" fontSize={"large"} component={icon} />
                <div className="flex flex-col gap-2">
                    <p className="text-xl font-bold text-indigo-950">{title}</p>
                    <p className="text-black/70 text-base">{description}</p>
                </div>
            </div>
        </>
    )
}