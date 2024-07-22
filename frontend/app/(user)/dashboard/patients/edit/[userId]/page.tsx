import { Suspense } from "react";

import EditUserForm from "./_components/edit-user-form";
import FormSkeleton from "./_components/form-skeleton";

import { getUserById } from "@/lib/actions";

import RouterBackButton from "../../_components/router-back-button";

async function GetUserInfos({ userId }: { userId: string }) {
  const data = await getUserById(userId);

  return <EditUserForm user={data} />;
}

export default async function EditPatientPage({ params: { userId } }: { params: { userId: string } }) {

  return (
    <main>
      <RouterBackButton>
        <h1 className="title py-10">Editar paciente</h1>
      </RouterBackButton>

      <Suspense fallback={<FormSkeleton />}>
        <GetUserInfos userId={userId} />
      </Suspense>
    </main>
  );
}