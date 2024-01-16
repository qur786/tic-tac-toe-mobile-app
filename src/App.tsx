import React from "react";
import { SafeAreaView, StatusBar, Text, useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Text>App</Text>
    </SafeAreaView>
  );
}
