import HomeScreen from "./Screens/HomeScreen";
import EditContact from "./Screens/EditContact";
import ViewContact from "./Screens/ViewContact";
import AddNewContact from "./Screens/AddNewContact";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

const MainNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Add: { screen: AddNewContact },
    View: { screen: ViewContact },
    Edit: { screen: EditContact }
  },
  {
    defaultnavigationOptions: {
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#b83227"
      },
      headerTitleStyle: {
        color: "#fff"
      }
    }
  }
);

const App = createAppContainer(MainNavigator);
export default App;
