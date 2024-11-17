import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { PALETTE } from '../consts'
import MyText from './MyText'

type ButtonProps = {
    children?: React.ReactNode
    onPress: () => void
    variant?: 'primary' | 'secondary' | 'warning' | 'danger' | 'success'
    disabled?: boolean
}

const Button = ({ children, onPress, variant = 'primary', disabled = false }: ButtonProps) => {
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.button, { borderColor: PALETTE[variant] }]}>
            <MyText customStyle={{ fontSize: 20, color: PALETTE[variant], fontWeight: 'bold' }}>
                {children}
            </MyText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 50,
        borderColor: PALETTE.primary,
        borderWidth: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Button