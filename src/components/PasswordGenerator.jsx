import React from "react";
import { useState } from "react";
import "./PasswordGenerator.css";
import { UPPERS, LOWERS, NUMBERS, SYMBOLS } from "./constants.js";
import Swal from "sweetalert2";

export const PasswordGenerator = () => {
  const [Password, setPassword] = useState("");
  const [PasswordSecurity, setPasswordSecurity] = useState("Seguridad: Débil");
  const [SecurityIcon, setSecurityIcon] = useState("");
  const [Length, setLength] = useState(5);
  const [Upper, setUpper] = useState(true);
  const [Lower, setLower] = useState(true);
  const [Numbers, setNumbers] = useState(true);
  const [Symbols, setSymbols] = useState(true);

  const generatePassword = () => {  
    let characters = "";
    let generatedPassword = "";
  
    if (Upper) characters += UPPERS;
    if (Lower) characters += LOWERS;
    if (Numbers) characters += NUMBERS;
    if (Symbols) characters += SYMBOLS;
  
    for (let i = 0; i < Length; i++) {
      generatedPassword += characters.charAt(
        Math.floor(Math.random() * characters.length))    
    }
  
    setPassword(generatedPassword);

    if (generatedPassword.length <= 6) {
      setPasswordSecurity("Seguridad: Muy débil");
      setSecurityIcon("/muydebil.svg");
    } else if (generatedPassword.length <= 8) {
      setPasswordSecurity("Seguridad: Débil");
      setSecurityIcon("/debil.svg");
    } else if (generatedPassword.length <= 12) {
      setPasswordSecurity("Seguridad: Medio");
      setSecurityIcon("/medio.svg");
    } else if (generatedPassword.length <= 16) {
      setPasswordSecurity("Seguridad: Fuerte");
      setSecurityIcon("/fuerte.svg");
    } else {
      setPasswordSecurity("Seguridad: Muy fuerte");
      setSecurityIcon("/fuerte.svg");
    }
  };

  
  const handleCopyClick = () => {
    navigator.clipboard.writeText(Password);
    Swal.fire({   
      toast: true,
      width: 350,
      heightAuto: false,
      background: "#6000b9", 
      icon: "success",
      iconColor: "#ae68cd",
      color: "aliceblue",
      position: "top",
      title: "Contraseña copiada al portapapeles.",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <section className="main-container">
      <h2 className="titulo">Password Generator</h2>
      <div className="password-container">
        <input name="password" type="text" value={Password} placeholder="Click en 'Generar' para empezar" readOnly />
        <button
          className="btn-copy"
          onClick={handleCopyClick}>
          <img src="/copy.svg" alt="copy" />
        </button>
      </div>
      <div className="password-security"style={{ opacity: Password.length === 0 ? "0" : "1" }}>{PasswordSecurity}
        &nbsp; <img src={SecurityIcon}/>
      </div>

      <section className="customize">
        <div className="length-option">
          <label>Caracteres
            <div className="slide">
              <p className="length-value">{Length}</p>
              <input
                name="length"
                type="range"
                min={5}
                max={30}
                defaultValue={Length}
                onChange={(e) => setLength(e.currentTarget.value)}
              />
            </div>
          </label>
        </div>
        <div className="checkboxes-area">
          <div className="char-option">
            <label>
            <input
              name="upper"
              type="checkbox"
              disabled={!Lower && !Numbers && !Symbols}
              checked={Upper}
              onChange={() => setUpper(!Upper)}
              />
              Mayúsculas</label>
          </div>
          <div className="char-option">
            <label>
            <input
              name="lower"
              type="checkbox"
              disabled={!Upper && !Numbers && !Symbols}
              checked={Lower}
              onChange={() => setLower(!Lower)}
              />
              Minúsculas</label>
          </div>
          <div className="char-option">
            <label>
            <input
              name="numbers"
              type="checkbox"
              disabled={!Upper && !Lower && !Symbols}
              checked={Numbers}
              onChange={() => setNumbers(!Numbers)}
              />
              Números</label>
          </div>
          <div className="char-option">
            <label>
            <input
              name="symbols"
              type="checkbox"
              disabled={!Upper && !Lower && !Numbers}
              checked={Symbols}
              onChange={() => setSymbols(!Symbols)}
              />
              Símbolos</label>
          </div>
        </div>
      </section>

        <section className="buttons-div">
      <button className="btn-generate" onClick={() => generatePassword()}>
        Generar
      </button>
        </section>
    </section>
  );
};
export default PasswordGenerator;
