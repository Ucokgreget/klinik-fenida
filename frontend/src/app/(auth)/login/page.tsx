import Link from "next/link";

// ponytail: stub perbaiki file kosong bawaan. Ceiling: form login peran ADMIN/PEGAWAI/DOKTER (US-001).
export default function Login() {
  return (
    <div className="mx-auto w-[min(480px,calc(100%-24px))] py-10 text-center">
      <Link
        href="/"
        className="text-sm font-semibold hover:underline underline-offset-4"
      >
        ← Beranda
      </Link>
      <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight">
        Masuk
      </h1>
      <p className="mt-2 text-[15px] text-[#0f355c]/75">
        Form login peran Admin, Pegawai, Dokter menyusul di US-001.
      </p>
    </div>
  );
}
