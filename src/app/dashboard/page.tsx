"use client";
import JotaiForm from "@/features/jotai-form/jotai-form";
import { createStore, Provider } from "jotai";
import "jotai-devtools/styles.css";
import { DevTools } from "jotai-devtools";

const store = createStore();

export default function Page() {
  return (
    <main className="min-h-screen bg-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Jotai Playground</h1>
        <Provider store={store}>
          <DevTools position="top-right" />
          <JotaiForm />
        </Provider>
      </div>
    </main>
  );
}
