"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList, { ItemType } from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";

type NewItemData = {
  name: string;
  quantity: number;
  category: string;
};

function cleanIngredientName(text: string): string {
  // remove everything after comma (sizes), trim
  let cleaned = text.split(",")[0].trim();

  // remove emojis/symbols
  cleaned = cleaned.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|\uFE0F)/g,
    ""
  );

  // final trim + lowercase for API
  return cleaned.trim().toLowerCase();
}

export default function Page() {
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

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold text-slate-900">Shopping List</h1>

        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="lg:w-2/3 space-y-6">
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