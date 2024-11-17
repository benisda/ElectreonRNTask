import { View, FlatList, StyleSheet, Platform } from 'react-native'
import React, { useCallback, useState } from 'react'
import { HistoryItemT } from '../types';
import { getData } from '../utils';
import { DEFAULT_HORIZONTAL_PADDING, HISTORY_KEY } from '../consts';
import { useFocusEffect } from '@react-navigation/native';
import MyText from '../components/MyText';
import Animated, { BounceInDown, BounceInLeft, BounceInRight, BounceInUp } from 'react-native-reanimated';
import HistoryItem from '../components/HistoryItem';

const Stats = () => {
    const [history, setHistory] = useState<HistoryItemT[]>([]);
    useFocusEffect(useCallback(() => {
        (async () => {
            let history = await getData(HISTORY_KEY);
            setHistory(history ?? []);
        })()
    }, []));
    const successRate = history.length ? Math.round(history.filter(item => item.success).length / history.length * 100) : 0;
    return (
        <View style={styles.container}>
            <Animated.View entering={BounceInUp} key={Math.random()}>
                <MyText customStyle={{ fontSize: 48, fontWeight: 100, textAlign: 'center' }}>Statistics</MyText>
            </Animated.View>
            <View style={styles.firstRow}>
                {/* some Android devices will crash without the Platform.select check */}
                <Animated.View style={styles.card} key={Math.random()} entering={Platform.select({ ios: BounceInLeft, android: undefined })}>
                    <MyText customStyle={{ fontWeight: 'bold', fontSize: 18 }}>Attempts</MyText>
                    <MyText customStyle={{ fontSize: 48 }}>{history.length}</MyText>
                </Animated.View>
                <Animated.View style={styles.card} key={Math.random()} entering={Platform.select({ ios: BounceInRight, android: undefined })}>
                    <MyText customStyle={{ fontWeight: 'bold', fontSize: 18 }}>Success</MyText>
                    <MyText customStyle={{ fontSize: 36 }}>{successRate}%</MyText>
                </Animated.View>
            </View>
            <Animated.View entering={BounceInDown} key={Math.random()} style={styles.listContainer}>
                <FlatList
                    data={history.reverse()}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <HistoryItem {...item} />}
                    contentContainerStyle={{ gap: 20, paddingVertical: DEFAULT_HORIZONTAL_PADDING }}
                />
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: DEFAULT_HORIZONTAL_PADDING,
        paddingHorizontal: DEFAULT_HORIZONTAL_PADDING,
        gap: DEFAULT_HORIZONTAL_PADDING,
    },
    firstRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    card: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 5,
        height: 140,
        width: 140,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listContainer: {
        flexShrink: 1,
    }
})

export default Stats