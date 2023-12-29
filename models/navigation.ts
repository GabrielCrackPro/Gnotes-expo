import { DrawerNavigationProp } from "@react-navigation/drawer";

export type RootDrawerParamsList = {
  HomeNavigator: undefined;
  Home: { add: boolean };
  Notes: { add?: boolean; bookId: string };
};

export type DrawerNavigation = DrawerNavigationProp<
  RootDrawerParamsList,
  "Home"
>;
