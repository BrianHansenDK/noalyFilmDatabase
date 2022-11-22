import React from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronCircleLeft, faMagnifyingGlassArrowRight } from '@fortawesome/free-solid-svg-icons';
import Colors from '../Theme/Colors';

const LOGO = require('./Images/MovieDB_logo_nt.png');

const propTypes = {
    main: PropTypes.bool,
};

const defaultProps = {
    main: false,
};

class Navbar extends React.PureComponent {
    state = {}
    render() {
        const { navigation, main } = this.props;
        return (
            <SafeAreaView>
                {main ? (
                    <View style={styles.mainNav} >
                        <View style={styles.logoCon}>

                            <Image
                                style={styles.logo}
                                source={LOGO}
                                resizeMode={'stretch'}
                            />
                        </View>
                        <TouchableOpacity onPress={() => { navigation.navigate('Søg'); }}>
                            <FontAwesomeIcon style={styles.icon} icon={faMagnifyingGlassArrowRight} size={35} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View>
                        <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                            <FontAwesomeIcon style={styles.icon} icon={faChevronCircleLeft} size={30} />
                        </TouchableOpacity>
                    </View>
                )}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    mainNav: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 25,
        paddingVertical: 5,
    },
    icon: {
        color: `${Colors.main}`,
        marginTop: 10,
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
    logoCon: {
        height: 50,
        width: 50,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: `${Colors.background}`,
        shadowOffset: {
            width: -4,
            height: 5,
        },
        shadowRadius: 3,
        shadowOpacity: 0.25,
        shadowColor: 'black',
        elevation: 10,
    },
    logo: {
        height: 35,
        width: 35,
    },
});

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
