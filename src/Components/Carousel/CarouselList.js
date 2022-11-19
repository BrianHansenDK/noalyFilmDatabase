import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Card from './Card';

const propTypes = {
    item: PropTypes.object,
    carouselTitle: PropTypes.string,
    content: PropTypes.array,
};



class CarouselList extends React.PureComponent {
    render() {
        const { navigation, carouselTitle, content } = this.props;

        return (
            <React.Fragment>
                <View style={styles.carousel}>
                    <Text style={styles.carouselTitle}>
                        {carouselTitle}
                    </Text>
                    <FlatList
                        data={content}
                        renderItem={({ item }) => <Card navigation={navigation} item={item} />}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    carousel: {
        marginVertical: 25,
    },
    carouselTitle: {
        fontSize: 25,
        fontWeight: '700',
        marginStart: 25,
    },
});

CarouselList.propTypes = propTypes;

export default CarouselList;
