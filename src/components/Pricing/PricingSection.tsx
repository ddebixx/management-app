import { Pricing } from "./Pricing"
import Image from 'next/image'

export const PricingSection = () => {
    return (
        <>
                <div id="pricing" className="min-h-screen max-w-[1200px] m-auto w-full flex items-center justify-between max-[1200px]:px-4">
                    <Pricing title="Basic"
                        description="For small teams or office"
                        price="FREE"
                        features={["Up to 10 users", "Schedule", "PDF Generator", "Email Support", "Lifetime Updates"]}
                    ><button className="border-violet-600 border-2 text-black w-44 self-center py-2 rounded-full font-medium hover:scale-95 hover:opacity-80 duration-300">GET STARTED</button></Pricing>
                    <Pricing title="Pro"
                        description="For bigger teams or office"
                        price="$4.99"
                        billing="/mo/per user"
                        features={["Up to 50 users", "Recrutation process", "PDF Generator", "Schedule", "Task management", "Priority Email Support", "Lifetime Updates"]}
                    ><button className="bg-gradient-to-t from-violet-600 to-violet-400 text-white w-44 self-center py-2 rounded-full font-medium hover:scale-95 hover:opacity-80 duration-300 shadow-[0_0_15px_5px_rgba(127,95,255,.3)]">GET STARTED</button></Pricing>
                    <Pricing title="Enterprise"
                        description="For large teams or office"
                        price="$9.99"
                        billing="/mo/per user"
                        features={["Unlimited users", "Recrutation process", "PDF Generator", "Schedule", "Task management", "Priority Email Support", "Lifetime Updates"]}
                    ><button className="bg-gradient-to-t from-violet-600 to-violet-400 text-white w-44 self-center py-2 rounded-full font-medium hover:scale-95 hover:opacity-80 duration-300 shadow-[0_0_15px_5px_rgba(127,95,255,.3)]">GET STARTED</button></Pricing>
                </div>
        </>
    )
}