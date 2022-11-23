import React from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import Colors from '../Theme/Colors';

class PlayButton extends React.PureComponent {
    render() {
        const { handlePress } = this.props;
        return (
            <View style={styles.watchOnYoutube}>
                <Text style={styles.onYoutubeTitle}>
                    Se mere på YouTube
                </Text>
                <Pressable style={styles.btn} onPress={() => handlePress()}>
                    <FontAwesomeIcon style={styles.icon} icon={faPlay} size={25} />
                </Pressable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    watchOnYoutube: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 25,
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 50,
        backgroundColor: `${Colors.youtube}`,
        borderRadius: 15,
        shadowOffset: {
            width: -4,
            height: 5,
        },
        shadowRadius: 3,
        shadowOpacity: 0.25,
        shadowColor: 'black',
        elevation: 10,
    },
    icon: {
        color: `${Colors.background}`,
    },
    onYoutubeTitle: {
        fontSize: 20,
        marginRight: 15,
        fontWeight: '600',
    },
});

export default PlayButton;
