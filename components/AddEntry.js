import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { getMetricMetaInfo, timeToString, getDailyRemainderValue } from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciStepper from './UdaciStepper'
import DateHeader from './DateHeader'
import { Ionicons } from '@expo/vector-icons'
import TextButton from './TextButton'
import { submitEntry, removeEntry } from '../utils/api';
import { addEntry } from '../actions'
import { connect } from 'react-redux'
import { purple, white } from '../utils/colors'

function SubmitButton ({ onPress }) {
  return (
    <TouchableOpacity
      style={ Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn }
      onPress={onPress}>
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
    )
}

class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
  }
  
  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric)
    
    this.setState((state) => {
      const count = state[metric] + step
      
      return {
        ...state,
        [metric]: count > max ? max : count
      }
    })
  }
  
  decrement = (metric) => {
    this.setState((state) => {
      const count = state[metric] - getMetricMetaInfo(metric).step
      
      return {
        ...state,
        [metric]: count < 0 ? 0 : count
      }
    })
  }
  
  slide = (metric, value) => {
    this.setState(() => ({
      [metric]: value
    }))
  }
  
  submit = () => {
    const key = timeToString()
    const entry = this.state
    
    // Update redux

    this.props.dispatch(addEntry({
      [key]: entry
    }))

    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    }))
    
    // Navigate to home
    
    
    // Save to 'DB'
    submitEntry({ entry, key })
    
    
    //Clear the local notification
  }
  reset = () => {
      const key = this.timeToString()

      //Update Redux
      this.props.dispatch(addEntry({
        [key] : getDailyRemainderValue()
      }))

      //Route to Home

      //Update DB
      removeEntry(key)

  }
    render() {
      const metaInfo = getMetricMetaInfo()

        if(this.props.alreadyLogged) {
            return (
                <View sytle={styles.center}>
                    <Ionicons 
                        name={Platform.OS === 'ios' ? 'ios-happy-outline' : 'md-happy'}
                        size={100}
                    />
                    <Text>You already logged your information for today</Text>
                    <TextButton style={{padding: 10}} onPress={this.reset}>
                        Reset
                    </TextButton>
                </View>
            )
        }
        
        return (
            <View style={ styles.container }>
              <DateHeader date={(new Date()).toLocaleDateString()} />
                {Object.keys(metaInfo).map((key) => {
                  const { getIcon, type, ...rest } = metaInfo[key]
                  const value = this.state[key]
                  
                  return (
                    <View key={key} style={styles.row}>
                      {getIcon()}
                      { type === 'slider'
                        ? <UdaciSlider 
                            value={value}
                            onChange ={(value) => this.slide(key, value)}
                            {...rest}
                          />
                        : <UdaciStepper 
                            value={value}
                            onIncrement={() => this.increment(key)}
                            onDecrement={() => this.decrement(key)}
                            {...rest}
                        />
                      }
                    </View>
                    )
                })}
                <SubmitButton onPress={this.submit} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    bacgroundColor: white
  },
  iosSubmitBtn: {
    padding: 10,
    backgroundColor: purple,
    marginRight: 40,
    marginLeft: 40,
    borderRadius: 7,
    height: 45,
  },
  androidSubmitBtn: {
    paddingLeft: 30,
    paddingRight: 30,
    padding: 10,
    backgroundColor: purple,
    borderRadius: 2,
    height: 45,
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  }
})

function mapStateToProps (state) {
  const key = timeToString()

  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined'
  }
}

export default connect(mapStateToProps)(AddEntry)