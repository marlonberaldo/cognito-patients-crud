"use client";

import { Button } from "@/components/ui/button";

import { handleSignOut } from "@/lib/cognito-actions";
import { cn } from "@/lib/utils";

import { LogOut } from "lucide-react";

interface ISignOutButton {
	className?: string;
}

const SignOutButton = ({ className }: ISignOutButton) => {
	return (
		<form action={handleSignOut}>
			<Button
				variant={"ghost"}
				className={cn(
					"group w-full items-center justify-between gap-x-4 flex py-2 px-6",
					className
				)}
			>
				Log Out
				<LogOut className="size-5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
			</Button>
		</form>
	);
};

export default SignOutButton;
