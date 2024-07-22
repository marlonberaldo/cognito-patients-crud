import { Suspense } from "react";

import ConfirmSignupForm from "./_components/confirm-signup-form";

export default function ConfirmSignupPage() {
	return (
		<main className="flex h-screen w-full items-center justify-center">
			<Suspense fallback={null}>
				<ConfirmSignupForm />
			</Suspense>
		</main>
	);
}
