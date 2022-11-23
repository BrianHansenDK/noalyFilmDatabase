import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, View, Text, Image, ScrollView, Modal } from 'react-native';
import Loader from '../Components/Loader';
import { getCast, getMovie, getMovieVideo, getSimilar } from '../misc/Services';
import StarRating from 'react-native-star-rating-widget/lib/commonjs/StarRating';
import dateFormat, { i18n } from 'dateformat';
import PlayButton from '../Components/PlayButton';
import Colors from '../Theme/Colors';
import CarouselList from '../Components/Carousel/CarouselList';
import WebView from 'react-native-webview';
import ExitBtn from '../Components/ExitBtn';
import CastCarousel from '../Components/Carousel/CastCarousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import Error from '../Components/Error';
const placeholderImg = require('../Components/Images/noaly_db_logo_phone_dk.png');

const WIDTH = Dimensions.get('window').width; //full width
const HEIGHT = Dimensions.get('window').height; //full height

const propTypes = {
    setMovieDetail: PropTypes.array,
    setTrailerDt: PropTypes.array,
    setCast: PropTypes.array,
    setImages: PropTypes.array,
    setCurrentImg: PropTypes.number,
    setLoaded: PropTypes.bool,
    setModalVisible: PropTypes.bool,
    setBigImg: PropTypes.bool,
    setLoadingWeb: PropTypes.bool,
    setError: PropTypes.bool,
};

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
    const [similar, setSimilar] = useState();
    const [actors, setActors] = useState();
    const [loaded, setLoaded] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [loadingWeb, setLoadingWeb] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {

        /*
        const getAll = [
            getApi(getMovieLink(movieId)),
            getApi(getSimilarLink(movieId)),
            getApi(getImagesLink(movieId)),
            getApi(getCastLink(movieId)),
            getApi(getMovieVideoLink(movieId)),
        ];

        Promise.all(getAll).then(([
            movieData,
            simData,
            imgData,
            castData,
            videoData,
        ]) => {
            setMovieDetail(movieData);
            setSimilar(simData.results);
            setImages(imgData.backdrops);
            setActors(castData.cast);
            setTrailerDt(videoData.results[0]);
        })
            .catch(() => {
                setError(true);
            })
            .finally(state => {
                return setLoaded(true);
            });
            */
        getMovie(movieId).then(movieData => {
            setMovieDetail(movieData);
        });

        getCast(movieId).then(people => {
            setActors(people.cast);
        });

        getSimilar(movieId).then((simData) => {
            setSimilar(simData.results);
        })
            .catch(() => {
                setError(true);
            }).finally(state => {
                return setLoaded(true);
            });

    }, [movieId]);

    console.log(actors);

    const videoShown = () => {
        setModalVisible(!modalVisible);
        getMovieVideo(movieId).then(trailer => {
            setTrailerDt(trailer.results[0]);
        });
    };
    return (
        <React.Fragment>
            {
                loaded && (
                    <SafeAreaView>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {
                                movieDetail ? (
                                    <View>
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
                                            <View
                                                pointerEvents={'none'}
                                                style={styles.starsCon}>
                                                <StarRating
                                                    disabled={true}
                                                    rating={movieDetail.vote_average / 2}
                                                    onChange={null}
                                                    color={'rgb(90,190,186)'}
                                                    starStyle={styles.stars}
                                                    enableSwiping={false}
                                                    animationConfig={{ scale: 1 }}
                                                    starSize={50}
                                                />
                                            </View>
                                            <Text style={styles.release}> {'Udgivelsesdato: ' + dateFormat(movieDetail.release_date, 'dd. mmmm - yyyy')} </Text>
                                            <Text style={styles.overview}>{!movieDetail.overview ? 'Ingen beskrivelse' : movieDetail.overview}</Text>
                                        </View>
                                        <CastCarousel
                                            navigation={navigation}
                                            carouselTitle={'Skuespillere'}
                                            content={actors}
                                        />
                                        <CarouselList
                                            navigation={navigation}
                                            carouselTitle={'Lignende film'}
                                            content={similar}
                                        />
                                    </View>
                                ) : null

                            }
                            {
                                error ? (
                                    <Error />
                                ) : null
                            }

                        </ScrollView>
                        <Modal
                            animationType={'slide'}
                            visible={modalVisible}
                            style={styles.webViewCon}
                        >
                            <View style={styles.webViewCon}>
                                <ExitBtn
                                    style={styles.exitBtn}
                                    handlePress={() => { videoShown(); }}
                                />
                                <WebView
                                    onLoadEnd={() => {
                                        setLoadingWeb(false);
                                    }}
                                    onLoadStart={() => {
                                        setLoadingWeb(true);
                                    }}
                                    source={trailerDt ? { uri: `https://www.youtube.com/watch?v=${trailerDt.key}` } : movieDetail ? { uri: `https://www.youtube.com/results?search_query=${movieDetail.title} trailer` } : null}
                                />
                                {
                                    loadingWeb ? (
                                        <Loader />
                                    ) : null
                                }
                            </View>
                        </Modal>
                    </SafeAreaView>
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
    webViewCon: {
        flex: 1,
        paddingTop: 100,
        position: 'relative',
    },
    exitBtn: {
        position: 'absolute',
        top: 100,
        left: 25,
    },
    contentWrap: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cover: {
        width: WIDTH,
        height: HEIGHT * 0.7,
    },
    title: {
        fontSize: 25,
        fontWeight: '600',
        marginVertical: 25,
    },
    sectionTitle: {
        fontSize: 25,
        fontWeight: '600',
        marginLeft: 25,
        marginTop: 25,
        marginBottom: 25,
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
    release: {
        marginTop: 40,
    },
    overview: {
        margin: 25,
        marginBottom: 10,
        textAlign: 'justify',
    },
    imgGrid: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    movieImages: {
        height: WIDTH * 0.5,
        width: WIDTH * 0.5,
    },
    bigImgs: {
        width: WIDTH,
        height: 250,
    },
});

Detail.propTypes = propTypes;

export default Detail;
