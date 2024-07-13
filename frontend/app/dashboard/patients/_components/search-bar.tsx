"use client";

import React from "react";

import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Search } from "lucide-react";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Digite pelo menos 1 caracteres.",
  }),
});

const SearchBar = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const { push } = useRouter();
  const pathname = usePathname();

  function onSubmit(values: z.infer<typeof formSchema>) {
    push(`${pathname}?userName=${values.username}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-x-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <div className="relative flex w-full items-center">
                  <Input
                    placeholder={fieldState.error?.message || "Buscar por nome"}
                    type="text"
                    inputMode="text"
                    className={`w-[600px] pl-10 ${fieldState.error ? "placeholder:text-red-500" : "placeholder:text-_gray-title"}`}
                    {...field}
                  />
                  <Search className="text-_gray-title absolute left-3 top-1/2 size-5 -translate-y-1/2" size={20} />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-_blue-dark">Buscar</Button>

        {form.watch("username") && (
          <Button
            type="button"
            onClick={() => {
              form.setValue("username", "");
              push(pathname);
            }}
            className="bg-red-500"
          >
            Limpar
          </Button>
        )}
      </form>
    </Form>
  );
};

export default SearchBar;