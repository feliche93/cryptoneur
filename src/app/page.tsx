import Image from "next/image";
import Hero from "../components/home/Hero";
import Skills from "../components/home/Skills";
import WebsiteStats from "../components/home/WebsiteStats";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Hero />
      <WebsiteStats />
      <Skills />
    </>
  );
}
