"use client";

import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { deleteUser } from "@/lib/actions";

import { Loader, Trash } from "lucide-react";

const DeleteUserButton = ({ userId }: { userId: string }) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteUser(userId)
        .then((res) => {
          if (res === 200) {
            toast({
              title: "User excluído com sucesso!",
            });
            setIsLoading(false);
          }

          if (res === 404) {
            toast({
              variant: "destructive",
              title: "User não encontrado",
            });
            setIsLoading(false);
          }
        });
    } catch {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Erro na requisição",
        description: "Tente novamente mais tarde..",
      });
    }
  };

  return (
    <AlertDialog >
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon" className="size-8">
          {isLoading ? (<Loader size={20} className="animate-spin" />) : <Trash size={16} />}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="mx-auto max-w-[90%] md:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir usuário</AlertDialogTitle>
          <AlertDialogDescription className="py-2">
            <AlertDialogDescription className="border-y py-5">
              <p className="text-center">
                Você não terá mais acesso ao paciente. <br /> Quer mesmo excluí-lo?
              </p>
            </AlertDialogDescription>
          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter className="items-center sm:justify-center">
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 min-w-[100px]"
          >
            {isLoading ? (
              <Loader size={20} className="animate-spin" />
            ) : (
              <span>Sim, excluir</span>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUserButton;