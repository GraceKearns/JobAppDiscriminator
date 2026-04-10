"use client";

import { Suspense } from "react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Manrope } from "next/font/google";
import { ArrowLeft } from "lucide-react";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function SignInPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-bodyBackground" />}>
      <SignInContent />
    </Suspense>
  );
}

function SignInContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const [isCreating, setIsCreating] = useState(false);
  const [createMessage, setCreateMessage] = useState<string | null>(null);
  const [createError, setCreateError] = useState<string | null>(null);
  const [showSignUp, setShowSignUp] = useState<boolean>(false)
  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl });
  };

  const handleCreateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreateMessage(null);
    setCreateError(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      firstName: String(formData.get("firstName") ?? "").trim(),
      lastName: String(formData.get("lastName") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim().toLowerCase(),
      password: String(formData.get("password") ?? "").trim()
    };

    if (!payload.firstName || !payload.lastName || !payload.email) {
      setCreateError("Please complete all fields.");
      return;
    }

    try {
      setIsCreating(true);
      const response = await fetch("/api/createAccount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        setCreateError(data?.error ?? "Unable to create account right now.");
        return;
      }
      setCreateMessage("Account created. Continue with Google to sign in.");
      (e.currentTarget as HTMLFormElement).reset();
    } catch {
      setCreateError("Unable to create account right now.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <main className={`${manrope.className} relative min-h-screen overflow-hidden bg-bodyBackground`}>
      <section className="relative z-10 flex min-h-screen w-full items-stretch  ">
        <div className="grid w-full grid-cols-1 lg:grid-cols-[30%_70%] ">
          <div className="order-2 flex h-full flex-col border-2 border-black bg-[#3a2f27] p-8 text-white lg:order-1 lg:p-12 xl:p-14">
            <div className="flex h-full w-full flex-col  border-2 border-[#d3b392]/40 bg-linear-to-br from-[#534036] to-[#3a2f27] p-6 sm:p-8 lg:p-10 xl:p-12">
              <p className="text-sm uppercase tracking-[0.22em] text-[#e1ce7a] font-semibold">
                Sign Up
              </p>
              <h1 className="mt-4 text-4xl leading-tight sm:text-5xl text-white font-extrabold">
                Sign up and start tracking smarter
              </h1>
              <p className="mt-6 text-lg leading-8 text-[#f4f2f1] sm:text-xl font-medium">
                Use your Google account to create your workspace, sync your application activity, and keep your job search organized from day one.
              </p>
           
         
                <div className="mt-8 lg:mt-0 lg:flex lg:flex-1 lg:items-center">
                  <div className="w-full border-2 border-[#d3b392]/45 bg-[#241a12]/45 p-5">
                    <p className="text-lg uppercase tracking-[0.18em] text-[#e1ce7a] font-semibold">
                      Quick Access
                    </p>
                    <p className="mt-3 text-md leading-7 text-[#f8f2ed] font-medium">
                      Sign in with your email service to instantly link.
                    </p>
                    <button type="button" onClick={handleGoogleSignIn}
                      className="mt-8 flex w-full items-center justify-center gap-3 border-2 border-black bg-goldenSand px-6 py-4 text-lg text-black font-bold transition-transform duration-150 hover:-translate-y-0.5 hover:bg-goldenSand/80 active:translate-y-0"
                    >
                      <span className="inline-flex h-9 w-9 items-center justify-center border-2 border-black bg-white text-xl leading-none font-extrabold">
                        G
                      </span>
                      Sign up with Google
                    </button>
                  </div>
                </div>

            </div>
          </div>
          <div className="order-1 flex h-full border-2 border-black bg-desertSand/60 p-8 shadow-[10px_10px_0_0_#000] lg:order-2 lg:p-12 xl:p-14">
            <div className="flex h-full w-full flex-col border-2 border-black bg-bodyBackground p-6 sm:p-8 lg:p-10 xl:p-12">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] sm:text-4xl lg:text-5xl text-jobAccent font-semibold">
                  Job Application Directory
                </p>
                <h2 className="mt-4 text-3xl text-black sm:text-4xl lg:text-5xl leading-tight font-extrabold">
                  Helping you find good landing in this new job application era
                </h2>
                <p className="mt-6 text-lg leading-8 text-jobAccent sm:text-xl font-medium">
                  A calmer way to manage applications, keep notes, and understand your momentum without losing track of where you have already applied.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="border-2 border-black bg-white px-6 py-5 sm:px-7 sm:py-6">
                  <p className="text-xl sm:text-2xl text-black leading-tight font-semibold">Track every application in one place</p>
                  <p className="mt-3 text-sm sm:text-base text-black/60 leading-6">Add roles, companies, dates, and status in seconds. Never lose track of where you applied.</p>
                </div>
                <div className="border-2 border-black bg-white px-6 py-5 sm:px-7 sm:py-6">
                  <p className="text-xl sm:text-2xl text-black leading-tight font-semibold">Keep interview notes tied to each role</p>
                  <p className="mt-3 text-sm sm:text-base text-black/60 leading-6">Log prep notes, interview questions, and feedback directly on each application.</p>
                </div>
                <div className="border-2 border-black bg-white px-6 py-5 sm:px-7 sm:py-6">
                  <p className="text-xl sm:text-2xl text-black leading-tight font-semibold">Review your stats and pipeline clearly</p>
                  <p className="mt-3 text-sm sm:text-base text-black/60 leading-6">See application volume over time, status breakdowns, and spot patterns in your search.</p>
                </div>
                <div className="border-2 border-black bg-white px-6 py-5 sm:px-7 sm:py-6">
                  <p className="text-xl sm:text-2xl text-black leading-tight font-semibold">Scan emails for application updates</p>
                  <p className="mt-3 text-sm sm:text-base text-black/60 leading-6">Automatically surface job-related emails and sync key updates directly to your pipeline.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
