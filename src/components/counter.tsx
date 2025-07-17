"use client";
import { useReadForm } from "@/features/jotai-form/atoms";
import { useAtomValue, useSetAtom, WritableAtom } from "jotai";
import { useEffect } from "react";

type CounterAtom = WritableAtom<number, [action: "increment" | "decrement"], void>;

interface CounterProps {
  label: string;
  atom: CounterAtom;
}

export default function Counter({ label, atom }: CounterProps) {
  const decrement = useSetAtom(atom);
  const increment = useSetAtom(atom);

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
      <label className="font-medium text-gray-700 min-w-[100px]">{label}</label>
      <div className="flex items-center gap-2">
        <button onClick={() => decrement("decrement")} type="button" className="w-10 h-10 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors" aria-label="減らす">
          -
        </button>
        <Count atom={atom} />
        <button onClick={() => increment("increment")} type="button" className="w-10 h-10 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors" aria-label="増やす">
          +
        </button>
      </div>
    </div>
  );
}

const Count = ({ atom }: { atom: CounterAtom }) => {
  const count = useAtomValue(atom);
  return <span className="w-16 text-center font-semibold text-lg">{String(count)}</span>;
};
