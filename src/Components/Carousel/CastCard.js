import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
const placeholderImg = require('../Images/noaly_db_logo_phone_dk.png');

class CastCard extends React.PureComponent {
    render() {
        const { navigation, item } = this.props;
        return (
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Personer', { personId: item.id })}>
                <Image source={
                    item.profile_path ?
                        { uri: `https://image.tmdb.org/t/p/w500${item.profile_path}` }
                        : placeholderImg}
                    resizeMode={'cover'}
                    style={styles.cover} />
                <Text style={styles.movieTitle}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        marginTop: 25,
        marginBottom: 10,
        marginHorizontal: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {
            width: -4,
            height: 5,
        },
        shadowRadius: 3,
        shadowOpacity: 0.25,
        shadowColor: 'black',
        elevation: 10,
    },
    cover: {
        width: 75,
        height: 75,
        borderRadius: 50,
        marginBottom: 10,
    },
    movieTitle: {
        textAlign: 'center',
    },
});

export default CastCard;
