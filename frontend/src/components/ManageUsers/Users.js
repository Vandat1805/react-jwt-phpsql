import React, { useEffect, useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import "../../App.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteUser, fetchAllUser } from '../../service/userService';
import ModalDelete from './ModalDelete';
import ModalUser from './ModalUser';
const Users = () => {
  const [listUsers, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(0);
  // ! DATA DELETE
  const [dataModal, setDataModal] = useState({});
  const [actionMdalUser, setAcitonModalUser] = useState("CREATE");
  
  // ! DATA UPDATE
  const [dataModalUpdate, setDataModalUpdate] = useState({});
  // let navigate = useNavigate();
  useEffect(()=>{
    fetchUsers();
  },[currentPage])

  // ! truyền currentPage vào thì nó sẽ update

    const fetchUsers = async (page) => {
        let response = await fetchAllUser(currentPage, currentLimit);
        if (response && response.data && response.data.EC === 0) {
          // setListUsers(response.data.DT);
          setTotalPages(response.data.DT.totalPages);
          setListUsers(response.data.DT.users);
        }
        }
    const handlePageClick = async(event) =>{
      setCurrentPage(+event.selected + 1);
    }
    const handleDeleteUser = async(user) => {
      setDataModal(user);
    }
    const handleUpdateUser = (user) => {
      setAcitonModalUser("UPDATE");
      setDataModalUpdate(user);
    }
    const handleUpdateTable = async() =>{
          await fetchUsers();
    }
  return (
    <>
    <div className='manage-users'>
      <div className="user-header">
        <div className="title-user">
          <h3>Table users</h3>
        </div>
        <div className="action">
          <button className='btn-green'>Refresh</button>
          <button onClick={()=>{setAcitonModalUser("CREATE")}} className='btn-modal add'><ModalUser action={actionMdalUser} handleUpdateTable={handleUpdateTable} buttonText="ADD NEW USER"/></button>
        </div>
      </div>
      <div className="user-body">
         <table>
         <thead>
                <tr>
                    <th>Number</th>
                    <th>Id</th>
                    <th>Email</th>
                    <th>Username</th> 
                    <th>Group</th>
                    <th colSpan={2}>Action</th>
                </tr>
         </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 ? <>
                      {listUsers.map((item, index)=>{
                          return(
                            <tr key={`row-${index}`}>
                              <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                              <td>{item.id}</td>
                              <td>{item.email}</td>
                              <td>{item.username}</td>
                              <td>{item.Group ? item.Group.name : ''}</td>
                              <td><button className='btn-modal edit' onClick={() => handleUpdateUser(item)}><ModalUser dataModalUpdate={dataModalUpdate} handleUpdateTable={handleUpdateTable} 
                              action={actionMdalUser} buttonText="EDIT A USER" /></button></td>
                              <td> 
                              {/* <button className='btn-delete' onClick={() => handleDeleteUser(item)}>Delete</button> */}
                              <button onClick={() => handleDeleteUser(item)}>
                              <ModalDelete dataModal={dataModal} handleUpdateTable={handleUpdateTable}/>
                              </button>
                              </td>
                            </tr>
                          )
                      })}
                    </>
                    :
                    <>
                    <tr><td>Not found users</td></tr>
                    </>
                    }
                </tbody>
            </table>
      </div>
      {totalPages > 0 &&
      <div className="user-footer">
      <ReactPaginate
        className={'paginationItemStyle'}
        nextLabel={<i>Next</i>}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        previousLabel={<i className='btn-prev' ><IoIosArrowBack />Pre</i>}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      </div>
      }
    </div>
    </>
  )
}

export default Users;