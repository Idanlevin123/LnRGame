import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";

const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: "10px",
  },
} as const;

const RegisterComponent = (): JSX.Element => {
  let navigate = useNavigate();
  const [name, setName] = useState<string>("");

  const getStarted = () => {
    var config = {
      method: "post",
      url: "http://localhost:4200/api/user",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: { name: name },
    };
    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        navigate('/game', {
          state: {
            id: response.data.id,
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div style={styles.container}>
      <TextField
        required
        id="outlined-required"
        label="Required"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        disabled={name.length === 0}
        style={styles.button}
        onClick={() => getStarted()}
        variant="contained"
      >
        START
      </Button>
    </div>
  );
};

export default RegisterComponent;
