import React, {useState, useEffect} from 'react'
import { View, Text } from 'react-native'
import RadioGroup from 'react-native-radio-buttons-group';

const answerSelect = ({item, index, edit, change}) => {

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
        console.log("---",item);
        
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
    
    const press = data =>{
        data = data
        let selected = data.find(e => e.selected == true)
        console.log(selected.value)
        change(selected.value,index)
    }

    return (
        <View style={{flexDirection : "row"}}>
            <RadioGroup radioButtons={data} onPress={press} flexDirection='row'/>
        </View>
    )
}

export default answerSelect
