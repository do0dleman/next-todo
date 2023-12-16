import Header from "../_components/Header";
import HeaderPlaceholder from "../_components/HeaderPlaceholder";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>
        <HeaderPlaceholder />
        <Header />
        {children}
    </>
}