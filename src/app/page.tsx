import Link from "next/link";
import Header from "./_components/Header";
import ParticlesBackground from "./_components/ParticlesBackground";
import { FaFolder, FaRegListAlt } from "react-icons/fa/"
import SectionWave from "./ui/svg/SectionWave";
import AnimateText from "./(mainPage)/components/AnimateText";
import SeeTodosButton from "./(mainPage)/components/SeeTodosButton";
import SectionContainer from "./(mainPage)/ui/SectionContainer";
import Title1 from "./(mainPage)/ui/Titles/Title1";
import TextBlock from "./(mainPage)/ui/TextBlock";
import SvgImage from "./(mainPage)/ui/SvgImage";

export default function Home() {

  return (
    <div className="bg-transparent flex-1">
      <Header isMainPage={true} />
      <main className="flex flex-wrap container min-w-full
      flex-col items-center justify-center md:mt-40 mt-32 md:pb-24 pb-32">
        <h1 className="md:text-7xl text-6xl uppercase md:px-32 px-6 self-center text-center">
          <AnimateText
            duration={70}
            text={"Welcome to my own generic TODO app"}
            brPositions={[2, 4]}
            contentOnFinish={<>
              Welcome to <br /><span className="text-active">my own</span> <br />
              <span className="text-inactive italic ">generic</span> TODO app
            </>}
          />
        </h1>
        <h4 className="md:text-2xl text-lg text-center mt-12 px-8 max-w-5xl">
          This is yet another to do app. You might think that the fact that so many people create such apps
          shows how non-creative we&apos;ve become, but it is a good practice for us, developers.
        </h4>
        <SeeTodosButton />
      </main>
      <ParticlesBackground />
      <SectionWave className="children:opacity-0" />
      <div className="bg-deepBlue -z-20 absolute w-full h-full top-0" />
      <section className="bg-main pb-20 pt-16 relative">
        <SectionWave className="absolute top-0 translate-y-[-100%] rotate-180 children:fill-main" />
        <SectionContainer>
          <article className="md:w-2/3 md:pr-20">
            <Title1>
              <AnimateText
                text={"Make your life easier"}
                contentOnFinish={<>
                  Make your life <span className="text-active">easier</span>
                </>}
              />
            </Title1>
            <TextBlock>
              <p>Embrace the power of <span className="text-active">organization</span> with this todo list.
                Stay focused, prioritize tasks, and achieve your goals with ease.</p>
              <p>Experience the transformative impact of efficient <span className="text-active">task
                management</span> as you conquer your day one checklist at a time.</p>
            </TextBlock>
          </article>
          <SvgImage>
            <FaRegListAlt />
          </SvgImage>
        </SectionContainer>
        <SectionWave className="absolute bottom-0 translate-y-[98%]" />
      </section >
      <section className="pt-12 pb-10 md:pb-28 bg-secondary">
        <SectionWave className="children:opacity-0" />
        <SectionContainer>
          <SvgImage>
            <FaFolder />
          </SvgImage>
          <article className="md:w-2/3 md:pl-20">
            <Title1>
              <AnimateText
                text="Organize your Todos in folders"
                contentOnFinish={<>
                  Organize your Todos in <span className="text-active">folders</span>
                </>}
              />
            </Title1>
            <TextBlock >
              <p>
                Unlock a new level of productivity by <span className="text-active">organizing</span> your todos into folders.
              </p>
              <p>
                With streamlined <span className="text-active">categorization</span>, effortlessly manage different aspects of your life or projects.
              </p>
            </TextBlock>
          </article>
        </SectionContainer>
      </section>
      <footer className="bg-tertiary py-4 text-lg text-center">
        <p>Made by <Link target="_blank"
          className="text-active" href="https://github.com/do0dleman/"
        >Ņikita Obrazcovs</Link>. © 2023 All rights reserved.</p>
      </footer>
    </div >
  )
}
