import React from 'react';
import { StyleSheet, ActivityIndicator, View, Text } from 'react-native';
import Colors from '../Theme/Colors';

const Loader = () => {
    return (
        <View style={styles.spinnerCon}>
            <Text style={styles.loadTxt}>
                Arbejder
            </Text>
            <ActivityIndicator size={'large'} />
        </View>
    );
};

const styles = StyleSheet.create({
    spinnerCon: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: `${Colors.background}`,
    },
    loadTxt: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: '700',
        marginBottom: 25,
    },
});

export default Loader;