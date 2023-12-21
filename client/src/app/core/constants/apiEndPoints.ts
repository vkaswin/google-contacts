import { isDevMode } from "@angular/core";

const BASE_URL = isDevMode()
  ? "http://localhost:8000"
  : "https://google-contacts-ashy.vercel.app";

export const USER_URL = `${BASE_URL}/api/user`;
export const CONTACT_URL = `${BASE_URL}/api/contact`;
export const TRASH_URL = `${BASE_URL}/api/trash`;
export const LABEL_URL = `${BASE_URL}/api/label`;
