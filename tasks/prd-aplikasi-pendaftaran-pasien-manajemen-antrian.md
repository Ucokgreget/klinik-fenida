# PRD: Aplikasi Pendaftaran Pasien Umum dan Manajemen Antrian Klinik Fenida

## 1. Introduction / Overview

Klinik Fenida adalah fasilitas kesehatan pelayanan pasien umum (pendaftaran, pemeriksaan dokter, resep obat, pembayaran, laporan). Saat ini proses masih manual sehingga data pasien tidak terstruktur, riwayat pasien sulit dicari, antrian tidak efektif, dan laporan lama dibuat.

Kelompok 1 membangun **Aplikasi Pendaftaran Pasien Umum dan Manajemen Antrian Berbasis Website** untuk mendigitalkan alur: data pasien, pendaftaran (walk-in + online), antrian harian, pemeriksaan + resep, pembayaran sederhana, dan laporan operasional.

Mitra: **Klinik Fenida**.
Repo saat ini: monorepo `frontend/` (Next.js 16, React 19, Tailwind 4, shadcn, port 3000) + `backend/` (Bun, Hono, port 8080, Prisma + Postgres). Schema awal sudah ada `User (DOKTER, ADMIN, PEGAWAI)` dan stub `Pembayaran`.

## 2. Goals

- Mendigitalkan data pasien agar terstruktur dan mudah dicari (berdasarkan nama / No. RM / NIK / telepon).
- Menyediakan pendaftaran dua jalur: walk-in oleh resepsionis/pegawai dan online oleh pasien dengan verifikasi saat datang.
- Menyediakan antrian harian tunggal yang tertib dengan status jelas (Menunggu / Dipanggil / Selesai / Batal).
- Memudahkan dokter melihat riwayat kunjungan dan mencatat diagnosa + tindakan + resep dalam satu form pemeriksaan.
- Menyediakan pembayaran kasir sederhana (input biaya manual, status Lunas/Belum, cetak kuitansi).
- Menyediakan laporan operasional harian (kunjungan, pasien baru/lama, pendapatan) dengan export Excel/PDF.
- Menurunkan waktu pembuatan laporan harian dari hitungan jam menjadi < 5 menit.

## 3. User Stories

### US-001: Login dan peran pengguna
**Description:** As a pegawai klinik (Admin/Pegawai/Dokter), I want login dengan email + password sesuai peran so that saya hanya mengakses menu sesuai tugas.

**Acceptance Criteria:**
- [ ] Form login email + password, error jelas jika salah
- [ ] Role yang didukung: `ADMIN`, `PEGAWAI` (resepsionis/kasir), `DOKTER`; pasien online TIDAK perlu login
- [ ] Menggunakan tabel `User` yang sudah ada di `backend/prisma/schema.prisma`
- [ ] Session bertahan saat refresh, tombol logout berfungsi
- [ ] Typecheck/lint passes (`npm run lint` frontend, `tsc --noEmit` bila tersedia)
- [ ] Verify in browser using dev-browser skill

### US-002: Data master pasien (CRUD + pencarian)
**Description:** As a resepsionis (PEGAWAI), I want menambah, melihat, mengubah data pasien so that data terstruktur dan mudah ditemukan saat pendaftaran ulang.

**Acceptance Criteria:**
- [ ] Field pasien: No. RM otomatis (mis. `RM-YYYYMMDD-XXXX`), nama lengkap, NIK (16 digit, unik), tanggal lahir, jenis kelamin, alamat, no. telepon/HP, alergi (opsional)
- [ ] Validasi: nama wajib, NIK 16 digit angka dan unik, telepon wajib
- [ ] Pencarian < 2 detik berdasarkan nama / No. RM / NIK / telepon
- [ ] Pasien lama tidak boleh duplikat: sistem memberi peringatan jika NIK sudah ada dan menawarkan pakai data lama
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

### US-003: Pendaftaran walk-in + nomor antrian otomatis
**Description:** As a resepsionis, I want mendaftarkan pasien lama/baru untuk kunjungan hari ini so that pasien langsung mendapat nomor antrian.

**Acceptance Criteria:**
- [ ] Pilih pasien dari master (US-002) atau buat pasien baru inline dalam satu alur
- [ ] Setiap pendaftaran membuat record Kunjungan tanggal hari ini + nomor antrian harian berurutan (1, 2, 3, ...) reset tiap hari
- [ ] Nomor antrian tidak boleh ganda dalam satu tanggal (constraint unik per tanggal)
- [ ] Cetak/tampilkan kartu antrian: nama, No. RM, nomor antrian, tanggal
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

### US-004: Pendaftaran online oleh pasien (tanpa login)
**Description:** As a pasien, I want mendaftar online untuk kunjungan hari ini/besok so that saya tidak perlu antre lama untuk input data.

**Acceptance Criteria:**
- [ ] Form publik `/daftar`: nama, NIK, tanggal lahir, telepon, alamat, keluhan singkat, tanggal kunjungan (H-0 / H+1)
- [ ] Validasi sama dengan US-002; jika NIK sudah terdaftar, pre-fill data lama
- [ ] Setelah submit tampil bukti pendaftaran: kode booking + estimasi nomor antrian sementara
- [ ] Resepsionis dapat melihat daftar booking dan verifikasi menjadi antrian resmi (1 klik)
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

### US-005: Manajemen antrian harian
**Description:** As a resepsionis, I want melihat, memanggil, menyelesaikan, dan membatalkan antrian hari ini so that alur pasien tertib.

**Acceptance Criteria:**
- [ ] Daftar antrian hari ini urut nomor, tampilkan: nomor, nama, No. RM, status, jam daftar
- [ ] Aksi status: `Menunggu -> Dipanggil -> Selesai`, plus `Batal` dari Menunggu/Dipanggil
- [ ] Tombol "Panggil Berikutnya" memanggil nomor Menunggu terkecil
- [ ] Perubahan status langsung terlihat tanpa refresh manual (refetch / realtime sederhana)
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

### US-006: Tampilan status antrian untuk pasien
**Description:** As a pasien, I want melihat nomor antrian sedang dilayani dan posisi saya so that saya tahu kapan harus masuk.

**Acceptance Criteria:**
- [ ] Halaman publik `/antrian`: nomor sedang dilayani, 5 nomor berikutnya, total menunggu
- [ ] Auto-refresh tiap 10 detik, terbaca jelas dari jarak 2 meter (font besar)
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

### US-007: Pemeriksaan dokter + riwayat pasien
**Description:** As a dokter, I want melihat daftar pasien Dipanggil + riwayat kunjungannya dan mencatat hasil pemeriksaan so that saya tidak perlu mencari berkas kertas.

**Acceptance Criteria:**
- [ ] Daftar kerja dokter = antrian status Dipanggil hari ini
- [ ] Riwayat pasien tampil: 5 kunjungan terakhir (tanggal, diagnosa, tindakan)
- [ ] Form pemeriksaan: keluhan, diagnosa (wajib), tindakan, catatan, otomatis tandai kunjungan Selesai saat disimpan
- [ ] Diagnosa wajib diisi, tidak bisa simpan form kosong
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

### US-008: Resep obat
**Description:** As a dokter, I want menulis resep obat dalam form pemeriksaan yang sama so that pasien bisa menerima obat dan kasir bisa menagih.

**Acceptance Criteria:**
- [ ] Tambah ≥1 item obat per resep: nama obat, dosis (mis. `3x1`), jumlah, aturan pakai
- [ ] Resep tersimpan terhubung ke ID kunjungan dan dapat dicetak
- [ ] Daftar obat memakai master sederhana (tambah manual jika belum ada)
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

### US-009: Pembayaran kasir sederhana + kuitansi
**Description:** As a kasir (PEGAWAI/ADMIN), I want membuat tagihan dari kunjungan yang sudah diperiksa so that pembayaran tercatat dan ada bukti bayar.

**Acceptance Criteria:**
- [ ] Tagihan per kunjungan Selesai: rincian biaya jasa + obat (input manual), total otomatis dihitung
- [ ] Status `Belum Bayar / Lunas`, tanggal bayar otomatis saat dilunasi
- [ ] Cetak kuitansi: nama pasien, rincian, total, tanggal, nama kasir
- [ ] Memperluas model `Pembayaran` stub yang sudah ada (jangan buat tabel ganda)
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

### US-010: Laporan operasional harian + export
**Description:** As a admin, I want melihat laporan kunjungan dan pendapatan hari ini so that saya tidak rekap manual.

**Acceptance Criteria:**
- [ ] Filter tanggal (default hari ini): total kunjungan, pasien baru vs lama, total pendapatan Lunas, daftar kunjungan (no. antrian, pasien, dokter, diagnosa, status bayar)
- [ ] Export Excel (.xlsx) dan PDF, isi sama dengan tampilan layar
- [ ] Laporan < 5 detik untuk data 1 hari (≤ 500 kunjungan)
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

### US-011: Dashboard ringkas
**Description:** As a admin, I want melihat ringkasan hari ini di beranda so that saya cepat tahu kondisi klinik.

**Acceptance Criteria:**
- [ ] Kartu: pasien hari ini, antrian menunggu, sedang dilayani, pendapatan hari ini
- [ ] Data konsisten dengan US-005, US-009, US-010
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

## 4. Functional Requirements

- FR-1: Sistem harus menyimpan data pasien dengan No. RM unik otomatis dan NIK unik 16 digit.
- FR-2: Sistem harus mendukung dua jalur pendaftaran: walk-in oleh PEGAWAI dan online oleh pasien tanpa login (H-0/H+1) dengan verifikasi resepsionis.
- FR-3: Setiap pendaftaran kunjungan pada tanggal berjalan harus menerbitkan nomor antrian harian berurutan dan unik per tanggal.
- FR-4: Sistem harus mengelola status antrian `Menunggu / Dipanggil / Selesai / Batal` dan tombol "Panggil Berikutnya".
- FR-5: Sistem harus menyediakan halaman publik `/antrian` (auto-refresh 10 detik) dan form publik `/daftar`.
- FR-6: Sistem harus menampilkan riwayat 5 kunjungan terakhir saat dokter memeriksa.
- FR-7: Sistem harus mewajibkan diagnosa pada form pemeriksaan dan menandai kunjungan Selesai saat disimpan.
- FR-8: Sistem harus menyimpan resep (nama obat, dosis, jumlah, aturan pakai) terhubung ke kunjungan dan bisa dicetak.
- FR-9: Sistem harus mencatat tagihan manual per kunjungan (rincian jasa + obat, total otomatis) dengan status `Belum Bayar / Lunas` dan cetak kuitansi.
- FR-10: Sistem harus menyediakan laporan harian (kunjungan, baru/lama, pendapatan) dengan filter tanggal dan export Excel + PDF.
- FR-11: Sistem harus menerapkan login berbasis peran `ADMIN / PEGAWAI / DOKTER` memakai tabel `User` yang ada; pasien tidak login.
- FR-12: Sistem harus mencegah duplikat pasien (peringatan NIK ganda) dan duplikat nomor antrian per tanggal.

## 5. Non-Goals (Out of Scope)

- Tidak ada rawat inap, IGD, atau rujukan multi-poli/spesialis (satu alur pasien umum).
- Tidak ada integrasi BPJS / asuransi / payment gateway (kasir manual, Tunai/transfer dicatat manual).
- Tidak ada manajemen stok farmasi / gudang obat (hanya master nama obat sederhana).
- Tidak ada aplikasi mobile native (cukup web responsif).
- Tidak ada antrian per dokter / display monitor multi-ruang di fase ini (satu antrian harian).
- Tidak ada rekam medis elektronik lengkap (ICD-10, SOAP detail, tanda tangan digital) di fase ini.

## 6. Design Considerations

- Web responsif, prioritas desktop resepsionis/dokter/kasir + bisa dibuka di HP pasien untuk daftar online.
- Bahasa Indonesia, format tanggal `DD/MM/YYYY`, mata uang `Rp`.
- Reuse komponen shadcn yang sudah ada di `frontend/src/components/`; halaman di `frontend/src/app/` (App Router): `/daftar`, `/antrian`, `/pasien`, `/kunjungan`, `/pemeriksaan`, `/kasir`, `/laporan`, `/login`.
- Halaman `/antrian` font besar, kontras tinggi untuk monitor ruang tunggu.
- Kartu antrian / kuitansi / resep harus rapi saat dicetak (print CSS).

## 7. Technical Considerations

- Monorepo yang ada: `frontend` Next.js 16 + React 19 + Tailwind 4 (port 3000), `backend` Bun + Hono (port 8080), Prisma + Postgres (`backend/prisma/schema.prisma`).
- Model baru yang dibutuhkan (usulan): `Pasien`, `Kunjungan` (terhubung Pasien + Dokter/User), `Antrian` (bisa gabung ke Kunjungan), `Pemeriksaan`, `ResepItem`, perluas `Pembayaran` yang masih stub. Migrasi via Prisma.
- Nomor antrian harian butuh transaksi atomik (hindari nomor ganda saat 2 resepsionis input bersamaan): unique constraint `(tanggal, nomor)` + retry.
- Auth peran sederhana (session/JWT) untuk `ADMIN / PEGAWAI / DOKTER`; route publik tanpa auth hanya `/daftar` dan `/antrian` (beri rate-limit + validasi).
- Export Excel (mis. `exceljs`) dan PDF (print-to-PDF / `pdfkit`); hindari lib berat di client.
- Performa: pencarian pasien dan laporan harian harus pakai index DB (`nik`, `no_rm`, `tanggal`).

## 8. Success Metrics

- Waktu pendaftaran ulang pasien lama < 2 menit (dari buku manual ~5 menit).
- Pencarian riwayat pasien < 5 detik (dari sulit/menit ke detik).
- 100% kunjungan harian tercatat dengan nomor antrian unik (nol nomor ganda).
- Laporan harian selesai < 5 menit termasuk export (dari hitungan jam).
- Nol duplikat pasien oleh NIK yang sama setelah 1 bulan pemakaian.

## 9. Open Questions

- Apakah pasien online mendapat nomor antrian final langsung atau nomor sementara + verifikasi resepsionis? (PRD ini asumsikan sementara + verifikasi.)
- Apakah satu dokter per hari atau bisa beberapa dokter bergantian dalam satu antrian?
- Apakah tarif jasa pemeriksaan flat atau berbeda per tindakan? (PRD ini asumsikan input manual fleksibel.)
- Apakah butuh batas kuota antrian harian (mis. 50 pasien/hari)?
- Apakah kuitansi perlu nomor seri resmi / materai untuk kebutuhan akuntansi?
