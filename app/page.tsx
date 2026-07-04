import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Studio from "@/components/Studio";
import Services from "@/components/Services";
import Capabilities from "@/components/Capabilities";
import Process from "@/components/Process";
import Work from "@/components/Work";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Studio />
        <Services />
        <Capabilities />
        <Process />
        <Work />
        <Contact />
      </main>
    </>
  );
}
