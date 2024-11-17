import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { PropsWithChildren, useEffect, useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Animated, { BounceInUp } from 'react-native-reanimated';
import MyText from './MyText';
import Button from './Button';
import { storeData, getData } from '../utils';
import { HISTORY_KEY } from '../consts';
import { HistoryItemT } from '../types';

type Props = PropsWithChildren<{
    isVisible: boolean;
    onClose: (reload: boolean) => void;
    currentLetter: string;
    writtenLetter?: string;
}>;

export default function AfterSubmitModal({ isVisible, onClose, currentLetter, writtenLetter }: Props) {
    const success = currentLetter === writtenLetter;
    const successEmojis = ['🎉', '👍', '🥳', '🤩', '😎', '🚀', '🌟', '🎊', '🔥',];
    const failEmojis = ['😢', '😭', '😱', '😵', '😖', '😓', '😥', '😰', '😨'];
    const [emoji, setEmoji] = useState(successEmojis[Math.floor(Math.random() * successEmojis.length)]);
    useEffect(() => {
        if (!isVisible) {
            return;
        }
        (async () => {
            const HistoryItemT: HistoryItemT = {
                letter: currentLetter,
                success: success,
                date: new Date()
            }
            const history = await getData(HISTORY_KEY);
            if (history) {
                history.push(HistoryItemT);
                await storeData(HISTORY_KEY, history);
            } else {
                await storeData(HISTORY_KEY, [HistoryItemT]);
            }
        })()
    }, [isVisible]);
    useEffect(() => {
        if (success === undefined) {
            return;
        }
        if (success) {
            setEmoji(successEmojis[Math.floor(Math.random() * successEmojis.length)]);
        } else {
            setEmoji(failEmojis[Math.floor(Math.random() * failEmojis.length)]);
        }
    }, [success]);
    return (
        <Modal animationType="slide" visible={isVisible} transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.titleContainer}>
                        <Text></Text>
                        <Pressable onPress={() => onClose(success)}>
                            <MaterialIcons name="close" color="#333" size={22} />
                        </Pressable>
                    </View>
                    <Animated.View entering={BounceInUp} style={styles.emojiContainer}>
                        <Text style={{ fontSize: 96 }}>
                            {emoji}
                        </Text>
                    </Animated.View>
                    <View style={styles.textContainer}>
                        <MyText customStyle={{ textAlign: 'center', fontSize: 24, color: '#333', marginVertical: 20, paddingHorizontal: 20, verticalAlign: 'center' }}>
                            {
                                !writtenLetter ?
                                    <>
                                        Your letter was not recognized. Please try again.
                                    </>
                                    :
                                    success === true ?
                                        <>
                                            You got it right! 🎉
                                        </>
                                        :
                                        <>
                                            You got it wrong! You wrote <MyText customStyle={{ fontWeight: 'bold' }}>{writtenLetter.toUpperCase()}</MyText> instead of <MyText customStyle={{ fontWeight: 'bold' }}>{currentLetter?.toUpperCase()}</MyText>
                                        </>
                            }
                        </MyText>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button onPress={() => onClose(success)}>
                            Close
                        </Button>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    modalContent: {
        height: '25%',
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 18,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
    },
    titleContainer: {
        height: '16%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: '#fff',
        fontSize: 16,
    },
    textContainer: {
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    emojiContainer: {
        position: 'absolute',
        top: -60,
        left: '35%',
    },
    buttonContainer: {
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
