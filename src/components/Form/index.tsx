import React, { useState } from "react";
import { styles } from "./styles";
import { 
    View,
    TextInput,
    Image,
    Text,
    TouchableOpacity
} from "react-native";

import { captureScreen } from 'react-native-view-shot';
import { ArrowLeft } from "phosphor-react-native";
import { FeedbackType } from '../Widget';
import { theme } from "../../theme";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { ScreenshotButton } from "../ScreenshotButton";
import { Button } from "../Button";
import { Copyright } from "../Copyright";

import * as fileSystem from 'expo-file-system';
import api from "../../services/api";

interface FormProps {
    feedbackType: FeedbackType;
    handleResetFeedback: () => void;
    onFeedbackSent: () => void;
}

export const Form: React.FC<FormProps> = ({
    feedbackType,
    handleResetFeedback,
    onFeedbackSent
}) => {
    const feedbackTypeInfo = feedbackTypes[feedbackType];

    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [comment, setComment] = useState<string>('');

    const [isSendingFeedback, setIsSendingFeedback] = useState(false);

    const handleTakeScreenshot = () => {
        captureScreen({
            format: 'png',
            quality: 0.8,
        }).then(uri => setScreenshot(uri));
    };
    const handleRemoveScreenshot = () => setScreenshot(null);

    const handleSendFeedback = async () => {
        if(isSendingFeedback) return;
        setIsSendingFeedback(true);

        const screenshotBase64 = screenshot && 
            await fileSystem.readAsStringAsync(screenshot, {encoding: 'base64'});

        try {
            await api.post('/feedbacks', {
                type: feedbackType,
                screenshot: `data:image/png;base64, ${screenshotBase64}`,
                comment,
            });

            onFeedbackSent();
        } catch (error) {
            console.error(error);
            setIsSendingFeedback(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleResetFeedback}>
                    <ArrowLeft 
                        size={24}
                        weight="bold"
                        color={theme.colors.text_secondary}
                    />
                </TouchableOpacity>

                <View style={styles.titleContainer}>
                    <Image 
                        source={feedbackTypeInfo.image}
                        style={styles.image}
                    />

                    <Text style={styles.titleText}>
                        {feedbackTypeInfo.title}
                    </Text>
                </View>
            </View>

            <TextInput
                multiline
                autoCorrect={false}
                onChangeText={setComment}
                style={styles.input}
                placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
                placeholderTextColor={theme.colors.text_secondary}
            />

            <View style={styles.footer}>
                <ScreenshotButton 
                    screenshot={screenshot}
                    handleTakeScreenshot={handleTakeScreenshot}
                    handleRemoveScreenshot={handleRemoveScreenshot} 
                />

                <Button 
                    onPress={handleSendFeedback} 
                    isLoading={isSendingFeedback}
                />
            </View>

            <Copyright />
        </View>
    );
};