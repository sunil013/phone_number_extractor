import React, { useState } from "react";
import "./index.css";
import Snackbar from "@mui/material/Snackbar";
import { CloseIcon } from "@mui/icons-material";
function PhoneNumberExtractor() {
  const [chatData, setChatData] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [copied, setCopied] = useState(false);
  // const [open, setOpen] = React.useState(false);

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setCopied(false);
  };

  function extractPhoneNumbers() {
    const regex = /[\d\+\,]+/g;
    const strippedData = chatData
      .replace(/[^+,\d]/g, "") // Remove all characters except +, , and digits
      .replace(/[a-zA-Z]/g, ""); // Remove all alphabets
    const phoneNumbers = strippedData.match(regex) || [];
    const numbers = strippedData.split(",");
    const finalNumbers = numbers.filter(
      (item, index) => numbers.indexOf(item) === index && item.length >= 10
    );
    setPhoneNumbers(finalNumbers);
  }

  function copyPhoneNumbers() {
    const copyText = phoneNumbers.join("\n");
    navigator.clipboard.writeText(copyText).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  }

  return (
    <div className="main__container">
      <textarea
        value={chatData}
        onChange={(e) => setChatData(e.target.value)}
        className="user__input"
      />
      <button className="extract__btn" onClick={extractPhoneNumbers}>
        Extract Phone Numbers
      </button>
      <div>
        <ol className="numbers__list-container" type="1">
          {phoneNumbers.map((number) => (
            <li className="number__item" key={number}>
              {number}
            </li>
          ))}
        </ol>
        {phoneNumbers.length > 0 && (
          <div>
            <button onClick={copyPhoneNumbers} className="copy__btn">
              Copy Phone Numbers
            </button>
            {/* {copied && <span style={{ color: "green" }}>Copied!</span>} */}
            <Snackbar
              open={copied}
              onClose={handleClose}
              TransitionComponent={"SlideTransition"}
              message="Phone Number Copied"
              ContentProps={{
                sx: {
                  background: "#43a047",
                  fontWeight: 600,
                  color: "#ffffff",
                },
              }}
              // key={state.Transition.name}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default PhoneNumberExtractor;
