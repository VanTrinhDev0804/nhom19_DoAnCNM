/* eslint-disable react/jsx-pascal-case */
import React, { createContext, useEffect, useState } from "react";
import ImgCrop from "antd-img-crop";
import { Checkbox, Modal, Upload, Row, Col, Avatar , Button, } from "antd";

import "../assets/styles.css";
import axios from "axios";
import { createGroup } from "../utils/APIRoutes";

export const ModalGroupChat = ({ contacts, isOpen, onCancel ,currentUserCreate}) => {


  const success = () => {
    Modal.success({
      content: 'Tạo Nhóm Thành Công',
    });
  };
  const error = (msg) => {
    Modal.error({
      content: `${msg}`
    });
  };

  

;
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const [listCreate , setListCreate] = useState([]);
  const [nameGroup , setNameGroup]  = useState('')
  const [checkList , setCheckList]  = useState(true)
  const [fileList, setFileList] = useState([]);
  const [imgText , setImgText]  = useState("")

  useEffect(() => {
    if (isOpen) {
      setIsModalOpen(isOpen);
    }
  }, [isOpen]);


  const handleOk = async () => {
   const dataCreate ={
    groupname : nameGroup,
    users : listCreate,
    admingroup : currentUserCreate._id,
    avatarImage : imgText
   }
   
   
   const { data } = await axios.post(`${createGroup}/${currentUserCreate._id}` , { dataCreate })
   if(data.status === true){
      handleCancel()
      success()
   
   }else{
      error(data.msg)
   }

  };

  const handleCancel = () => {
 
    setIsModalOpen(false);
    onCancel(false);
  };


  const onChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList);
    let src = newFileList[0].url;
    
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(newFileList[0].originFileObj);
        reader.onload = () => resolve(reader.result);
      }); 
    }
    const image = new Image();
    image.src = src;
    setImgText(image.src)
  };
  const onPreview = async (file) => {
    let src = file.url;


    
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      }); 
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
   


  };
  const onChangeCheck = (checkedValues) => {
  
    if(checkedValues.length > 1 ){
      setCheckList(false)
      let lst = checkedValues

      lst.push(currentUserCreate._id)

      setListCreate(lst)

     
    }
    else{
      setCheckList(true)
    } 
    
  };

  const handleChange = (event) => {
    setNameGroup(event.target.value);
 
  };


  return (
    <>
     <Modal
      title="Tạo Nhóm"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button 
          key="submit" 
          type="primary"  
          onClick={handleOk}
          disabled ={nameGroup ==="" ? true : checkList}
          >
            Tạo Nhóm
          </Button>
  
     
      ]}
    >
      <div className="GroupChat-Container">
        <div className="GroupChat_Info">
          <div className="GroupChat-Info_Image">
            <ImgCrop rotate>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length < 1 && "+ Upload"}
              </Upload>
            </ImgCrop>
          </div>
          <div className="GroupChat-Info_Name">
            <input
              type="text"
              placeholder="Nhập tên nhóm  "
              name="groupname"
              
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="GroupChat_SelectedUser">
          <p>Chọn bạn bè để tạo nhóm</p>  
          <Checkbox.Group
            style={{
              width: "100%",
            }}
            onChange={onChangeCheck}
          >
            {contacts.map((contact, index) => {
              return (
                <Row key={index}>
                  <Col>
                    <Checkbox value={contact._id}>
                      <div className="checkBox_Info">
                        <Avatar
                          size="small"
                          icon={<img src={`${contact.avatarImage}`} />}
                        />
                        <p>{contact.username}</p>
                      </div>
                    </Checkbox>
                  </Col>
                </Row>
              );
            })}
          </Checkbox.Group>
        </div>
      </div>
         
    </Modal>

   
    </>
   

   
  );
};
