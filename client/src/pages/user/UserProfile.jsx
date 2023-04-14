import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Table, Form, Button } from "react-bootstrap";

const ExerciseFrequencyOptions = [
  { value: "sedentary", label: "久坐不動" },
  { value: "lightlyActive", label: "輕度運動" },
  { value: "moderatelyActive", label: "中度運動" },
  { value: "veryActive", label: "高度運動" },
];

const UserProfiles = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [exerciseFrequency, setExerciseFrequency] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Weight:", weight);
    console.log("Height:", height);
    console.log("Exercise Frequency:", exerciseFrequency);
  };
  return (
    <div>
      <div className="fs-1 text-warning">TDEE 計算機</div>
      <div>
        <Form onSubmit={handleFormSubmit}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="text-white">體重</th>
                <th className="text-white">身高</th>
                <th className="text-white">運動頻率</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Form.Control
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </td>
                <td>
                  <Form.Control
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </td>
                <td>
                  <Form.Control
                    as="select"
                    value={exerciseFrequency}
                    onChange={(e) => setExerciseFrequency(e.target.value)}
                  >
                    <option value="">-- 請選擇 --</option>
                    {ExerciseFrequencyOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Control>
                </td>
              </tr>
            </tbody>
          </Table>
          <Button type="submit">提交</Button>
        </Form>
      </div>

      <Link className="btn btn-success mt-5" to="/user/selfies">
        /user/selfies
      </Link>
    </div>
  );
};

export default UserProfiles;
