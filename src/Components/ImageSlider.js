import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView, View, Image, TouchableHighlight } from 'react-native';
import { getApi, getUpcomingMoviesUrl } from '../misc/Services';

const WIDTH = Dimensions.get('window').width; //full width
const HEIGHT = Dimensions.get('window').height; //full height

const ImageSlider = ({ navigation }) => {

    const [covers, setCovers] = useState([]);
    const [active, setActive] = useState(0);

    useEffect(() => {
        getApi(getUpcomingMoviesUrl)
            .then(json => setCovers(json.results)).catch(err => {
                console.error(err);
            });
    }, []);

    const onchange = (nativeEvent) => {
        if (nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
            if (slide !== active) { setActive(slide); }
        }
    };

    return (
        <View style={styles.Wrapper} >
            <ScrollView
                style={styles.sliderContainer}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                scrollEventThrottle={({ nativeEvent }) => onchange(nativeEvent)}>

                {
                    covers.map((item) => (
                        <TouchableHighlight
                            onPress={() => navigation.navigate('Detaljer', { movieId: item.id })}
                            key={item.id}
                            style={styles.sliderElement}
                        >
                            <Image

                                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                                style={styles.photo}
                                resizeMode={'cover'}
                            />
                        </TouchableHighlight>
                    ))
                }
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    Wrapper: {
        width: WIDTH,
        height: HEIGHT * 0.65,
    },
    sliderContainer: {
        display: 'flex',
        height: HEIGHT * 0.65,
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
    sliderElement: {
        flex: 1,
        width: WIDTH,
        height: HEIGHT * 0.65,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    photo: {
        width: WIDTH,
        height: HEIGHT * 0.65,
    },
});

export default ImageSlider;
