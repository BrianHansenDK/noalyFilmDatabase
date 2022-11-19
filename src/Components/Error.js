import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, View, Text } from 'react-native';


const WIDTH = Dimensions.get('window').width; //full width

const propTypes = {
    errorTxt1: PropTypes.string,
    errorTxt2: PropTypes.string,
};

const defaultProps = {
    errorTxt1: 'Hov... Noget gik galt.',
    errorTxt2: 'Vær sikker på du er tilkoblet til internettet når du benytter dig af denne App. Eventuelt forsøg at genstarte',
};

class Error extends React.PureComponent {

    render() {
        const { errorTxt1, errorTxt2 } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.txt} >
                    {errorTxt1}
                </Text>
                <Text style={styles.txt} >
                    {errorTxt2}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt: {
        marginTop: 10,
        width: WIDTH * 0.8,
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
    },
});

Error.propTypes = propTypes;
Error.defaultProps = defaultProps;
export default Error;
