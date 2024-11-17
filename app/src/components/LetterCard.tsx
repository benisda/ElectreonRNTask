import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MyText from './MyText';
import Animated, { FlipInEasyX } from 'react-native-reanimated';

type Props = {
    letter: string
}

const LetterCard = ({ letter }: Props) => {
    return (
        <Animated.View style={styles.container} entering={FlipInEasyX}>
            <View style={styles.card}>
                <MyText
                    customStyle={{
                        fontSize: 96
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
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    card: {
        width: 130,
        height: 130,
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