import React from "react";

import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";

import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  Foundation,
  MaterialCommunityIcons
} from "@expo/vector-icons";

// IMPORT VIEWS
import Dash from "./views/app/dashboard";
import DetailMaster from "./views/app/dashboard/detail_master";
import DetailAnswer from "./views/app/dashboard/detail_master/detail_answer";
import NewMaster from "./views/app/dashboard/new_master";
import Settings from "./views/app/dashboard/settings";
import Login from "./views/login";
import Camera from "./views/app/dashboard/detail_master/Camera";
import EditImage from "./views/app/dashboard/detail_master/EditImage";


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
    settings: Settings,
    newmaster: NewMaster,
    detail: Details
  },
  no_appbar
);

let App = createSwitchNavigator({
  login: Login,
  dashboard: Dashboard
});

export default createAppContainer(App);