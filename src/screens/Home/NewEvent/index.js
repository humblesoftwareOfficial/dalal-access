import { View, Text } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import EventContext from "../../../config/contexts/event/Event";
import EventIdentification from "./EventIdentification";
import EventType from "./EventType";
import EventDate from "./EventDate";
import SaveEvent from "./SaveEvent";

export default function NewEvent({ onCancel, onEventCreated }) {
  const [activeStep, setActiveStep] = useState(0);
  const { setNewEvent, newEvent } = useContext(EventContext);

  useEffect(() => {
    return () => {
      setNewEvent(null);
    };
  }, []);

  const onBack = () => {
    if (activeStep) {
      setActiveStep(activeStep - 1);
    } else {
      try {
        onCancel();
      } catch (error) {}
    }
  };

  const onNext = () => {
    if (activeStep < 7) {
      setActiveStep(activeStep + 1);
    }
  };

  const renderStep = useCallback(() => {
    switch (activeStep) {
      case 0:
        return <EventIdentification onNext={onNext} onBack={onBack} />;
      case 1:
        return <EventType onNext={onNext} onBack={onBack} />
      case 2:
        return <EventDate onNext={onNext} onBack={onBack} />
      case 3: 
      return <SaveEvent onNext={onEventCreated} onBack={onCancel}/>
      default:
        return <EventIdentification onNext={onNext} onBack={onBack} />;
    }
  }, [activeStep]);

  return (
    <View style={{ flex: 1 }}>
      {renderStep()}
    </View>
  );
}
