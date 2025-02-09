import { auth } from "@clerk/nextjs/server";
import Link from "next/link"

export default async function Home() {
  const { userId } = await auth();
  let href = userId ? "/journal" : "/new-user"

  return (
    <div className="w-full h-screen bg-black text-white flex justify-center items-center">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-6xl mb-4">امروز مودت چطوره؟</h1>
        <p className="text-2xl text-white/60 mb-4">ثبت لحظات خوب و بدت رو به ما بسپار</p>
        <div>
          <Link href={href}>
            <button className="bg-blue-600 px-2 py-3 rounded-lg text-lg">شروع کن</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
