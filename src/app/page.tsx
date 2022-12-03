import Calendar from "../components/home/Calendar";
import CompanyCloud from "../components/home/CompanyCloud";
import Hero from "../components/home/Hero";
import Skills from "../components/home/Skills";
import WebsiteStats from "../components/home/WebsiteStats";

export default function Home() {
  return (
    <>
      <Hero />
      {/* <WebsiteStats /> */}
      <Skills />
      <CompanyCloud />
      {/* <Calendar /> */}
    </>
  );
}
