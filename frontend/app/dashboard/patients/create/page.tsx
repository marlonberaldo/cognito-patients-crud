import CreateUserForm from "./_components/create-user-form";

import RouterBackButton from "../_components/router-back-button";

export default async function PatientsCreatePage() {

  return (
    <main>
      <RouterBackButton>
        <h1 className="title py-10">Create a new patient</h1>
      </RouterBackButton>

      <CreateUserForm />
    </main>
  );
}