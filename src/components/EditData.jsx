import axios from 'axios';
import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { EditOutlined } from "@ant-design/icons/lib/icons";

const EditData = ({ details, setIsLoading }) => {
  console.log("edit", details)
  const [change, setChange] = useState(false)


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(details)
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChange = (e) => {
    let { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const updataUser = async (data, id) => {
    const res = await axios.patch(`https://aware-ray-cloak.cyclic.app/users/update/${id}`, data);
    if (res.status === 200) {
      setIsLoading(true)

      alert("user updated successfully")
      console.log(res.data)

    }

  }



  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("ggggg", details._id)
    setChange(true)
    updataUser(data, details._id)
    setIsModalOpen(false)
  }
  useEffect(() => {

  }, [change])

  // const handleOk = () => {
  //   setIsModalOpen(false);
  //   handleSubmit()

  // };
  return (
    <>
      <EditOutlined onClick={showModal} type='primary' />
      <Modal title="Basic Modal" open={isModalOpen} footer={null} onCancel={handleCancel} >
        <form onSubmit={handleSubmit}>
          <span>Name :</span><input type="text" name="name" value={data.name} placeholder='name' onChange={handleChange} />
          <br />
          <br />
          <span>Email :</span><input type="text" name="email" value={data.email} placeholder='email' onChange={handleChange} />
          <br />
          <br />
          <span>Phone :</span><input type="text" name="phone" value={data.phone} placeholder='phone' onChange={handleChange} />
          <br />
          <br />
          <span>Website :</span><input type="text" name="website" value={data.website} placeholder='website' onChange={handleChange} />
          <br />
          <br />
          <button type="submit">Update</button>
        </form>
      </Modal>
    </>
  );
};
export default EditData;