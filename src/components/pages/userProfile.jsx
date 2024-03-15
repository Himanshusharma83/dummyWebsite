import React, { useState } from "react";
import { Card, Avatar, notification, Modal, Form, Input, message } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  EditOutlined,
  DeleteOutlined,
  HeartOutlined,
  HeartFilled,
  MoreOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router";
import "./UserProfile.css";

const UserProfile = ({ user, onDelete }) => {
  const [liked, setLiked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const navigate = useNavigate();

  const handleLike = () => {
    setLiked(!liked);
    const message = liked ? "disliked!" : "Liked";
    const color = liked ? "#ff4d4f" : "#fff";
    notification.success({
      message,
      description: `You ${message.toLowerCase()} ${
        editedUser.firstName
      }'s Profile`,
      style: {
        backgroundColor: color,
      },
    });
  };

  const handleEditClick = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/users/${editedUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedUser),
      });
      if (res.ok) {
        notification.success({
          message: "Updated!",
          description: `${editedUser.firstName}'s Profile has been updated successfully`,
        });
        setIsModalVisible(false);
      } else {
        throw new Error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      notification.error({
        message: "Error",
        description: "Failed to update user. Please try again later.",
      });
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/users/${editedUser.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        onDelete(editedUser.id);
        console.log(editedUser.id);
        notification.success({
          message: "Deleted!",
          description: `${editedUser.firstName}'s Profile has been deleted.`,
          style: { backgroundColor: "#ff4d4f" },
        });
      } else {
        throw new Error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      notification.error({
        message: "Error",
        description: "Failed to delete user. Please try again later.",
      });
    }
  };

  function handleUser() {
    navigate(`/user/${editedUser.id}`);
  }

  return (
    <>
      <Card
        bordered={true}
        style={{ width: "100%", marginBottom: 20, cursor: "pointer" }}
        actions={[
          <span onClick={handleLike}>
            {liked ? (
              <HeartFilled style={{ fontSize: "20px", color: "#ff4d4f" }} />
            ) : (
              <HeartOutlined style={{ fontSize: "20px", color: "#ff4d4f" }} />
            )}
          </span>,
          <EditOutlined
            key="edit"
            style={{ fontSize: "20px" }}
            onClick={handleEditClick}
          />,
          <DeleteOutlined
            key="delete"
            style={{ fontSize: "20px" }}
            onClick={handleDelete}
          />,
          <MoreOutlined
            key="more"
            style={{ fontSize: "20px" }}
            onClick={handleUser}
          />,
        ]}
      >
        <div className="custom-image">
          <Avatar
            style={{ marginTop: "-2.5%", borderRadius: 0 }}
            className="avatar-full-size"
            size={140}
            src={
              editedUser.image ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${editedUser.firstName}`
            }
          />
        </div>
        <div className="custom-card">
          <h4 className="name">
            {editedUser.firstName} {editedUser.lastName}
          </h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <Card.Meta
                style={{ marginBottom: "8px" }}
                avatar={<MailOutlined />}
                description={<span className="email">{editedUser.email}</span>}
              />
            </li>
            <li>
              <Card.Meta
                style={{ marginBottom: "8px" }}
                avatar={<PhoneOutlined className="phone" />}
                description={<span className="number">{editedUser.phone}</span>}
              />
            </li>
            <li>
              <Card.Meta
                style={{ marginBottom: "8px" }}
                avatar={<GlobalOutlined />}
                description={<span className="age">Age: {editedUser.age}</span>}
              />
            </li>
          </ul>
        </div>

        <Modal
          title="Edit Profile"
          visible={isModalVisible}
          onCancel={handleCancel}
          onOk={handleSave}
          okText="Save"
          cancelText="Cancel"
          okButtonProps={{
            style: { backgroundColor: "#52c41a", color: "#fff" },
          }}
        >
          <Form initialValues={editedUser}>
            <Form.Item label="First Name" name="firstName">
              <Input
                value={editedUser.firstName} // Display first name
                onChange={(e) =>
                  setEditedUser({ ...editedUser, firstName: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item label="Last Name" name="lastName">
              <Input
                value={editedUser.lastName} // Display last name
                onChange={(e) =>
                  setEditedUser({ ...editedUser, lastName: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input
                value={editedUser.email}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, email: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item label="Phone" name="phone">
              <Input
                value={editedUser.phone}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, phone: e.target.value })
                }
              />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </>
  );
};

export default UserProfile;
