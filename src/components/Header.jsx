import Link from "next/link";
export default function Header() {
  return (
    <header>
      <div className="flex justify-end">
        <div className="flex p-4">
          <Link href="/app">
            <button className="p-2 rounded-md hover:bg-white/10 px-3 ring-1 ring-gray-300 text-gray-300">
              Launch App
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
