"use client";

import NavBar from "@/app/components/navbar";
import PageTitle from "./components/pageTitle";
import HomeCard from "./components/homeCard";
import { useViewport } from "@/context/ViewportContext";

export default function Home() {
  const { isMdUp } = useViewport();

  return (
    <main className="flex h-screen bg-bodyBackground">
      {isMdUp ? (
        <>
          <NavBar />
          <section className="relative flex-1 overflow-hidden bg-[radial-gradient(circle_at_20%_10%,rgba(196,101,15,0.12),transparent_38%),radial-gradient(circle_at_80%_80%,rgba(99,85,66,0.18),transparent_35%)]">
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.45),rgba(255,255,255,0.8))]" />
            <div className="relative flex h-full flex-col">
            <PageTitle title="Home" />
            <div className="flex flex-1 items-center px-8 py-8 xl:px-12 overflow-y-auto">
              <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-6 2xl:gap-8">
                <HomeCard
                  title="Applications"
                  subText="Review all your submitted applications, update their details, and monitor your progress throughout the hiring process."
                  navLink="applications"
                />
                <HomeCard
                  title="Stats"
                  subText="Review all your submitted applications, update their details, and monitor your progress throughout the hiring process."
                  navLink="stats"
                />
                <HomeCard
                  title="Notes"
                  subText="Review all your submitted applications, update their details, and monitor your progress throughout the hiring process."
                  navLink="stats"
                />
                <HomeCard
                  title="Credits"
                  subText="Review all your submitted applications, update their details, and monitor your progress throughout the hiring process."
                  navLink="stats"
                />
              </div>
            </div>
            </div>
          </section>
        </>
      ) : (
        <section className="flex-1 flex flex-col bg-[radial-gradient(circle_at_20%_10%,rgba(196,101,15,0.12),transparent_38%),radial-gradient(circle_at_80%_80%,rgba(99,85,66,0.18),transparent_35%)]">
          <PageTitle title="Home" />
          <div className="flex-1 px-4 pt-4 pb-24 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <HomeCard
                title="Applications"
                subText="Review all your submitted applications, update their details, and monitor your progress throughout the hiring process."
                navLink="applications"
              />
              <HomeCard
                title="Stats"
                subText="Review all your submitted applications, update their details, and monitor your progress throughout the hiring process."
                navLink="stats"
              />
              <HomeCard
                title="Notes"
                subText="Review all your submitted applications, update their details, and monitor your progress throughout the hiring process."
                navLink="stats"
              />
              <HomeCard
                title="Credits"
                subText="Review all your submitted applications, update their details, and monitor your progress throughout the hiring process."
                navLink="stats"
              />
            </div>
          </div>
          <NavBar />
        </section>
      )}
    </main>
  );
}
