import React, { useEffect, useState } from "react";
import { CreateGroup } from "@/common/Interface/CreateGroup";
import { apiContract } from "@/common/apiContract";
import colors from "@/common/colors";
import { PlusOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Form, Input, Modal, Select, Upload, message } from "antd";
import axios from "axios";

interface Props {
  creatorId: string;
}

const CreateGroupButton = styled.button`
  transition: all 5s;
  padding: 12px 18px;
  background-color: ${colors.orangePeel};
  color: white;
  border: none;
  border-radius: 2rem;
  font-size: 1.2rem;
  cursor: pointer;
`;
const GroupForm = styled(Form)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 2rem;
`;
const GroupNameInput = styled(Input)`
  padding: 10px 16px;
  border-radius: 2rem;
`;
const ButtonContainer = styled.div`
  display: inline-flex;
  gap: 8px;
  width: 100%;
  margin-top: 1.5rem;
`;
const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  color: ${colors.white};
  background-color: ${colors.green};
  cursor: pointer;
`;
const ResetButton = styled.div`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  color: ${colors.white};
  background-color: ${colors.redsolid};
  cursor: pointer;
  text-align: center;
`;
const LeftSide = styled.div`
  width: 200px;
  margin-bottom: 4rem;
`;
const RightSide = styled.div`
  width: 700px;
`;

const GroupMenu = (props: Props) => {
  const { creatorId } = props;
  const [formRef] = Form.useForm();
  const [isGroupMenuVisible, setIsGroupMenuVisible] = useState<boolean>(false);
  const [friendoptions, setFriendOptions] = useState<any>([]);
  const [desc, setDesc] = useState<string>("");

  useEffect(() => {
    getFriendList();
    getGroupList();
  }, []);

  const getFriendList = async () => {
    await axios
      .get(`http://localhost:8080${apiContract.getFriendList}/${creatorId}`)
      .then((res) => {
        setFriendOptions(res.data.data);
      })
      .catch((err) => {
        message.error(err.message);
      });
  };
  const getGroupList = async () => {
    await axios
      .get(`http://localhost:8080${apiContract.getGroupList}/${creatorId}`)
      .then((res) => {
        console.log("res1", res);
      })
      .catch((err) => {
        message.error(err.message);
      });
  };
  const onSubmit = async (values: CreateGroup) => {
    await axios
      .post(
        `http://localhost:8080${apiContract.createNewGroup}/${creatorId}`,
        values
      )
      .then((res) => {
        getGroupList();
        message.success(res.data.message);
        handleModalClose();
      })
      .catch((err) => {
        message.error(err.message);
      });
  };
  const handleModalClose = () => {
    formRef.resetFields();
    setIsGroupMenuVisible(false);
  };
  const descriptionSuffix = (
    <span>
      {desc?.length > 0 ? desc.length : "0"}/ {50}
    </span>
  );
  return (
    <>
      <CreateGroupButton
        onClick={() => setIsGroupMenuVisible(!isGroupMenuVisible)}
      >
        Create a new group
      </CreateGroupButton>
      {isGroupMenuVisible && (
        <>
          <Modal
            title="Create group"
            open={isGroupMenuVisible}
            footer={null}
            closeIcon={null}
          >
            <GroupForm layout="vertical" form={formRef} onFinish={onSubmit}>
              <LeftSide>
                <Form.Item name="groupImg">
                  <Upload
                    name="avatar"
                    listType="picture-circle"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    // beforeUpload={beforeUpload}
                    // onChange={handleChange}
                  >
                    <PlusOutlined /> Upload
                  </Upload>
                </Form.Item>
              </LeftSide>
              <RightSide>
                <Form.Item
                  name="groupName"
                  rules={[
                    {
                      required: true,
                      message: "Please enter group name",
                    },
                  ]}
                >
                  <GroupNameInput placeholder="Group Name" />
                </Form.Item>
                <Form.Item
                  name="description"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <GroupNameInput
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Group Description (optional)"
                    suffix={descriptionSuffix}
                    maxLength={50}
                  />
                </Form.Item>
                <Form.Item
                  name="members"
                  rules={[
                    {
                      required: true,
                      message: "Please select at least 1 friend",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    size="large"
                    allowClear
                    mode="tags"
                    placeholder="Add friends"
                    dropdownStyle={{ borderRadius: "8px" }}
                  >
                    {friendoptions.length > 0 &&
                      friendoptions.map((item: any) => (
                        <Select.Option key={item?.uid}>
                          {item?.name}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
                <ButtonContainer>
                  <SubmitButton type="submit">Create</SubmitButton>
                  <ResetButton onClick={handleModalClose}>Close</ResetButton>
                </ButtonContainer>
              </RightSide>
            </GroupForm>
          </Modal>
        </>
      )}
    </>
  );
};

export default GroupMenu;
