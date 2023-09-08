import { useRecaptcha } from "@/hooks/useRecaptcha";
import { User } from "firebase/auth";
import { Fragment, useEffect, useState } from "react";
import { verifyPhoneNumber } from "./auth";
import { useAppSelector } from "@/redux/hooks";
import CodeSignup from "./CodeSignup";

interface Props {
  currentUser: User;
}

export default function CreateMultiFactorAuth({
  currentUser,
}: Props) {
  const recaptcha = useRecaptcha("create-recaptcha");
  const { phone: phoneNumber } = useAppSelector((state) => state.account.data);
  const [verificationCodeId, setVerificationCodeId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const handleVerification = async () => {
      if (!currentUser || !recaptcha) {
        return;
      }

      const verificationId = await verifyPhoneNumber(
        currentUser,
        phoneNumber,
        recaptcha
      );

      if (!verificationId) {
        console.log("Something went wrong");
      } else {
        setVerificationCodeId(verificationId);
      }
    };

    handleVerification();
  }, [currentUser, recaptcha, phoneNumber]);

  return (
    <Fragment>
      <div id="create-recaptcha"></div>

      {verificationCodeId && (
        <CodeSignup
          currentUser={currentUser}
          verificationCodeId={verificationCodeId}
        />
      )}
    </Fragment>
  );
}
