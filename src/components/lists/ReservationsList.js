import {
  View,
  Text,
  RefreshControl,
  Dimensions,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { memo, useCallback, useContext, useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { FontAwesome6 } from "@expo/vector-icons";
import { APP_COLORS } from "../../styling/colors";
import FullLoadingContainer from "../loaders/FullLoadingContainer";
import { EReservationStatus, formatDateToDDMMYYYY, generateKey } from "../../utils";
import RequestCardSimpleView from "../cards/request";
import { GetRequests } from "../../config/api";
import UserContext from "../../config/contexts/user/User";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDidMountEffect } from "../hooks/useDidMountEffect";

function ReservationsRequestsList({
  navigation,
  selectedStatus,
  reload = 0,
  searchTerm = "",
  filterDate = null,
  onScroll,
  listHeader,
  onShowReservation
}) {
  const [requests, setRequests] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isGettingData, setIsGettingData] = useState(false);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);
  const [page, setPage] = useState(1);
  const [lastRequestHasData, setLastRequestHasData] = useState(false);
  const [openInfos, setOpenInfos] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [openComplement, setOpenComplement] = useState(false);
  const { account } = useContext(UserContext);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getRequests();
  }, [page]);

  useEffect(() => {
    if (requests) {
      setIsLoading(false);
      setIsGettingData(false);
    }
  }, [requests]);

  useEffect(() => {
    if (reload) onRefreshData();
  }, [reload]);

  useDidMountEffect(() => {
    setIsLoading(true);
    if (page === 1) {
      getRequests();
    } else {
      setPage(1);
    }
  }, []);

  useEffect(() => {
    if (selectedRequest) setOpenInfos(true);
    else setOpenInfos(false);
  }, [selectedRequest]);

  const getRequests = async () => {
    try {
      const payload = {
        page,
        limit: 10,
        status: [EReservationStatus.IN_PROGRESS],
        by: account.code,
        ...(account?.accountType !== "ADMIN" && {
          house: account.house.code,
        }),
      };
      const response = await GetRequests(payload, account.access_token);
      const { success, data, message } = response.data;
      if (success) {
        if (page === 1) {
          setRequests(data.reservations);
        } else {
          if (data.reservations?.length) {
            const newRequests = requests.concat(data.reservations);
            setRequests(newRequests);
          } else {
            setIsLoading(false);
            setIsGettingData(false);
          }
        }
        setLastRequestHasData(Boolean(data.reservations.length));
      } else {
        console.log({ message });
        setLastRequestHasData(false);
        setIsLoading(false);
        setIsGettingData(false);
      }
    } catch (error) {
      console.log({ error });
      setIsLoading(false);
    }
  };

  const keyExtractor = useCallback((item) => generateKey(), []);

  const renderItems = useCallback(
    ({ item, index }) => (
      <RequestCardSimpleView data={item} key={generateKey()} onClick={() => onShowReservation && onShowReservation(item.code)} />
    ),
    [],
  );

  const onEndReached = () => {
    if (lastRequestHasData) {
      if (!isLoading && !isGettingData) {
        setIsGettingData(true);
        setPage(page + 1);
      }
    } else {
      setIsGettingData(false);
    }
  };

  const onRefreshData = () => {
    setIsLoading(true);
    if (page > 1) {
      setPage(1);
    } else {
      getRequests();
    }
  };

  return (
    <>
      {isLoading ? (
        <FullLoadingContainer
          backgroundColor="transparent"
          colorIcon={APP_COLORS.YELLOW_COLOR.color}
          backgroundLoaderContainer={APP_COLORS.YELLOW_COLOR.color}
          loaderColor={APP_COLORS.YELLOW_COLOR.color}
        />
      ) : Boolean(requests?.length) ? (
        <FlatList
          style={{ backgroundColor: "transparent" }}
          disableIntervalMomentum
          data={requests || []}
          renderItem={renderItems}
          keyExtractor={keyExtractor}
          maxToRenderPerBatch={6}
          onEndReachedThreshold={0.5}
          updateCellsBatchingPeriod={100}
          initialNumToRender={6}
          onScroll={onScroll}
          scrollEventThrottle={16}
          ListHeaderComponent={listHeader}
          onMomentumScrollBegin={() => {
            setOnEndReachedCalledDuringMomentum(false);
          }}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefreshData}
              tintColor={APP_COLORS.PRIMARY_COLOR.color}
              progressBackgroundColor={APP_COLORS.WHITE_COLOR.color}
              colors={[APP_COLORS.PRIMARY_COLOR.color]}
            />
          }
          onRefresh={onRefreshData}
          onEndReached={() => onEndReached()}
          refreshing={isRefreshing}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            lastRequestHasData && (
              <View style={{ marginTop: 5, marginBottom: 10 }}>
                <ActivityIndicator
                  size="small"
                  color={APP_COLORS.PRIMARY_COLOR.color}
                />
              </View>
            )
          }
        />
      ) : (
        <View style={{ flex: 1 }}>
          {listHeader}
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <FontAwesome6 name="beer-mug-empty" size={40} color="black" />
            <Text>Aucune réservation trouvée</Text>
          </View>
        </View>
      )}
    </>
  );
}

export default memo(ReservationsRequestsList);
