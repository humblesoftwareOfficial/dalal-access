import { useEffect, useState } from "react";
import { Image } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { RootSiblingParent } from "react-native-root-siblings";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from 'expo-status-bar';
import { Asset } from "expo-asset";
import { loadAsync, useFonts } from "expo-font";
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import Welcome from "./src/screens/Home/Welcome";
import Navigation from "./src/navigation";
import UserProvider from "./src/config/contexts/user/UserProvider";
import EventProvider from "./src/config/contexts/event/EventProvider";

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map((font) => loadAsync(font));
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    avenirBold: require("./src/assets/fonts/AvenirNextLTPro-Bold.otf"),
    avenir: require("./src/assets/fonts/AvenirNextLTPro-Regular.otf"),
    alexBrush: require("./src/assets/fonts/AlexBrush-Regular.ttf"),
    grapeNuts: require("./src/assets/fonts/GrapeNuts-Regular.ttf"),
    belleAurore: require("./src/assets/fonts/LaBelleAurore-Regular.ttf"),
    sacramento: require("./src/assets/fonts/Sacramento-Regular.ttf"),
    yesteryear: require("./src/assets/fonts/Yesteryear-Regular.ttf"),
    snigletRegular: require("./src/assets/fonts/Sniglet-Regular.ttf"),
    snigletBold: require("./src/assets/fonts/Sniglet-ExtraBold.ttf"),
    pacificoRegular: require("./src/assets/fonts/Pacifico-Regular.ttf"),
    righteousRegular: require("./src/assets/fonts/Righteous-Regular.ttf"),
    arizoniaRegular: require("./src/assets/fonts/Arizonia-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        await _loadAssetsAsync();
        // await NavigationBar.setVisibilityAsync("hidden");
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
    const hideNavigationBar = async () => {
      console.log('here')
      
    };

    hideNavigationBar();
  }, []);

  const _loadAssetsAsync = async () => {
    const imageAssets = cacheImages([
      require("./src/assets/images/icon.png"),
      require("./src/assets/images/custom_icon.png"),
      require("./src/assets/images/empty.png"),
    ]);

    try {
      SplashScreen.preventAutoHideAsync();
      const fontAssets = cacheFonts([FontAwesome.font]);
      await Promise.all([...imageAssets, ...fontAssets]);
    } catch (e) {
      console.warn(e);
    } finally {
      SplashScreen.hideAsync();
    }

    const fontAssets = cacheFonts([
      FontAwesome.font,
      AntDesign.font,
      Entypo.font,
      EvilIcons.font,
      Feather.font,
      Fontisto.font,
      Ionicons.font,
      MaterialCommunityIcons.font,
      MaterialIcons.font,
      SimpleLineIcons.font,
    ]);

    await Promise.all([...imageAssets, ...fontAssets]);
  };
  return (
    <PaperProvider>
      <RootSiblingParent>
        <UserProvider>
          <EventProvider>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            {fontsLoaded && appIsReady ? <Navigation /> : <Welcome />}
          </SafeAreaProvider>
          </EventProvider>
        </UserProvider>
      </RootSiblingParent>
      <StatusBar style="dark" />
    </PaperProvider>
  );
}
