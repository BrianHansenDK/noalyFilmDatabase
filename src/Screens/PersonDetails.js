import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, SafeAreaView, Image, Text, View, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { getPerson } from '../misc/Services';
import dateFormat, { i18n } from 'dateformat';
import Loader from '../Components/Loader';
import ExitBtn from '../Components/ExitBtn';
import WebView from 'react-native-webview';
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

const PersonDetails = ({ route, navigation }) => {
    const personId = route.params.personId;

    const [person, setPerson] = useState();
    const [loaded, isLoaded] = useState();
    const [showWebsite, setShowWebsite] = useState(false);
    const [loadedWeb, setLoadedWeb] = useState(false)

    useEffect(() => {
        getPerson(personId).then(r => {
            setPerson(r);
        }).catch(err => {
            console.error(err);
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
                                    person ?
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
                                <TouchableOpacity onPress={() => { showModal() }}>
                                    <Text>
                                        Press here
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
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
            >
                <View style={styles.webViewCon}>

                    <ExitBtn handlePress={() => { showModal(); }} />
                    <WebView
                        source={{ uri: `https://www.youtube.com/results?search_query=${person.name}` }}
                        onLoadStart={() => setLoadedWeb(false)}
                        onLoadEnd={() => setLoadedWeb(true)}
                    />
                    {
                        !loadedWeb && (
                            <Loader />
                        )
                    }
                    <Text>
                        Here
                    </Text>
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
