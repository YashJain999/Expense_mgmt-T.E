import React from "react";

const UploadQuotation = ({ isOffcanvasOpen }) => {
  const AppStyle = {
    position: "relative",
    top: "-100px",
    left: isOffcanvasOpen ? "0px" : "0%",
    width: isOffcanvasOpen ? "calc(100% - 260px)" : "100%",
    transition: "all 0.5s ease",
    zIndex: 999,
  };

  return (
    <h1 className="container p-2 mw-5" style={AppStyle}>
      Hello
    </h1>
  );
};

export default UploadQuotation;
