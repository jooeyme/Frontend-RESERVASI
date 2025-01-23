import React from "react";

const ToolTermsAndConditions = () => {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Syarat dan Ketentuan</h1>
            <p className="text-gray-600 mb-4">
                Selamat datang di platform kami! Dengan menggunakan layanan kami, Anda setuju untuk
                mematuhi syarat dan ketentuan berikut:
            </p>

            <ol className="list-decimal list-inside text-gray-600 space-y-3">
                <li>
                    Anda bertanggung jawab untuk memberikan informasi yang akurat saat
                    melakukan reservasi.
                </li>
                <li>
                    Semua pemesanan yang dibuat melalui platform ini tunduk pada ketersediaan
                    layanan.
                </li>
                <li>
                    Anda setuju untuk tidak menyalahgunakan layanan kami untuk tujuan ilegal
                    atau merugikan.
                </li>
                <li>
                    Kami berhak untuk membatalkan reservasi jika ditemukan pelanggaran terhadap
                    aturan yang berlaku.
                </li>
                <li>
                    Kebijakan pengembalian dana akan mengikuti aturan yang ditentukan oleh pihak
                    penyelenggara.
                </li>
            </ol>

            <p className="text-gray-600 mt-4">
                Untuk informasi lebih lanjut, silakan hubungi tim laboran kami. Terima
                kasih telah menggunakan layanan kami!
            </p>
        </div>
    );
};

export default ToolTermsAndConditions;
