/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import ImgCrop from "antd-img-crop";
import { Checkbox, Modal, Upload, Row, Col, Avatar, Button, Alert } from "antd";

import "../assets/styles.css";
import axios from "axios";
import { deleteGroupChats, exitGroupChats, updateGroupChats } from "../utils/APIRoutes";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const ModalInfoGroup = ({
  contacts,
  isOpen,
  onCancel,
  currentUserCreate,
  currentInfo,
  dflistCheck,
}) => {
  const success = (msg) => {
    Modal.success({
      content: `${msg}`,
    });
  };
  const error = (msg) => {
    Modal.error({
      content: `${msg}`,
    });
  };
  const showConfirm = () => {
    Modal.confirm({
      title: "Bạn chắc chắn muốn xóa nhóm?",
      icon: <ExclamationCircleOutlined />,

      async onOk() {
        const response = await axios.post(
          `${deleteGroupChats}/${currentInfo._id}`
        );
        if (response.data.status) {
          handleCancel();
          success("Đã xóa nhóm !!");
        } else {
          error("Đã có lỗi xảy ra");
        }
      },
      onCancel() {},
    });
  };
  const showConfirmExitNhom = () => {
    Modal.confirm({
      title: "Bạn chắc chắn muốn rời nhóm?",
      icon: <ExclamationCircleOutlined />,

      async onOk() {
      
        const lstupdate = currentInfo.users.filter((info) =>{
          return info !== currentUserCreate._id
        })
      
        const response = await axios.post(
          `${exitGroupChats}/${currentInfo._id}`, {
            lstupdate :lstupdate
          }
        );
      
        if (response.data.status) {
          handleCancel();
          success("Bạn đã rời nhóm !!");
        } else {
          error("Đã có lỗi xảy ra");
        }
      },
      onCancel() {},
    });
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [listCreate, setListCreate] = useState([]);
  const [nameGroup, setNameGroup] = useState("");
  const [checkList, setCheckList] = useState(true);
  const [fileList, setFileList] = useState([]);
  const [imgText, setImgText] = useState("");

  useEffect(() => {
    if (isOpen) {
      setIsModalOpen(isOpen);
      setNameGroup(currentInfo.groupname);
      setFileList([
        {
          uid: "",
          name: "",
          status: "done",
          url: currentInfo?.avatarImage,
        },
      ]);
    }
  }, [isOpen]);

  const checkMember = (contact) => {
    const b =
      dflistCheck !== undefined
        ? dflistCheck.find((id) => {
            return contact._id === id;
          })
        : currentInfo.users.find((id) => {
            return contact._id === id;
          });

    return b ? true : false;
  };

  const checkAdminGroup = () => {
    return currentInfo?.admingroup === currentUserCreate?._id;
  };
  const findAdminGroup = (contact) => {
    return currentInfo?.admingroup === contact._id;
  };
  const handleOk = async () => {
    const dataUpdate = {
      groupname: nameGroup,
      users: listCreate,
      admingroup: currentUserCreate._id,
      avatarImage: imgText === "" ? fileList[0].url : imgText,
    };

    const { data } = await axios.post(
      `${updateGroupChats}/${currentInfo._id}`,
      { dataUpdate }
    );
    if (data.status === true) {
      handleCancel();
      success("Cập Nhật Thành Công");
    } else {
      error(data.msg);
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
    setImgText(image.src);
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
    if (checkedValues.length > 1) {
      setCheckList(false);
      let lst = checkedValues;

      lst.push(currentUserCreate._id);

      setListCreate(lst);
    } else {
      setCheckList(true);
    }
  };

  const handleChange = (event) => {
    setNameGroup(event.target.value);
  };
  const handleDeleteGroup = () => {
    showConfirm();
  };
  const handlelRoiNhom = () => {
    showConfirmExitNhom()
  };

  return (
    <>
      <Modal
        title="Thông Tin Nhóm"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          checkAdminGroup()
            ? [
                <Button key="back" onClick={handleCancel}>
                  Cancel
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  onClick={handleOk}
                  disabled={nameGroup === "" ? true : checkList}
                >
                  Cập nhật
                </Button>,
                <Button key="submit" type="danger" onClick={handleDeleteGroup}>
                  Xóa Nhóm
                </Button>,
              ]
            : [
                <Button key="back" onClick={handleCancel}>
                  Cancel
                </Button>,
                <Button key="submit" type="danger" onClick={handlelRoiNhom}>
                  Rời Nhóm
                </Button>,
              ]
        }
        destroyOnClose={true}
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
                  disabled={checkAdminGroup() ? false : true}
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
                defaultValue={nameGroup}
                onChange={(e) => handleChange(e)}
                disabled={checkAdminGroup() ? false : true}
              />
            </div>
          </div>
          <div className="GroupChat_SelectedUser">
            <Checkbox.Group
              style={{
                width: "100%",
              }}
              onChange={onChangeCheck}
              defaultValue={isModalOpen ? dflistCheck : []}
            >
              <p>Thành Viên Nhóm : </p>
              {contacts &&
                contacts.map((member, index) => {
                  return (
                    <Row key={index}>
                      <Col>
                        {checkMember(member) ? (
                          <Checkbox
                            value={member._id}
                            disabled={checkAdminGroup() ? false : true}
                          >
                            <div className="checkBox_Info">
                              <Avatar
                                size="small"
                                icon={<img src={`${member.avatarImage}`} />}
                              />
                              <p>
                                {findAdminGroup(member)
                                  ? `${member.username} ( Admin ) `
                                  : member.username}
                              </p>
                            </div>
                          </Checkbox>
                        ) : (
                          ""
                        )}
                      </Col>
                    </Row>
                  );
                })}
              <br />

              {checkAdminGroup() ? (
                <>
                  <p>Thêm Bạn Bè Vào Nhóm : </p>
                  {contacts &&
                    contacts.map((member, index) => {
                      return (
                        <Row key={index}>
                          <Col>
                            {checkMember(member) ? (
                              ""
                            ) : (
                              <Checkbox value={member._id}>
                                <div className="checkBox_Info">
                                  <Avatar
                                    size="small"
                                    icon={<img src={`${member.avatarImage}`} />}
                                  />
                                  <p>{member.username}</p>
                                </div>
                              </Checkbox>
                            )}
                          </Col>
                        </Row>
                      );
                    })}{" "}
                </>
              ) : (
                ""
              )}
            </Checkbox.Group>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalInfoGroup;
