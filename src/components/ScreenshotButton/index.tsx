import { Camera, Trash } from "phosphor-react-native";
import { View, TouchableOpacity, Image } from "react-native";
import { theme } from "../../theme";
import { styles } from "./styles";

interface ScreenshotButtonProps {
    screenshot: string | null;
    handleTakeScreenshot: () => void;
    handleRemoveScreenshot: () => void;
}

export const ScreenshotButton: React.FC<ScreenshotButtonProps> = ({
    screenshot,
    handleTakeScreenshot,
    handleRemoveScreenshot,
}) => {
    return (
        <TouchableOpacity
            onPress={screenshot ? handleRemoveScreenshot : handleTakeScreenshot}
            style={styles.container}
        >
            {screenshot ? (
                <View>
                    <Image 
                        style={styles.image}
                        source={{uri: screenshot}}
                    />

                    <Trash
                        size={22}
                        color={theme.colors.text_secondary}
                        weight="fill"
                        style={styles.removeIcon}
                    />
                </View>
            ) : (
                <Camera
                    size={24}
                    color={theme.colors.text_primary}
                    weight="bold"
                />
            )}
        </TouchableOpacity>
    ); 
};