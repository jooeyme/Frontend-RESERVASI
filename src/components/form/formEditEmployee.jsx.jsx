import React, { useEffect, useState } from "react";
import { editIdentitas, findPegawaibyId } from "../../modules/fetch/pegawai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Datepicker, Select, Label, TextInput } from "flowbite-react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeftIcon } from '@heroicons/react/solid'

const gender = {
  Lakilaki : "Laki-laki",
  perempuan : "perempuan"
}

const FormEditEmployee = () => {
  const {id} = useParams()
  const [employee_id, setEmployee_id] = useState();
  const [document_type, setDocument_type] = useState("");
  const [file_path, setFile_path] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    NIP: "",
    KPE: "",
    NIDN: "",
    agama: "",
    gender: "",
    nokarpeg: "",
    lahir: "",
    ttl: "",
    umur: "",
    jabatan: "",
    TMT_jb: "",
    KUM_jb: "",
    satyalancana: "",
    gol_pns: "",
    TMT_pns: "",
    gol_pk: "",
    TMT_pk: "",
    pendidikan: "",
    pensiun: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editIdentitas(id, formData);

      console.log("Employee successfully Edit");
      toast.success("Employee successfully Edit", {
        position: "top-center",
        hideProgressBar: true,
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error Edit Employee:", error.message);
      toast.error("Error Edit Employee", {
        position: "top-center",
        hideProgressBar: true,
        autoClose: 5000,
      });
    }
  };

  useEffect(() => {
    const fetchUpdateEmployee = async () => {
      try {
        const response = await findPegawaibyId(id);
        const employee = response.data;
        console.log("data employee:",employee)

        setFormData({
          name: employee.name,
          NIP: employee.NIP,
          KPE: employee.KPE,
          NIDN: employee.NIDN,
          agama: employee.agama,
          gender: employee.gender,
          nokarpeg: employee.nokarpeg,
          lahir: employee.lahir,
          ttl: employee.ttl,
          umur: employee.umur,
          jabatan: employee.jabatan,
          TMT_jb: employee.TMT_jb,
          KUM_jb: employee.KUM_jb,
          satyalancana: employee.satyalancana,
          gol_pns: employee.gol_pns,
          TMT_pns: employee.TMT_pns,
          gol_pk: employee.gol_pk,
          TMT_pk: employee.TMT_pk,
          pendidikan: employee.pendidikan,
          pensiun: employee.pensiun,
        });
      } catch (error) {
        console.error("Error fetching employee data", error.message);
      }
    };
    fetchUpdateEmployee();
  }, []);

  const formatISODate = (isoDate) => {
    if (!isoDate) return ""; // Handle jika null atau undefined
    return new Date(isoDate).toISOString().split("T")[0];
  };

  const inputStyle = {
    WebkitAppearance: "none", // Untuk Chrome, Safari, dan Edge
    MozAppearance: "textfield", // Untuk Firefox
  };

  return (
    <>
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-6xl lg:py-16">
        <div className="flex justify-start">
                    <Link to={`/pegawai/${id}`}
                    className="flex items-center justify-center">
                <button
                    type="button"
                    className="-my-1.5 flex items-center justify-center text-gray-400 hover:text-gray-500"
                >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="w-8 h-8" aria-hidden="true"/>
                </button>
                </Link>
                <h2 className="flex text-xl font-bold text-gray-900 dark:text-white">Edit Data Pegawai</h2>
                </div>
      
      <form onSubmit={handleSubmit} className="flex max-w-6xl flex-col gap-4">
        <div className="grid gap-16 mb-4 sm:grid-cols-2">
        <div className="">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Identitas
          </h3>
        </div>
        <div >
          <div className="mb-2 block">
            <Label htmlFor="nama" value="Nama Lengkap"  />
          </div>
        <TextInput
            id="nama"
            name="nama"
            type="text"
            placeholder="nama"
            value={formData.name}
            onChange={handleChange}
            required
            
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="NIP" value="NIP" />
          </div>
          <TextInput
            id="NIP"
            name="NIP"
            type="number"
            placeholder="NIP"
            value={formData.NIP}
            onChange={handleChange}
            style={inputStyle}
            required
            shadow
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="KPE" value="KPE" />
          </div>
          <TextInput
            id="KPE"
            name="KPE"
            type="text"
            placeholder="KPE"
            value={formData.KPE}
            onChange={handleChange}
            required
            shadow
          />
        </div>
        
        <div>
          <div className="mb-2 block">
            <Label htmlFor="NIDN" value="NIDN" />
          </div>
          <TextInput
            id="NIDN"
            name="NIDN"
            type="text"
            placeholder="NIDN"
            value={formData.NIDN}
            onChange={handleChange}
            required
            shadow
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="agama" value="Agama" />
          </div>
          <TextInput
            id="agama"
            name="agama"
            type="text"
            placeholder="agama"
            value={formData.agama}
            onChange={handleChange}
            required
            shadow
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="gender" value="Gender" />
          </div>
          <Select 
            id="gender" 
            value={formData.gender} 
            onChange={handleChange}
            required
          >
            {Object.entries(gender).map(([key, value]) => (
            <option key={key} value={value}>
              {value}
            </option>
          ))}
          </Select>
        </div>
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="nokarpeg" value="Nokarpeg" />
          </div>
          <TextInput
            id="nokarpeg"
            name="nokarpeg"
            type="text"
            placeholder="nokarpeg"
            value={formData.nokarpeg}
            onChange={handleChange}
            required
            shadow
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="lahir" value="Tempat Lahir" />
          </div>
          <TextInput
            id="lahir"
            name="lahir"
            type="text"
            placeholder="lahir"
            value={formData.lahir}
            onChange={handleChange}
            required
            shadow
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="ttl" value="Tanggal Lahir" />
          </div>
          <TextInput
            id="ttl"
            name="ttl"
            type="date"
            placeholder="ttl"
            value={formatISODate(formData.ttl)}
            onChange={handleChange}
            required
            shadow
          />
        </div>
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="umur" value="Umur" />
          </div>
          <TextInput
            id="umur"
            name="umur"
            type="number"
            placeholder="umur"
            value={formData.umur}
            onChange={handleChange}
            required
            shadow
          />
        </div>
        
        <div className="pt-4">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  PNS
          </h3>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="gol_pns" value="gol_pns" />
          </div>
          <TextInput
            id="gol_pns"
            name="gol_pns"
            type="text"
            placeholder="gol_pns"
            value={formData.gol_pns}
            onChange={handleChange}
            required
            shadow
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="TMT_pns" value="TMT_pns" />
          </div>
          <TextInput
            id="TMT_pns"
            name="TMT_pns"
            type="date"
            placeholder="TMT_pns"
            value={formatISODate(formData.TMT_pns)}
            onChange={handleChange}
            required
            shadow
          />
        </div>
        </div>
        </div>

        <div className="">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Jabatan
          </h3>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="jabatan" value="Jabatan" />
          </div>
          <TextInput
            id="jabatan"
            name="jabatan"
            type="text"
            placeholder="jabatan"
            value={formData.jabatan}
            onChange={handleChange}
            required
            shadow
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="TMT_jb" value="TMT_jb" />
          </div>
          <TextInput
            id="TMT_jb"
            name="TMT_jb"
            type="date"
            placeholder="TMT_jb"
            value={formatISODate(formData.TMT_jb)}
            onChange={handleChange}
            required
            shadow
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="KUM_jb" value="KUM_jb" />
          </div>
          <TextInput
            id="KUM_jb"
            name="KUM_jb"
            type="text"
            placeholder="KUM_jb"
            value={formData.KUM_jb}
            onChange={handleChange}
            required
            shadow
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="satyalancana" value="Satyalancana" />
          </div>
          <TextInput
            id="satyalancana"
            name="satyalancana"
            type="text"
            placeholder="satyalancana"
            value={formData.satyalancana}
            onChange={handleChange}
            required
            shadow
          />
        </div>

        <div className="pt-4">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Pangkat
          </h3>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="gol_pk" value="gol_pk" />
          </div>
          <TextInput
            id="gol_pk"
            name="gol_pk"
            type="text"
            placeholder="gol_pk"
            value={formData.gol_pk}
            onChange={handleChange}
            required
            shadow
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="TMT_pk" value="TMT_pk" />
          </div>
          <TextInput
            id="TMT_pk"
            name="TMT_pk"
            type="date"
            placeholder="TMT_pk"
            value={formatISODate(formData.TMT_pk)}
            onChange={handleChange}
            required
            shadow
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="pendidikan" value="Pendidikan Terakhir" />
          </div>
          <TextInput
            id="pendidikan"
            name="pendidikan"
            type="text"
            placeholder="pendidikan"
            value={formData.pendidikan}
            onChange={handleChange}
            required
            shadow
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="pensiun" value="Pensiun" />
          </div>
          <TextInput
            id="pensiun"
            name="pensiun"
            type="text"
            placeholder="pensiun"
            value={formData.pensiun}
            onChange={handleChange}
            required
            shadow
          />
        </div>
        </div>
        
        </div>

        </div>
       
        
        <Button type="submit">Simpan</Button>
      </form>
      </div>
      </section>
      <ToastContainer/>
    </>
  );
};

export default FormEditEmployee;
