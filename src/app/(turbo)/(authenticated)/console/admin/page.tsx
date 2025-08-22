"use server";

import { Header } from "@/components/atoms/server/brand/header/header";

type DashboardPageProps = {};

const DashboardPage = async ({}: DashboardPageProps) => {
    // TODO - TK
    return <Header title={"Dashboard"} />;
};

export default DashboardPage;
