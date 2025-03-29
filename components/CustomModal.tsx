import { View, StyleSheet, Pressable, Text, Modal } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type ModalProps = {
  visible: boolean;
  message: string;
  title: string;
  buttonText: string;
  cancelBtn?: boolean;
  cancelText?: string;
  onCancel?: () => void;
  onConfirm: () => void;
};

export function CustomModal({
  visible,
  message,
  title,
  buttonText,
  cancelBtn,
  cancelText,
  onCancel,
  onConfirm, // Nueva función para confirmar la eliminación
}: ModalProps) {
  const cancelOpacity: SharedValue<number> = useSharedValue(1);
  const deleteOpacity: SharedValue<number> = useSharedValue(1);

  const handlePressIn = (shareValue: SharedValue<number>) => {
    shareValue.value = withTiming(0.8, { duration: 150 });
  };

  const handlePressOut = (shareValue: SharedValue<number>) => {
    shareValue.value = withTiming(1, { duration: 150 });
  };

  const cancelStyle = useAnimatedStyle(() => {
    return { opacity: cancelOpacity.value };
  });
  const deleteStyle = useAnimatedStyle(() => {
    return { opacity: deleteOpacity.value };
  });

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onConfirm}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={[TextStyle.title, styles.titleText]}>{title}</Text>
          <Text style={[TextStyle.text, styles.messageText]}>{message}</Text>

          <View className="flex-row justify-between items-center">
            <Pressable
              onPressIn={() => handlePressIn(deleteOpacity)}
              onPressOut={() => handlePressOut(deleteOpacity)}
              onPress={onConfirm} // Llamar a la función de confirmación (eliminación)
              style={styles.buttonContainer}
            >
              <Animated.View style={[styles.button, deleteStyle]}>
                <Text style={[TextStyle.text, styles.buttonText]}>
                  {buttonText}
                </Text>
              </Animated.View>
            </Pressable>
            {cancelBtn && (
              <Pressable
                onPressIn={() => handlePressIn(cancelOpacity)}
                onPressOut={() => handlePressOut(cancelOpacity)}
                onPress={onCancel} // Solo cerrar el modal
                style={{
                  alignSelf: "flex-start",
                }}
              >
                <Animated.View style={[styles.button, cancelStyle]}>
                  <Text style={[TextStyle.text, styles.buttonText]}>
                    {cancelText ?? "Cancel"}
                  </Text>
                </Animated.View>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#FFF8E8",
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#583B2D",
  },
  titleText: {
    color: "#583B2D",
    fontSize: 20,
    marginBottom: 10,
  },
  messageText: {
    color: "#583B2D",
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    alignSelf: "flex-end",
  },
  button: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: "#583B2D",
  },
  buttonText: {
    color: "#FFF8E8",
    fontSize: 18,
  },
});

const TextStyle = StyleSheet.create({
  title: {
    fontFamily: "SourGummy-Bold",
  },
  text: {
    fontFamily: "SourGummy-Regular",
  },
});
