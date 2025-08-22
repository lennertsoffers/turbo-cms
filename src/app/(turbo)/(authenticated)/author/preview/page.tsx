type AuthorPreviewPageProps = {
    params: Promise<{
        "page-id": string;
    }>;
};

const AuthorPreviewPage = async ({ params }: AuthorPreviewPageProps) => {
    return (
        <div>
            {"Page"}
            {(await params)["page-id"]}
        </div>
    );
};

export default AuthorPreviewPage;
