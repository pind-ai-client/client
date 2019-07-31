import React, {useState, useEffect} from 'react'
import { View, Text } from 'react-native'
import RadioGroup from 'react-native-radio-buttons-group';

const answerSelect = ({index, handleChange, item}) => {
    console.log('ini item', item)
    let radioSelected = [
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
    radioSelected = radioSelected.map((oneLabel) => {
        if (oneLabel.label === item) {
            oneLabel.selected = true
        }
        return oneLabel
    })

    let [data, setData] = useState(radioSelected)
    console.log(index);
    console.log(data.selected);

    const onSelected = (data) => {
        console.log(data)
        let selected = data.find(datum => datum.selected === true)
        console.log(`num: ${index+1}, selected: ${selected.value}`);
        handleChange(selected.value, index)
    }

    return (
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', padding: 10, borderBottomColor: 'rgba(0,0,0,0.2)', borderBottomWidth: 1}}>
            <Text style={{fontFamily: 'montserrat-black', fontSize: 20}}>{index + 1}</Text>
            <RadioGroup radioButtons={data} onPress={onSelected} flexDirection='row'/>
        </View>
    )
}

export default answerSelect
