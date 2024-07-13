import Image from "next/image";
import Link from "next/link";

import { formatDate } from "@/utils/format-date";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

  return (
    <section className="flex w-full flex-col">
      <header className="sticky top-0 z-50 h-[80px] border-b bg-white">
        <nav className="screen_size flex h-full items-center justify-between">
          <Link href="/dashboard/patients">
            <Image
              src="/assets/logo.png"
              alt="Logo Medcloud"
              className="dark:invert"
              width={150}
              height={60}
              priority
            />
          </Link>

          <span className="rounded-md border px-10 py-1">
            {formatDate(new Date().toString())}
          </span>

          <span />
        </nav>
      </header>

      <div className="bg-_gray screen_size min-h-[calc(100dvh-80px)]">
        {children}
      </div>
    </section>
  );
}