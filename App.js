import React from 'react'
import { View } from 'react-native'
import AddEntry from './components/AddEntry'
import History from './components/History'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={ {flex: 1} }>
          <View style={ {height: 20} } />
          <History />
        </View>
      </Provider>
    );
  }
}
