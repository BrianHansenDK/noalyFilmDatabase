import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import Colors from '../Theme/Colors';

class PlayButton extends React.PureComponent {
    render() {
        const { handlePress } = this.props;
        return (
            <Pressable style={styles.btn} onPress={() => handlePress()}>
                <FontAwesomeIcon style={styles.icon} icon={faPlay} size={30} />
            </Pressable>
        );
    }
}

const styles = StyleSheet.create({
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        backgroundColor: `${Colors.main}`,
        borderRadius: 100,
        position: 'absolute',
        top: -35,
        right: 25,
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
});

export default PlayButton;
