import axios from "axios";

const randomTimeForTimeout = (max: number, min: number): number => {
  return (Math.floor(Math.random() * (max - min + 1)) + min) * 1000;
};

const randomLeftOrRight = () => {
  return Math.random() < 0.5;
};

const logASuccessHitToDB = (id: string) => {
  if (id) {
    const config = {
      method: "post",
      url: "http://localhost:4200/api/increment/" + id,
      headers: {},
      data: { id: id },
    };
    axios(config).catch((err) => console.log(err));
  } else {
    console.log("no user provided");
  }
};

export { randomTimeForTimeout, randomLeftOrRight, logASuccessHitToDB };
