import { View, StyleSheet } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import DrawCanva from '../components/DrawCanva'
import { API_KEY, API_URL, DEFAULT_HORIZONTAL_PADDING } from '../consts'
import Button from '../components/Button'
import { AppContext } from '../contexts/AppContext'
import * as FileSystem from 'expo-file-system'
import { IPath } from '../types'
import AfterSubmitModal from '../components/AfterSubmitModal'
import LetterCard from '../components/LetterCard'
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const Home = () => {
    const context = useContext(AppContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentLetter, setCurrentLetter] = useState(letters[Math.floor(Math.random() * letters.length)]);
    const [writtenLetter, setWrittenLetter] = useState('');
    const submitImage = async () => {
        const image = await context?.boardFunctions?.getImage()
        if (image) {
            const base64 = await FileSystem.readAsStringAsync(image, { encoding: 'base64' });
            let res = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'image/png',
                    'x-api-key': API_KEY
                },
                body: base64
            });
            let mes = await res.json();
            if (mes.message !== 'success') {
                console.log('HANDLE ME')
                // handle error
                return;
            }
            console.log('compare', [mes.data.trim().toLowerCase(), currentLetter.toLowerCase()])
            setWrittenLetter(mes.data.trim().toLowerCase());
            setModalVisible(true);
        }
    }

    const handleClose = (reload: boolean) => {
        setModalVisible(false);
        context?.boardFunctions?.setPaths([]);
        if (reload) {
            setCurrentLetter(letters[Math.floor(Math.random() * letters.length)]);
        }
    }
    return (
        <View style={styles.canva}>
            <LetterCard letter={currentLetter} key={currentLetter} />
            <DrawCanva />
            <View style={styles.buttonRow}>
                <Button text="Clear" variant='danger' onPress={() => {
                    context?.boardFunctions?.setPaths([])
                }} />
                <Button text="Undo" variant='warning' onPress={() => {
                    // @ts-ignore
                    context?.boardFunctions?.setPaths((prevPaths: IPath[]) => prevPaths.slice(0, -1))
                }} />
                <Button text="Submit" variant='success' onPress={submitImage} />
            </View>
            <AfterSubmitModal isVisible={modalVisible} onClose={handleClose} currentLetter={currentLetter.toLowerCase()} writtenLetter={writtenLetter} />
        </View>
    )
}

const styles = StyleSheet.create({
    canva: {
        flex: 1,
        paddingHorizontal: DEFAULT_HORIZONTAL_PADDING,
        gap: 20
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})

export default Home