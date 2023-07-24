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
};

export type IContactList = {
  title: string;
  contacts: IContact[];
  isFavourite: boolean;
}[];
