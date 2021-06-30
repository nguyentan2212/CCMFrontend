import React, { useEffect, useState } from "react";
import { CCol, CRow } from "@coreui/react";
import { getUser, getCreatedCapitals } from "src/js/api";
import { isAdmin, isCurrentUser } from "src/js/localStorageToken";
import ProfileCard from "./ProfileCard";
import ProfileEditForm from "./ProfileEditForm";
import CapitalsCard from "../custom/CapitalsCard";

const User = ({ match }) => {
  const [user, setUser] = useState(null);
  const [capitals, setCapitals] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingCapitals, setLoadingCapitals] = useState(true);

  useEffect(() => {
    getUser(match.params.id).then((result) => {
      if (result) {
        setUser(result);
        setLoadingUser(false);
      }
    });
    getCreatedCapitals(match.params.id).then((result) => {
      setCapitals(result);
      console.log(result);
      setLoadingCapitals(false);
    });
  }, []);
  return (
    <div>
      {loadingUser | loadingCapitals ? (
        <div className="d-flex justify-content-center w-100 h-100">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column">
          <CRow>
            <CCol xl={6}>
              <ProfileCard user={user} />
            </CCol>
            {(isAdmin() || isCurrentUser(match.params.id))&& (
              <CCol xl={6}>
                <ProfileEditForm user={user} setUser={setUser}></ProfileEditForm>
              </CCol>
            )}
          </CRow>
          <div>
            <CapitalsCard
              capitals={capitals}
              setCapitals={setCapitals}
              title="Vốn đã tạo"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
