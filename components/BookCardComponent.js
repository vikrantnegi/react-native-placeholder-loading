import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

// https://stenbeck.io/styling-shadows-in-react-native-ios-and-android/
function elevationShadowStyle(elevation) {
  return {
    elevation,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0.5 * elevation },
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * elevation,
  };
}

const BookCardComponent = props => {
  const { thumbnail, title, authors, onPress } = props;

  return (
    <View style={styles.shadow}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: 'row',
          padding: 8,
        }}
      >
        <View
          style={{
            flex: 1,
            height: responsiveHeight(16),
            width: responsiveWidth(16),
            marginRight: 10,
          }}
        >
          <Image
            source={{ uri: thumbnail }}
            style={{
              borderRadius: 4,
              resizeMode: 'contain',
              height: '100%',
              width: '100%',
            }}
            imageStyle={{ borderRadius: 1 }}
          />
        </View>

        <View
          style={{
            flex: 3,
            padding: 5,
          }}
        >
          <Text style={{ marginBottom: 5, fontSize: 20 }}>{title}</Text>
          <Text
            style={{ marginBottom: 5 }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            by {authors}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    borderRadius: 3,
    marginVertical: 5,
    marginHorizontal: 12,
    ...elevationShadowStyle(1),
    backgroundColor: 'white',
  },
});

export default BookCardComponent;
