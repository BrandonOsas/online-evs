import {
  ApplicationVerifier,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
  User,
  multiFactor,
} from "firebase/auth";
import { auth } from "../../../firebase.config";

export function verifyIfUserIsEnrolled(user: User) {
  const enrolledFactors = multiFactor(user).enrolledFactors;
  return enrolledFactors.length > 0;
}

export async function verifyPhoneNumber(
  user: User,
  phoneNumber: string,
  recaptchaVerifier: ApplicationVerifier
): Promise<false | string> {
  const session = await multiFactor(user).getSession();

  const phoneInfoOptions = { phoneNumber, session };

  const phoneAuthProvider = new PhoneAuthProvider(auth);

  try {
    return await phoneAuthProvider.verifyPhoneNumber(
      phoneInfoOptions,
      recaptchaVerifier
    );
  } catch (e) {
    return false;
  }
}

export async function enrollUser(
  user: User,
  verificationCodeId: string,
  verificationCode: string
) {
  const phoneAuthCredential = PhoneAuthProvider.credential(
    verificationCodeId,
    verificationCode
  );
  const multiFactorAssertion =
    PhoneMultiFactorGenerator.assertion(phoneAuthCredential);

  try {
    await multiFactor(user).enroll(
      multiFactorAssertion,
      "Personla phone number"
    );
    return true;
  } catch (e) {
    return false;
  }
}
