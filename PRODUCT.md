# PRODUCT.md — Klinik Fenida Company Profile

## What it is

Company profile + pintu pendaftaran online untuk Klinik Fenida (pasien umum).

## Target audience

[NEEDS INPUT] — opsi: pasien umum dewasa/orang tua, ibu/keluarga, campuran.

## Primary job-to-be-done

Pasien paham layanan, daftar online H-0/H+1, pantau antrian, hubungi klinik.

## Vibe and emotion

Calm, Clinical, Warm. Trust-first, bukan marketing agresif.

## Scope

Landing di `/` + rute `/daftar`, `/antrian` (sudah ada, stub). Detail scope [NEEDS INPUT].

## Explicit user constraints

- Source: user — tema glassmorphism.
- Source: user — base root path `/`.
- Source: user — referensi PRD di `tasks/`, background gradient di `tasks/`.
- Source: user — pakai 21st dev MCP + ui-layout MCP + skill designer.
- Bahasa Indonesia, format tanggal DD/MM/YYYY, mata uang Rp.

## User-provided facts

- Source: user — Klinik Fenida layani pasien umum (pendaftaran, pemeriksaan, resep, pembayaran).
- Source: user — daftar online H-0/H+1 tanpa login, verifikasi resepsionis 1 klik.
- Source: user — NIK 16 digit unik, No. RM otomatis, nomor antrian harian berurutan reset tiap hari.
- Source: user — gradient Dreamy Pastel Wash #DCEBF7/#B9D4EC/#F3D9E4/#F7EFE3.
- Source: user — logo `public/klinik-fenida-transparent.png`.

## Missing facts

- Alamat, jam praktik, telepon/WA: [NEEDS INPUT].
- Nama/jadwal dokter: [NEEDS INPUT].
- Tarif: [NEEDS INPUT] (jangan tampilkan sampai ada data).

## Working assumptions

- Satu antrian harian umum, satu halaman utama + 2 rute publik.
- Foto asli klinik belum ada, pakai komponen preview jujur sampai ada aset.

## Approval

Plan dipresentasikan dulu. Tunggu "accept" sebelum build ulang.
