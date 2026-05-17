import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");
const INTERVAL_MS = 4000;

export default function HouseImageBackground({ medias = [], defaultImage, children }) {
  const images = medias.length > 0 ? medias.map((m) => m.url) : [defaultImage];
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (images.length <= 1) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % images.length;
        flatListRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, INTERVAL_MS);

    return () => clearInterval(timerRef.current);
  }, [images.length]);

  const renderItem = ({ item }) => (
    <Image
      source={{ uri: item }}
      style={styles.image}
      resizeMode="cover"
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        keyExtractor={(_, i) => String(i)}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        style={StyleSheet.absoluteFill}
        start={[0.5, 0]}
        end={[0.5, 1]}
        colors={["rgba(0,0,0,0.15)", "rgba(21,42,45,0.7)", "rgba(21,42,45,0.92)"]}
        pointerEvents="none"
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width,
    height,
  },
});
