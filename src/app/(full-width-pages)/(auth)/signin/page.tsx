import SignInForm from "../../../../components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تسجيل الدخول",
  description: "صفحة تسجيل الدخول للآدمن",
};

export default function SignIn() {
  return <SignInForm />;
}
