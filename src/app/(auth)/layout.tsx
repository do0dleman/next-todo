import ParticlesBackground from "../_components/ParticlesBackground";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex justify-center items-center h-screen">
            {children}
            <ParticlesBackground />
        </div>
    );
}