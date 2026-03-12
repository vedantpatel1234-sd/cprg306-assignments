"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function Week8Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  async function handleSignIn() {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("GitHub sign-in failed:", error);
    }
  }

  async function handleSignOut() {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Sign-out failed:", error);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-3xl font-bold text-slate-900">Week 8</h1>

        {!user ? (
          <>
            <p className="mb-4 text-slate-700">
              Please sign in with GitHub to access the shopping list.
            </p>
            <button
              onClick={handleSignIn}
              className="rounded-md bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-800"
            >
              Sign in with GitHub
            </button>
          </>
        ) : (
          <>
            <p className="mb-4 text-slate-700">
              Welcome, {user.displayName} ({user.email})
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/week-8/shopping-list"
                className="rounded-md bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-800"
              >
                Go to Shopping List
              </Link>

              <button
                onClick={handleSignOut}
                className="rounded-md border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-900 hover:bg-slate-50"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}