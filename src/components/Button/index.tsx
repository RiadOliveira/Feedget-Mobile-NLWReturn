import { styles } from "./styles";
import { 
    TouchableOpacity,
    TouchableOpacityProps,
    Text,
    ActivityIndicator,
} from "react-native";
import { theme } from "../../theme";

interface ButtonProps extends TouchableOpacityProps {
    isLoading: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    isLoading,
    ...props
}) => {
    return (
        <TouchableOpacity 
            style={styles.container}
            {...props}
        >
            {isLoading ? (
                <ActivityIndicator 
                    color={theme.colors.text_on_brand_color}
                />
            ) : (
                <Text style={styles.title}>Enviar feedback</Text>
            )}
        </TouchableOpacity>
    );
};