import { styles } from "./styles";
import { Copyright } from "../Copyright";
import {
    View,
    Image,
    Text,
    TouchableOpacity
} from "react-native";

import successImg from '../../assets/success.png';

interface SuccessProps {
    handleResetFeedback: () => void;
}

export const Success: React.FC<SuccessProps> = ({
    handleResetFeedback
}) => {
    return (
        <View style={styles.container}>
            <Image 
                source={successImg}
                style={styles.image}
            />

            <Text
                style={styles.title}
            >
                Agradecemos o feedback
            </Text>

            <TouchableOpacity
                onPress={handleResetFeedback}
                style={styles.button}
            >
                <Text style={styles.buttonTitle}>
                    Quero enviar outro
                </Text>
            </TouchableOpacity>

            <Copyright />
        </View>
    );
};