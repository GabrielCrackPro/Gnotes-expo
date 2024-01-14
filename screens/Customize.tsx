import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { List, useTheme } from "react-native-paper";
import useCustomTheme from "../hooks/useCustomTheme";
import ColorPicker from "../components/ColorPicker";

const Customize = () => {
  const { getColors } = useCustomTheme();

  const themeColors = getColors();
  const { colors } = useTheme();

  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [colorPickerDefault, setColorPickerDefault] = useState({
    colorId: "",
    color: "",
  });

  const handleShowColorPicker = (defaultColor: {
    colorId: string;
    color: string;
  }) => {
    setColorPickerVisible(true);
    setColorPickerDefault(defaultColor);
  };

  return (
    <View style={styles.customize}>
      <List.Accordion
        title="Color palette"
        left={(props) => (
          <List.Icon {...props} icon="palette" color={colors.primary} />
        )}
      >
        {Object.entries(themeColors).map(([name, color]) => (
          <List.Item
            key={name}
            title={name}
            style={styles.item}
            onPress={() =>
              handleShowColorPicker({ colorId: name, color: color as string })
            }
            left={() => (
              <View
                style={{
                  backgroundColor: color as string,
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  marginRight: 16,
                }}
              />
            )}
          />
        ))}
      </List.Accordion>
      <ColorPicker
        visible={colorPickerVisible}
        defaultColor={colorPickerDefault.color}
        colorId={colorPickerDefault.colorId}
        onDismiss={() => setColorPickerVisible(false)}
      />
    </View>
  );
};

export default Customize;

const styles = StyleSheet.create({
  customize: {
    flex: 1,
  },
  item: {
    marginHorizontal: 10,
  },
});
