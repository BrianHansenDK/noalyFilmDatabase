import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, View, Text, Image, ScrollView, Modal, Pressable } from 'react-native';
import Video from 'react-native-video';
import Loader from '../Components/Loader';
import { getMovie, getMovieVideo } from '../misc/Services';
import StarRating from 'react-native-star-rating-widget/lib/commonjs/StarRating';
import dateFormat, { i18n } from 'dateformat';
import PlayButton from '../Components/PlayButton';
import VideoComponent from '../Components/VideoComponent';
import Colors from '../Theme/Colors';
const placeholderImg = require('../Components/Images/noaly_db_logo_phone.png');

const WIDTH = Dimensions.get('window').width; //full width
const HEIGHT = Dimensions.get('window').height; //full height

i18n.monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Maj',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Okt',
    'Nov',
    'Dec',
    'Januar',
    'Februar',
    'Marts',
    'April',
    'Maj',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'December',
];

const Detail = ({ route, navigation }) => {
    const movieId = route.params.movieId;

    const [movieDetail, setMovieDetail] = useState();
    const [trailerDt, setTrailerDt] = useState();
    const [loaded, setLoaded] = useState(false);
    const setRating = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        getMovie(movieId).then((movieData) => {
            setMovieDetail(movieData);
        }).catch((err) => {
            console.error(err);
        }).finally(state => {
            setLoaded(true);
        });

        getMovieVideo(movieId).then((trailer) => {
            setTrailerDt(trailer.key)
        }).catch((err) => {
            console.error(err);
        });
    }, [movieId]);

    const videoShown = () => {
        setModalVisible(!modalVisible);
    };
    return (
        <React.Fragment>
            {
                loaded && (
                    <View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Image
                                resizeMode={'cover'}
                                source={
                                    movieDetail.poster_path ?
                                        { uri: `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}` }
                                        : placeholderImg}
                                style={styles.cover}
                            />
                            <View style={styles.contentWrap}>
                                <PlayButton handlePress={() => { videoShown(); }} />
                                <Text style={styles.title}>  {movieDetail.title} </Text>
                                {movieDetail.genres && (
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreCon}>
                                        {movieDetail.genres.map(genre => {
                                            return (
                                                <View style={styles.genreTxtCon} key={genre.id}>
                                                    <Text
                                                        key={genre.id}
                                                        style={styles.genreTxt}
                                                    > {genre.name} </Text>
                                                </View>);
                                        })}
                                    </ScrollView>
                                )}
                                <StarRating
                                    disabled={true}
                                    rating={movieDetail.vote_average / 2}
                                    onChange={setRating}
                                    color={'rgb(90,190,186)'}
                                    style={styles.starsCon}
                                    starStyle={styles.stars}
                                    enableSwiping={false}
                                    animationConfig={{ scale: 1 }}
                                    starSize={50}
                                />
                                <Text style={styles.overview}> {!movieDetail.overview ? 'Ingen beskrivelse' : movieDetail.overview} </Text>
                                <Text> {'Udgivelsesdato: ' + dateFormat(movieDetail.release_date, 'dd. mmmm - yyyy')} </Text>
                            </View>
                        </ScrollView>
                        <Modal
                            animationType={'slide'}
                            visible={modalVisible}
                        >
                            <VideoComponent />
                        </Modal>
                    </View>
                )
            }
            {
                !loaded && ((
                    <Loader />
                )
                )
            }
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    contentWrap: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cover: {
        width: WIDTH,
        height: HEIGHT * 0.4,
    },
    title: {
        fontSize: 25,
        fontWeight: '600',
        marginVertical: 25,
    },
    genreCon: {
        marginHorizontal: 25,
    },
    genreTxtCon: {
        marginBottom: 15,
        marginHorizontal: 5,
    },
    genreTxt: {
        fontSize: 18,
        fontWeight: '700',
        color: `${Colors.main}`,
    },
    starsCon: {
        flex: 1,
        alignSelf: 'center',
    },
    overview: {
        margin: 25,
        marginBottom: 10,
    },

});


export default Detail;
