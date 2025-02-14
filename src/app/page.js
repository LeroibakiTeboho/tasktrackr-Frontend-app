"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <header className="bg-black text-white p-5 flex justify-between items-center">
        <h1 className="text-4xl font-bold">Dan D. Repairs</h1>
        <Link href="/auth/login">Login</Link>
      </header>
      <main className="flex-grow flex flex-col justify-center overflow-auto px-4">
        <p className="py-8 ">
          Located in Beautiful Downtown Foo City, Dan D. Repairs provides a
          trained staff ready to meet your tech repair needs.
        </p>

        <address>
          Dan D. Repairs
          <br />
          555 Foo Drive
          <br />
          Foo City, CA 12345
          <br />
          <a href="tel:+15555555555">(555) 555-5555</a>
        </address>
        <br />
        <p>Owner: Dan Davidson</p>
      </main>
      <footer className="bg-black text-white p-8">
        {/* <Link href={'/auth/login'} >Employee login</Link> */}
      </footer>
    </div>
  );
}
