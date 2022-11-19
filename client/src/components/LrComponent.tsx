import React, { useEffect, useRef, useState } from "react";
import storeLogo from "../stormaven-logo.jpeg";

export interface ILrComponentProps {
  isRight: boolean;
  timeIsUp: (done: boolean) => void;
  setMessageAndReportSuccess: (key: string) => void;
  proceedFromWaitScreen: (toProceed: boolean) => void;
}

const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
  },
  right: {
    left: "90%",
    top: "50%",
    position: "absolute",
  },
  left: {
    right: "90%",
    top: "50%",
    position: "absolute",
  },
} as const;

const LrComponent = ({
  isRight,
  timeIsUp,
  setMessageAndReportSuccess,
  proceedFromWaitScreen,
}: ILrComponentProps): JSX.Element => {
  const refTimer = useRef<number | null>(null);
  const [keyClicked, setKeyClicked] = useState<boolean>(false);

  // trigger the timer
  const startTimer = () => {
    if (refTimer.current !== null) return;
    refTimer.current = window.setTimeout(() => {
      timeIsUp(true);
    }, 1000);
  };

  // stop the timer
  const stopTimer = () => {
    if (refTimer.current === null) return;
    window.clearTimeout(refTimer.current);
    refTimer.current = null;
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (refTimer.current !== null) {
        window.clearTimeout(refTimer.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      stopTimer();
      setMessageAndReportSuccess(e.key);
      setKeyClicked(true);
      proceedFromWaitScreen(false);
    };
    if (keyClicked) {
      window.removeEventListener("keydown", handleKeyPress);
      return;
    }

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyClicked]);

  return (
    <div style={styles.container}>
      {isRight ? (
        <div style={styles.right}>
          <img src={storeLogo} width="100" alt="right-side" />
        </div>
      ) : (
        <div style={styles.left}>
          <img src={storeLogo} width="100" alt="left-side" />
        </div>
      )}
    </div>
  );
};

export default LrComponent;
