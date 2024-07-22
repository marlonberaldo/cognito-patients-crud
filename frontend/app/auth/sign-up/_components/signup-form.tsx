/* eslint-disable no-use-before-define */
"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
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
import { useToast } from "@/components/ui/use-toast";

import { handleSignUp } from "@/lib/cognito-actions";
import { SignUpSchema } from "@/lib/schemas/auth-schema";

import { PatternFormat } from "react-number-format";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader } from "lucide-react";
import { z } from "zod";

const SignUpForm = () => {
	const form = useForm<z.infer<typeof SignUpSchema>>({
		resolver: zodResolver(SignUpSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		}
	});

	const { toast } = useToast();
	const { push } = useRouter();

	async function onSubmit(values: z.infer<typeof SignUpSchema>) {
		await handleSignUp(values)
			.then((res) => {
				if (res) {
					toast({
						title: "Confirme sua conta",
						description: "Um email de confirmação foi enviado para você."
					});

					push(res);
				}
			})
			.catch((err) => {
				toast({
					title: "Erro",
					description: err.message,
					variant: "destructive"
				});
			});
	}

	const [inputType, setInputType] = useState<boolean>(true);

	const pending = form.formState.isSubmitting;

	return (
		<Card className="mx-auto my-[50px] max-w-md">
			<CardHeader>
				<CardTitle className="text-2xl">Signup</CardTitle>
				<CardDescription>
					Enter your name, email and password to create your account.
				</CardDescription>
			</CardHeader>

			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											placeholder="Nome Completo"
											type="text"
											inputMode="text"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											placeholder="seu_email@exemplo.com"
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
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<div className="relative flex w-full items-center">
											<Input
												type={inputType ? "password" : "text"}
												placeholder="Senha"
												inputMode="text"
												{...field}
											/>
											<Button
												type="button"
												variant={"ghost"}
												size={"icon"}
												onClick={() => setInputType((prev) => !prev)}
												className="absolute right-0"
											>
												{inputType ? <Eye size={18} /> : <EyeOff size={18} />}
											</Button>
										</div>
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
							{pending ? <Loader className="animate-spin" /> : "Create account"}
						</Button>
					</form>
				</Form>
			</CardContent>

			<CardFooter>
				<div className=" text-center text-sm">
					Already have an account?{" "}
					<Link href="/" className="underline">
						Login
					</Link>
				</div>
			</CardFooter>
		</Card>
	);
};

export default SignUpForm;
