import { View, Text } from 'react-native'
import React from 'react'
import { CARD_ITEM_HOME } from '../../styling/cards'
import { APP_COLORS } from '../../styling/colors'
import { FONTS } from '../../styling/polices'

export default function ItemHome({ description = ""}) {
  return (
    <View style={CARD_ITEM_HOME.main}>
      <View style={CARD_ITEM_HOME.bottom}>
        <Text style={{ color: "#000"}}>{description}</Text>
      </View>
    </View>
  )
}