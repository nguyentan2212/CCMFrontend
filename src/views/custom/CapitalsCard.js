import React, { useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CBadge,
  CDataTable,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from "@coreui/react";
import moment from "moment";
import Swal from "sweetalert2";
import CapitalModal from "./CapitalModal";
import { cancelCapital } from "src/js/api";

function CapitalsCard(props) {
  const { capitals, setCapitals, className, title, children } = props;

  const [visible, setVisible] = useState(false);
  const [capital, setCapital] = useState(null);

  var formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const cancelCapitalHandler = (item) => {
    let index = capitals.findIndex((i) => i.id === item.id);
    let tempCapitals = [...capitals];
    let tempCapital = tempCapitals[index];
    Swal.fire({
      title: "Bạn có chắc muốn huỷ không",
      text: "Hành động này sẽ không thể quay trở lại được",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        cancelCapital(tempCapital.id).then((status) => {
          if (status === 200) {
            tempCapital.status = "Cancelled";
            setCapitals(tempCapitals);
            Swal.fire("Thông báo", "Đã huỷ khoản vốn", "success");
          } else {
            Swal.fire("Thông báo", "Huỷ khoản vốn không thành công", "error");
          }
        });
      }
    });
  };

  const moreInfoHandler = (item) => {
    setVisible(true);
    setCapital(item);
  };
  return (
    <div className={className}>
      <CCard>
        <CCardHeader>{children ? children : <h4>{title}</h4>}</CCardHeader>
        <CCardBody>
          <CDataTable
            items={capitals}
            fields={[
              { key: "title", label: "Tiêu đề" },
              { key: "value", label: "Giá trị" },
              { key: "asset", label: "Loại tài sản" },
              { key: "type", label: "Loại vốn" },
              { key: "creationDate", label: "Ngày tạo" },
              { key: "status", label: "Trạng thái" },
              { key: "action", label: "Action" },
            ]}
            hover
            striped
            tableFilter
            sorter
            itemsPerPageSelect
            pagination
            itemsPerPage={5}
            scopedSlots={{
              asset: (item) => (
                <td>
                  {item.asset === "ShortTermAsset"
                    ? "Tài sản ngắn hạn"
                    : "Tài sản dài hạn"}
                </td>
              ),
              type: (item) => (
                <td>
                  {item.type === "Equity" ? "Vốn chủ sở hữu" : "Vốn lưu động"}
                </td>
              ),
              status: (item) => (
                <td>
                  <CBadge
                    color={`${
                      item.status === "Finished" ? "success" : "primary"
                    }`}
                  >
                    {item.status === "Finished" ? "Hoàn thành" : "Hủy bỏ"}
                  </CBadge>
                </td>
              ),
              value: (item) => (
                <td className="d-flex justify-content-end">
                  {formatter.format(item.value)}
                </td>
              ),
              creationDate: (item) => (
                <td>{moment(item.creationDate).format("DD-MM-YYYY")}</td>
              ),
              action: (item) => (
                <td>
                  <CDropdown variant="btn-group">
                    <CDropdownToggle color="secondary" size="sm">
                      Hành động
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem onClick={() => moreInfoHandler(item)}>
                        Chi tiết
                      </CDropdownItem>
                      {item.status === "Finished" && (
                        <CDropdownItem
                          onClick={() => cancelCapitalHandler(item)}
                        >
                          Huỷ
                        </CDropdownItem>
                      )}
                    </CDropdownMenu>
                  </CDropdown>
                </td>
              ),
            }}
          />
        </CCardBody>
      </CCard>
      <CapitalModal
        capital={capital}
        visible={visible}
        setVisible={setVisible}
      />
    </div>
  );
}

export default CapitalsCard;
