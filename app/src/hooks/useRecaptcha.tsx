import { ApplicationVerifier, RecaptchaVerifier } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase.config";

export function useRecaptcha(componentId: string) {
  const [recaptcha, setRecaptcha] = useState<ApplicationVerifier>();

  useEffect(() => {
    const recaptchaVerifier = new RecaptchaVerifier(auth, componentId, {
      size: "invisible",
      callback: () => { }
    });

    setRecaptcha(recaptchaVerifier);

    return () => {
      recaptchaVerifier.clear();
    }
  }, [componentId])

  return recaptcha;
}
