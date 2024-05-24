import FormRoom from '../components/form/formRoom.jsx'
import Sidebar from '../components/sidebar.jsx';

const FormAddRoom = () => {
  return (
    <>
      <Sidebar/>
      <div className="p-4 sm:ml-64">
      <FormRoom/>
      </div>
    </>
  )
}

export default FormAddRoom;