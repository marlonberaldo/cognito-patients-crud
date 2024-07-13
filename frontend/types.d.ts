type TAdress = {
  id: string;
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  complement: string;
  state: string;
  city: string;
  country: string;
  createdAt: string;
  updatedAt: string;
};

type TUser = {
  id: string;
  email: string;
  name: string;
  birthDate: string;
  cpf: string;
  createdAt: string;
  updatedAt: string;
  address: TAdress;
};

type TFilters = {
  userName?: string;
  page?: number;
  perPage?: number;
}