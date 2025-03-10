import React from "react";

const TermsAndConditions = () => {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Syarat dan Ketentuan</h1>
            <p className="text-gray-600 mb-4">
                Selamat datang di Layanan Peminjaman Ruangan Manajemen Hutan! Dengan menggunakan layanan kami, Anda setuju untuk
                mematuhi syarat dan ketentuan berikut:
            </p>

            <ol className="list-decimal list-inside text-gray-600 space-y-3">
                <li>
                    Permohonan peminjaman ruangan harus disertai dengan lampiran berupa surat kegiatan atau bukti resmi terkait.
                </li>
                <li>
                    Peminjam melakukan permohonan peminjaman paling lambat H-3.
                </li>
                <li>
                    Peminjam harus konfirmasi ulang kepada kontak person H-1 jika tidak permohonan akan di batalkan.
                </li>
                <li>
                    Peminjam harus menggunakan ruangan sesuai dengan jadwal yang telah ditentukan (senin-jumat pukul 08:00 WIB s.d. 22:00 WIB).
                </li>
                <li>
                    Peminjam dilarang merokok, membawa minuman keras, narkoba, dan senjata tajam.
                </li>
                <li>
                    Peminjam harus menjaga kebersihan ruangan.
                </li>
                <li>
                    Peminjam bertanggung jawab atas pengembalian seluruh peralatan penunjang atau fasilitas.
                </li>
                <li>
                    Peminjam wajib mengganti biaya kerusakan secara individu atau kelompok.
                </li>
                <li>
                    Peminjam dilarang memindahkan tangan atau meminjamkan fasilitas tanpa izin pengelola.
                </li>
                <li>
                    Pengelola berhak untuk membatalkan atau memindahkan permohonan peminjaman jika terjadi hal diluar kendali.
                </li>
            </ol>

            <p className="text-gray-600 mt-4">
                Untuk informasi lebih lanjut, silakan hubungi tim pengelola ruangan kami. Terima
                kasih telah menggunakan layanan kami!
            </p>
        </div>
    );
};

export default TermsAndConditions;
