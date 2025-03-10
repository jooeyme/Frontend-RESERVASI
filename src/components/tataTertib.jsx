import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

function Icon({ id, open }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    );
  }
 
export function TataTertib() {
  const [open, setOpen] = React.useState(0);
 
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
 
  return (
    <>
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(1)}>TATA TERTIB LAYANAN PEMINJAMAN RUANGAN DAN ALAT MANAJEMEN HUTAN IPB</AccordionHeader>
        <AccordionBody clasName="font-md">
            <ol>
            <li>
            1. Pengguna/peminjam dilarang membawa senjata tajam, berkelahi, mengkonsumsi minuman keras, narkoba, dan obat-obatan lain yang memabukkan.
            </li>
            <li>
            2. Pengguna/peminjam dilarang merusak gedung dan fasilitasnya, corat-coret, merokok, meludah dan membuang sampah sembarangan. 
            </li>
            <li>
            3. Pengguna/peminjam bersedia/wajib menjaga keamanan dan ketertiban agar tidak terjadi kericuhan.
            </li>
            <li>
            4. Pengguna/peminjam wajib menjaga sopan santun dalam berpakaian dan berperilaku.
            </li>
            <li>
            5. Apabila terjadi kehilangan dan atau kerusakan fasilitas ruangan maupun alat, maka pengguna/peminjam bertanggungjawab untuk mengganti barang yang hilang atau rusak sesuai aslinya.
            </li>
            </ol>
        </AccordionBody>
      </Accordion>
    </>
  );
};