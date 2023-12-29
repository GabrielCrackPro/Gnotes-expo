import { DrawerNavigation } from "./navigation";

export interface AuthParams {
  navigation: DrawerNavigation;
  authMessage: string;
  redirectRoute?: string;
  persistent?: boolean;
}
