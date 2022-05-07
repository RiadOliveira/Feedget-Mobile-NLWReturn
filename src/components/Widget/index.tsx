import BottomSheet from '@gorhom/bottom-sheet';

import { TouchableOpacity } from "react-native";
import { ChatTeardropDots } from 'phosphor-react-native';
import { styles } from "./styles";
import { theme } from "../../theme";

import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { useRef, useState } from "react";
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Options } from "../Options";
import { Form } from '../Form';
import { Success } from '../Success';

export type FeedbackType = keyof typeof feedbackTypes;

const Widget: React.FC = () => {
    const bottomSheetRef = useRef<BottomSheet>(null);

    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
    const [feedbackSent, setFeedbackSent] = useState(false);

    const handleOpen = () => {
        bottomSheetRef.current?.expand();
    };
    const handleResetFeedback = () => {
        setFeedbackType(null);
        setFeedbackSent(false);
    }

    return (
        <>
            <TouchableOpacity style={styles.button} onPress={handleOpen}>
                <ChatTeardropDots 
                    size={24}
                    color={theme.colors.text_on_brand_color}
                    weight="bold"
                />
            </TouchableOpacity>

            <BottomSheet 
                ref={bottomSheetRef}
                snapPoints={[1, 300]}
                backgroundStyle={styles.modal}
                handleIndicatorStyle={styles.indicator}
            >
                {feedbackSent ? (
                    <Success 
                        handleResetFeedback={handleResetFeedback}
                    />
                ) : (
                    <>
                        {feedbackType ? (
                            <Form 
                                feedbackType={feedbackType}
                                handleResetFeedback={handleResetFeedback}
                                onFeedbackSent={() => setFeedbackSent(true)}
                            />
                        ) : (
                            <Options setFeedbackType={setFeedbackType} />
                        )}
                    </>
                )}
            </BottomSheet>
        </>
    )
};

export default gestureHandlerRootHOC(Widget) as React.FC;
