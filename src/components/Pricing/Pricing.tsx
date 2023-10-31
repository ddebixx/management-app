import CheckIcon from '@mui/icons-material/Check';

interface PricingProps {
    billing?: string;
    description: string;
    price: string;
    features: string[];
    children?: React.ReactNode;
    title: string;
}

export const Pricing = ({
    billing,
    description,
    price,
    features,
    title,
    children
}: PricingProps) => {
    return (
        <>
            <div className="max-w-[350px] w-full p-8 gap-4 flex flex-col z-[222] bg-white border rounded-lg shadow-lg hover:scale-105 duration-300">
                <p className="text-2xl font-bold text-violet-600">{title}</p>
                <p className="text-black/70">{description}</p>
                <div className="flex gap-2">
                    <h3 className="text-2xl font-semibold text-violet-500">{price}</h3>
                    <p className="text-sm text-black/50">{billing}</p>
                </div>
                <ul className="flex flex-col gap-2 text-sm">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <p><CheckIcon className='text-sm mr-2' />{feature}</p>
                        </li>
                    ))}
                </ul>
                {children}
            </div>
        </>
    )
}