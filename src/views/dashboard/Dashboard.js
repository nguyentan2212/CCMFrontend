import React, { lazy, useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CBadge,
} from "@coreui/react";
import moment from "moment";
import { getStatistic } from "src/js/api";
import CapitalDoughnut from "./CapitalDoughnut";
import CapitalLineChart from "./CapitalLineChart";

const WidgetsOverview = lazy(() => import("./WidgetsOverview.js"));

const getRole = (role) => {
  switch (role) {
    case "admin":
      return "primary";
    default:
      return "secondary";
  }
};

const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

const Dashboard = () => {
  const [statistic, setStatistic] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    
    getStatistic().then((data) => {
      setStatistic(data);
      console.log(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center w-100 h-100">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          <WidgetsOverview
            totalAccount={statistic.totalUser}
            totalCapital={statistic.totalCapital}
            totalEquity={statistic.totalEquity}
            totalWorking={statistic.totalWorking}
          />
          <CCard>
            <CCardBody>
              <CRow>
                <CCol sm="5">
                  <h4 id="traffic" className="card-title mb-0">
                    Biểu đồ khoản vốn
                  </h4>
                  <div className="small text-muted">{moment().subtract(11,'month').format('MMM-YYYY')} đến {moment().format('MMM-YYYY')}</div>
                </CCol>
              </CRow>
              <CapitalLineChart
                customStyle={{ height: "300px", marginTop: "40px" }}
                chartLabels={statistic.capitalLineChartLabels}
                capitalsData={statistic.capitalLineChartDataSet}
              />
            </CCardBody>
          </CCard>

          <CRow>
            <CCol>
              <CCard>
                <CCardHeader>Cơ cấu vốn {" & "} Top người dùng</CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol xs="12" md="6" xl="6">
                      <h4>Cơ cấu theo loại vốn</h4>
                      <div className="chart-wrapper">
                        <CapitalDoughnut
                          data={[statistic.totalWorking, statistic.totalEquity]}
                          labels={["Lưu động", "Cố định"]}
                        />
                      </div>
                      <hr />
                    </CCol>
                    <CCol xs="12" md="6" xl="6">
                      <h4>Cơ cấu theo nguồn vốn</h4>
                      <div className="chart-wrapper">
                        <CapitalDoughnut
                          data={[
                            statistic.totalShortTermAsset,
                            statistic.totalLongTermAsset,
                          ]}
                          labels={["Ngắn hạn", "Dài hạn"]}
                        />
                      </div>
                      <hr />
                    </CCol>
                  </CRow>

                  <br />

                  <table className="table table-hover  mb-0 d-none d-sm-table table-striped">
                    <thead className="thead-light">
                      <tr>
                        <th>Người dùng</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Vai trò</th>
                        <th>Nguồn vốn</th>
                      </tr>
                    </thead>
                    <tbody>
                      {statistic.topUserList.map((item, index) => (
                        <tr key={index}>
                          <td>{item.fullName}</td>
                          <td>{item.email}</td>
                          <td>{item.phoneNumber}</td>
                          <td>
                            <CBadge color={getRole(item.role)}>
                              {item.role}
                            </CBadge>
                          </td>
                          <td>{formatter.format(item.totalCapital)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </div>
      )}
    </>
  );
};

export default Dashboard;
