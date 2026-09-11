"use client";

import Link from "next/link";
import { useState } from "react";

// DESIGN.md: input radius 12px, label di atas, error di bawah, target min 44px.
export default function Daftar() {
  const [kode, setKode] = useState("");
  const [nikError, setNikError] = useState("");

  function submit(e: {
    preventDefault(): void;
    currentTarget: HTMLFormElement;
  }) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nik = String(data.get("nik") ?? "");
    if (!/^[0-9]{16}$/.test(nik)) {
      setNikError("NIK harus 16 digit angka.");
      return;
    }
    setNikError("");
    const tgl = new Date().toISOString().slice(0, 10).replaceAll("-", "");
    setKode(`BK-${tgl}-${Math.floor(1000 + Math.random() * 9000)}`);
  }

  const field =
    "w-full rounded-lg border border-[#0f355c]/20 bg-white px-3.5 py-2.5 text-base text-[#0f355c] outline-none placeholder:text-[#0f355c]/45 focus:border-[#0f355c]";
  const label = "mb-1.5 block text-sm font-semibold";

  return (
    <div className="mx-auto w-[min(720px,calc(100%-24px))] py-10">
      <Link
        href="/"
        className="inline-flex min-h-11 items-center text-sm font-semibold hover:underline hover:underline-offset-4"
      >
        ← Beranda
      </Link>
      <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
        Daftar online
      </h1>
      <p className="mt-2 max-w-[60ch] text-base text-[#0f355c]/75">
        Tanpa login. Untuk kunjungan hari ini (H-0) atau besok (H+1). Tunjukkan
        kode booking ke resepsionis saat datang.
      </p>

      {kode ? (
        <div className="mt-6 rounded-lg border border-[#0f355c]/10 bg-white p-6 text-center">
          <p className="text-xs font-semibold tracking-[0.14em] text-[#46351d] uppercase">
            Bukti pendaftaran
          </p>
          <p
            className="mt-2 font-mono text-4xl font-bold tracking-tight"
            role="status"
          >
            {kode}
          </p>
          <p className="mt-2 text-sm text-[#0f355c]/75">
            Nomor antrian final terbit setelah verifikasi resepsionis di klinik.
          </p>
          <button
            onClick={() => setKode("")}
            className="mt-4 min-h-11 rounded-lg border border-[#0f355c]/20 bg-white px-5 text-sm font-semibold hover:bg-[#F7EFE3]/60"
          >
            Daftar lagi
          </button>
        </div>
      ) : (
        <form
          onSubmit={submit}
          noValidate={false}
          className="mt-6 space-y-4 rounded-lg border border-[#0f355c]/10 bg-white p-5 sm:p-6"
        >
          <div>
            <label htmlFor="nama" className={label}>
              Nama lengkap
            </label>
            <input
              id="nama"
              name="nama"
              required
              autoComplete="name"
              placeholder="Sesuai KTP"
              className={field}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="nik" className={label}>
                NIK (16 digit)
              </label>
              <input
                id="nik"
                name="nik"
                required
                inputMode="numeric"
                pattern="[0-9]{16}"
                title="NIK 16 digit angka"
                placeholder="16 digit angka"
                className={field}
                aria-invalid={nikError ? true : undefined}
                aria-describedby={nikError ? "nik-error" : undefined}
              />
              {nikError && (
                <p
                  id="nik-error"
                  role="alert"
                  className="mt-1.5 text-sm font-medium text-[#DC2626]"
                >
                  {nikError}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="tgl-lahir" className={label}>
                Tanggal lahir
              </label>
              <input
                id="tgl-lahir"
                name="tgl-lahir"
                required
                type="date"
                className={field}
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="telp" className={label}>
                No. telepon/HP
              </label>
              <input
                id="telp"
                name="telp"
                required
                type="tel"
                autoComplete="tel"
                placeholder="08…"
                className={field}
              />
            </div>
            <div>
              <label htmlFor="tgl-kunjungan" className={label}>
                Tanggal kunjungan
              </label>
              <select
                id="tgl-kunjungan"
                name="tgl-kunjungan"
                required
                defaultValue=""
                className={field}
              >
                <option value="" disabled>
                  Pilih tanggal
                </option>
                <option value="H0">Hari ini (H-0)</option>
                <option value="H1">Besok (H+1)</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="alamat" className={label}>
              Alamat
            </label>
            <input
              id="alamat"
              name="alamat"
              required
              autoComplete="street-address"
              placeholder="Jalan, RT/RW, kelurahan"
              className={field}
            />
          </div>
          <div>
            <label htmlFor="keluhan" className={label}>
              Keluhan singkat
            </label>
            <textarea
              id="keluhan"
              name="keluhan"
              required
              rows={3}
              placeholder="Contoh: demam 2 hari, batuk"
              className={field}
            />
          </div>
          <button className="min-h-11 w-full rounded-lg bg-[#0f355c] py-3 text-sm font-semibold text-white hover:bg-[#0f355c]/85">
            Kirim pendaftaran
          </button>
        </form>
      )}
    </div>
  );
}
