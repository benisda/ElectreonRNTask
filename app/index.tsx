import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigator from './src/components/Navigator';
import AppContextProvider from './src/contexts/AppContext';

const index = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <AppContextProvider>
                    <Navigator />
                </AppContextProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    )
}

export default index