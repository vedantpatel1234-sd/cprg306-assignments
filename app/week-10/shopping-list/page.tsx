"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import { useUserAuth } from "../_utils/auth-context";
import { getItems, addItem } from "../_services/shopping-list-service";

type ItemType = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

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

export default function ShoppingListPage() {
  const { user, firebaseSignOut } = useUserAuth();
  const [items, setItems] = useState<ItemType[]>([]);
  const [selectedItemName, setSelectedItemName] = useState("");

  async function loadItems() {
    if (!user) return;

    try {
      const itemsData = await getItems(user.uid);
      setItems(itemsData);
    } catch (error) {
      console.error("Failed to load items:", error);
    }
  }

  useEffect(() => {
    if (user) {
      loadItems();
    }
  }, [user]);

  async function handleAddItem(item: NewItemData) {
    if (!user) return;

    try {
      const id = await addItem(user.uid, item);

      if (id) {
        setItems((prevItems) => [...prevItems, { id, ...item }]);
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
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
            href="/week-10"
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