import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ViewStyle,
  StyleProp,
  Animated,
} from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { Button, Icon, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "../hooks/useNavigation";
import i18nConfig from "../locales/i18n-config";
import { GITHUB_URL } from "../constants/text";
import { setValue } from "../utils/storage";
import * as Browser from "expo-web-browser";

const OnboardingScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const carouselRef = useRef<ICarouselInstance>(null);

  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const indicatorWidth = new Animated.Value(10);

  useEffect(() => {
    Animated.timing(indicatorWidth, {
      toValue: 25,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [currentCarouselIndex]);

  const onNextPress = () => {
    if (currentCarouselIndex < pages.length - 1) {
      carouselRef.current?.next();
      setCurrentCarouselIndex(currentCarouselIndex + 1);
    } else if (currentCarouselIndex === pages.length - 1) {
      navigation.goHome();
      setValue("showOnboarding", JSON.stringify(false));
    }
  };

  const onSkipPress = () => {
    if (currentCarouselIndex === 0) {
      navigation.goHome();
    } else {
      carouselRef.current?.prev();
      setCurrentCarouselIndex(currentCarouselIndex - 1);
    }
    setValue("showOnboarding", JSON.stringify(false));
  };

  const onAboutPress = () => Browser.openBrowserAsync(GITHUB_URL);

  const pages = [
    {
      title: i18nConfig.translate("onboarding.page1.title"),
      description: i18nConfig.translate("onboarding.page1.description"),
      icon: "note-multiple",
    },
    {
      title: i18nConfig.translate("onboarding.page2.title"),
      description: i18nConfig.translate("onboarding.page2.description"),
      icon: "notebook",
    },
    {
      title: i18nConfig.translate("onboarding.page3.title"),
      description: i18nConfig.translate("onboarding.page3.description"),
      icon: "lock",
    },
    {
      title: i18nConfig.translate("onboarding.page4.title"),
      description: i18nConfig.translate("onboarding.page4.description"),
      icon: "palette",
    },
    {
      title: i18nConfig.translate("onboarding.page5.title"),
      description: i18nConfig.translate("onboarding.page5.description"),
      icon: "information-variant",
    },
  ];

  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;

  const defaultIndicatorStyles: StyleProp<ViewStyle> = {
    width: 8,
    height: 10,
    borderColor: colors.border,
    backgroundColor: colors.onSurfaceVariant,
  };

  const activeIndicatorStyles: StyleProp<ViewStyle> = {
    width: indicatorWidth,
    height: 8,
    borderColor: colors.border,
    backgroundColor: colors.primary,
  };

  return (
    <SafeAreaView style={styles.container}>
      <Carousel
        loop={false}
        width={screenWidth}
        height={screenHeight - 200}
        data={pages}
        ref={carouselRef}
        snapEnabled
        enabled={false}
        scrollAnimationDuration={1000}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.page}>
            <Icon source={item.icon} size={100} color={colors.primary} />
            <View style={styles.textContainer}>
              <Text style={styles.text} variant="headlineLarge">
                {item.title}
              </Text>
              <Text style={styles.text} variant="bodyLarge">
                {item.description}
              </Text>
              {index === pages.length - 1 && (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 15,
                  }}
                >
                  <Button
                    mode="contained"
                    icon="github"
                    compact
                    onPress={onAboutPress}
                  >
                    GabrielCrackPro/Gnotes-expo
                  </Button>
                </View>
              )}
            </View>
          </View>
        )}
      />

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {pages.map((_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.indicator,
              currentCarouselIndex === index
                ? activeIndicatorStyles
                : defaultIndicatorStyles,
            ]}
          />
        ))}
      </View>

      <View style={styles.buttonsContainer}>
        <Button onPress={onSkipPress}>
          {currentCarouselIndex === 0
            ? i18nConfig.translate("onboarding.skip")
            : i18nConfig.translate("onboarding.back")}
        </Button>
        <Button mode="contained" onPress={onNextPress}>
          {currentCarouselIndex === pages.length - 1
            ? i18nConfig.translate("onboarding.finish")
            : i18nConfig.translate("onboarding.continue")}
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  textContainer: {
    marginBottom: 120,
  },
  page: {
    alignItems: "center",
    justifyContent: "space-evenly",
    height: Dimensions.get("screen").height,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    marginTop: 20,
    width: Dimensions.get("screen").width,
  },
  indicator: {
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 50,
  },
  text: {
    textAlign: "center",
  },
});

export default OnboardingScreen;
