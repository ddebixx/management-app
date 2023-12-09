import { Pricing } from "./Pricing"

export const PricingSection = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center gap-8 min-h-screen max-[1200px]:px-8 max-[1200px]:py-32 max-sm:px-4">
                <div id="pricing" className="w-full gap-8 flex items-center flex-wrap max-w-[1200px]">
                    <Pricing title="Basic"
                        description="For small teams or office"
                        price="FREE"
                        features={["Up to 10 users", "Schedule", "PDF Generator", "Email Support", "Lifetime Updates"]}
                    />
                    <Pricing title="Pro"
                        description="For bigger teams or office"
                        price="$4.99"
                        billing="/mo/per user"
                        features={["Up to 50 users", "Recrutation process", "PDF Generator", "Schedule", "Task management", "Priority Email Support", "Lifetime Updates"]}
                    />
                    <Pricing title="Enterprise"
                        description="For large teams or office"
                        price="$9.99"
                        billing="/mo/per user"
                        features={["Unlimited users", "Recrutation process", "PDF Generator", "Schedule", "Task management", "Priority Email Support", "Lifetime Updates"]}
                    />
                </div>
                <button className="border-violet-600 border-2 text-violet-600 px-16 py-4 rounded-full font-medium hover:scale-95 hover:opacity-80 duration-300 max-lg:text-sm">Get started</button>
            </div>
        </>
    )
}