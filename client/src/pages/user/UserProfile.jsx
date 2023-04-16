import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Table, Form, Button } from "react-bootstrap";
import tokenApi from "../../service/userAuthApi.js";

const UserProfiles = () => {
  const activityLevelOptions = [
    { value: 1.2, label: "久坐不動" },
    { value: 1.375, label: "輕度運動" },
    { value: 1.55, label: "中度運動" },
    { value: 1.725, label: "高度運動" },
    { value: 1.9, label: "激烈運動" }
  ];
  const [bodyData, setBodyData] = useState({
    weight: "",
    height: "",
    activityLevel: ""
  });

  const dataHandler = (e) => {
    const { name, value } = e.target;
    setBodyData({ ...bodyData, [name]: parseFloat(value) });
  };
  const submitBodyData = (bodyData) => {
    tokenApi
      .get(`/api/user/check`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="fs-1 text-warning">TDEE 計算機</div>
      <div>
        <Form>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="text-white col-3 ">體重</th>
                <th className="text-white col-3">身高</th>
                <th className="text-white col-3">運動頻率</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Form.Control
                    type="number"
                    step="0.1"
                    min={0}
                    value={bodyData.weight}
                    name="weight"
                    onChange={dataHandler}
                  />
                </td>
                <td>
                  <Form.Control
                    type="number"
                    step="0.1"
                    min={0}
                    value={bodyData.height}
                    name="height"
                    onChange={dataHandler}
                  />
                </td>
                <td>
                  <Form.Control
                    as="select"
                    name="activityLevel"
                    value={bodyData.activityLevel}
                    onChange={dataHandler}
                  >
                    <option value="">-- 請選擇 --</option>
                    {activityLevelOptions.map((option, i) => (
                      <option key={i} value={option.value}>
                        {option.label} x{option.value}
                      </option>
                    ))}
                  </Form.Control>
                </td>
              </tr>
            </tbody>
          </Table>
          <Button
            onClick={() => {
              submitBodyData(bodyData);
            }}
          >
            提交
          </Button>
        </Form>
      </div>

      <Link className="btn btn-success mt-5" to="/user/selfies">
        /user/selfies
      </Link>
    </div>
  );
};

export default UserProfiles;
