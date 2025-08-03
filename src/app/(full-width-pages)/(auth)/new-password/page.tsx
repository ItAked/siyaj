import { Metadata } from "next";
import NewPasswordForm from "../../../../components/auth/NewPasswordForm";

export const metadata: Metadata = {
  title: "كلمة المرور الجديدة",
  description: "صفحة كلمة المرور الجديدة",
};

const NewPasswordPage = () => {
    return <NewPasswordForm />
}
export default NewPasswordPage