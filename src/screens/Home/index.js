import React, { useContext, useEffect, useState } from "react";
import { View, Text, Platform, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as MediaLibrary from "expo-media-library";
import { LinearGradient } from "expo-linear-gradient";

import {
  SAFE_AREA_VIEW,
} from "../../styling/system";
import { APP_COLORS } from "../../styling/colors";
import {
  SCREENS_NAME,
  getPlatformDescription,
} from "../../utils";
import UserContext from "../../config/contexts/user/User";
import FullLoadingContainer from "../../components/loaders/FullLoadingContainer";
import { GetUserEvents, GetUserStats } from "../../config/api";
import EventCard from "../../components/cards/event";
import CustomCarousel from "../../components/carousel";
import BottomModal from "../../components/modals/BottomModal";
import EditProfile from "./EditProfile";
import NewEvent from "./NewEvent";
import CustomButton from "../../components/buttons/CustomButton";
import HomeHeader from "../../components/headers/HomeHeader";
import ItemHome from "./ItemHome";

const ITEM_EVENT_WIDTH = Math.ceil(Dimensions.get("window").width / 2);
const MODAL_HEIGHT = Math.ceil(Dimensions.get("window").height / 1.1);

const Home = ({ navigation, route }) => {
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [isLoading, setIsLoading] = useState(true);
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openNewEvent, setOpenNewEvent] = useState(false);
  const { account, setAccount } = useContext(UserContext);
  const [events, setEvents] = useState(null);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    try {
      if (Platform.OS === "android") {
        if (status === null) {
          requestPermission();
        }
      }
    } catch (error) {
      console.log({ error });
    }
  }, []);

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    if (events) {
      setIsLoading(false);
    }
  }, [events]);

  useEffect(() => {
    setOpenEditProfile(false);
  }, [account]);

  const goToGuests = () => {
    try {
      navigation.navigate(SCREENS_NAME.Guests);
    } catch (error) {
      console.log({ error });
    }
  };

  const goToEventAccess = () => {
    try {
      navigation.navigate(SCREENS_NAME.EventAccess);
    } catch (error) {
      console.log({ error });
    }
  };

  const getEvents = async () => {
    try {
      setIsLoading(true);
      const payload = {
        page: 1,
        limit: 10,
        owners: [account.code],
        withAllAccess: true,
      };
      const [response, response_stats] = await Promise.all([
        GetUserEvents(payload, account.access_token),
        GetUserStats(account.code, account.access_token),
      ]);
      const { data, success } = response.data;
      const { data: data_stats, success: success_stats } = response_stats.data;
      if (success) {
        setStats(data_stats || []);
        setEvents(data?.events?.length ? data?.events : []);
      } else {
        setStats([]);
        setEvents([]);
      }
    } catch (error) {
      console.log(error.response.data);
      setEvents([]);
    }
  };

  const onEditUser = () => {
    setOpenEditProfile(true);
  };

  const onUserUpdated = (data) => {
    try {
      setAccount({
        ...data,
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const onClickEvent = (value) => {
    try {
      if (value.isForNewEvent) {
        setOpenNewEvent(true);
      } else {
        navigation.navigate(SCREENS_NAME.EventAccess, {
          event: value,
        });
      }
    } catch (error) {}
  };

  return (
    <SafeAreaView
      style={[
        SAFE_AREA_VIEW.container,
        {
          backgroundColor: "transparent",
        },
      ]}
      edges={["right", "left", "top"]}
    >
      <LinearGradient
        start={[0.7, 0.5]}
        end={[1, 3]}
        colors={[APP_COLORS.WHITE_COLOR.color, APP_COLORS.YELLOW_COLOR.color, APP_COLORS.YELLOW_COLOR.color]}
        style={{ flex: 1 }}
      >
      {isLoading ? (
        <FullLoadingContainer
          backgroundColor={APP_COLORS.WHITE_COLOR.color}
          colorIcon={APP_COLORS.PRIMARY_COLOR.color}
          backgroundLoaderContainer={APP_COLORS.WHITE_COLOR.color}
          loaderColor={APP_COLORS.PRIMARY_COLOR.color}
        />
      ) : (
        <>
          <HomeHeader user={account} />
          <View style={{ flex: 1 }}>
            <ItemHome description={getPlatformDescription()} />
            <CustomCarousel
              data={[
                // {
                //   code: generateKey(),
                //   name: "New event access",
                //   description: "",
                //   date: "15/12/2020",
                //   isForNewEvent: true,
                //   // url: "https://www.justifit.fr/wp-content/uploads/2018/04/Quelles-sont-les-regles-a-respecter-avant-de-se-marier.jpg"
                // },
              ].concat(events)}
              ChildrenItem={EventCard}
              itemWidth={ITEM_EVENT_WIDTH}
              onPressChildrenItem={onClickEvent} //<EventsStats data={stats} />
            />
          </View>
          {/* <UserProfileCard
            user={account}
            onEdit={onEditUser}
            onRefresh={getEvents}
          /> */}
          <View style={{ marginBottom: 20}}>
            <CustomButton
              label="+"
              bgColor={APP_COLORS.PRIMARY_COLOR.color}
              textColor={APP_COLORS.WHITE_COLOR.color}
              // onClick={onRefresh}
            />
            <Text style={{ textAlign: "center", fontSize: 8 }}>
              Humble Software Group
            </Text>
          </View>
        </>
      )}
      </LinearGradient>
      <BottomModal
        showModal={openEditProfile}
        onClose={() => {
          setOpenEditProfile(false);
        }}
        content={
          <EditProfile
            onClose={() => setOpenEditProfile(false)}
            user={account}
            onUserUpdated={onUserUpdated}
          />
        }
        minHeight={MODAL_HEIGHT}
        backgroundColor={APP_COLORS.PRIMARY_COLOR.color}
        sliderBackgroundColor={APP_COLORS.PRIMARY_COLOR.color}
        overlay="rgba(129, 143, 180, 0.3)"
      />
      <BottomModal
        showModal={openNewEvent}
        onClose={() => {
          setOpenNewEvent(false);
        }}
        content={
          <NewEvent
            onCancel={() => setOpenNewEvent(false)}
            onEventCreated={() => {
              getEvents();
              setOpenNewEvent(false);
            }}
          />
        }
        minHeight={MODAL_HEIGHT}
        backgroundColor={APP_COLORS.PRIMARY_COLOR.color}
        sliderBackgroundColor={APP_COLORS.PRIMARY_COLOR.color}
        overlay="rgba(129, 143, 180, 0.3)"
      />
    </SafeAreaView>
  );
};

export default Home;
