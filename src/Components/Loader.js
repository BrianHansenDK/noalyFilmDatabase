import React from 'react';
import { StyleSheet, ActivityIndicator, View, Text } from 'react-native';

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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadTxt: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: '700',
        marginBottom: 25,
    },
});

export default Loader;