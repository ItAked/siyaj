import { Metadata } from "next";
import ResetPasswordForm from "../../../../components/auth/ResetPasswordForm"

export const metadata: Metadata = {
  title: "إعادة تعيين كلمة المرور",
  description: "صفحة إعادة تعيين كلمة المرور",
};

const resetPasswordPage = () => {
    return <ResetPasswordForm />
}
export default resetPasswordPage