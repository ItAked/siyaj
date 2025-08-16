'use client'

import UserMetaCard from "../../../../components/user-profile/UserMetaCard";
import UserInfoCard from "../../../../components/user-profile/UserInfoCard";
import React, { useEffect, useState } from "react";
import { readSetting } from "../../../../../services/setting";
import UserHealthCard from "../../../../components/user-profile/UserHealthCard";

type MetaSetting = {
  email?: string;
  name?: string;
  medical? :string;
  phone?:  string;
}

export default function Profile() {
  const [metaSetting, setMetaSetting] = useState<MetaSetting>({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  async function getProfileData(){
    try {
      setLoading(true)
      const response = await readSetting()
      setMetaSetting(response.data)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProfileData()
  }, [])

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          الحساب الشخصي
        </h3>
        <div className="space-y-6">
          <UserMetaCard loading={loading} error={error} email={metaSetting.email} medical={metaSetting.medical} name={metaSetting.name} />
          <UserInfoCard loading={loading} error={error} email={metaSetting.email} phone={metaSetting.phone} name={metaSetting.name} />
        </div>
      </div>
    </div>
  );
}
