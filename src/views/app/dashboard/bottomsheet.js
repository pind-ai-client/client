import React from 'react'
import { View, Text, Button } from 'react-native'
import {connectActionSheet} from '@expo/react-native-action-sheet'

const bottomsheet = ({showActionSheetWithOptions}) => {
    _onOpenActionSheet = () => {
        // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
        const options = ['Delete', 'Save', 'Cancel'];
        const destructiveButtonIndex = 0;
        const cancelButtonIndex = 2;
       
        showActionSheetWithOptions(
          {
            options,
            cancelButtonIndex,
            destructiveButtonIndex,
          },
          buttonIndex => {
            // Do something here depending on the button index selected
          },
        );
      };
    return (
        <View>
            <Button title='show bottom sheet' onPress={_onOpenActionSheet}/>
        </View>
    )
}

export default connectActionSheet(bottomsheet)
