import React, {useState, useEffect} from 'react'
import { View, Text } from 'react-native'
import RadioGroup from 'react-native-radio-buttons-group';

const answerSelect = ({item, index, edit}) => {

    let data = [
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
            label: 'D',
        },
        {
            label: 'E'
        },
    ]
    
    useEffect( () => {
        let newdata = data
        let idx
        if(edit){
            idx = newdata.map(dt => {
                return dt.label
            }).indexOf(item)
            // console.warn(idx, 'xxxxxxxxxxxxxxx')
            //  setData(newdata)
        }
        data.forEach(dt => {
            dt.selected = false
        })
        data[idx].selected = true
        // console.log(data)
    }, [])

    return (
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', padding: 10, borderBottomColor: 'rgba(0,0,0,0.2)', borderBottomWidth: 1}}>
            <Text style={{fontFamily: 'montserrat-black', fontSize: 20}}>{index + 1}</Text>
            <RadioGroup radioButtons={data} onPress={onSelected} flexDirection='row'/>
        </View>
    )
}

export default answerSelect
