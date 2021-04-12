import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { darkBlue } from '../../styles/color'

const now = new Date(Date.now())

export default function calender({
  onChange, 
  styleDate, 
  styleText=styles.dateText, 
  styleContainer, 
  text
}) {

  const [date, setDate] = useState(now)
  const [isCalenderOpen, setIsCalenderOpen] = useState(false)

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    var newDate = new Date(currentDate)

    setIsCalenderOpen(false)
    onChange(newDate)
    setDate(newDate)
  };

  function openCalender() {
    setIsCalenderOpen(true)
  }

  return (
    <View style={[styles.container,styleContainer]}>
      <TouchableOpacity
        onPress={() => openCalender()}
      >

        <Text style={styleText}>{text}</Text>
        <Text style={styleDate}>
          {date.toLocaleDateString('pt-BR')}
        </Text>

      </TouchableOpacity>

      {!isCalenderOpen ? null : (
        <DateTimePicker
          value={date}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
      )}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  
  dateText: {
    color: darkBlue,
    marginBottom: 5
  },
})