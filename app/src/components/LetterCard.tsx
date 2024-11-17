import { View, StyleSheet } from 'react-native'
import React from 'react'
import MyText from './MyText';
import Animated, { FlipInEasyX } from 'react-native-reanimated';

type Props = {
    letter: string
    size?: number
}

const LetterCard = ({ letter, size = 130 }: Props) => {
    return (
        <Animated.View style={[styles.container]} entering={FlipInEasyX}>
            <View style={[styles.card, { width: size, height: size, borderRadius: size / 10 }]}>
                <MyText
                    customStyle={{
                        fontSize: size * 0.75
                    }}
                >
                    {letter}
                </MyText>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    }
})

export default LetterCard