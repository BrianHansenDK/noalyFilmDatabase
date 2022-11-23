import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Dimensions,
    ScrollView,
    View,
} from 'react-native';
import ImageSlider from '../Components/ImageSlider';
import {
    getApi,
    getFamilyMoviesUrl,
    getPopularMoviesUrl,
    getAdventureMoviesUrl,
    getRomanceMoviesUrl,
    getAnimatedMoviesUrl,
    getComedyMoviesUrl,
    getActionMoviesUrl,
    getDocuMoviesUrl,
    getFantasyMoviesUrl,
} from '../misc/Services';
import CarouselList from '../Components/Carousel/CarouselList';
import Error from '../Components/Error';
import Loader from '../Components/Loader';
import Colors from '../Theme/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const WIDTH = Dimensions.get('window').width; //full width
const HEIGHT = Dimensions.get('window').height; //full height

const propTypes = {
    setPopular: PropTypes.array,
    setFamily: PropTypes.array,
    setAdv: PropTypes.array,
    setRom: PropTypes.array,
    setAni: PropTypes.array,
    setCom: PropTypes.array,
    setAct: PropTypes.array,
    setDocu: PropTypes.array,
    setFan: PropTypes.array,
    isLoaded: PropTypes.bool,
    setError: PropTypes.bool,
};


const Home = ({ navigation }) => {
    const [popular, setPopular] = useState([]);
    const [family, setFamily] = useState([]);
    const [adv, setAdv] = useState([]);
    const [rom, setRom] = useState([]);
    const [ani, setAni] = useState([]);
    const [com, setCom] = useState([]);
    const [act, setAct] = useState([]);
    const [docu, setDocu] = useState([]);
    const [fan, setFan] = useState([]);
    const [loaded, isLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const apiCalls = [
            getApi(getPopularMoviesUrl),
            getApi(getFamilyMoviesUrl),
            getApi(getAdventureMoviesUrl),
            getApi(getRomanceMoviesUrl),
            getApi(getAnimatedMoviesUrl),
            getApi(getComedyMoviesUrl),
            getApi(getActionMoviesUrl),
            getApi(getDocuMoviesUrl),
            getApi(getFantasyMoviesUrl),
        ];
        Promise.all(apiCalls).then(([
            popularData,
            famData,
            advData,
            romData,
            aniData,
            comData,
            actData,
            docuData,
            fanData,
        ]) => {
            setPopular(popularData.results);
            setFamily(famData.results);
            setAdv(advData.results);
            setRom(romData.results);
            setAni(aniData.results);
            setCom(comData.results);
            setAct(actData.results);
            setDocu(docuData.results);
            setFan(fanData.results);
        }).catch(() => {
            setError(true);
        }).finally(state => {
            return isLoaded(true);
        });
    }, []);
    return (
        <SafeAreaView>
            <View style={styles.PageWrap}>
                {loaded && !error && (<ScrollView showsVerticalScrollIndicator={false}>
                    <ImageSlider navigation={navigation} />
                    <React.Fragment>
                        <View style={styles.carousel}>
                            <CarouselList
                                navigation={navigation}
                                carouselTitle={'Populære Film'}
                                content={popular}
                            />
                            <CarouselList
                                navigation={navigation}
                                carouselTitle={'Romantiske Film'}
                                content={rom}
                            />
                            <CarouselList
                                navigation={navigation}
                                carouselTitle={'Eventyr Film'}
                                content={adv}
                            />
                            <CarouselList
                                navigation={navigation}
                                carouselTitle={'Animerede Film'}
                                content={ani}
                            />
                            <CarouselList
                                navigation={navigation}
                                carouselTitle={'Familie Film'}
                                content={family}
                            />
                            <CarouselList
                                navigation={navigation}
                                carouselTitle={'Komedie Film'}
                                content={com}
                            />
                            <CarouselList
                                navigation={navigation}
                                carouselTitle={'Action Film'}
                                content={act}
                            />
                            <CarouselList
                                navigation={navigation}
                                carouselTitle={'Dokumentar Film'}
                                content={docu}
                            />
                            <CarouselList
                                navigation={navigation}
                                carouselTitle={'Fantasi Film'}
                                content={fan}
                            />
                        </View>
                    </React.Fragment>
                </ScrollView>)}
                {!loaded && (
                    <Loader />
                )}
                {error && <Error />}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: `${Colors.background}`,
    },
    PageWrap: {
        height: HEIGHT,
        width: WIDTH,
        paddingBottom: 10,
    },
    carousel: {
        marginVertical: 25,
    },
    carouselTitle: {
        fontSize: 25,
        marginStart: 25,
    },
    carouselElement: {
        marginVertical: 10,
        marginLeft: 25,
    },
    cover: {
        width: 150,
        height: 200,
        borderRadius: 5,
    },
});

Home.propTypes = propTypes;

export default Home;
