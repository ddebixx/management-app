import { SocialProof } from "./SocialProof"

export const SocialProofSection = () => {
    return (
        <>
            <div className="flex flex-col max-w-[1200px] w-full m-auto min-h-screen justify-start items-start gap-16 mt-16">
                <h1 className="text-5xl font-bold tracking-tight">
                    A platform created for <br />  <span className="text-violet-400">every</span> team member
                </h1>
                <SocialProof
                    workerImage="/ProjectManager.jpg"
                    companyLogoImage="/Integrations/Slack_logo.png"
                    workerName="Elon Musk"
                    title={`Find everything you need to be extremely efficient`}
                    position={"Senior Project Manager at Slack"}
                    hero={"Become the best project manager your team’s ever had. Deliver projects on time and under budget. Manage scope creep, delays, and workloads. Keep all your stakeholders informed and happy."}
                    story={'"I spend all day in Teamwork checking on tasks, making sure to-dos are done, running reports, looking at time logs. With Teamwork we can dive deeper into budgets and make smarter decisions for the projects"'}>
                    <div className="border-b-2 border-violet-600 py-2 w-48">
                        <p className="font-bold text-lg ">Project Managers</p>
                    </div>
                </SocialProof>
                <SocialProof
                    workerImage="/ProjectManager.jpg"
                    companyLogoImage="/Integrations/GH_logo.png"
                    workerName="Elon Musk"
                    title={"Streamline every aspect of client work operations"}
                    position={"Director of Corporate Operations "}
                    hero={"Get everything you need to keep your team properly utilized, deliver consistently profitable work, and report on project, client, and business KPIs to senior management — all in one platform."}
                    story={'"I cannot put a dollar figure on the impact of Teamwork. To be able to track tasks, timelines, details and then have that information in report format to pull at a moment’s notice has made my job immeasurably more efficient".'}>
                    <div className="border-b-2 border-violet-600 py-2 w-48">
                        <p className="font-bold text-lg ">Head of Operations</p>
                    </div>
                </SocialProof>
                <SocialProof
                    workerImage="/ProjectManager.jpg"
                    companyLogoImage="/Integrations/ChurnZero_logo.png"
                    workerName="Elon Musk"
                    title={"Keep your clients happy and your company profitable"}
                    position={"President at The Brand Leader™"}
                    hero={"Deliver more projects with better outcomes. Minimize the manual work to manage cash flow, budgets and staff utilization. Clear the deck to focus on bringing in new clients and grow your business."}
                    story={'"If your profitability goes up means that your team is working efficiently, we could not have done that without Teamwork. We’re now able to take our eyes off a lot of particular issues and focus on scaling the business"'}>
                    <div className="border-b-2 border-violet-600 py-2 w-48">
                        <p className="font-bold text-lg ">Founders & Owners</p>
                    </div>
                </SocialProof>
            </div>

        </>
    )
}