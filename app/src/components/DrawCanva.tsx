import React, { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Canvas, Path } from "@shopify/react-native-skia";
import { AppContext } from "../contexts/AppContext";
import { IPath } from "../types";
import ViewShot from "react-native-view-shot";


export default function DrawCanva() {
    const context = useContext(AppContext);
    const [paths, setPaths] = useState<IPath[]>([]);
    const canvaRef = useRef(null);

    useEffect(() => {
        if (context?.setContextValue && !context?.boardFunctions) {
            context.setContextValue({
                ...context,
                boardFunctions: {
                    setPaths,
                    // @ts-ignore
                    getImage: async () => await canvaRef?.current?.capture()
                }
            });
        }
    }, [context.setContextValue]);

    const pan = Gesture.Pan()
        .onTouchesDown((g) => {
            const newPaths = [...paths];
            newPaths[paths.length] = {
                segments: [],
            };
            newPaths[paths.length].segments.push(`M ${g.allTouches[0].x} ${g.allTouches[0].y}`);
            setPaths(newPaths);
        })
        .onUpdate((g) => {
            const index = paths.length - 1;
            const newPaths = [...paths];
            if (newPaths?.[index]?.segments) {
                newPaths[index].segments.push(`L ${g.x} ${g.y}`);
                setPaths(newPaths);
            }
        })
        .runOnJS(true);

    return (
        < GestureHandlerRootView style={styles.container} >
            <ViewShot ref={canvaRef} options={{ format: "jpg", quality: 0.9 }} style={{ flex: 1 }}>
                <GestureDetector gesture={pan}>
                    <View style={styles.canva}>
                        <Canvas style={{ flex: 1 }}>
                            {paths.map((p, index) => {
                                return (
                                    <Path
                                        key={index}
                                        path={p.segments.join(" ")}
                                        strokeWidth={20}
                                        style="stroke"
                                        color={'white'}
                                    />
                                )
                            })}
                        </Canvas>
                    </View>
                </GestureDetector>
            </ViewShot>
        </GestureHandlerRootView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: '#D0A373',
        borderWidth: 30,
        borderRadius: 30,
    },
    canva: {
        flex: 1,
        backgroundColor: '#222'
    }
});