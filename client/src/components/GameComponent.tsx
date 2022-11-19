import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LrComponent from "./LrComponent";
import WaitingStateComponent from "./WaitingStateComponent";
import {
  randomLeftOrRight,
  logASuccessHitToDB,
} from "../helpers/helperFunctions";

const GameComponent = (): JSX.Element => {
  const location = useLocation();
  const [proceedFromWaitScreen, setProceedFromWaitScreen] = useState<boolean>(false);
  const [right, setRight] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [timeIsUp, setTimeIsUp] = useState<boolean>(false);
  const [rightAnswer, setRightAnswer] = useState<boolean>(false);

  const setMessageAndReportSuccess = (key: string) => {
    if (key !== "" && !proceedFromWaitScreen) {
        setMessage("Too Soon");
        setRightAnswer(false);
    }
    else if ((key === "a" && !right) || (key === "l" && right)) {
      setMessage("Success");
      setRightAnswer(true);
      logASuccessHitToDB(location?.state?.id);
    } else if (key !== "" && proceedFromWaitScreen) {
      setMessage("Wrong Answer");
      setRightAnswer(false);
    } else {
        setMessage("Too Late");
        setRightAnswer(false);
    }
    setRight(randomLeftOrRight());
  };

  const proceedToGame = () => {
    setMessage("");
    setProceedFromWaitScreen(true);
  };

  useEffect(() => {
    if (timeIsUp) {
      setMessage("Too Late");
      setRightAnswer(false);
      setProceedFromWaitScreen(false);
      setTimeIsUp(false);
      setRight(randomLeftOrRight());
    }
  }, [timeIsUp]);

  return !proceedFromWaitScreen ? (
    <WaitingStateComponent
      message={message}
      isCorrect={rightAnswer}
      proceedToGameOnTimeout={proceedToGame}
      setMessageAndReportSuccess={setMessageAndReportSuccess}
    />
  ) : (
    <LrComponent
      isRight={right}
      timeIsUp={setTimeIsUp}
      setMessageAndReportSuccess={setMessageAndReportSuccess}
      proceedFromWaitScreen={setProceedFromWaitScreen}
    />
  );
};

export default GameComponent;
