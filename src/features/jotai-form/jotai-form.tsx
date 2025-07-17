"use client";

import { LabeledInput } from "@/components/ui/input";
import { useCanSubmitState, useIsSubmitting, useProfileState, useReadForm, useSubmitAction, writableAdultsCountAtom, writableChildrenCountAtom, writeProfileAtom } from "./atoms";
import Counter from "@/components/counter";
import { useSetAtom } from "jotai";

export default function JotaiForm() {
  const submitAction = useSubmitAction();
  const getFromData = useReadForm();
  // const formState = useFormState();

  return (
    <form
      onSubmit={(e) => {
        submitAction(e);
        console.log(getFromData());
      }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">人数カウンター</h2>
        <Counter label="大人" atom={writableAdultsCountAtom} />
        <Counter label="子ども" atom={writableChildrenCountAtom} />
      </div>

      <ProfileForm />

      <div className="pt-6">
        <SubmitButton />
      </div>
    </form>
  );
}

const ProfileForm = () => {
  const profile = useProfileState();
  const setProfile = useSetAtom(writeProfileAtom);

  return (
    <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4">プロフィール情報</h2>

      <LabeledInput label="名前" value={profile.name} name="name" onChange={setProfile} placeholder="山田太郎" />
      <LabeledInput label="メールアドレス" value={profile.email} name="email" onChange={setProfile} placeholder="example@email.com" />
      <LabeledInput label="電話番号" value={profile.phone} name="phone" onChange={setProfile} placeholder="090-1234-5678" />
    </div>
  );
};

const SubmitButton = () => {
  const canSubmit = useCanSubmitState();
  const isSubmitting = useIsSubmitting();

  return (
    <button
      type="submit"
      disabled={!canSubmit || isSubmitting}
      className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
        !canSubmit ? "bg-gray-400 text-gray-200 cursor-not-allowed" : "bg-green-500 text-white hover:bg-green-600 active:bg-green-700"
      }`}
    >
      {isSubmitting ? "送信中..." : "送信"}
    </button>
  );
};
