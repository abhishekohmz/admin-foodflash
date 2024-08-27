import Sidebar from '../../Components/Sidebar/Sidebar'
import './Admin.css'
import AddCategory from '../../Components/AddCategory/AddCategory'




function Admin() {


    return (
        <div className='admin'>
            <Sidebar />
            <AddCategory/>
        </div>
    )
}

export default Admin