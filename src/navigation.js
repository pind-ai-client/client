import React from "react";

import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";

import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  Foundation,
  MaterialCommunityIcons,
  AntDesign
} from "@expo/vector-icons";

// IMPORT VIEWS
import Dash from "./views/app/dashboard";
import DetailMaster from "./views/app/dashboard/detail_master";
import EditMaster from "./views/app/dashboard/detail_master/edit_master/index";
import DetailAnswer from "./views/app/dashboard/detail_master/detail_answer";
import NewMaster from "./views/app/dashboard/new_master";
import Settings from "./views/app/dashboard/settings";
import Login from "./views/login";
import Splash from "./views/splash"
import Camera from "./views/app/dashboard/detail_master/Camera";
import EditImage from "./views/app/dashboard/detail_master/EditImage";
import Account from './views/app/dashboard/settings/account'
import Help from './views/app/dashboard/settings/help'
import Test from './views/test'

let showBottomTab = true

let no_appbar = {
  headerMode: "none",
  defaultNavigationOptions: () => ({
    headerVisible: false
  })
};

const Details = createStackNavigator({
    detailmaster: DetailMaster,
    detailanswer: DetailAnswer,
    camera: Camera,
    postCapture: EditImage
  },
  no_appbar
);


let Dashboard = createStackNavigator({
    dash: Dash,
    detail: Details,
    edit : EditMaster
  },
  no_appbar
);

// let Settings = createStackNavigator({
//   setting: SettingsMaster,
//   acc: Account,
//   help : Help
// },
// no_appbar
// );

let BottomNav = createBottomTabNavigator({
  Dashboard,
  New: NewMaster,
  Settings
},
{
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let icon;
        switch (routeName) {
          case "Dashboard":
            icon = <Foundation name="home" size={25} color={tintColor} />;
            break;
          case "New":
            icon = (
              <AntDesign
                name={"pluscircle"}
                size={25}
                color={tintColor}
              />
            );
            break;
          case "Settings":
            icon = (
              <Ionicons name="ios-settings" size={25} color={tintColor} />
            );
            break;
        }
        return icon;
      }
    }),
    tabBarOptions: {
      initialRouteName: "Trending",
      activeTintColor: "orange",
      inactiveTintColor: "rgba(255,255,255,0.5)",
      style: {
        backgroundColor: "#0F2027",
        padding: 10,
        height: 60
      }
    }
  }
)

let App = createSwitchNavigator({
  // test: Test,
  splash: Splash,
  login: Login,
  dashboard: BottomNav
});

export default createAppContainer(App);

//dashboard
  //stacknav
    //index
    //detail

//new
//settings