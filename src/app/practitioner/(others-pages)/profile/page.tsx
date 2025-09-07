'use client'

// import UserMetaCard from "../../../../components/user-profile/UserMetaCard";
// import UserInfoCard from "../../../../components/user-profile/UserInfoCard";
import React from "react";
// import UserHealthCard from "../../../../components/user-profile/UserHealthCard";
import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import CategoryCard from "../../../../components/cards/CategoryCard";
import { deleteAccount } from "../../../../../services/setting";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter()

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <PageBreadcrumb pageTitle={"الإعدادات"} />
        <div className="space-y-6">
          <CategoryCard />
          {/* <UserMetaCard />
          <UserInfoCard />
          <UserHealthCard /> */}
        </div>
        <button className="btn text-error bg-transparent border-none text-center mt-32 mr-96 shadow-none max-sm:mr-40 font-normal"
        onClick={() => {const modal = document.getElementById('my_modal_1') as HTMLDialogElement | null;
          if (modal) {
            modal.showModal();
          }
        }}>حذف الحساب</button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">هل أنت متأكد من حذف الحساب؟</h3>
            <p className="py-4">سيؤدي حذف حسابك إلى إزالة جميع بياناتك بشكل دائم، ولن تتمكن من استعادتها لاحقًا. هل ترغب في المتابعة؟</p>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-start">
              <button type="submit" className="btn bg-brand-500 shadow-none border-none rounded-lg text-white w-36" onClick={async () => {
                await deleteAccount()
                router.push('/')
              }}>نعم</button>
              <button className="btn bg-transparent shadow-none rounded-lg text-brand-500 border-brand-500 dark:border-white dark:text-white w-36"
              onClick={() => {const dialog = document.getElementById('my_modal_1') as HTMLDialogElement | null; if (dialog) dialog.close();}}>إلغاء</button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}
