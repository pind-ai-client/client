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
import DetailAnswer from "./views/app/dashboard/detail_master/detail_answer";
import NewMaster from "./views/app/dashboard/new_master";
import SettingsMaster from "./views/app/dashboard/settings";
import Login from "./views/login";
import Splash from "./views/splash"
import Camera from "./views/app/dashboard/detail_master/Camera";
import EditImage from "./views/app/dashboard/detail_master/EditImage";
import Account from './views/app/dashboard/settings/account'
import Help from './views/app/dashboard/settings/help'

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
    detail: Details
  },
  no_appbar
);


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