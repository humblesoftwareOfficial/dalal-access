import {
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import FullLoadingContainer from "../loaders/FullLoadingContainer";
import { APP_COLORS } from "../../styling/colors";
import GuestCard from "../cards/guest";
import { SCREENS_NAME, generateKey, isFieldWithValue } from "../../utils";
import { GetAccess } from "../../config/api";
import { useDidMountEffect } from "../../utils/useDidMountEffect";
import empty from "../../assets/images/empty.png";
import { APP_STYLE } from "../../styling/system";
import CustomButton from "../buttons/CustomButton";

const ITEM_HEIGHT = 80;

const IMAGE_SIZE = Math.ceil(Dimensions.get("window").width / 4);

const GuestsList = ({
  eventCode,
  navigation,
  onGotGuestLength,
  account,
  searchTerm,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isRetrievingData, setIsRetrievingData] = useState(false);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);
  const [guests, setGuests] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [lastRequestHasData, setLastRequestHasData] = useState(true);
  const [page, setPage] = useState(1);

  useDidMountEffect(() => {
    setIsLoading(true);
    if (page === 1) {
      getAccess();
    } else {
      setPage(1);
    }
    console.log({ searchTerm });
  }, [searchTerm]);

  useEffect(() => {
    getAccess();
    console.log("here");
  }, [page]);

  useEffect(() => {
    if (selectedPlace) {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  }, [selectedPlace]);

  useEffect(() => {
    if (guests) {
      setIsLoading(false);
      setIsRetrievingData(false);
    }
  }, [guests]);

  const renderItems = useCallback(
    ({ item, index }) => (
      <TouchableOpacity onPress={() => onShowGuestInfos(item)}>
        <GuestCard
          guest={item}
          key={generateKey()}
          limitedDescription
          eventColor="#b666d2"
        />
      </TouchableOpacity>
    ),
    [guests]
  );

  const keyExtractor = useCallback((item) => generateKey(), []);

  const onShowGuestInfos = (value) => {
    try {
      navigation.navigate(SCREENS_NAME.GuestInfos, { guest: value });
    } catch (error) {
      console.log({ error });
    }
  };

  const onEndReached = () => {
    if (lastRequestHasData) {
      if (!isLoading && !isRetrievingData) {
        setIsRetrievingData(true);
        setPage(page + 1);
      }
    } else {
      setIsRetrievingData(false);
    }
  };

  const onRefreshData = () => {
    setIsLoading(true);
    if (page > 1) {
      setPage(1);
    } else {
      getAccess();
    }
  };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedPlace(null);
  };

  const getAccess = async () => {
    try {
      console.log("called");
      // setIsLoading(true);
      const payload = {
        page,
        limit: 20,
        ...(isFieldWithValue(eventCode) && {
          events: [eventCode],
        }),
        ...(isFieldWithValue(searchTerm) && {
          infos: searchTerm,
        }),
      };
      const response = await GetAccess(payload, account.access_token);
      const { success, message, data } = response.data;
      if (success) {
        if (page === 1) {
          setGuests(data.access);
        } else if (data.access.length) {
          const newRetrievedGuests = guests?.concat(data.access);
          setGuests(newRetrievedGuests);
        } else {
          setIsLoading(false);
          setIsRetrievingData(false);
        }
        setLastRequestHasData(Boolean(data.access.length));
      } else {
        setLastRequestHasData(false);
        setIsLoading(false);
        setIsRetrievingData(false);
      }
    } catch (error) {
      console.log({ error });
      setIsLoading(false);
    }
  };

  const getItemLayout = (_, index) => {
    return { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index };
  };

  return (
    <>
      {isLoading ? (
        <FullLoadingContainer
          backgroundColor={APP_COLORS.WHITE_COLOR.color}
          colorIcon={APP_COLORS.PRIMARY_COLOR.color}
          backgroundLoaderContainer={APP_COLORS.WHITE_COLOR.color}
          loaderColor={APP_COLORS.PRIMARY_COLOR.color}
        />
      ) : (
        <>
          {guests?.length ? (
            <FlatList
              style={{ backgroundColor: "transparent" }}
              disableIntervalMomentum
              data={guests || []}
              renderItem={renderItems}
              keyExtractor={keyExtractor}
              maxToRenderPerBatch={10}
              onEndReachedThreshold={0.7}
              updateCellsBatchingPeriod={100}
              initialNumToRender={10}
              onMomentumScrollBegin={() => {
                setOnEndReachedCalledDuringMomentum(false);
              }}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={onRefreshData}
                  tintColor={APP_COLORS.PRIMARY_COLOR.color}
                  progressBackgroundColor={APP_COLORS.PRIMARY_COLOR.color}
                  colors={[APP_COLORS.PRIMARY_COLOR.color]}
                />
              }
              onRefresh={onRefreshData}
              onEndReached={() => onEndReached()}
              refreshing={isRefreshing}
              showsVerticalScrollIndicator={false}
              getItemLayout={getItemLayout}
              windowSize={5}
              ListFooterComponent={
                lastRequestHasData && (
                  <ActivityIndicator
                    size="small"
                    color={APP_COLORS.PRIMARY_COLOR.color}
                  />
                )
              }
            />
          ) : (
            <View style={{ flex: 1, margin: 10, justifyContent: "center" }}>
              <View style={{ alignItems: "center", flex: 1 }}>
                <View
                  style={{
                    width: IMAGE_SIZE,
                    height: IMAGE_SIZE,
                    marginBottom: 10,
                  }}
                >
                  {/* <ImageBackground
                    ImageBackground
                    source={empty}
                    style={[APP_STYLE.local_image_background]}
                    imageStyle={{ resizeMode: "cover" }}
                  /> */}
                </View>
                <Text>{`Ajouter des invités ${
                  searchTerm || ""
                } à votre évènement.`}</Text>
              </View>
              <View>
                <CustomButton
                  label="Actualiser"
                  textColor={APP_COLORS.PRIMARY_COLOR.color}
                  bgColor={APP_COLORS.WHITE_COLOR.color}
                  onClick={getAccess}
                />
              </View>
            </View>
          )}
        </>
      )}
      {/* <BottomModal
        onClose={() => setOpenModalSend(false)}
        content={<QrCodeCard guest={guest} eventColor={eventColor}/>}
        showModal={openModalSend}
        backgroundColor={eventColor}
        sliderBackgroundColor={APP_COLORS.WHITE_COLOR.color}
        borderWidth={2}
        minHeight={MODAL_HEIGHT}
        overlay="rgba(0, 0, 0, 0.2)"
      />
      <BottomModal
        onClose={() => setOpenModalRemoveGuest(false)}
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
              onClick={() => setOpenModalRemoveGuest(false)}
            />
            <CustomButton
              label="Retirer de la liste des invités"
              bgColor={APP_COLORS.PRIMARY_COLOR.color}
            />
          </View>
        }
        showModal={openModalRemoveGuest}
        backgroundColor="transparent"
        sliderBackgroundColor="transparent"
        borderWidth={2}
        minHeight={MODAL_HEIGHT}
        overlay="rgba(0, 0, 0, 0.4)"
      /> */}
    </>
  );
};

export default React.memo(GuestsList);
