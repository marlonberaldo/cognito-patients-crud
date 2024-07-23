import Image from "next/image";
import Link from "next/link";

import SignOutButton from "./patients/_components/sign-out-button";

import { formatDate } from "@/utils/format-date";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

  return (
    <section className="w-full h-screen flex flex-col">
      <header className="sticky top-0 z-50 h-[80px] min-h-[80px] border-b bg-white">
        <nav className="screen_size flex h-full items-center justify-between">
          <Link href="/dashboard/patients">
            <Image
              src="/assets/logo-ipsum.svg"
              alt="Logo"
              className="dark:invert"
              width={150}
              height={60}
              priority
            />
          </Link>

          <span className="rounded-md border px-10 py-1">
            {formatDate(new Date().toString())}
          </span>

          <SignOutButton />
        </nav>
      </header>

      <div className="bg-_gray p-10 overflow-y-scroll h-full">
        {children}
      </div>
    </section>
  );
}