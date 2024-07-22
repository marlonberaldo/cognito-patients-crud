/* eslint-disable import/order */
import { Suspense } from "react";

import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import SearchBar from "./_components/search-bar";
import DeleteUserButton from "./_components/delete-user-button";
import { TableSkeleton } from "./_components/table-skeleton";

import { getUsers } from "@/lib/actions";

import { formatDate } from "@/utils/format-date";

import { Edit2, Plus } from "lucide-react";

async function GetUsersTable({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const { users } = await getUsers(searchParams);

  if (users.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-[200px] bg-white rounded-lg shadow-sm">
        <p className="text-lg text-gray-500">Nenhum paciente encontrado</p>
      </div>
    );
  }

  return (
    <Table className="rounded-lg bg-white">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px]">Nome</TableHead>
          <TableHead>E-mail</TableHead>
          <TableHead>Data de nascimento</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{formatDate(user.birthDate)}</TableCell>
            <TableCell className="flex justify-end gap-x-4">
              <Button asChild size={"icon"} variant={"ghost"} className="size-8 border">
                <Link href={`/dashboard/patients/edit/${user.id}`}>
                  <Edit2 size={16} />
                </Link>
              </Button>
              <DeleteUserButton userId={user.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default async function PatientsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {

  return (
    <main>
      <nav className="screen_size absolute left-0 top-[80px] flex h-[80px] w-full items-center justify-end bg-white">
        <Link href="/dashboard/patients/create" className="bg-_blue-dark hover:bg-_blue flex items-center gap-x-2 rounded-md px-5 py-1 text-white shadow-sm">
          <Plus className="size-5" /> Novo
        </Link>
      </nav>

      <div className="mt-[80px] flex w-full items-center gap-x-20 py-10">
        <h1 className="title">Pacientes</h1>

        <SearchBar />
      </div>

      <Suspense fallback={<TableSkeleton />}>
        <GetUsersTable searchParams={searchParams} />
      </Suspense>
    </main>
  );
}