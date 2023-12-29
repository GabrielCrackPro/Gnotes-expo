import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home";
import BookList from "../components/BookList";
import Notes from "../screens/Notes";
import NavigationHeader from "../components/NavigationHeader";
import Settings from "../screens/Settings";

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
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Notes" component={Notes} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
};

export default HomeNavigator;
