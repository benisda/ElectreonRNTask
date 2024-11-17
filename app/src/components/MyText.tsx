import { Text, StyleSheet } from 'react-native'
import React from 'react'
import { PALETTE } from '../consts'

type MyTextProps = {
    children: string | React.ReactNode
    customStyle?: object
}

const MyText = ({ children, customStyle }: MyTextProps) => {
    return (
        <Text
            style={[styles.text, customStyle]}
        >
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        color: PALETTE.primary,
        borderColor: PALETTE.primary
    }
})

export default MyText