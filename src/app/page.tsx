import Link from "next/link";
import Header from "./_components/Header";
import ParticlesBackground from "./_components/ParticlesBackground";
import AnimateText from "./ui/AnimateText";
import { FaRegListAlt } from "react-icons/fa/"
import SectionWave from "./ui/svg/SectionWave";

export default function Home() {

  return (
    <div className="bg-transparent flex-1">
      <Header isMainPage={true} />
      <main className="flex flex-wrap container min-w-full
      flex-col items-center justify-center md:my-40 my-32">
        <h1 className="md:text-7xl text-6xl uppercase md:px-32 px-6 self-center text-center">
          {/* Welcome to <br /><span className="text-active">my own</span> <br />
          <span className="text-inactive italic ">generic</span> TODO app */}
          {/* Welcome to my own generic TODO app */}
          <AnimateText
            text={"Welcome to my own generic TODO app"}
            duration={100}
            brPositions={[2, 4]}
          />
        </h1>
        <h4 className="md:text-2xl text-lg text-center mt-12 px-8 max-w-5xl">
          This is yet another to do app. You might think that the fact that so many people create such apps
          shows how non-creative we&apos;ve become, but it is a good practice for us, developers.
        </h4>
        <Link href="/todos" className="rounded bg-active-gradient px-6 py-3 text-lg mt-6 hover:shadow-[0px_0px_5px_2px_#7A44CF] hover:-translate-y-1/4 transition-all duration-300">
          See todos
        </Link>
      </main>
      <ParticlesBackground />
      <section className="bg-main py-20 relative">
        <SectionWave className="absolute top-0 translate-y-[-100%] children:fill-main" />
        <div className="container m-auto flex flex-col md:flex-row px-2">
          <article className="md:w-2/3 md:pr-20">
            <h1 className="text-6xl py-12 text-left">Make your
              life <span className="text-active">easier</span></h1>
            <div className="md:text-2xl text-xl children:pb-4">
              <p>Embrace the power of <span className="text-active">organization</span> with this todo list.
                Stay focused, prioritize tasks, and achieve your goals with ease.</p>
              <p>Experience the transformative impact of efficient <span className="text-active">task
                management</span> as you conquer your day one checklist at a time.</p>
            </div>
          </article>
          <div className="children:fill-active flex justify-center items-center 
          flex-grow children:min-w-full children:min-h-full children:h-44">
            <FaRegListAlt />
          </div>
        </div>
        <SectionWave className="absolute bottom-0 rotate-0 translate-y-[98%]" />
      </section>
      <section>
        <article>
          {/* h1 */}
        </article>
      </section>
    </div>
  )
}
