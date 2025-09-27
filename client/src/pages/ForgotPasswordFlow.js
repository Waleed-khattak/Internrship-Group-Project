import React, { useState } from "react";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";

const ForgotPasswordFlow = () => {
  const [pinSentData, setPinSentData] = useState(null);

  return pinSentData ? (
    <ResetPassword email={pinSentData.email} role={pinSentData.role} />
  ) : (
    <ForgotPassword onPinSent={setPinSentData} />
  );
};

export default ForgotPasswordFlow;
