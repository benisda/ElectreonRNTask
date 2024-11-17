import { View, StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Stats from '../screens/Stats';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { DEFAULT_HORIZONTAL_PADDING, PALETTE } from '../consts';
const BottomStack = createBottomTabNavigator();
const Navigator = () => {
    const insets = useSafeAreaInsets();
    return (
        <View style={styles.container}>
            <View style={{ paddingTop: insets.top }} />
            <BottomStack.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: PALETTE.primary,
                }}
            >
                <BottomStack.Screen name="Home" component={Home} />
                <BottomStack.Screen name="Stats" component={Stats} />
            </BottomStack.Navigator>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: PALETTE.backgroundColor,
        flex: 1
    }
})

export default Navigator