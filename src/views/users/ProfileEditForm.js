import React, { useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CButton,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CInvalidFeedback,
  CSpinner,
} from "@coreui/react";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { updateUser } from 'src/js/api';

function ProfileEditForm({ user, setUser }) {
  const [loading, setLoading] = useState(false);

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const phoneNumberRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const editSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(3, "Tối thiểu 3 ký tự")
      .max(50, "Tối đa 50 ký tự")
      .required("Không được để trống"),
    email: Yup.string()
      .email("Định dạng email không đúng")
      .min(3, "Tối thiểu 3 ký tự")
      .max(50, "Tối đa 50 ký tự")
      .required("Không được để trống"),
    phoneNumber: Yup.string()
      .matches(phoneNumberRegExp, "Định dạng số điện thoiaj không đúng")
      .min(3, "Tối thiểu 3 ký tự")
      .max(50, "Tối đa 50 ký tự")
      .required("Không được để trống"),
    address: Yup.string()
      .min(3, "Tối thiểu 3 ký tự")
      .max(50, "Tối đa 50 ký tự")
      .required("Không được để trống"),
  });
  const formik = useFormik({
    initialValues: user,
    validationSchema: editSchema,
    onSubmit: (values, { setSubmitting }) => {
      enableLoading();
      updateUser(values).then((result) => {
        setSubmitting(false);
        if (result.status === 200) {
          Swal.fire("Thông báo", "Cập nhật tài khoản thành công", "success");
          setUser(values);
        } else {
          Swal.fire("Thông báo", "Cập nhật tài khoản thất bại", "error");
        }
        disableLoading();
      });
    },
  });

  return (
    <CForm onSubmit={formik.handleSubmit} noValidate>
      <CCard>
        <CCardHeader><h3>Cập nhật tài khoản</h3></CCardHeader>
        <CCardBody>
          <CFormGroup>
            <CLabel htmlFor="app-fullName">Họ và tên</CLabel>
            <CInput
              type="text"
              id="app-fullName"
              name="app-fullName"
              placeholder="Nhập họ và tên.."
              className={getInputClasses("fullName")}
              {...formik.getFieldProps("fullName")}
            />
            <CInvalidFeedback className="help-block">
              {formik.errors.fullName}
            </CInvalidFeedback>
          </CFormGroup>
          <CFormGroup>
            <CLabel htmlFor="app-email">Email</CLabel>
            <CInput
              type="text"
              id="app-email"
              name="app-email"
              placeholder="Nhập email.."
              autoComplete="email"
              className={getInputClasses("email")}
              {...formik.getFieldProps("email")}
            />
            <CInvalidFeedback className="help-block">
              {formik.errors.email}
            </CInvalidFeedback>
          </CFormGroup>
          <CFormGroup>
            <CLabel htmlFor="app-phoneNumber">Số điện thoại</CLabel>
            <CInput
              type="text"
              id="app-phoneNumber"
              name="app-phoneNumber"
              placeholder="Nhập số điện thoại.."
              className={getInputClasses("phoneNumber")}
              {...formik.getFieldProps("phoneNumber")}
            />
            <CInvalidFeedback className="help-block">
              {formik.errors.phoneNumber}
            </CInvalidFeedback>
          </CFormGroup>
          <CFormGroup>
            <CLabel htmlFor="app-address">Địa chỉ</CLabel>
            <CInput
              type="text"
              id="app-address"
              name="app-address"
              placeholder="Nhập địa chỉ.."
              className={getInputClasses("address")}
              {...formik.getFieldProps("address")}
            />
            <CInvalidFeedback className="help-block">
              {formik.errors.address}
            </CInvalidFeedback>
          </CFormGroup>
        </CCardBody>
        <CCardFooter className="d-flex justify-content-end">
        <CButton className="mx-2" color="secondary" type="submit" onClick={formik.handleReset} disabled={loading}>
            <span> Đặt lại</span>
            {loading && <CSpinner color="primary" className="ml-2" />}
          </CButton>
          <CButton color="primary" type="submit" disabled={loading}>
            <span> Cập nhật</span>
            {loading && <CSpinner color="light" className="ml-2" />}
          </CButton>
        </CCardFooter>
      </CCard>
    </CForm>
  );
}

export default ProfileEditForm;
