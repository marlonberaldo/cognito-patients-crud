/* eslint-disable tailwindcss/no-custom-classname */
"use client";

import React from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";

import { UpdateUserSchema } from "@/lib/schemas/user-schema";
import { cn } from "@/lib/utils";
import { updateUser } from "@/lib/actions";

import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon, Loader } from "lucide-react";
import { pt, ptBR } from "date-fns/locale";
import { PatternFormat } from "react-number-format";

interface IEditUserForm {
  user: TUser;
}

const EditUserForm = ({ user }: IEditUserForm) => {
  const form = useForm<z.infer<typeof UpdateUserSchema>>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      birthDate: new Date(user.birthDate),
      cpf: user.cpf,
      address: {
        cep: user.address.cep,
        street: user.address.street,
        number: user.address.number,
        neighborhood: user.address.neighborhood,
        complement: user.address.complement,
        state: user.address.state,
        city: user.address.city,
        country: user.address.country,
      }
    },
  });

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof UpdateUserSchema>) {
    await updateUser(user.id, values)
      .then((status) => {
        if (status === 200) {
          toast({
            title: "Usuário Editado com sucesso",
          });

          const currentValues = form.getValues();

          form.reset(currentValues);
        } else if (status === 404) {
          toast({
            title: "Usuário não encontrado",
            variant: "destructive"
          });
        }
      })
      .catch(() => {
        toast({
          title: "Erro ao criar usuário",
          variant: "destructive"
        });
      });
  }

  const pending = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full rounded-lg bg-white">
        <div className="text-_gray-title border-b p-5">
          <h2 className="text-lg font-semibold">Dados pessoais</h2>
        </div>

        <div className="grid items-stretch justify-between gap-[50px] border-b p-8 md:grid-cols-2 lg:grid-cols-3 lg:flex-row xl:grid-cols-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem className="bg-_gray w-full rounded-lg p-4">
                <FormLabel className="text-_gray-title px-2">Nome completo</FormLabel>
                <FormControl>
                  <Input
                    placeholder={fieldState.error?.message || "-"}
                    type="text"
                    inputMode="text"
                    className={`h-8 rounded-sm bg-transparent px-2 ${fieldState.error && "placeholder:text-destructive"}`}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem className="bg-_gray w-full rounded-lg p-4">
                <FormLabel className="text-_gray-title px-2">E-mail</FormLabel>
                <FormControl>
                  <Input
                    placeholder={fieldState.error?.message || "-"}
                    type="email"
                    inputMode="email"
                    className={`h-8 rounded-sm bg-transparent px-2 ${fieldState.error && "placeholder:text-destructive"}`}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthDate"
            disabled
            render={({ field, fieldState }) => (
              <FormItem className="bg-_gray w-full rounded-lg p-4">
                <FormLabel className="text-_gray-title px-2">Data de nascimento</FormLabel>
                <Popover>
                  <PopoverTrigger asChild disabled>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full bg-transparent pl-3 h-8 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: ptBR })
                        ) : (
                          <span className={`${fieldState.error && "text-destructive"}`}>
                            {fieldState.error?.message || "-"}
                          </span>
                        )}
                        <CalendarIcon className="ml-auto size-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      locale={pt}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cpf"
            disabled
            render={({ field: { onChange, value, ...restField }, fieldState }) => (
              <FormItem className="bg-_gray w-full rounded-lg p-4">
                <FormLabel className="text-_gray-title px-2">CPF</FormLabel>
                <FormControl>
                  <PatternFormat
                    {...restField}
                    value={value}
                    format="###.###.###-##"
                    placeholder={fieldState.error?.message || "-"}
                    customInput={Input}
                    onValueChange={(values) => {
                      onChange(values.value);
                    }}
                    inputMode="numeric"
                    className={`h-8 rounded-sm bg-transparent px-2 ${fieldState.error && "placeholder:text-destructive"}`}
                  />
                </FormControl>
              </FormItem>
            )}
          />

        </div>

        {/* Adress fields */}
        <div className="grid items-stretch justify-between gap-[50px] p-8 md:grid-cols-2 lg:grid-cols-3 lg:flex-row xl:grid-cols-4">

          <FormField
            control={form.control}
            name="address.cep"
            render={({ field: { onChange, value, ...restField }, fieldState }) => (
              <FormItem className="bg-_gray w-full rounded-lg p-4">
                <FormLabel className="text-_gray-title px-2">CEP</FormLabel>
                <FormControl>
                  <PatternFormat
                    {...restField}
                    value={value}
                    format="#####-###"
                    placeholder={fieldState.error?.message || "-"}
                    customInput={Input}
                    onValueChange={(values) => {
                      onChange(values.value);
                    }}
                    inputMode="numeric"
                    className={`h-8 rounded-sm bg-transparent px-2 ${fieldState.error && "placeholder:text-destructive"}`}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.street"
            render={({ field, fieldState }) => (
              <FormItem className="bg-_gray w-full rounded-lg p-4">
                <FormLabel className="text-_gray-title px-2">Endereço</FormLabel>
                <FormControl>
                  <Input
                    placeholder={fieldState.error?.message || "-"}
                    type="text"
                    inputMode="text"
                    className={`h-8 rounded-sm bg-transparent px-2 ${fieldState.error && "placeholder:text-destructive"}`}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.number"
            render={({ field, fieldState }) => (
              <FormItem className="bg-_gray w-full rounded-lg p-4">
                <FormLabel className="text-_gray-title px-2">Número</FormLabel>
                <FormControl>
                  <Input
                    placeholder={fieldState.error?.message || "-"}
                    type="text"
                    inputMode="numeric"
                    className={`h-8 rounded-sm bg-transparent px-2 ${fieldState.error && "placeholder:text-destructive"}`}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.complement"
            render={({ field, fieldState }) => (
              <FormItem className="bg-_gray w-full rounded-lg p-4">
                <FormLabel className="text-_gray-title px-2">Complemento</FormLabel>
                <FormControl>
                  <Input
                    placeholder={fieldState.error?.message || "-"}
                    type="text"
                    inputMode="text"
                    className={`h-8 rounded-sm bg-transparent px-2 ${fieldState.error && "placeholder:text-destructive"}`}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.neighborhood"
            render={({ field, fieldState }) => (
              <FormItem className="bg-_gray w-full rounded-lg p-4">
                <FormLabel className="text-_gray-title px-2">Bairro</FormLabel>
                <FormControl>
                  <Input
                    placeholder={fieldState.error?.message || "-"}
                    type="text"
                    inputMode="text"
                    className={`h-8 rounded-sm bg-transparent px-2 ${fieldState.error && "placeholder:text-destructive"}`}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.city"
            render={({ field, fieldState }) => (
              <FormItem className="bg-_gray w-full rounded-lg p-4">
                <FormLabel className="text-_gray-title px-2">Cidade</FormLabel>
                <FormControl>
                  <Input
                    placeholder={fieldState.error?.message || "-"}
                    type="text"
                    inputMode="text"
                    className={`h-8 rounded-sm bg-transparent px-2 ${fieldState.error && "placeholder:text-destructive"}`}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.state"
            render={({ field, fieldState }) => (
              <FormItem className="bg-_gray w-full rounded-lg p-4">
                <FormLabel className="text-_gray-title px-2">UF</FormLabel>
                <FormControl>
                  <Input
                    placeholder={fieldState.error?.message || "-"}
                    type="text"
                    inputMode="text"
                    className={`h-8 rounded-sm bg-transparent px-2 ${fieldState.error && "placeholder:text-destructive"}`}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.country"
            render={({ field, fieldState }) => (
              <FormItem className="bg-_gray w-full rounded-lg p-4">
                <FormLabel className="text-_gray-title px-2">País</FormLabel>
                <FormControl>
                  <Input
                    placeholder={fieldState.error?.message || "-"}
                    type="text"
                    inputMode="text"
                    className={`h-8 rounded-sm bg-transparent px-2 ${fieldState.error && "placeholder:text-destructive"}`}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="screen_size fixed bottom-0 left-0 flex h-[80px] w-full items-center justify-end gap-x-4 border-t bg-white">
          <Button asChild variant={"secondary"}>
            <Link href="/dashboard/patients">
              Cancelar
            </Link>
          </Button>
          <Button type="submit" className="bg-_blue hover:bg-_blue/80 m-5 min-w-[100px]">
            {pending ? <Loader className="animate-spin text-white" /> : "Salvar"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditUserForm;