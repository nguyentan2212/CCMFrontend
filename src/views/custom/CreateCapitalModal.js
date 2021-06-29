import React, { useState, useEffect } from "react";
import {
  CRow,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CInvalidFeedback,
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CModalFooter,
  CButton,
  CTextarea,
  CSelect,
} from "@coreui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getToken } from "src/js/localStorageToken";
import { createCapital } from "src/js/api";
import { blockCreateCapital } from "src/js/blockchain";
import Swal from "sweetalert2";

function CreateCapitalModal(props) {
  const { visible, setVisible, update, setUpdate } = props;
  const [loading, setLoading] = useState(false);

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const initialValues = {
    title: "",
    description: "",
    value: "",
    asset: 2,
    type: 2,
    creatorPublicAddress: getToken().publicAddress,
  };

  const createSchema = Yup.object().shape({
    title: Yup.string().required("Không được để trống"),
    value: Yup.number().required("Không được để trống"),
    asset: Yup.number()
      .max(1, "Không được để trống")
      .required("Không được để trống"),
    type: Yup.number()
      .max(1, "Không được để trống")
      .required("Không được để trống"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: createSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(false);
      enableLoading();
      createCapital(values)
        .then((res) => {
          blockCreateCapital(getToken().publicAddress, res.data).then(
            (result) => {
              Swal.fire("Thông báo", "Tạo mới khoản vốn thành công", "success");
              setUpdate(!update);
              disableLoading();
              resetForm(initialValues);
            }
          );
        })
        .catch((e) =>
          Swal.fire("Thông báo", "Tạo mới khoản vốn thất bại", "error")
        );
    },
  });

  useEffect(() => {
    formik.resetForm();
  }, [visible]);

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const assetChangeHandler = (e) => {
    let target = e.target;
    if (target) {
      formik.setFieldValue("asset", target.value);
    }
  };

  const typeChangeHandler = (e) => {
    let target = e.target;
    if (target) {
      formik.setFieldValue("type", target.value);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (visible) {
      formik.submitForm();
    }
    return false;
  };

  return (
    <CModal
      show={visible}
      onClose={() => setVisible(false)}
      closeOnBackdrop={false}
      size="lg"
    >
      <CForm onSubmit={(e) => submitHandler(e)}>
        <CModalHeader closeButton>
          <CModalTitle>Tạo mới khoản vốn</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol lg={12}>
              <CFormGroup>
                <CLabel htmlFor="app-title">Tiêu đề</CLabel>
                <CInput
                  type="text"
                  id="app-title"
                  name="app-title"
                  placeholder="Nhập tiêu đề.."
                  className={getInputClasses("title")}
                  {...formik.getFieldProps("title")}
                />
                <CInvalidFeedback className="help-block">
                  {formik.errors.title}
                </CInvalidFeedback>
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol lg={4}>
              <CFormGroup>
                <CLabel htmlFor="app-value">Giá trị</CLabel>
                <CInput
                  type="text"
                  id="app-value"
                  name="app-value"
                  placeholder="Giá trị.."
                  className={getInputClasses("value")}
                  {...formik.getFieldProps("value")}
                />
                <CInvalidFeedback className="help-block">
                  {formik.errors.value}
                </CInvalidFeedback>
              </CFormGroup>
            </CCol>
            <CCol lg={4}>
              <CFormGroup>
                <CLabel htmlFor="app-asset">Loại tài sản</CLabel>
                <CSelect
                  type="text"
                  id="app-asset"
                  name="app-asset"
                  className={getInputClasses("asset")}
                  onChange={(e) => assetChangeHandler(e)}
                  value={formik.values.asset}
                >
                  <option value="2">Loại tài sản..</option>
                  <option value="1">Tài sản dài hạn</option>
                  <option value="0">Tài sản ngắn hạn</option>
                </CSelect>
                <CInvalidFeedback className="help-block">
                  {formik.errors.asset}
                </CInvalidFeedback>
              </CFormGroup>
            </CCol>
            <CCol lg={4}>
              <CFormGroup>
                <CLabel htmlFor="app-type">Loại vốn</CLabel>
                <CSelect
                  type="text"
                  id="app-type"
                  name="app-type"
                  className={getInputClasses("type")}
                  onChange={(e) => typeChangeHandler(e)}
                  value={formik.values.type}
                >
                  <option value="2">Loại vốn..</option>
                  <option value="1">Vốn lưu động</option>
                  <option value="0">Vốn chủ sở hữu</option>
                </CSelect>
                <CInvalidFeedback className="help-block">
                  {formik.errors.type}
                </CInvalidFeedback>
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol lg={12}>
              <CFormGroup>
                <CLabel htmlFor="app-description">Mô tả</CLabel>
                <CTextarea
                  rows="9"
                  id="app-description"
                  name="app-description"
                  placeholder="Mô tả.."
                  {...formik.getFieldProps("description")}
                ></CTextarea>
              </CFormGroup>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={formik.handleReset}
            disabled={loading}
          >
            Đặt lại
          </CButton>
          <CButton type="submit" color="primary" disabled={loading}>
            Tạo mới
          </CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  );
}

export default CreateCapitalModal;
