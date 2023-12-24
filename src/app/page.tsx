import Link from "next/link";
import Header from "./_components/Header";
import ParticlesBackground from "./_components/ParticlesBackground";

export default function Home() {

  return (
    <div className="bg-transparent bg-repeat flex-1">
      <Header isMainPage={true} />
      <main className="flex flex-wrap container min-w-full flex-col items-center justify-center mt-40">
        <h1 className="text-7xl uppercase px-32 self-center text-center">
          Welcome to <br /><span className="text-active">my own</span> <br />
          <span className="text-inactive italic ">generic</span> TODO app
        </h1>
        <h4 className="text-2xl text-center mt-12 px-8 max-w-5xl">
          This is yet another to do app. You might think that the fact that so many people do this
          shows how non-creative we&apos;ve become but it is a good practice for us, developers.
        </h4>
        <Link href="/todos" className="rounded bg-active-gradient px-6 py-3 text-lg mt-4 hover:shadow-[0px_0px_5px_2px_#7A44CF] hover:-translate-y-1/4 transition-all duration-300">
          See todos
        </Link>
      </main>
      <ParticlesBackground />
    </div>
  )
}
