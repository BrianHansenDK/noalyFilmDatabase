import React from 'react';
import { StyleSheet, View } from 'react-native';
import Video from 'react-native-video';
const video = require('../misc/SampleVideo_1280x720_20mb.mp4');

const VideoComponent = () => {
    return (
        <View style={styles.videoModal}>
            <Video
                source={video}
                ref={(ref) => {
                    this.player = ref;
                }}
                fullscreenOrientation={'all'}
                fullscreen={true}
                controls={true}
                onBuffer={this.onBuffer}
                onError={this.videoError}
                style={styles.backgroundVideo}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    videoModal: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
})

export default VideoComponent;
