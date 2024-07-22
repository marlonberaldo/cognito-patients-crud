import { redirect } from "next/navigation";

import LoginForm from "@/components/login-form";

export default function Home() {

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center">

      <LoginForm />

    </main>
  );
}
