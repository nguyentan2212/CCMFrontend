import React from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";
import Swal from "sweetalert2";
import { getNonce, login } from "src/js/api";
import { sign, getAccounts } from "src/js/blockchain";

const Login = (props) => {
  const { setUser } = props;
  const clickHandler = async () => {
    const accounts = await getAccounts();
    let address = accounts[0].toString();
    try {
      let { nonce } = await getNonce(address);
      let message = "I am signing my one-time nonce: " + nonce.toString();
      sign(address, message).then(({ publicAddress, signature }) => {
        login(publicAddress, signature).then((res) => {
          setUser(res.data);
          console.log(res.data);
        });
      });
    } catch (e) {
      Swal.fire("Thông báo", "User không tồn tại", "error");
    }
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CCardBody className="text-center">
                    <div>
                      <h2>Login</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                      </p>
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                        onClick={clickHandler}
                      >
                        Login Now!
                      </CButton>
                    </div>
                  </CCardBody>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <Link to="/register">
                      <CButton
                        color="light"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
