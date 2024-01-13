import { createDrawerNavigator } from "@react-navigation/drawer";
import BookList from "../components/BookList";
import NavigationHeader from "../components/NavigationHeader";
import { Home, Notes, Settings } from "../screens";
import { SCREEN_NAMES } from "../constants/screens";

const HomeNavigator: React.FC = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        header: () => <NavigationHeader route={route} />,
        drawerType: "slide",
      })}
      drawerContent={() => <BookList />}
    >
      <Drawer.Screen name={SCREEN_NAMES.HOME} component={Home} />
      <Drawer.Screen name={SCREEN_NAMES.NOTES} component={Notes} />
      <Drawer.Screen name={SCREEN_NAMES.SETTINGS} component={Settings} />
    </Drawer.Navigator>
  );
};

export default HomeNavigator;
