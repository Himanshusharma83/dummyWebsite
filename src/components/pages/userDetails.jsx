// UserDetailsPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spin, Avatar, Flex, Tag } from "antd";
import { MailOutlined, PhoneOutlined, GlobalOutlined } from "@ant-design/icons";
import Navbar from "../Navbar/Navbar";
import "./userDetails.css";

const UserDetailsPage = () => {
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    fetch(`https://dummyjson.com/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUserDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <Spin size="large" />;
  }

  if (!userDetails || !userDetails.firstName) {
    return <div>User not found</div>;
  }

  return (
    <>
      <Navbar />

      <div>
        <div className="mt-4">
          <div className="flex bg-white rounded-lg mx-auto max-w-sm lg:max-w-7xl">
            <div className="hidden lg:block lg:w-1/2 bg-cover bg-center ">
              <Avatar className="avatar-full-size2" src={userDetails.image} />
            </div>
            <div className="w-full h-[70vh] p-0 lg:w-1/2">
              <p className="text-xl text-gray-600 mb-3">
                {userDetails.firstName} {userDetails.lastName}
              </p>
              <ul>
                <li style={{ marginBottom: "8px" }} className=" text-gray-600 ">
                  <MailOutlined />
                  <span className="email" style={{ marginLeft: "8px" }}>
                    {userDetails.email}
                  </span>
                </li>
                <li style={{ marginBottom: "8px" }} className=" text-gray-600 ">
                  <PhoneOutlined />
                  <span className="number" style={{ marginLeft: "8px" }}>
                    {userDetails.phone}
                  </span>
                </li>
                <li style={{ marginBottom: "8px" }} className=" text-gray-600 ">
                  <GlobalOutlined />
                  <span className="address" style={{ marginLeft: "8px" }}>
                    {userDetails.address.address} {userDetails.address.city}
                  </span>
                </li>
              </ul>
              <Flex gap="4px 0" wrap="wrap">
                <Tag bordered={false} color="volcano">
                  Maiden name: {userDetails.maidenName}
                </Tag>
                <Tag bordered={false} color="volcano">
                  age: {userDetails.age}
                </Tag>
                <Tag bordered={false} color="processing">
                  Gender: {userDetails.gender}
                </Tag>
                <Tag bordered={false} color="success">
                  BirthDate: {userDetails.birthDate}
                </Tag>
                <Tag bordered={false} color="error">
                  Hair color: {userDetails.hair.color}
                </Tag>
                <Tag bordered={false} color="warning">
                  Hair type: {userDetails.hair.type}
                </Tag>
                <Tag bordered={false} color="magenta">
                  Eye color: {userDetails.eyeColor}
                </Tag>
                <Tag bordered={false} color="red">
                  University: {userDetails.university}
                </Tag>
              </Flex>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailsPage;
