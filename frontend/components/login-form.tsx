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

import { handleSignIn } from "@/lib/cognito-actions";
import { SignInSchema } from "@/lib/schemas/auth-schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const LoginForm = () => {
	const form = useForm<z.infer<typeof SignInSchema>>({
		resolver: zodResolver(SignInSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	});

	const { toast } = useToast();
	const { push } = useRouter();

	async function onSubmit(values: z.infer<typeof SignInSchema>) {
		await handleSignIn(values)
			.then((res) => {
				let title = "Login realizado com sucesso!";

				if (res.includes("confirm-signup")) {
					title = "Por favor, confirme seu cadastro";
				}

				if (res.includes("confirm-new-password")) {
					title = "Por favor, confirme sua senha";
				}

				toast({
					title,
					description: "Você será redirecionado em breve."
				});

				push(res);
			})
			.catch(async (error) => {
				if (error.message.includes("There is already a signed in user.")) {
					await onSubmit(values);
					return;
				}

				toast({
					title: "Erro",
					description: error.message,
					variant: "destructive"
				});
			});
	}

	const [inputType, setInputType] = useState<boolean>(true);

	const pending = form.formState.isSubmitting;

	return (
		<Card className="mx-auto max-w-[90%] sm:max-w-md">
			<CardHeader>
				<CardTitle className="text-2xl">Login</CardTitle>
				<CardDescription>
					Enter your email and password to access your account.
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
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Senha</FormLabel>
									<FormControl>
										<div className="relative flex w-full items-center">
											<Input
												type={inputType ? "password" : "text"}
												placeholder="Senha"
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

						<div className="flex items-center justify-between">
							<Button
								type="submit"
								disabled={pending}
								className="bg-_blue hover:bg-_blue/80 min-w-[100px] text-white"
							>
								{pending ? <Loader className="animate-spin" /> : "Login"}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
			<CardFooter>
				<p className="text-start">
					Do not have an account?{" "}
					<Link href="/auth/sign-up" className="hover:underline">
						Register
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
};

export default LoginForm;
