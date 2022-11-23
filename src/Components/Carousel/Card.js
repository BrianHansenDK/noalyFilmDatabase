import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
const placeholderImg = require('../Images/noaly_db_logo_phone_dk.png');

class Card extends React.PureComponent {
    render() {
        const { navigation, item } = this.props;
        return (
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Detaljer', { movieId: item.id })}>
                <Image source={
                    item.poster_path ?
                        { uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }
                        : placeholderImg}
                    resizeMode={'cover'}
                    style={styles.cover} />
                {!item.poster_path && <Text style={styles.movieTitle}>
                    {item.title}
                </Text>}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        marginLeft: 25,
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
        width: 120,
        height: 200,
        borderRadius: 15,
    },
});

export default Card;
