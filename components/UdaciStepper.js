import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { FontAwesome, Entypo } from '@expo/vector-icons'
import { purple, white, gray } from '../utils/colors'

export default function UdaciStepper ({ max, unit, step, value, onDecrement, onIncrement }) {
    return(
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
        { Platform.OS === 'ios' 
          ? 
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={[styles.iosBtn, {borderTopRightRadius: 0, borderBottomRightRadius: 0}]}
              onPress={onDecrement}>
              <FontAwesome name='minus' size={30} color={'black'}/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iosBtn, {borderTopRightRadius: 0, borderBottomRightRadius: 0, borderLeftWidth: 0 }]}
              onPress={onIncrement}>
              <FontAwesome name='plus' size={30} color={'black'}/>
            </TouchableOpacity>
          </View>
          :
          <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.androidBtn}
            onPress={onDecrement}>
            <FontAwesome name='minus' size={30} color={white}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.androidBtn}
            onPress={onIncrement}>
            <FontAwesome name='plus' size={30} color={white}/>
          </TouchableOpacity>
        </View>
        }
          
          <View style={styles.metricCounter}>
              <Text style={{ fontSize: 24, textAlign: 'center' }}>{value}</Text>
              <Text style={{ color: gray, fontSize: 18 }}>{unit}</Text>
          </View>
        </View>
      )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  iosBtn: {
    backgroundColor: white,
    padding: 5,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: purple,
    paddingLeft: 25,
    paddingRight: 25,
  },
  androidBtn: {
    margin: 5,
    backgroundColor: purple,
    padding: 10,
    borderRadius: 2,
  },
  metricCounter: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center',
  },
})