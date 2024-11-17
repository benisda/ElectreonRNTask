import { View, StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Stats from '../screens/Stats';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { PALETTE } from '../consts';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
const BottomStack = createBottomTabNavigator();
const Navigator = () => {
    const insets = useSafeAreaInsets();
    return (
        <View style={styles.container}>
            <BottomStack.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: PALETTE.primary,
                    tabBarInactiveBackgroundColor: PALETTE.backgroundColor,
                    tabBarStyle: {
                        borderTopWidth: 0,
                        height: 60,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: -10,
                        },
                        shadowOpacity: 0.05,
                        shadowRadius: 4,
                    },
                    headerStyle: {
                        backgroundColor: 'red'
                    }
                }}
            >
                <BottomStack.Screen name="Home" component={Home} options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
                }} />
                <BottomStack.Screen name="Stats" component={Stats} options={{
                    tabBarLabel: 'Statistics',
                    tabBarIcon: ({ color }) => <MaterialIcons name="bar-chart" size={24} color={color} />
                }} />
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