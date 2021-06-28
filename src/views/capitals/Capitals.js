import React, { useState, useEffect } from "react";
import { CRow, CButton } from "@coreui/react";
import { getCapitals } from "src/js/api";
import CapitalsCard from "src/views/custom/CapitalsCard";
import CreateCapitalModal from "../custom/CreateCapitalModal";

function Capitals() {
  const [capitals, setCapitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    getCapitals().then((data) => {
      setCapitals(data);
      setLoading(false);
    });
  }, [update]);

  return (
    <CRow>
      {loading ? (
        <div className="d-flex justify-content-center w-100 h-100">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="w-100">
          <CapitalsCard
            capitals={capitals}
            setCapitals={setCapitals}
            className="w-100"
          >
            <div className="d-flex justify-content-lg-between">
              <h4>Danh sách nguồn vốn</h4>
              <CButton
                color="primary"
                size="md"
                onClick={() => setVisible(true)}
              >
                Thêm mới
              </CButton>
            </div>
          </CapitalsCard>
        </div>
      )}
      <CreateCapitalModal
        visible={visible}
        setVisible={setVisible}
        update={update}
        setUpdate={setUpdate}
      />
    </CRow>
  );
}

export default Capitals;
