import { atom, useAtomValue, useSetAtom } from "jotai";
import { focusAtom } from "jotai-optics";
import { atomWithReset, RESET, useAtomCallback } from "jotai/utils";
import { useCallback } from "react";
import { toast } from "sonner";

export const formAtom = atomWithReset({
  adultsCount: 0,
  childrenCount: 0,
  profile: {
    name: "",
    email: "",
    phone: "",
  },
});

const adultsCountAtom = focusAtom(formAtom, (optic) => optic.prop("adultsCount"));
const childrenCountAtom = focusAtom(formAtom, (optic) => optic.prop("childrenCount"));

export const writableAdultsCountAtom = atom(
  (get) => get(adultsCountAtom),
  (_, set, action: "increment" | "decrement") => {
    set(adultsCountAtom, (prev) => (action === "increment" ? prev + 1 : Math.max(0, prev - 1)));
  }
);

export const writableChildrenCountAtom = atom(
  (get) => get(childrenCountAtom),
  (_, set, action: "increment" | "decrement") => {
    set(childrenCountAtom, (prev) => (action === "increment" ? prev + 1 : Math.max(0, prev - 1)));
  }
);

const profileAtom = focusAtom(formAtom, (optic) => optic.prop("profile"));
export const useProfileState = () => useAtomValue(profileAtom);

export const writeProfileAtom = atom(null, (_, set, e: React.ChangeEvent<HTMLInputElement>) => {
  set(profileAtom, (prev) => ({ ...prev, [e.target.name]: e.target.value }));
});

const canSubmitAtom = atom((get) => (get(adultsCountAtom) > 0 || get(childrenCountAtom) > 0) && get(profileAtom).name !== "" && get(profileAtom).email !== "" && get(profileAtom).phone !== "");
export const useCanSubmitState = () => useAtomValue(canSubmitAtom);

const submittingAtom = atom(false);
export const useIsSubmitting = () => useAtomValue(submittingAtom);

/** Action Atom */
const submitActionAtom = atom(null, (get, set, e: React.FormEvent<HTMLFormElement>) => {
  {
    e.preventDefault();
    const formData = get(formAtom);
    set(submittingAtom, true);

    try {
      setTimeout(() => {
        toast.success("送信が完了しました", {
          description: `大人: ${formData.adultsCount}人、子ども: ${formData.childrenCount}人、名前: ${formData.profile.name}`,
          duration: 5000,
          position: "bottom-center",
        });
        set(formAtom, RESET);
      }, 1000);
    } finally {
      set(submittingAtom, false);
    }
  }
});

export const useSubmitAction = () => useSetAtom(submitActionAtom);

formAtom.debugLabel = "formAtom";
profileAtom.debugLabel = "profileAtom";
adultsCountAtom.debugLabel = "adultsCountAtom";
childrenCountAtom.debugLabel = "childrenCountAtom";
canSubmitAtom.debugLabel = "canSubmitAtom";

export const useReadForm = () => useAtomCallback(useCallback((get) => get(formAtom), []));
export const useFormState = () => useAtomValue(formAtom);
// export const useResetForm = () => useResetAtom(formAtom, { store });
