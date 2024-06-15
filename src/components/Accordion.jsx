import { useState } from 'react';

const AccordionItem = ({ id, heading, children, isOpen, onToggle }) => (
  <div>
    <h2 id={heading}>
      <button
        type="button"
        className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border ${isOpen ? 'border-b-0' : ''} border-gray-200 bg-white rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3`}
        onClick={() => onToggle(id)}
        aria-expanded={isOpen}
        aria-controls={`accordion-body-${id}`}
      >
        <span className="flex items-center">
          <svg className="w-5 h-5 me-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
          </svg>
          <span className="text-red-500 font-semibold">
          {heading}
          </span>
        </span>
        <svg
          data-accordion-icon
          className={`w-3 h-3 ${isOpen ? 'rotate-180' : ''} shrink-0`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5 5 1 1 5"
          />
        </svg>
      </button>
    </h2>
    <div
      id={`accordion-body-${id}`}
      className={`${isOpen ? '' : 'hidden'}`}
      aria-labelledby={`accordion-heading-${id}`}
    >
      <div className="p-5 border border-b-0 bg-white border-gray-200 dark:border-gray-700 dark:bg-gray-900">
        {children}
      </div>
    </div>
  </div>
);

const Accordion = () => {
  const [openItemId, setOpenItemId] = useState(null);

  const toggleAccordionItem = (id) => {
    setOpenItemId(openItemId === id ? null : id);
  };

  return (
    <div className="rounded-t-xl">
      <AccordionItem
        id="1"
        heading="Bagaimana cara melakukan reservasi ruangan dan alat?" //DIubah jadi pertanyaan?
        isOpen={openItemId === '1'}
        onToggle={toggleAccordionItem}
      >
        
        <ol class="list-decimal">
            <li className='mx-4 mb-2 text-left text-gray-500 dark:text-gray-400'>Lakukan registrasi akun dan Login terlebih dahulu.</li>
            <li className='mx-4 mb-2 text-left text-gray-500 dark:text-gray-400'>Pilih jenis reservasi yang dibutuhkan pada menu atau tombol dibawah.</li>
            <li className='mx-4 mb-2 text-left text-gray-500 dark:text-gray-400'>Lihat ketentuan ruangan atau alat yang ingin digunakan sesuai kebutuhan kegiatan. </li>
            <li className='mx-4 mb-2 text-left text-gray-500 dark:text-gray-400'>Lihatlah jadwal yang tersedia pada setiap detail ruangan, sesuaikan dengan waktu kegiatan dan tidak melakukan reservasi dengan jam yang sama pada jadwal tertera.</li>
            <li className='mx-4 mb-2 text-left text-gray-500 dark:text-gray-400'>Setelah menemukan ruangan atau alat yang sesuai maka klik tombol pesan dan lengkapi data formulir reservasi.</li>
            <li className='mx-4 mb-2 text-left text-gray-500 dark:text-gray-400'>Tunggu hingga pengajuan reservasi kamu disetujui</li>
            
        </ol>
        
      </AccordionItem>
      <AccordionItem
        id="2"
        heading="Apa yang harus dilakukan setelah pengajuan reservasi disetujui?"
        isOpen={openItemId === '2'}
        onToggle={toggleAccordionItem}
      >
        <ol class="list-decimal">
            <li className='mx-4 mb-2 text-left text-gray-500 dark:text-gray-400'>Download format surat peminjaman ruangan dan alat berikut ini ipb.link//format-surat-reservasi.</li>
            <li className='mx-4 mb-2 text-left text-gray-500 dark:text-gray-400'>Lengkapi surat tersebut dan ajukan tanda tangan ke Kadep Manhut di Digisign.</li>
            <li className='mx-4 mb-2 text-left text-gray-500 dark:text-gray-400'>Kirimkan Surat peminjaman pada link berikut ipb.link//pengumpulan-surat-reservasi.</li>
            <li className='mx-4 mb-2 text-left text-gray-500 dark:text-gray-400'>Hubungi juru kunci dengan memperlihatkan surat persetujuan dan siapkan KTM (wajib untuk warga IPB) atau KTP.</li>
                        
        </ol>
      </AccordionItem>
      <AccordionItem
        id="3"
        heading="Apa yang harus dilakukan jika pengajuan reservasi ditolak?"
        isOpen={openItemId === '3'}
        onToggle={toggleAccordionItem}
      >
        <ol class="list-decimal">
            <li className='mx-4 mb-2 text-left text-gray-500 dark:text-gray-400'>Cek apakah kegiatan yang akan dilakukan tidak melanggar aturan IPB</li>
            <li className='mx-4 mb-2 text-left text-gray-500 dark:text-gray-400'>Coba lakukan pengajuan ulang dengan memperhatikan detail kegiatan kamu</li>
                         
        </ol>
      </AccordionItem>
      <AccordionItem
        id="4"
        heading="Apa yang harus dilakukan jika sudah selesai menggunakan ruangan atau alat?"
        isOpen={openItemId === '4'}
        onToggle={toggleAccordionItem}
      >
        <ol class="list-decimal">
            <li className='mx-4 mb-2 text-left text-gray-500 dark:text-gray-400'>Hubungi juru kunci untuk memeriksa kelengkapan ruangan atau alat, jika ada kekurangan atau kerusakan maka KTM atau KTP penanggung jawab akan disita sampai mengganti rugi</li>
            <li className='mx-4 mb-2 text-left text-gray-500 dark:text-gray-400'></li>
                         
        </ol>
      </AccordionItem>
    </div>
  );
};

export default Accordion;
