import React, { useCallback } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COUNTRIES } from "../../utils";
import Country from "./Country";


export default function CountriesList({ onSelectCountry }) {
  const renderCountry = ({ item }) => (
    <Country
      item={item}
      key={item.country}
      onClick={(value) => onClickCountry(value)}
    />
  );

  const keyExtractor = useCallback((item) => item.country, []);

  const onClickCountry = (value) => {
    onSelectCountry && onSelectCountry(value);
  };

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 25 : 0,
        flex: 1,
      }}
      // edges={['right', 'left', 'top']}
    >
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{
          margin: 5,
        }}
        data={COUNTRIES}
        renderItem={renderCountry}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        maxToRenderPerBatch={20}
        initialNumToRender={20}
        onEndReachedThreshold={0.5}
        windowSize={10}
      />
    </SafeAreaView>
  );
}
