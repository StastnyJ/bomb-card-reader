import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { writeNfc } from "../Utils/nfc";
import { Button, Container, TextField } from "@mui/material";

export default function InitCard() {
  const [scanning, setScanning] = useState(false);
  const [name, setName] = useState("");

  const nav = useNavigate();

  const write = () => {
    setScanning(true);
    writeNfc(
      name,
      () => {
        alert("success"); // TODO layout success
        setScanning(false);
        setName("");
      },
      () => alert("error") // TODO layout error
    );
  };

  return (
    <Container maxWidth="sm">
      {scanning ? (
        <>
          <div style={{ height: "100vh", flexDirection: "column", display: "flex", justifyContent: "center", alignItems: "center" }}></div>
        </>
      ) : (
        <>
          <div style={{ height: "100vh", flexDirection: "column", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <TextField label="Holder name" fullWidth variant="standard" value={name} onChange={(e) => setName(e.target.value)} />
            <br />
            <Button variant="contained" disabled={name.length === 0} onClick={write}>
              Init card
            </Button>
          </div>
          <Button
            style={{ position: "absolute", bottom: 16 }}
            onClick={() => (window.history.state && window.history.state.idx > 0 ? nav(-1) : nav("/", { replace: true }))}
          >
            Back
          </Button>
        </>
      )}
    </Container>
  );
}
