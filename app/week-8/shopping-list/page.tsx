"use client";

import { useState } from "react";
import Link from "next/link";
import NewItem from "./new-item";
import ItemList, { ItemType } from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";
import { useUserAuth } from "../_utils/auth-context";

type NewItemData = {
  name: string;
  quantity: number;
  category: string;
};

function cleanIngredientName(text: string): string {
  let cleaned = text.split(",")[0].trim();

  cleaned = cleaned.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|\uFE0F)/g,
    ""
  );

  return cleaned.trim().toLowerCase();
}

export default function Page() {
  const { user, firebaseSignOut } = useUserAuth();
  const [items, setItems] = useState<ItemType[]>(itemsData as ItemType[]);
  const [selectedItemName, setSelectedItemName] = useState("");

  function handleAddItem(item: NewItemData) {
    const newItem: ItemType = {
      id: crypto.randomUUID(),
      ...item,
    };

    setItems((prev) => [...prev, newItem]);
  }

  function handleItemSelect(item: ItemType) {
    const cleaned = cleanIngredientName(item.name);
    setSelectedItemName(cleaned);
  }

  async function handleSignOut() {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Sign-out failed:", error);
    }
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-100 p-6">
        <div className="mx-auto max-w-xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="mb-4 text-3xl font-bold text-slate-900">
            Access Denied
          </h1>
          <p className="mb-4 text-slate-700">
            You must be logged in to view the shopping list.
          </p>
          <Link
            href="/week-8"
            className="rounded-md bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-800"
          >
            Go to Login Page
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-bold text-slate-900">Shopping List</h1>

          <button
            onClick={handleSignOut}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-900 hover:bg-slate-50"
          >
            Logout
          </button>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="space-y-6 lg:w-2/3">
            <NewItem onAddItem={handleAddItem} />
            <ItemList items={items} onItemSelect={handleItemSelect} />
          </div>

          <div className="lg:w-1/3">
            <MealIdeas ingredient={selectedItemName} />
          </div>
        </div>
      </div>
    </main>
  );
}