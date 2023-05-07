import React, {useEffect, useRef, useState} from 'react';
import {Text, TouchableOpacity, useWindowDimensions, View} from "react-native";

export default function StaticPills({data, style, x, currentIndex, onPillPress, containerRef, scrollableContainer}) {
    const [pillWidth, setPillWidth] = useState(0);
    const [headerWidth, setHeaderWidth] = useState(0);
    const widthScreen = useWindowDimensions().width;

    const transX = (x * headerWidth) / (data?.length * widthScreen);

    return (
        <>
            <View style={[styles.container, style?.staticPillsContainer]}
                  onLayout={event => setHeaderWidth(event.nativeEvent.layout.width)}>
                {!!data?.length && data.map((item, index) => (
                    <View key={index}
                          style={{flex: 1}}
                          onLayout={event => setPillWidth(event.nativeEvent.layout.width)}>
                        <TouchableOpacity
                            onPress={() => {
                                onPillPress(index)

                                if (index === currentIndex && scrollableContainer)
                                    containerRef?.current?.scrollTo({x: 0, y: 0, animated: true})
                            }}
                            style={[
                                {
                                    paddingHorizontal: 5,
                                    flexGrow: 1,
                                    alignItems: 'center',
                                },
                                style?.pillButton,
                            ]}
                        >
                            <Text style={[
                                style?.pillLabel || styles.pillLabel,
                                index === currentIndex && (style?.activeLabel || styles.activePill),
                            ]}>
                                {item.tabLabel}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
            <View style={[
                {
                    alignSelf: 'flex-start',
                    marginHorizontal: 10,
                    width: pillWidth - 20,
                    borderColor: 'red',
                    borderBottomWidth: 2,
                    transform: [{translateX: transX}],
                },
                style?.borderActive || styles.activeBorder,
            ]}/>
        </>
    );
}

const styles = {
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 8,
    },
    pillLabel: {
        color: 'gray',
    },
    activePill: {
        color: 'red',
        marginBottom: 10,
    },
};
