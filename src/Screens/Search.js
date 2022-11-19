import React, { useState } from 'react';
import { StyleSheet, Dimensions, View, TextInput, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import Loader from '../Components/Loader';
import { searchMovie } from '../misc/Services';

const placeholderImg = require('../Components/Images/noaly_db_logo_phone.png');

const WIDTH = Dimensions.get('window').width; //full width
const HEIGHT = Dimensions.get('window').height; //full height

const Search = ({ navigation }) => {
    const [text, onChangeText] = useState('');
    const [data, setData] = useState();
    const [searched, setSearched] = useState(false);
    const [loaded, setLoaded] = useState(false);


    const onSearch = () => {
        if (text.length !== 0) {

            setSearched(true);
            searchMovie(text).then(r => setData(r.results))
                .catch(err => console.error(err))
                .finally(state => {
                    setLoaded(true);
                });
        }
    };


    return (
        <ScrollView>

            <View>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Søg på en film eller serie"
                    onSubmitEditing={onSearch}
                />
                {searched && loaded ? (
                    <View style={styles.resultCon}>
                        {data.map((item) => (
                            <TouchableOpacity style={styles.card} key={item.id} onPress={() => navigation.navigate('Detaljer', { movieId: item.id })}>
                                <Image source={
                                    item.poster_path ?
                                        { uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }
                                        : placeholderImg}
                                    resizeMode={'cover'}
                                    style={styles.cover} />
                                {!item.poster_path && <Text style={styles.movieTitle}>
                                    {item.title}
                                </Text>}
                            </TouchableOpacity>))}
                    </View>
                )
                    : searched && !loaded ? <Loader style={styles.fullScreen} /> : null}
            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    input: {
        marginTop: 100,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 25,
        shadowOffset: {
            width: -4,
            height: 5,
        },
        shadowRadius: 3,
        shadowOpacity: 0.25,
        shadowColor: 'black',
        elevation: 10,
    },
    resultCon: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    card: {
        width: WIDTH * 0.3,
        height: 225,
        marginVertical: 10,
        marginLeft: WIDTH * 0.025,
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
        width: WIDTH * 0.3,
        height: 210,
        borderRadius: 20,
    },
    fullScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: HEIGHT,
    },
});

export default Search;
