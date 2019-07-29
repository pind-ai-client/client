import React, {useState} from 'react'
import { View, Text } from 'react-native'
import RadioGroup from 'react-native-radio-buttons-group';

const answerSelect = () => {
    let [data, setData] = useState(
        [
            {
                label: 'A',
            },
            {
                label: 'B',
            },
            {
                label: 'C',
            },
            {
                label: 'D'
            },
            {
                label: 'E'
            },
        ]
    )
    return (
        <View>
            <RadioGroup radioButtons={data} onPress={() => console.log('pressed')} flexDirection='row'/>
        </View>
    )
}

export default answerSelect
