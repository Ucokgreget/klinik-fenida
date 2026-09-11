"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// DESIGN.md: layar tunggu kontras tinggi, angka besar, tanpa kaca.
export default function Antrian() {
  const [detik, setDetik] = useState(10);

  useEffect(() => {
    const id = setInterval(() => setDetik((d) => (d <= 1 ? 10 : d - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mx-auto w-[min(720px,calc(100%-24px))] py-10 text-center">
      <Link
        href="/"
        className="inline-flex min-h-11 items-center text-sm font-semibold hover:underline hover:underline-offset-4"
      >
        ← Beranda
      </Link>
      <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
        Antrian hari ini
      </h1>
      <p className="mt-2 text-sm text-[#0f355c]/70" role="status">
        Refresh otomatis tiap 10 detik ({detik})
      </p>
      <div className="mt-6 rounded-lg bg-[#0f355c] p-8 text-white sm:p-10">
        <p className="text-sm font-semibold tracking-[0.16em] text-white/75 uppercase">
          Sedang dilayani
        </p>
        <p
          className="mt-2 font-heading text-8xl font-bold tracking-tight"
          aria-live="polite"
        >
          –
        </p>
        <p className="mx-auto mt-3 max-w-md text-[15px] text-white/80">
          Data live tampil setelah backend antrian tersambung (US-006).
        </p>
      </div>
      <Link
        href="/daftar"
        className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-[#0f355c] px-7 py-3 text-sm font-semibold text-white hover:bg-[#0f355c]/85"
      >
        Daftar online
      </Link>
    </div>
  );
}
