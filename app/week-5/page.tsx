import ItemList from "./item-list";

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold text-slate-900">Shopping List</h1>
        <ItemList />
      </div>
    </main>
  );
}
