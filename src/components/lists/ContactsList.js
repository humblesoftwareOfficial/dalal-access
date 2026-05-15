import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import * as Contacts from "expo-contacts";
import FullLoadingContainer from "../loaders/FullLoadingContainer";
import ContactCard from "../cards/contact";
import { APP_COLORS } from "../../styling/colors";
import { useDidMountEffect } from "../../utils/useDidMountEffect";
import { searchContact } from "../../utils";
import { HOME_STYLE } from "../../styling/screen";
import BottomModal from "../modals/BottomModal";
import CustomButton from "../buttons/CustomButton";

const MODAL_HEIGHT = Math.ceil(Dimensions.get("window").height / 1.3);

export default function ContactsList({
  defaultSelectedContacts = [],
  searchTerm,
  onAddNewGuest,
}) {
  const [allContacts, setAllContacts] = useState([]);
  const [contacts, setContacts] = useState(null);
  const [openRecap, setOpenRecap] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedContacts, setSelectedContacts] = useState(
    defaultSelectedContacts
  );

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === "granted") {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers],
          });

          if (data.length > 0) {
            const result = data.sort((a, b) =>
              a?.name?.toUpperCase() > b?.name?.toUpperCase()
                ? 1
                : b?.name?.toUpperCase() > a?.name?.toUpperCase()
                ? -1
                : 0
            );
            setContacts(result);
            setAllContacts(result);
          } else {
            setContacts([]);
          }
        } else {
          setContacts([]);
        }
      } catch (error) {
        console.log({ error });
        setContacts([]);
      }
    })();
  }, []);

  useEffect(() => {
    if (contacts) {
      setIsLoading(false);
    }
  }, [contacts]);

  useDidMountEffect(() => {
    if (searchTerm.length) {
      setIsLoading(true);
      const results = searchContact(allContacts, searchTerm);
      if (results) {
        setContacts([...results]);
      } else {
        setIsLoading(false);
      }
    } else {
      setContacts([...allContacts]);
    }
  }, [searchTerm]);

  const renderContactItem = useCallback(
    ({ item }) => (
      <ContactCard
        contact={item}
        key={item.id}
        isChecked={isChecked(item)}
        onClick={onCheckContact}
      />
    ),
    [contacts, selectedContacts]
  );

  const onCheckContact = (item) => {
    try {
      const values = selectedContacts || [];
      const index = values.findIndex((i) => i.id === item.id);
      if (index === -1) {
        values.push(item);
      } else {
        values.splice(index, 1);
      }
      setSelectedContacts([...values]);
    } catch (error) {
      console.log({ error });
    }
  };

  const isChecked = (contact) =>
    selectedContacts.findIndex((o) => o.id === contact.id) !== -1;

  const keyExtractor = useCallback((item) => item.id, []);

  const renderContacts = () => (
    <FlatList
      style={{ flex: 1 }}
      contentContainerStyle={{
        margin: 5,
      }}
      data={contacts}
      renderItem={renderContactItem}
      keyExtractor={keyExtractor}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      maxToRenderPerBatch={10}
      initialNumToRender={20}
      onEndReachedThreshold={0.5}
      windowSize={10}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <FullLoadingContainer
          backgroundColor={APP_COLORS.WHITE_COLOR.color}
          colorIcon={APP_COLORS.PRIMARY_COLOR.color}
          backgroundLoaderContainer={APP_COLORS.WHITE_COLOR.color}
          loaderColor={APP_COLORS.PRIMARY_COLOR.color}
        />
      ) : (
        renderContacts()
      )}
      {Boolean(selectedContacts?.length) && (
        <TouchableOpacity
          style={HOME_STYLE.float_button}
          activeOpacity={0.5}
          onPress={() => setOpenRecap(true)}
        >
          <Text style={HOME_STYLE.float_button_text}>
            {selectedContacts?.length}
          </Text>
        </TouchableOpacity>
      )}
      <BottomModal
        onClose={() => setOpenRecap(false)}
        content={
          <View
            style={{
              flex: 1,
              flexDirection: "column-reverse",
              marginBottom: 15,
            }}
          >
            <CustomButton
              label="Annuler"
              bgColor="#F5F5F5"
              textColor={APP_COLORS.PRIMARY_COLOR.color}
              onClick={() => setOpenRecap(false)}
            />
            <CustomButton
              label={`Ajouter à la liste des invités (${selectedContacts?.length})`}
              bgColor={APP_COLORS.PRIMARY_COLOR.color}
              onClick={() => {
                setOpenRecap(false);
                onAddNewGuest(selectedContacts);
              }}
              textColor={APP_COLORS.WHITE_COLOR.color}
            />
          </View>
        }
        showModal={openRecap}
        backgroundColor="transparent"
        sliderBackgroundColor="transparent"
        borderWidth={2}
        minHeight={MODAL_HEIGHT}
        overlay="rgba(0, 0, 0, 0.7)"
      />
    </View>
  );
}
