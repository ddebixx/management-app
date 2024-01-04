"use client";

import { parseSearchParams } from "@/utils/utils";
import Link from "next/link";;
import { useSearchParams } from "next/navigation";

interface PaginationProps {
    page: number;
    pageCount: number;
    pathname: string;
}

const Pagination = ({ page, pageCount, pathname }: PaginationProps) => {
    const searchParams = useSearchParams();
    const parsedParams = parseSearchParams(searchParams);

    return (
        <>
            <div className="bg-gradient-to-b from-violet-600 to-violet-500 text-white px-8 py-2 rounded-full font-medium hover:scale-95 hover:opacity-80 duration-300 w-fit">
                {page !== 1 && (
                    <Link href={{
                            pathname,
                            query: {
                                ...parsedParams,
                                page: page - 1,
                            },
                        }}>
                        Previous
                    </Link>
                )}
                {pageCount > page && (
                    <Link href={{
                            pathname,
                            query: {
                                ...parsedParams,
                                page: page + 1,
                            },
                        }}>
                        Next
                    </Link>

                )}
            </div>
        </>
    );
};

export default Pagination;