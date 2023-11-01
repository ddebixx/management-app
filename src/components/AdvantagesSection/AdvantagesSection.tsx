import { Advantages } from "./Advantages"
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import StackedLineChartRoundedIcon from '@mui/icons-material/StackedLineChartRounded';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import OpenWithRoundedIcon from '@mui/icons-material/OpenWithRounded';

export const AdvantagesSection = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center gap-16 max-w-[1200px] w-full m-auto min-h-screen max-[1200px]:px-8 max-[480px]:px-4">
                <div className="flex items-center justify-between gap-16 max-lg:flex-col">
                    <div className="flex flex-col items-center justify-center gap-8 ">
                        <h3 className="text-3xl font-bold max-w-[80%] self-start max-lg:text-2xl max-[480px]:text-xl">Eliminate chaos by tracking performance across every project, team, and client</h3>
                        <Advantages
                            title="Prioritize what’s important"
                            description="With robust project management, milestones and detailed reporting on every aspect of performance."
                            icon={FormatListBulletedRoundedIcon} />
                        <Advantages
                            title="Get the most out of your team’s time"
                            description="By understanding where billable hours are going, who’s underutilized, and who can take on more."
                            icon={AccessTimeRoundedIcon} />
                        <Advantages
                            title="Grow your profit margin"
                            description="By monitoring project, client, and retainer performance and making data-driven decisions."
                            icon={StackedLineChartRoundedIcon} />
                    </div>
                    <div className="flex flex-col items-center justify-center gap-8 ">
                        <h3 className="text-3xl font-bold max-w-[80%] self-start max-lg:text-2xl max-[480px]:text-xl">Drive efficiency by streamlining all aspects of client work operations</h3>
                        <Advantages
                            title="Maximize capacity and utilization"
                            description="With integrated time tracking and resource management features, all in one place."
                            icon={HowToRegRoundedIcon} />
                        <Advantages
                            title="Simplify operations"
                            description="With pre-built templates, intake forms, process automation, and integrations for the tools you love."
                            icon={SettingsSuggestRoundedIcon} />
                        <Advantages
                            title="Scale your business"
                            description="By customizing processes and workflows in Teamwork.com to suit your team’s changing needs."
                            icon={OpenWithRoundedIcon} />
                    </div>
                </div>
                <div className="flex gap-8 max-[480px]:flex-col max-[480px]:gap-4">
                    <button className="bg-gradient-to-b from-violet-600 to-violet-500 text-white px-16 max-sm:px-12 self-center py-4 rounded-full font-medium hover:scale-95 hover:opacity-80 duration-300 shadow-[0_0_15px_5px_rgba(127,95,255,.3)] max-sm:">Get started</button>
                    <button className="px-16 max-sm:px-12 border-2 border-violet-600 text-violet-600 self-center py-4 rounded-full font-medium hover:scale-95 hover:opacity-80 duration-300">Learn more</button>
                </div>
            </div>
        </>
    )
}