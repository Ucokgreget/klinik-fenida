"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

// Topbar + footer adaptasi sijaka: fixed, ciut saat scroll, hamburger mobile.
// ponytail: tanpa ThemeToggle (satu tema terang).

const menuItems = [
  { name: "Layanan", href: "#layanan" },
  { name: "Cara daftar", href: "#cara" },
  { name: "Kunjungan", href: "#kunjungan" },
];

function SiteHeader() {
  const [menuState, setMenuState] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className="group fixed z-20 w-full px-2"
        aria-label="Navigasi utama"
      >
        <div
          className={cn(
            "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
            isScrolled &&
              "max-w-4xl rounded-lg border border-[#0f355c]/10 bg-white/60 backdrop-blur-xl lg:px-5",
          )}
        >
          <div className="relative flex h-16 items-center justify-between gap-6">
            <div className="flex w-full items-center justify-between lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center gap-2"
              >
                <Image
                  src="/klinik-fenida-transparent.png"
                  alt="Klinik Fenida"
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-lg bg-white/70 object-contain p-1"
                  priority
                />
                <span className="font-heading text-lg font-bold tracking-tight">
                  Klinik Fenida
                </span>
              </Link>

              <button
                type="button"
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Tutup menu" : "Buka menu"}
                className="relative z-20 -m-2.5 block cursor-pointer p-2.5 lg:hidden"
              >
                <IconMenu2 className="m-auto size-6 duration-200 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0" />
                <IconX className="absolute inset-0 m-auto size-6 scale-0 opacity-0 duration-200 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100" />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block py-2 font-medium text-[#0f355c]/70 duration-150 hover:text-[#0f355c]"
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-lg border border-[#0f355c]/10 bg-white p-6 shadow-2xl group-data-[state=active]:block md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-3 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none lg:group-data-[state=active]:flex">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMenuState(false)}
                        className="block py-2 font-medium text-[#0f355c]/70 duration-150 hover:text-[#0f355c]"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:items-center sm:gap-3 sm:space-y-0 md:w-fit">
                <Link
                  href="/login"
                  onClick={() => setMenuState(false)}
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#0f355c]/25 bg-white px-5 text-sm font-semibold hover:bg-white/80"
                >
                  <span>Masuk petugas</span>
                </Link>
                <Link
                  href="/daftar"
                  onClick={() => setMenuState(false)}
                  className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#0f355c] px-5 text-sm font-semibold text-white hover:bg-[#0f355c]/85"
                >
                  <span>Daftar online</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-[#0f355c]/10 py-10">
      <div className="mx-auto flex w-[min(1120px,calc(100%-24px))] flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-2">
          <Image
            src="/klinik-fenida-transparent.png"
            alt="Klinik Fenida"
            width={28}
            height={28}
            className="h-7 w-7 rounded-lg bg-white/70 object-contain p-0.5"
          />
          <span className="font-heading font-semibold">Klinik Fenida</span>
        </div>
        <p className="text-center text-sm text-[#0f355c]/70">
          Klinik Fenida, layanan pasien umum.
        </p>
        <nav aria-label="Navigasi footer">
          <ul className="flex flex-wrap justify-center gap-6 text-sm text-[#0f355c]/70">
            <li>
              <Link href="#layanan" className="py-2 hover:text-[#0f355c]">
                Layanan
              </Link>
            </li>
            <li>
              <Link href="#cara" className="py-2 hover:text-[#0f355c]">
                Cara daftar
              </Link>
            </li>
            <li>
              <Link href="#kunjungan" className="py-2 hover:text-[#0f355c]">
                Kunjungan
              </Link>
            </li>
            <li>
              <Link href="/daftar" className="py-2 hover:text-[#0f355c]">
                Daftar
              </Link>
            </li>
            <li>
              <Link href="/antrian" className="py-2 hover:text-[#0f355c]">
                Antrian
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen font-sans text-[#0f355c]">
      <SiteHeader />

      <main className="mx-auto w-[min(1120px,calc(100%-24px))]">
        <section className="grid items-center gap-8 pt-28 md:pt-36 lg:grid-cols-2">
          <div>
            <h1 className="font-heading text-[40px] leading-[1.05] font-bold tracking-tight sm:text-5xl lg:text-[56px]">
              Daftar dari HP, verifikasi sekali di klinik.
            </h1>
            <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-[#0f355c]/80">
              Untuk kunjungan hari ini atau besok. Pasien lama tidak isi data
              dari nol, nomor antrian terbit tertib.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/daftar"
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#0f355c] px-7 py-3 text-[15px] font-semibold text-white hover:bg-[#0f355c]/85"
              >
                Daftar online
              </Link>
              <Link
                href="/antrian"
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#0f355c]/25 bg-white px-7 py-3 text-[15px] font-semibold hover:bg-white/80"
              >
                Lihat antrian
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-[#0f355c]/10 bg-white p-5 sm:p-6">
            <h2 className="font-heading text-lg font-bold">Alur kunjungan</h2>
            <ol className="mt-3 divide-y divide-[#0f355c]/10">
              {[
                ["Daftar", "Online dari HP atau walk-in ke resepsionis."],
                [
                  "Antrian",
                  "Nomor harian berurutan. Status Menunggu ke Dipanggil.",
                ],
                [
                  "Periksa + resep",
                  "Dokter catat diagnosa dan obat satu form.",
                ],
                ["Bayar", "Kasir hitung jasa + obat, kuitansi dicetak."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-3 py-3">
                  <span
                    className="font-heading text-sm font-bold text-[#0f355c]/50"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-sm font-bold">{t}</span>
                    <span className="block text-sm text-[#0f355c]/75">{d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          aria-label="Ketentuan pendaftaran"
          className="mt-8 rounded-lg border border-[#0f355c]/10 bg-white px-5 py-4"
        >
          <ul className="grid gap-3 text-sm sm:grid-cols-3">
            <li>
              <strong className="font-semibold">H-0 atau H+1.</strong> Pilih
              kunjungan hari ini atau besok.
            </li>
            <li>
              <strong className="font-semibold">NIK 16 digit.</strong> Data lama
              terisi otomatis, duplikat ditolak.
            </li>
            <li>
              <strong className="font-semibold">Verifikasi 1 klik.</strong>{" "}
              Resepsionis terbitkan nomor antrian resmi.
            </li>
          </ul>
        </section>

        <section
          id="layanan"
          aria-labelledby="layanan-h"
          className="pt-14 md:pt-20"
        >
          <h2
            id="layanan-h"
            className="max-w-xl font-heading text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Satu alur dari daftar sampai bayar.
          </h2>
          <div className="mt-7 grid gap-4 lg:grid-cols-5">
            <article className="rounded-lg border border-[#0f355c]/10 bg-white p-6 lg:col-span-3">
              <h3 className="font-heading text-xl font-bold">
                Pendaftaran dan antrian
              </h3>
              <p className="mt-2 max-w-[55ch] text-[15px] leading-relaxed text-[#0f355c]/75">
                Walk-in lewat resepsionis atau online dari HP tanpa login.
                Setiap kunjungan dapat nomor antrian harian berurutan yang reset
                tiap hari. Status bergerak Menunggu ke Dipanggil ke Selesai,
                atau Batal bila pasien tidak datang.
              </p>
              <Link
                href="/daftar"
                className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-[#0f355c] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#0f355c]/85"
              >
                Daftar online
              </Link>
            </article>
            <article className="rounded-lg bg-[#0f355c] p-6 text-white lg:col-span-2">
              <h3 className="font-heading text-xl font-bold">
                Periksa dan resep
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/80">
                Dokter buka daftar Dipanggil, lihat 5 kunjungan terakhir, catat
                keluhan, diagnosa, tindakan, dan resep obat dalam satu form.
              </p>
            </article>
            <article className="rounded-lg border border-[#0f355c]/10 bg-[#F7EFE3] p-6 lg:col-span-2">
              <h3 className="font-heading text-xl font-bold">
                Bayar dan kuitansi
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#0f355c]/75">
                Kasir input biaya jasa dan obat, total dihitung otomatis. Status
                Belum Bayar atau Lunas, kuitansi siap cetak.
              </p>
            </article>
            <article className="rounded-lg border border-[#0f355c]/10 bg-white p-6 lg:col-span-3">
              <h3 className="font-heading text-xl font-bold">
                Data pasien rapi
              </h3>
              <p className="mt-2 max-w-[60ch] text-[15px] leading-relaxed text-[#0f355c]/75">
                No. RM terbit otomatis, NIK unik 16 digit. Cari berdasar nama,
                No. RM, NIK, atau telepon. Sistem beri peringatan bila NIK sudah
                terdaftar dan tawarkan pakai data lama.
              </p>
            </article>
          </div>
        </section>

        <section
          id="cara"
          aria-labelledby="cara-h"
          className="mx-auto max-w-2xl pt-14 md:pt-20"
        >
          <h2
            id="cara-h"
            className="font-heading text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Tiga langkah, tanpa login.
          </h2>
          <ol className="mt-6 divide-y divide-[#0f355c]/10 rounded-lg border border-[#0f355c]/10 bg-white px-5">
            {[
              [
                "Isi form /daftar",
                "Nama, NIK 16 digit, tanggal lahir, telepon, alamat, keluhan, tanggal kunjungan H-0 atau H+1.",
              ],
              [
                "Simpan kode booking",
                "Bukti tampil setelah submit. Jika NIK sudah terdaftar, data lama terisi otomatis.",
              ],
              [
                "Verifikasi di klinik",
                "Tunjukkan kode booking ke resepsionis. Satu klik menjadi nomor antrian resmi hari itu.",
              ],
            ].map(([judul, isi], i) => (
              <li key={judul} className="flex gap-4 py-4">
                <span
                  className="font-heading text-sm font-bold text-[#0f355c]/50"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block font-heading text-[17px] font-bold">
                    {judul}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-[#0f355c]/75">
                    {isi}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section
          id="kunjungan"
          aria-labelledby="kunjungan-h"
          className="pt-14 md:pt-20"
        >
          <div className="rounded-lg bg-[#0f355c] px-6 py-8 text-white sm:px-10">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h2
                  id="kunjungan-h"
                  className="font-heading text-3xl font-bold tracking-tight"
                >
                  Bawa tiga hal ini saat datang.
                </h2>
                <p className="mt-3 max-w-[48ch] text-[15px] leading-relaxed text-white/80">
                  Tiga hal ini mempercepat verifikasi di meja resepsionis.
                  Pasien lama cukup sebut nama atau tunjukkan kartu berobat.
                </p>
              </div>
              <ul className="space-y-3">
                {[
                  "KTP atau NIK 16 digit untuk verifikasi data",
                  "Kartu berobat lama bila pernah berobat di sini",
                  "Kode booking bila daftar online, atau keluhan singkat bila walk-in",
                ].map((item) => (
                  <li
                    key={item}
                    className="rounded-lg bg-white/10 p-4 text-[15px]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section aria-labelledby="cta-h" className="pt-14 pb-4 md:pt-20">
          <div className="rounded-lg border border-[#0f355c]/10 bg-white px-6 py-10 text-center sm:px-12">
            <h2
              id="cta-h"
              className="font-heading text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Butuh berobat hari ini atau besok?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-[15px] text-[#0f355c]/75">
              Isi form, simpan kode booking, tunjukkan ke resepsionis.
            </p>
            <Link
              href="/daftar"
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#0f355c] px-8 py-3 text-sm font-semibold text-white hover:bg-[#0f355c]/85"
            >
              Daftar online
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
