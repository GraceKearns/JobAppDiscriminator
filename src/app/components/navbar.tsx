"use client";

import { useRoute } from "@/context/RouteContext";
import { useViewport } from "@/context/ViewportContext";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Form, House, ChartBar, NotebookPen, LucideIcon } from "lucide-react";

interface NavItemInterface {
  displayName: string;
  icon: LucideIcon;
  link: string;
}

export default function NavBar() {
  const { isMdUp } = useViewport();
  const { currentRoute } = useRoute();
  const { data: session } = useSession();

  const fullName = session?.user?.name?.trim() ?? "";
  const [firstName = "", ...rest] = fullName.split(" ").filter(Boolean);
  const lastName = rest.join(" ");
  const profileImage = session?.user?.image ?? "";
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "U";
  const displayName = [firstName, lastName].filter(Boolean).join(" ") || fullName || "Signed in";

  const navItems: NavItemInterface[] = [
    {
      displayName: "Home",
      icon: House,
      link: "/",
    },
    {
      displayName: "Applications",
      icon: Form,
      link: "/applications",
    },
    {
      displayName: "Stats",
      icon: ChartBar,
      link: "/stats",
    },
    {
      displayName: "Notes",
      icon: NotebookPen,
      link: "/notes",
    },
  ];

  const isActiveRoute = (link: string) => {
    if (link === "/") {
      return currentRoute === "/";
    }

    if (link === "/applications") {
      return (
        currentRoute === "/applications" ||
        currentRoute.startsWith("/applications/") ||
        currentRoute === "/apps" ||
        currentRoute.startsWith("/apps/")
      );
    }

    return currentRoute === link || currentRoute.startsWith(`${link}/`);
  };

  if (isMdUp) {
    return (
      <section className="w-42 xl:w-48 shrink-0 sticky top-0">
        <div className="flex h-screen w-full flex-col border-r-2 border-black bg-[#2f241c]">
          <div className="px-3 pt-6 pb-4 flex flex-col items-center gap-3">
            <div className="h-18 w-18 text-2xl rounded-full border-2 border-black bg-goldenSand flex items-center justify-center text-black font-bold font-family-jacques">
              M
            </div>
            <p className="text-lg tracking-[0.18em] uppercase text-[#f3e8dc]/80">
              Menu
            </p>
          </div>

          <nav className="mt-2 flex flex-col items-center gap-3 px-2">
            {navItems.map((item: NavItemInterface) => {
              const isActive = isActiveRoute(item.link);
              return (
                <Link
                  key={item.displayName}
                  href={item.link}
                  className={`w-full rounded-xl border-2 px-2 py-2 flex flex-col items-center gap-1 transition-colors duration-200 ${
                    isActive
                      ? "border-black bg-goldenSand text-black"
                      : "border-transparent bg-[#3f3229] text-[#e2d6c8] hover:border-black/60 hover:bg-[#4a3a30]"
                  }`}
                  aria-label={item.displayName}
                >
                  <item.icon size={32} strokeWidth={2.3} />
                  <span className="text-lg leading-tight text-center font-semibold">
                    {item.displayName === "Applications" ? "Apps" : item.displayName}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto border-t-2 border-black/60 p-2">
            <div className="rounded-xl border-2 border-black bg-[#4a3a30] p-2">
              <div className="mb-2 mx-au flex items-center justify-center gap-2">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={`${displayName} profile`}
                    className="h-16 w-16 rounded-full border-2 border-black object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="h-16 w-16 text-2xl rounded-full border-2 border-black bg-silver flex items-center justify-center font-family-jacques text-black">
                    {initials}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/signin" })}
                className="w-full border-2 border-black bg-goldenSand hover:bg-goldenSand/80 text-black px-2 py-1.5 rounded-lg text-xl font-semibold cursor-pointer"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="fixed bottom-3 left-3 right-3 z-50 grid grid-cols-4 rounded-2xl border-2 border-black bg-[#2f241c]/95 p-1 shadow-[8px_8px_0_0_#000]">
      {navItems.map((item) => (
        <div className="flex flex-col justify-center" key={item.displayName}>
          <div className="flex items-center justify-center pt-1">
            <item.icon
              size={16}
              className={isActiveRoute(item.link) ? "text-goldenSand" : "text-[#d7c8b8]"}
            />
          </div>
          <div className="flex items-center justify-center">
            <Link
              href={item.link}
              className={`${
                isActiveRoute(item.link) ? "text-goldenSand" : "text-[#d7c8b8]"
              } font-semibold text-xs sm:text-sm hover:text-white transition-colors duration-300 ease-in-out block rounded-md px-2 py-1`}
            >
              {item.displayName === "Applications" ? "Apps" : item.displayName}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
