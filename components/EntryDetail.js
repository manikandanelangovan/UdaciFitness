import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { months } from 'moment';

class EntryDetail extends Component {
    static navigationOptions = ({ navigation }) => {
        const { entryId } = navigation.state.params

        const year = entryId.slice(0,4)
        const month = entryId.slice(5,7)
        const day = entryId.slice(8)

        return {
            title: `${Month}/${day}/${year}`
        }
    }
    render() {
        return (
            <View>
                <Text>Entry Detail - {JSON.stringify(this.porps.navigation.state.params.entryId)}</Text>
            </View>
        )
    }
}

export default EntryDetail