import React, { useEffect, useRef } from "react";
import { randomTimeForTimeout } from "../helpers/helperFunctions";

export interface IWaitingStateComponentProps {
  message: string;
  isCorrect: boolean;
  proceedToGameOnTimeout: (isDone: boolean) => void;
  setMessageAndReportSuccess: (key: string) => void;
}

const styles = {
  container: {
    fontSize: "28px",
    textAlign: "center",
    width: "100%",
    position: "fixed",
    bottom: "0",
  },
  correct: {
    color: "green",
  },
  wrong: {
    color: "red",
  },
} as const;

const WaitingStateComponent = ({
  message,
  isCorrect,
  proceedToGameOnTimeout,
  setMessageAndReportSuccess,
}: IWaitingStateComponentProps): JSX.Element => {
  const refTimer = useRef<number | null>(null);

  // trigger the timer
  const startTimer = () => {
    if (refTimer.current !== null) return;
    refTimer.current = window.setTimeout(() => {
      proceedToGameOnTimeout(true);
    }, randomTimeForTimeout(2, 5));
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      setMessageAndReportSuccess(e.key);
    };
    startTimer();
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      if (refTimer.current !== null) {
        window.clearTimeout(refTimer.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={styles.container}>
      {isCorrect ? (
        <p style={styles.correct}>{message}</p>
      ) : (
        <p style={styles.wrong}>{message}</p>
      )}
    </div>
  );
};

export default WaitingStateComponent;
