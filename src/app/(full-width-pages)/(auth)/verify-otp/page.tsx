import { Metadata } from "next";
import VerifyOtpForm from "../../../../components/auth/VerifyOtpForm";

export const metadata: Metadata = {
  title: "إعادة تعيين كلمة المرور",
  description: "صفحة إعادة تعيين كلمة المرور",
};

const VerifyOtpPage = () => {
    return <VerifyOtpForm />
}
export default VerifyOtpPage