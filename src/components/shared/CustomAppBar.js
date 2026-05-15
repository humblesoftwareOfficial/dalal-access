import { SafeAreaView, StatusBar, View } from "react-native";
import { STATUSBAR_HEIGHT, STATUS_BAR_STYLE } from "../../styling/system";


export const CustomAppBar = ({
  backgroundColor = "#000",
  height = STATUSBAR_HEIGHT,
  ...props
}) => (
  <View style={[STATUS_BAR_STYLE.statusBar, { backgroundColor, height }]}>
    <SafeAreaView 
    // edges={['right', 'left', 'top']}
    >
      <StatusBar translucent backgroundColor="red" {...props} />
    </SafeAreaView>
  </View>
);
