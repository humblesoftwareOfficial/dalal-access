import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  TextInput,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { HEADER_SEARCH_PAGE_STYLE } from "../../styling/inputs";
import { isFieldWithValue } from "../../utils";
import { APP_COLORS } from "../../styling/colors";

export default function CustomSearchInput({
  onValidSearch,
  defaultValue = "",
  extraButtonLeft = null,
  extraButtonRight = null,
  onFocusChange,
  editable = true,
  placeholder = "Rechercher dans vos contacts",
  borderColor= "#2E2E2E",
    backgroundColor= "#F5F5F5",
}) {
  const [focused, setFocused] = useState(false);
  const [searchText, setSearchText] = useState(defaultValue);
  const onFocus = () => {
    setFocused(true);
    onFocusChange && onFocusChange(true);
  };

  const onBlur = () => {
    setFocused(false);
    onFocusChange && onFocusChange(false);
  };

  const onSubmitSearch = () => {
    Keyboard.dismiss();
    if (isFieldWithValue(searchText) || searchText !== defaultValue) {
      onValidSearch(searchText);
    }
  };
  const renderInput = () => (
    <TextInput
      placeholder={placeholder}
      style={[HEADER_SEARCH_PAGE_STYLE.custom_input_search, {
        backgroundColor,
        borderColor,
      }]}
      onFocus={onFocus}
      onBlur={onBlur}
      returnKeyType="search"
      onChangeText={(text) => setSearchText(text)}
      onSubmitEditing={() => onSubmitSearch()}
      placeholderTextColor="#6C6C6C"
      selectionColor={APP_COLORS.YELLOW_COLOR.color}
      editable={editable}
    />
  );
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={HEADER_SEARCH_PAGE_STYLE.header}>
        {Boolean(!focused) && extraButtonLeft}
        {renderInput()}
        <View style={[HEADER_SEARCH_PAGE_STYLE.custom_input_search_prefix, {
            left: focused ? 20 : 85,
        }]}>
          <FontAwesome5
            name="search"
            size={20}
            color={APP_COLORS.PRIMARY_COLOR.color}
          />
        </View>
        {Boolean(!focused) && extraButtonRight}
      </View>
    </TouchableWithoutFeedback>
  );
}
