import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CLink,
  CInvalidFeedback,
} from "@coreui/react";

import { useFormik } from "formik";
import * as Yup from "yup";
import CIcon from "@coreui/icons-react";
import Swal from "sweetalert2";
import { register } from "src/js/api";
import { getAccounts } from "src/js/blockchain";

const Register = (props) => {
  const { setUser } = props;

  const phoneNumberRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const RegisterSchema = Yup.object().shape({
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

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const initialValues = {
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const accounts = await getAccounts();
      let publicAddress = accounts[0].toString();
      console.log(publicAddress);
      values.publicAddress = publicAddress;
      register(values)
        .then((res) => {
          setUser(res.data);
          Swal.fire({
            icon: "success",
            title: "Regeister success",
            text: `Wellcome ${res.data.fullName}`
          });
          window.location.reload();
        })
        .catch((e) => {
          setSubmitting(false);
          Swal.fire({
            icon: "error",
            title: "Oops...Register failed!",
            text: `Error: ${e.message}`
          });
          console.log("error");
        });
    },
  });
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={formik.handleSubmit}>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Full name"
                      autoComplete="fullName"
                      className={`${getInputClasses("fullName")}`}
                      {...formik.getFieldProps("fullName")}
                    />
                    {formik.touched.fullName && formik.errors.fullName ? (
                      <CInvalidFeedback>
                        {formik.errors.fullName}
                      </CInvalidFeedback>
                    ) : null}
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Email"
                      autoComplete="email"
                      className={`${getInputClasses("email")}`}
                      {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <CInvalidFeedback>{formik.errors.email}</CInvalidFeedback>
                    ) : null}
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Phone number"
                      autoComplete="phoneNumber"
                      className={`${getInputClasses("phoneNumber")}`}
                      {...formik.getFieldProps("phoneNumber")}
                    />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                      <CInvalidFeedback>
                        {formik.errors.phoneNumber}
                      </CInvalidFeedback>
                    ) : null}
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Address"
                      autoComplete="address"
                      className={`${getInputClasses("address")}`}
                      {...formik.getFieldProps("address")}
                    />
                    {formik.touched.address && formik.errors.address ? (
                      <CInvalidFeedback>
                        {formik.errors.address}
                      </CInvalidFeedback>
                    ) : null}
                  </CInputGroup>
                  <CButton
                    color="success"
                    block
                    type="submit"
                    disabled={formik.isSubmitting}
                  >
                    Create Account
                  </CButton>
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4">
                <div className="d-flex justify-content-center">
                  <p className="text-muted">
                    Already have account? <CLink to="/login">Login</CLink>
                  </p>
                </div>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
