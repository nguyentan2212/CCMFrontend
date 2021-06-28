import React from "react";
import {
  CRow,
  CCol,
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
} from "@coreui/react";
import moment from "moment";

const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

const getAssetString = (asset) => {
  switch (asset) {
    case "ShortTermAsset":
      return "Tài sản ngắn hạn";
    case "LongTermAsset":
      return "Tài sản dài hạn";
    default:
      return "Lỗi hiển thị";
  }
};

const getCapitalTypeString = (type) => {
  switch (type) {
    case "Equity":
      return "Vốn chủ sở hữu";
    case "Working":
      return "Vốn lưu động";
    default:
      return "Lỗi hiển thị";
  }
};

const getStatusString = (status) => {
  switch (status) {
    case "Finished":
      return "Hoàn Thành";
    case "Cancelled":
      return "Đã hủy";
    default:
      return "Lỗi hiển thị";
  }
};
function CapitalModal(props) {
  const { capital, visible, setVisible } = props;

  return (
    <div>
      {capital && (
        <CModal
          show={visible}
          onClose={() => setVisible(false)}
          closeOnBackdrop={false}
        >
          <CModalHeader closeButton>
            <CModalTitle>{capital.title}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol md={4}>
                <div className="d-flex flex-column">
                  <p className="font-weight-bold mb-1">Giá trị</p>
                  <p>{formatter.format(capital.value)}</p>
                </div>
              </CCol>
              <CCol md={4}>
                <div className="d-flex flex-column">
                  <p className="font-weight-bold mb-1">Loại vốn</p>
                  <p>{getCapitalTypeString(capital.type)}</p>
                </div>
              </CCol>
              <CCol md={4}>
                <div className="d-flex flex-column">
                  <p className="font-weight-bold mb-1">Loại tài sản</p>
                  <p>{getAssetString(capital.asset)}</p>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={4}>
                <div className="d-flex flex-column">
                  <p className="font-weight-bold mb-1">Trạng thái</p>
                  <p>{getStatusString(capital.status)}</p>
                </div>
              </CCol>
              <CCol md={4}>
                <div className="d-flex flex-column">
                  <p className="font-weight-bold mb-1">Ngày tạo</p>
                  <p>{moment(capital.creationDate).format("DD-MM-YYYY")}</p>
                </div>
              </CCol>
              <CCol md={4}>
                <div className="d-flex flex-column">
                  <p className="font-weight-bold mb-1">Người tạo</p>
                  <p>{capital.creatorName}</p>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={12}>
                <div className="d-flex flex-column">
                <p className="font-weight-bold mb-1">Nội dung</p>
                <p>{capital.description}</p>
                </div>
              </CCol>
            </CRow>
          </CModalBody>
        </CModal>
      )}
    </div>
  );
}

export default CapitalModal;
