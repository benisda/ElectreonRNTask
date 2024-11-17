import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { PALETTE } from '../consts'
import MyText from './MyText'

type ButtonProps = {
    text: string
    onPress: () => void
    variant?: 'primary' | 'secondary' | 'warning' | 'danger' | 'success'
}

const Button = ({ text, onPress, variant = 'primary' }: ButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, { borderColor: PALETTE[variant] }]}>
            <View>
                <MyText customStyle={{ fontSize: 20, color: PALETTE[variant], fontWeight: 'bold' }}>
                    {text}
                </MyText>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        margin: 10,
        borderRadius: 50,
        borderColor: PALETTE.primary,
        borderWidth: 2
    }
})

export default Button