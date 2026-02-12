"use client";

import { useMemo, useState } from "react";
import Item from "./item";
import itemsData from "./items.json";

type Mode = "name" | "category" | "group";

type ItemType = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

export default function ItemList() {
  const [sortBy, setSortBy] = useState<Mode>("name");
  const items = itemsData as ItemType[];

  const sortedItems = useMemo(() => {
    const copy = [...items];

    if (sortBy === "name") {
      copy.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "category") {
      copy.sort((a, b) => a.category.localeCompare(b.category));
    }

    return copy;
  }, [items, sortBy]);

  const grouped = useMemo(() => {
    const groups = items.reduce<Record<string, ItemType[]>>((acc, item) => {
      (acc[item.category] ??= []).push(item);
      return acc;
    }, {});

    const categories = Object.keys(groups).sort((a, b) => a.localeCompare(b));

    for (const cat of categories) {
      groups[cat].sort((a, b) => a.name.localeCompare(b.name));
    }

    return { categories, groups };
  }, [items]);

  const btnBase = "rounded-md px-3 py-2 text-sm font-semibold border";
  const btnActive = "bg-slate-900 text-white border-slate-900";
  const btnIdle = "bg-white text-slate-900 border-slate-300 hover:bg-slate-50";

  return (
    <section>
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setSortBy("name")}
          className={`${btnBase} ${sortBy === "name" ? btnActive : btnIdle}`}
        >
          Sort by Name
        </button>

        <button
          type="button"
          onClick={() => setSortBy("category")}
          className={`${btnBase} ${sortBy === "category" ? btnActive : btnIdle}`}
        >
          Sort by Category
        </button>

        <button
          type="button"
          onClick={() => setSortBy("group")}
          className={`${btnBase} ${sortBy === "group" ? btnActive : btnIdle}`}
        >
          Group by Category
        </button>
      </div>

      {sortBy !== "group" ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedItems.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
            />
          ))}
        </ul>
      ) : (
        <div className="space-y-8">
          {grouped.categories.map((cat) => (
            <div key={cat}>
              <h2 className="mb-3 text-2xl font-bold text-slate-900 capitalize">
                {cat}
              </h2>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {grouped.groups[cat].map((item) => (
                  <Item
                    key={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    category={item.category}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
