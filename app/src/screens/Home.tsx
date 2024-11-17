import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import DrawCanva from '../components/DrawCanva'
import { API_KEY, API_URL, DEFAULT_HORIZONTAL_PADDING, PALETTE } from '../consts'
import Button from '../components/Button'
import { AppContext } from '../contexts/AppContext'
import { IPath } from '../types'
import AfterSubmitModal from '../components/AfterSubmitModal'
import LetterCard from '../components/LetterCard'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MyText from '../components/MyText'
import { useFocusEffect } from 'expo-router'

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const Home = () => {
    const context = useContext(AppContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentLetter, setCurrentLetter] = useState(letters[Math.floor(Math.random() * letters.length)]);
    const [writtenLetter, setWrittenLetter] = useState('');
    const [loading, setLoading] = useState(false);

    useFocusEffect(useCallback(() => {
        refreshLetter();
        context?.boardFunctions?.setPaths([]);
    }, []));

    const submitImage = async () => {
        const image = await context?.boardFunctions?.getImage()
        if (image) {
            setLoading(true);
            const base64 = image.encodeToBase64(4, 100);
            let res = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'image/png',
                    'x-api-key': API_KEY
                },
                body: base64
            });
            let mes = await res.json();
            setLoading(false);
            if (mes.message !== 'success') {
                Alert.alert('Oops', "Something went wrong, let's try again", [{ text: 'OK' }]);
                return;
            }
            setWrittenLetter(mes.data.trim().toLowerCase());
            setModalVisible(true);
        }
    }

    const refreshLetter = () => {
        setCurrentLetter(letters[Math.floor(Math.random() * letters.length)]);
    }

    const handleClose = (reload: boolean) => {
        setModalVisible(false);
        context?.boardFunctions?.setPaths([]);
        if (reload) {
            refreshLetter();
        }
    }
    return (
        <View style={styles.canva}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <MaterialIcons name="refresh" size={36} color={'transparent'} />
                <LetterCard letter={currentLetter} key={currentLetter} />
                <MaterialIcons name="refresh" size={36} color={PALETTE.muted} style={{ margin: 0, padding: 0 }} onPress={refreshLetter} />
            </View>
            <View style={styles.boardContainer}>
                <DrawCanva />
                {
                    loading &&
                    <View style={styles.loadingOverlay}>
                        <ActivityIndicator size="large" color={PALETTE.primary} />
                    </View>
                }
            </View>
            <View style={styles.buttonRow}>
                <Button variant='danger' disabled={loading} onPress={() => {
                    context?.boardFunctions?.setPaths([])
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons name="clear" size={24} color={PALETTE.danger} style={{ margin: 0, padding: 0 }} />
                        <MyText customStyle={{ fontSize: 20, color: PALETTE.danger, fontWeight: 'bold' }}>
                            Clear
                        </MyText>
                    </View>
                </Button>
                <Button variant='warning' disabled={loading} onPress={() => {
                    // @ts-ignore
                    context?.boardFunctions?.setPaths((prevPaths: IPath[]) => prevPaths.slice(0, -1))
                }} >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons name="undo" size={24} color={PALETTE.warning} style={{ margin: 0, padding: 0 }} />
                        <MyText customStyle={{ fontSize: 20, color: PALETTE.warning, fontWeight: 'bold' }}>
                            Undo
                        </MyText>
                    </View>
                </Button>
                <Button variant='success' disabled={loading} onPress={submitImage} >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons name="send" size={24} color={PALETTE.success} style={{ margin: 0, padding: 0 }} />
                        <MyText customStyle={{ fontSize: 20, color: PALETTE.success, fontWeight: 'bold' }}>
                            Send
                        </MyText>
                    </View>
                </Button>
            </View>
            <AfterSubmitModal isVisible={modalVisible} onClose={handleClose} currentLetter={currentLetter.toLowerCase()} writtenLetter={writtenLetter} />
        </View>
    )
}

const styles = StyleSheet.create({
    canva: {
        flex: 1,
        paddingTop: DEFAULT_HORIZONTAL_PADDING,
        paddingHorizontal: DEFAULT_HORIZONTAL_PADDING,
        gap: DEFAULT_HORIZONTAL_PADDING,
    },
    boardContainer: {
        flex: 1,
        borderColor: '#D0A373',
        borderWidth: 30,
        borderRadius: 30,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.7)'
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: DEFAULT_HORIZONTAL_PADDING
    }
})

export default Home