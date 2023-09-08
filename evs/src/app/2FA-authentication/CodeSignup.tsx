import { User } from "firebase/auth";
import Code from "./Code";
import { enrollUser } from "./auth";
import { useRouter } from "next/navigation";

interface CodeSignupProps {
  currentUser: User;
  verificationCodeId: string;
}

export default function CodeSignup({
  currentUser,
  verificationCodeId,
}: CodeSignupProps) {
  const router = useRouter();

  const getCode = async (code: string) => {
    const response = await enrollUser(currentUser, verificationCodeId, code);

    if (response) {
      await router.push("/portal");
    } else {
      console.log("something went wrong!");
    }
  };

  return <Code getCode={getCode} />;
}
