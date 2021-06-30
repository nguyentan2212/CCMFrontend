import React from "react";
import { CCard, CCardBody, CCardHeader, CBadge } from "@coreui/react";
import moment from "moment";

function ProfileCard({ user }) {
  const labels = [
    {
      id: "fullName",
      label: "Họ và tên",
    },
    {
      id: "publicAddress",
      label: "Địa chỉ ví",
    },
    {
      id: "email",
      label: "Email",
    },
    {
      id: "phoneNumber",
      label: "Số điện thoại",
    },
    {
      id: "address",
      label: "Địa chỉ",
    },
    {
      id: "role",
      label: "Vai trò",
      formatFunc: (param) => (
        <CBadge color={`${param === "admin" ? "success" : "primary"}`}>{`${
          param === "admin" ? "Admin" : "Nhân viên"
        }`}</CBadge>
      ),
    },
    {
      id: "isActive",
      label: "Trạng thái",
      formatFunc: (param) => (
        <CBadge color={param ? "success" : "warning"}>
          {param ? "Đang hoạt động" : "Đang bị khóa"}
        </CBadge>
      ),
    },
    {
      id: "creationDate",
      label: "Ngày tạo",
      formatFunc: (param) => moment(param).format("DD-MM-YYYY"),
    },
  ];
  return (
    <CCard>
      <CCardHeader>
        <h3>Tài khoản</h3>
      </CCardHeader>
      <CCardBody>
        {
          <table className="table table-striped table-hover">
            <tbody>
              {labels.map((item, index) => (
                <tr key={index}>
                  <td>{item.label}</td>
                  <td>
                    <strong>
                      {item.formatFunc
                        ? item.formatFunc(user[item.id])
                        : user[item.id]}
                    </strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </CCardBody>
    </CCard>
  );
}

export default ProfileCard;
