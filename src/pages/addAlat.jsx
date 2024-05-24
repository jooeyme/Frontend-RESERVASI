import FormAlat from "../components/form/formAlat";
import Sidebar from "../components/sidebar";

const FormAddAlat = () => {
    return (
        <>
            <Sidebar/>
            <div className="p-4 sm:ml-64">
                <FormAlat />
            </div>
        </>
    )
};

export default FormAddAlat;