import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Colors from '../Theme/Colors';

class ExitBtn extends React.PureComponent {
    render() {
        const { handlePress } = this.props;
        return (
            <Pressable style={styles.btn} onPress={() => handlePress()}>
                <FontAwesomeIcon style={styles.icon} icon={faXmark} size={20} />
            </Pressable>
        );
    }
}

const styles = StyleSheet.create({
    btn: {
        position: 'absolute',
        top: 50,
        left: 25,
        zIndex: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        backgroundColor: `${Colors.main}`,
        borderRadius: 100,
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

export default ExitBtn;
