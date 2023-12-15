import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../../components/builder";
import { useUserContext } from "@/actions/userContextProvider";
import { useRouter } from "next/navigation";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface PageProps {
    params: {
        page: string[];
    };
}

export default async function Page(props: PageProps) {
    const content = await builder
        .get("page", {
            userAttributes: {
                urlPath: "/" + (props?.params?.page?.join("/") || ""),
            },
        })
        .toPromise();

    return (
        <>
            <RenderBuilderContent content={content} />
        </>
    );
}
