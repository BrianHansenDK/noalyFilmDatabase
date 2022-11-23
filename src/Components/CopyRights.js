import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';

class CopyRights extends React.PureComponent {
    render() {
        return (
            <View style={styles.contentCon}>

                <View style={styles.cRightsCon}>
                    <FontAwesomeIcon icon={faCopyright} />
                    <Text style={styles.mainTxt} >
                        {' '} Noaly: Alle rettigheder forbeholdes
                    </Text>
                </View>
                <View>
                    <Text style={styles.muchTxt}>
                        Appdesign og funktion lavet af Noaly
                    </Text>
                </View>
                <View>
                    <Text style={styles.muchTxt}>
                        Alt data fra denne App fungere mellem API kald fra www.themoviedb.org. Alle informationer stammer fra deres side.
                    </Text>
                </View>
                <View>
                    <Text style={styles.muchTxt}>
                        Denne App gemmer ikke på nogle data. Den er blot bygget med det mål at fungere som portefølge for Noaly.
                    </Text>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    contentCon: {
        marginBottom: 100,
        paddingHorizontal: 25,
        flex: 1,
    },
    cRightsCon: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 25,
        alignItems: 'center',
    },
    mainTxt: {
        fontSize: 20,
    },
    muchTxt: {
        marginBottom: 15,
        opacity: 0.8,
    },
});

export default CopyRights;
