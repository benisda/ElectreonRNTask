import { View, StyleSheet } from 'react-native'
import React from 'react'
import { HistoryItemT } from '../types'
import MyText from './MyText'
import { DEFAULT_HORIZONTAL_PADDING, PALETTE } from '../consts'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import LetterCard from './LetterCard'

const HistoryItem = ({ success, letter, date }: HistoryItemT) => {
    const formatDate = (date: Date) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
    }
    return (
        <View style={styles.container}>
            <LetterCard letter={letter.toUpperCase()} size={50} />
            <MyText customStyle={{ fontSize: 16, color: '#999' }}>{formatDate(new Date(date))}</MyText>
            <MaterialIcons name={success ? 'check' : 'close'} size={24} color={PALETTE[success ? 'success' : 'danger']} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: DEFAULT_HORIZONTAL_PADDING,
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: '#ddd',
        borderWidth: 1,
        height: 45,
    }
})

export default HistoryItem