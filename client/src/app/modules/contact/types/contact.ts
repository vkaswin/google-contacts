export type ILabel = {
  id: number;
  title: string;
};

export type IContact = {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  company: string;
  isFavourite: boolean;
  colorCode: string;
  createdAt: string;
  updatedAt: string;
};

export type IContactDetail = {
  id: string;
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
  isFavourite: boolean;
};
