import React from "react";
import { Text, View } from "react-native";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { Copyright } from "../Copyright";
import { Option } from "../Option";
import { FeedbackType } from "../Widget";
import { styles } from "./styles";

interface OptionsProps {
    setFeedbackType: (type: FeedbackType) => void;
}

export const Options: React.FC<OptionsProps> = ({
    setFeedbackType
}) => {
    return (
        <View style={styles.container}>
            <Text 
                style={styles.title}
            >
                Deixe seu feedback
            </Text>

            <View style={styles.options}>
                {Object.entries(feedbackTypes).map(
                    ([key, {title, image}]) => (
                        <Option 
                            key={key} 
                            title={title} 
                            image={image}
                            onPress={() => setFeedbackType(key as FeedbackType)}
                        />
                    )
                )}
            </View>

            <Copyright />
        </View>
    );
};