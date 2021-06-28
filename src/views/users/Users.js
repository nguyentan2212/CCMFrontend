import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from "@coreui/react";

import Swal from "sweetalert2";
import {
  getUsers,
  promoteUser,
  demoteUser,
  lockUser,
  unlockUser,
} from "src/js/api";
import { getToken } from "src/js/localStorageToken";

const getRole = (role) => {
  switch (role) {
    case "admin":
      return "primary";
    default:
      return "secondary";
  }
};

const Users = () => {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = getToken();

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  const promoteHandler = (item) => {
    let index = users.findIndex((i) => i.id === item.id);
    let tempUsers = [...users];
    let tempuser = tempUsers[index];
    Swal.fire({
      title: "Bạn có chắc muốn cấp quyền admin cho tài khoản này không",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        promoteUser(item.id).then((status) => {
          if (status === 200) {
            tempuser.role = "admin";
            setUsers(tempUsers);
            Swal.fire("Thông báo", "Đã cấp quyền admin thành công", "success");
          } else {
            Swal.fire("Thông báo", "Cấp quyền admin không thành công", "error");
          }
        });
      }
    });
  };

  const demoteHandler = (item) => {
    let index = users.findIndex((i) => i.id === item.id);
    let tempUsers = [...users];
    let tempuser = tempUsers[index];
    Swal.fire({
      title: "Bạn có chắc muốn tước quyền admin của tài khoản này không",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        demoteUser(item.id).then((status) => {
          if (status === 200) {
            tempuser.role = "staff";
            setUsers(tempUsers);
            Swal.fire("Thông báo", "Đã tước quyền admin thành công", "success");
          } else {
            Swal.fire(
              "Thông báo",
              "Tước quyền admin không thành công",
              "error"
            );
          }
        });
      }
    });
  };

  const lockHandler = (item) => {
    let index = users.findIndex((i) => i.id === item.id);
    let tempUsers = [...users];
    let tempuser = tempUsers[index];
    Swal.fire({
      title: "Bạn có chắc muốn khóa tài khoản này không",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        lockUser(item.id).then((status) => {
          if (status === 200) {
            tempuser.isActive = false;
            setUsers(tempUsers);
            Swal.fire("Thông báo", "Đã khóa tài khoản thành công", "success");
          } else {
            Swal.fire("Thông báo", "Khóa tài khoản không thành công", "error");
          }
        });
      }
    });
  };

  const unlockHandler = (item) => {
    let index = users.findIndex((i) => i.id === item.id);
    let tempUsers = [...users];
    let tempuser = tempUsers[index];
    Swal.fire({
      title: "Bạn có chắc muốn mở khóa tài khoản này không",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        unlockUser(item.id).then((status) => {
          if (status === 200) {
            tempuser.isActive = true;
            setUsers(tempUsers);
            Swal.fire(
              "Thông báo",
              "Đã mở khóa tài khoản thành công",
              "success"
            );
          } else {
            Swal.fire(
              "Thông báo",
              "Mở khóa tài khoản không thành công",
              "error"
            );
          }
        });
      }
    });
  };

  return (
    <CRow>
      {loading ? (
        <div className="d-flex justify-content-center w-100 h-100">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <CCol xl={12}>
          <CCard>
            <CCardHeader>
              Users
              <small className="text-muted"> Danh sách người dùng</small>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={users}
                fields={[
                  {
                    key: "fullName",
                    label: "Họ và tên",
                    _classes: "font-weight-bold",
                  },
                  { key: "address", label: "Địa chỉ" },
                  "email",
                  { key: "phoneNumber", label: "Số điện thoại" },
                  { key: "role", label: "Vai trò" },
                  { key: "isActive", label: "Trạng thái" },
                  { key: "action", label: "Actions" },
                ]}
                hover
                striped
                tableFilter
                sorter
                itemsPerPageSelect
                pagination
                itemsPerPage={10}
                scopedSlots={{
                  role: (item) => (
                    <td>
                      <CBadge color={getRole(item.role)}>{item.role}</CBadge>
                    </td>
                  ),
                  isActive: (item) => (
                    <td>
                      <CBadge color={item.isActive ? "success" : "warning"}>
                        {item.isActive ? "Đang hoạt động" : "Đang bị khóa"}
                      </CBadge>
                    </td>
                  ),
                  action: (item) => (
                    <td>
                      <CDropdown variant="btn-group">
                        <CDropdownToggle color="secondary" size="sm">
                          Hành động
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem
                            onClick={() => history.push(`/users/${item.id}`)}
                          >
                            Chi tiết
                          </CDropdownItem>
                          {user.role === "admin" && item.id !== user.id && (
                            <div>
                              {item.isActive ? (
                                <CDropdownItem onClick={() => lockHandler(item)}>Khoá</CDropdownItem>
                              ) : (
                                <CDropdownItem onClick={() => unlockHandler(item)}>Mở khoá</CDropdownItem>
                              )}

                              {item.role === "admin" ? (
                                <CDropdownItem
                                  onClick={() => demoteHandler(item)}
                                >
                                  Demote
                                </CDropdownItem>
                              ) : (
                                <CDropdownItem
                                  onClick={() => promoteHandler(item)}
                                >
                                  Promote
                                </CDropdownItem>
                              )}
                            </div>
                          )}
                        </CDropdownMenu>
                      </CDropdown>
                    </td>
                  ),
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      )}
    </CRow>
  );
};

export default Users;
