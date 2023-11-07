import Link from 'next/link'

const date = new Date()

export const Footer = () => {
    return (
        <footer className="flex items-center justify-center w-full border-t bg-violet-50 py-16 max-[1200px]:px-8 max-[480px]:px-4">
            <div className="max-w-[1200px] w-full flex justify-between max-md:flex-col max-md:items-center max-md:justify-center max-md:gap-8 max-md:text-center">
                <div className='flex flex-col justify-between'>
                    <h1 className="text-3xl font-sans font-semibold text-[#1b0b3b] m-0">Hour.ly</h1>
                    <p className="text-black/70 text-sm max-md:hidden">© {date.getFullYear()} Hour.ly. All rights reserved.</p>
                </div>
                <ul className="flex flex-col gap-4">
                    <li>PRODUCT</li>
                    <li className="text-sm text-black/70"><Link href="">Pricing</Link></li>
                    <li className="text-sm text-black/70"><Link href="">Feedback</Link></li>
                </ul>
                <ul className="flex flex-col gap-4">
                    <li>COMPANY</li>
                    <li className="text-sm text-black/70"><Link href="">About</Link></li>
                    <li className="text-sm text-black/70"><Link href="">Blog</Link></li>
                    <li className="text-sm text-black/70"><Link href="">Careers</Link></li>
                </ul>
                <ul className="flex flex-col gap-4">
                    <li>CONTACT</li>
                    <li className="text-sm text-black/70"><Link href="">Discord</Link></li>
                    <li className="text-sm text-black/70"><Link href="">Twitter</Link></li>
                    <li className="text-sm text-black/70"><Link href="">GitHub</Link></li>
                    <li className="text-sm text-black/70"><Link href="">Email</Link></li>
                </ul>
                <ul className="flex flex-col gap-4">
                    <li>LEGAL</li>
                    <li className="text-sm text-black/70"><Link href="">Terms of Service</Link></li>
                    <li className="text-sm text-black/70"><Link href="">Privacy Policy</Link></li>
                </ul>
                <p className="text-black/70 text-sm min-[768px]:hidden">© {date.getFullYear()} Hour.ly. All rights reserved.</p>
            </div>
        </footer>
    )
}