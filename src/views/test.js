import React from "react";
import { Text, View, Button } from "react-native";
import Menu, { MenuItem, MenuDivider, Position } from "react-native-enhanced-popup-menu";
 
const App = (props) => {
  let textRef = React.createRef();
  let menuRef = null;
 
  const setMenuRef = ref => menuRef = ref;
  const hideMenu = () => menuRef.hide();
  const showMenu = () => menuRef.show(textRef.current, stickTo = Position.TOP_RIGHT);
 
  const onPress = () => showMenu();
 
  return (
    <View style={{ flexDirection:'row', justifyContent: 'space-between', alignItems: "center", backgroundColor: "white"}}>
        <Menu
        ref={setMenuRef}
        >
        <MenuItem onPress={hideMenu}>Item 1</MenuItem>
        <MenuItem onPress={hideMenu}>Item 2</MenuItem>
        <MenuItem onPress={hideMenu} disabled>Item 3</MenuItem>
        <MenuDivider />
        <MenuItem onPress={hideMenu}>Item 4</MenuItem>
        </Menu>
        <Text ref={textRef} style={{ fontSize: 20 }}>
        Text component
        </Text>
 
      <Button
        title="Show menu"
        onPress={onPress}
      />
 
    </View>
  );
};
 
export default App;