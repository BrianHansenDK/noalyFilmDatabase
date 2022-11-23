import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, SafeAreaView, Image, Text, View, ScrollView, Modal } from 'react-native';
import { getPerson } from '../misc/Services';
import YoutubeBtn from '../Components/YoutubeBtn';
import dateFormat, { i18n } from 'dateformat';
import Loader from '../Components/Loader';
import ExitBtn from '../Components/ExitBtn';
import WebView from 'react-native-webview';
import Error from '../Components/Error';
const placeholderImg = require('../Components/Images/noaly_db_logo_phone_dk.png');

const WIDTH = Dimensions.get('window').width; //full width

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

const PersonDetails = ({ route, navigation }) => {
    const personId = route.params.personId;


    const [person, setPerson] = useState();
    const [error, setError] = useState(false);
    const [loaded, isLoaded] = useState();
    const [showWebsite, setShowWebsite] = useState(false);
    const [loadedWeb, setLoadedWeb] = useState(false);

    useEffect(() => {
        getPerson(personId).then(r => {
            setPerson(r);
        }).catch(() => {
            setError(true);
        }).finally(state => {
            return isLoaded(true);
        });
    }, [personId]);


    const showModal = () => {
        setShowWebsite(!showWebsite);
    };

    return (
        <SafeAreaView>
            {
                loaded && person ? (
                    <ScrollView>
                        <View style={styles.pageWrap}>
                            <Image
                                source={
                                    person.profile_path ?
                                        { uri: `https://image.tmdb.org/t/p/w500${person.profile_path}` }
                                        : placeholderImg
                                }
                                style={styles.profileImg}
                            />
                            <View style={styles.contentWrap}>
                                {
                                    person.name ? (
                                        <Text style={styles.name}>
                                            {person.name}
                                        </Text>
                                    ) : null}
                                {
                                    person.also_known_as[0] ? (
                                        <Text style={styles.knowAs}>
                                            {`Også kendt som: ${person.also_known_as[0]}`}
                                        </Text>
                                    ) : null
                                }
                                {
                                    person.birthday ? (
                                        <Text style={styles.dateInfo} >
                                            {'Født: ' + dateFormat(person.birthday, 'dd. mmmm - yyyy')}
                                        </Text>
                                    ) : null
                                }
                                {
                                    person.deathday ? (
                                        <Text style={styles.dateInfo} >
                                            {'dødsdato: ' + dateFormat(person.deathday, 'dd. mmmm - yyyy')}
                                        </Text>
                                    ) : null
                                }
                                {
                                    person.biography ? (
                                        <Text
                                            style={styles.dateInfo}
                                        >
                                            biografi: {person.biography}
                                        </Text>
                                    ) : (
                                        <Text>
                                            Biografi: Ingen tilfængelig på dansk
                                        </Text>
                                    )
                                }
                                <YoutubeBtn handlePress={() => { showModal(); }} />
                            </View>
                        </View>
                    </ScrollView>
                ) : null
            }
            {
                loaded && error ? (
                    <Error />
                ) : null
            }

            {
                !loaded ? (
                    <Loader />
                ) : null
            }
            <Modal
                animationType={'slide'}
                visible={showWebsite}
                person={person}
            >
                <View style={styles.webViewCon}>

                    <ExitBtn handlePress={() => { showModal(); }} />
                    <WebView
                        source={person ? { uri: `https://www.youtube.com/results?search_query=${person.name}` } : null}
                        onLoadStart={() => setLoadedWeb(false)}
                        onLoadEnd={() => setLoadedWeb(true)}
                    />
                    {
                        !loadedWeb && (
                            <Loader />
                        )
                    }
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    webViewCon: {
        flex: 1,
        paddingTop: 100,
        position: 'relative',
    },
    pageWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentWrap: {
        position: 'relative',
        flex: 1,
        width: WIDTH,
        flexDirection: 'column',
        padding: 25,
    },
    profileImg: {
        width: WIDTH,
        height: WIDTH,
    },
    name: {
        fontSize: 25,
        fontWeight: '700',
        marginBottom: 10,
    },
    knowAs: {
        fontSize: 18,
        marginBottom: 15,
    },
    dateInfo: {
        fontSize: 15,
        marginBottom: 5,
    },
});

export default PersonDetails;
