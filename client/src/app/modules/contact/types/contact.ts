export type ILabel = {
  id: number;
  title: string;
};

export type IContact = {
  contactId: number;
  name: string;
  email: string;
  phone: number;
  jobTitle: string;
  company: string;
  colorCode: string;
  createdAt: string;
  updatedAt: string;
};

export type IContactList = {
  title: string;
  contacts: IContact[];
  isFavourite?: boolean;
}[];

export type IContactDetail = {
  contactId: string;
  firstName: string;
  lastName: string;
  nickName: string;
  company: string;
  jobTitle: string;
  department: string;
  email: string;
  phone: string;
  country: string;
  addressLine1: string;
  addressLine2: string;
  state: string;
  city: string;
  pincode: string;
  birthday: string;
  event: string;
  website: string;
  relatedPeople: string;
  chat: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
};
