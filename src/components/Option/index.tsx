import React from "react";
import { 
    View,
    TouchableOpacity,
    TouchableOpacityProps,
    Image,
    ImageProps,
    Text,
} from "react-native";
import { styles } from "./styles";

interface OptionProps extends TouchableOpacityProps {
    title: string;
    image: ImageProps;
}

export const Option: React.FC<OptionProps> = ({
    title,
    image,
    ...props
}) => {
    return (
        <TouchableOpacity style={styles.container} {...props}>
            <Image source={image} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
};