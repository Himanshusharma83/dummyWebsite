import React, { useState, useEffect } from "react";
import {
  Spin,
  Row,
  Col,
  Input,
  Button,
  Modal,
  Form,
  Typography,
  notification,
} from "antd";
import UserProfile from "./userProfile";
import UserDetailsPage from "./userDetails";

const { Text } = Typography;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    phone: "",
    age: "",
  });

  useEffect(() => {
    fetchUsers();
  }, [limit, skip]);

  const fetchUsers = () => {
    setLoading(true);
    fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`)
      .then((response) => response.json())
      .then((data) => {
        setUsers([...users, ...data.users]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const handleLoadMore = () => {
    setSkip(skip + 5);
  };

  const handleDelete = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        const newUser = { ...values, id: data.id };
        setUsers([...users, newUser]);
        setIsModalVisible(false);
        notification.success({
          message: "Success",
          description: "User added successfully.",
        });
        // Clear the form fields after successful submission
        setFormData({
          firstName: "",
          lastName: "",
          age: "",
          email: "",
          phone: "",
          address: "",
        });
      })
      .catch((error) => {
        console.error("Error adding new user:", error);
        notification.error({
          message: "Error",
          description: "Failed to add user.",
        });
      });
  };

  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <Row gutter={[16, 16]} align="middle" justify="space-between">
        <Col xs={24} sm={12} md={12} lg={6}>
          <Button onClick={showModal} style={{ marginBottom: 20 }}>
            Add New User
          </Button>
        </Col>
        <Col xs={24} sm={12} md={12} lg={16}>
          <Input
            placeholder="Search by Name"
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginBottom: 20 }}
          />
        </Col>
      </Row>

      <Modal
        title="Add New User"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="addUserForm"
          onFinish={onFinish}
          initialValues={formData}
          onValuesChange={(changedValues, allValues) => setFormData(allValues)}
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: "Please input your age!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number" },
              { type: "text", message: "Please enter a your phone number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[
              { required: true, message: "Please input your Age!" },
              { type: "text", message: "Please enter a your Age!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button
              style={{ backgroundColor: "#52c41a", color: "#fff" }}
              htmlType="submit"
            >
              Save
            </Button>
            <Button onClick={handleCancel} style={{ marginLeft: 8 }}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "calc(100vh - 40px)",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {filteredUsers.map((user) => (
            <Col key={user.id} xs={24} sm={12} md={8} lg={6}>
              <UserProfile user={user} onDelete={handleDelete} />
            </Col>
          ))}
        </Row>
      )}
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <Button onClick={handleLoadMore}>Load More</Button>
      </div>
    </div>
  );
};

export default UserList;
