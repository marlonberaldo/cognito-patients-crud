/* eslint-disable no-use-before-define */
"use client";

import { useRouter, useSearchParams } from "next/navigation";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { handleConfirmSignUp } from "@/lib/cognito-actions";
import { ConfirmSignUpSchema } from "@/lib/schemas/auth-schema";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { z } from "zod";

const ConfirmSignupForm = () => {
	const searchParamsEmail = useSearchParams().get("email");

	const form = useForm<z.infer<typeof ConfirmSignUpSchema>>({
		resolver: zodResolver(ConfirmSignUpSchema),
		defaultValues: {
			email: decodeURIComponent(searchParamsEmail ?? "") || "",
			code: ""
		}
	});

	const { toast } = useToast();
	const { push } = useRouter();

	async function onSubmit(values: z.infer<typeof ConfirmSignUpSchema>) {
		await handleConfirmSignUp(values)
			.then((res) => {
				toast({
					title: "Conta confirmada com sucesso",
					description: "Você será redirecionado em breve."
				});

				push(res);
			})
			.catch((error) => {
				toast({
					title: "Erro",
					description: error.message,
					variant: "destructive"
				});
			});
	}

	const pending = form.formState.isSubmitting;

	return (
		<Card className="mx-auto max-w-md">
			<CardHeader>
				<CardTitle className="text-2xl">Please confirm your account</CardTitle>
				<CardDescription>
					Enter the email and the code you received to confirm your account.
				</CardDescription>
			</CardHeader>

			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											placeholder="Email"
											type="email"
											inputMode="email"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="code"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Code</FormLabel>
									<FormControl>
										<Input placeholder="Code" type="text" inputMode="text" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							disabled={pending}
							className="bg-_blue hover:bg-_blue/80 min-w-[100px] text-white"
						>
							{pending ? <Loader className="animate-spin" /> : "Submit"}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};

export default ConfirmSignupForm;
