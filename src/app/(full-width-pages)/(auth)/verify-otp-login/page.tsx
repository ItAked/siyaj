import { Metadata } from "next";
import VerifyOtpLogin from "../../../../components/auth/VerifyOtpLoginForm";

export const metadata: Metadata = {
  title: "إعادة تعيين كلمة المرور",
  description: "صفحة إعادة تعيين كلمة المرور",
};

const VerifyOtpLoginPage = () => {
    return <VerifyOtpLogin />
}
export default VerifyOtpLoginPage