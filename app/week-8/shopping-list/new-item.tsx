"use client";

import { useState } from "react";

type NewItemData = {
  name: string;
  quantity: number;
  category: string;
};

export default function NewItem({
  onAddItem,
}: {
  onAddItem: (item: NewItemData) => void;
}) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");

  const [nameTouched, setNameTouched] = useState(false);

  const nameIsInvalid = nameTouched && name.trim().length < 2;
  const formIsInvalid = name.trim().length < 2;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setNameTouched(true);

    if (!name || name.trim().length < 2) {
      return;
    }

    const item: NewItemData = {
      name: name.trim(),
      quantity,
      category,
    };

    onAddItem(item);

    setName("");
    setQuantity(1);
    setCategory("produce");
    setNameTouched(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm max-w-xl"
    >
      <label htmlFor="name" className="block text-sm font-medium text-slate-700">
        Item Name
      </label>
      <input
        id="name"
        type="text"
        value={name}
        required
        onChange={(e) => setName(e.target.value)}
        onBlur={() => setNameTouched(true)}
        onFocus={() => setNameTouched(false)}
        placeholder="e.g., apples"
        className={`mt-1 w-full rounded-md border p-2 outline-none text-black placeholder-gray-400 ${
          nameIsInvalid ? "border-red-500" : "border-slate-300"
        }`}
      />
      {nameIsInvalid && (
        <p className="mt-1 text-sm text-red-500">
          Name must be at least 2 characters.
        </p>
      )}

      <label
        htmlFor="quantity"
        className="mt-4 block text-sm font-medium text-slate-700"
      >
        Quantity
      </label>
      <input
        id="quantity"
        type="number"
        min="1"
        max="99"
        value={quantity}
        required
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="mt-1 w-full rounded-md border border-slate-300 p-2 outline-none text-black"
      />

      <label
        htmlFor="category"
        className="mt-4 block text-sm font-medium text-slate-700"
      >
        Category
      </label>
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="mt-1 w-full rounded-md border border-slate-300 p-2 outline-none text-black"
      >
        <option value="produce">Produce</option>
        <option value="dairy">Dairy</option>
        <option value="bakery">Bakery</option>
        <option value="meat">Meat</option>
        <option value="frozen foods">Frozen Foods</option>
        <option value="canned goods">Canned Goods</option>
        <option value="dry goods">Dry Goods</option>
        <option value="beverages">Beverages</option>
        <option value="snacks">Snacks</option>
        <option value="household">Household</option>
        <option value="other">Other</option>
      </select>

      <button
        type="submit"
        disabled={formIsInvalid}
        className="mt-6 w-full rounded-md bg-slate-900 py-2 font-semibold text-white hover:bg-slate-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Add Item
      </button>
    </form>
  );
}