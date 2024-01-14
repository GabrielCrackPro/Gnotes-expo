import React from "react";
import { StyleSheet } from "react-native";
import { Button, Modal } from "react-native-paper";

import RNColorPicker, {
  Panel1,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
} from "reanimated-color-picker";
import useCustomTheme from "../hooks/useCustomTheme";

interface ColorPickerProps {
  colorId: string;
  defaultColor: string;
  visible: boolean;
  onDismiss: () => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  colorId,
  defaultColor,
  visible,
  onDismiss,
}) => {
  const { updateColor } = useCustomTheme();

  const onSelectColor = ({ hex }: any) => {
    updateColor(colorId, hex);
  };

  return (
    <Modal visible={visible}>
      <RNColorPicker value={defaultColor} onComplete={onSelectColor}>
        <Preview hideInitialColor />
        <Panel1 />
        <HueSlider />
        <OpacitySlider />
        <Swatches />
      </RNColorPicker>
      <Button onPress={onDismiss}>Ok</Button>
    </Modal>
  );
};

export default ColorPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 100,
    marginHorizontal: 5,
    backgroundColor: "red",
  },
});
