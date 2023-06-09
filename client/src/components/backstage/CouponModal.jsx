import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Slider,
  DatePicker,
  Radio,
  Row,
  Col,
  InputNumber
} from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
const { RangePicker } = DatePicker;

const CouponModal = ({
  visible,
  onCancel,
  onSave,
  couponDataOrigin,
  couponData,
  setCouponData
}) => {
  const [form] = Form.useForm();
  const [inputValue, setInputValue] = useState(0);

  useEffect(() => {
    if (couponData) {
      form.setFieldsValue({
        name: couponData.name,
        discount_algorithm: couponData.discount_algorithm,
        code: couponData.code,
        description: couponData.description,
        usage_limit: couponData.usage_limit,
        validityPeriod: [
          dayjs(couponData.start_date).tz("Asia/Taipei"),
          dayjs(couponData.end_date).tz("Asia/Taipei")
        ]
      });
      setInputValue(couponData.discount_rate * 100);
    } else {
      form.resetFields();
      setInputValue(0);
    }
  }, [visible, couponData, form]);

  const handleSliderChange = (value) => {
    setInputValue(value);
  };

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        const startDate = dayjs(values.validityPeriod[0])
          .tz("Asia/Taipei")
          .format("YYYY-MM-DD");
        const endDate = dayjs(values.validityPeriod[1])
          .tz("Asia/Taipei")
          .format("YYYY-MM-DD");
        const updateData = {
          name: values.name,
          discount_algorithm: values.discount_algorithm,
          discount_rate: inputValue * 0.01,
          start_date: startDate,
          end_date: endDate,
          code: values.code,
          description: values.description,
          usage_limit: values.usage_limit
        };

        setCouponData(updateData);
        onSave(updateData);
      })
      .catch((error) => {
        console.log("Validation error:", error);
      });
  };

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      onOk={() => {
        handleSave();
      }}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="優惠券名稱"
          rules={[{ required: true, message: "請輸入優惠券名稱" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="discount_algorithm"
          label="優惠種類"
          rules={[{ required: true, message: "請選擇優惠種類" }]}
        >
          <Radio.Group>
            <Radio value="percentage">百分比折扣</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="折數(%)">
          <Row>
            <Col span={16}>
              <Slider
                step={1}
                min={1}
                max={100}
                onChange={handleSliderChange}
                value={typeof inputValue === "number" ? inputValue : 0}
              />
            </Col>
            <Col span={4}>
              <InputNumber
                min={1}
                max={100}
                style={{
                  margin: "0 16px"
                }}
                value={inputValue}
                onChange={handleInputChange}
              />
            </Col>
          </Row>
        </Form.Item>
        <Form.Item
          label="有效期間"
          name="validityPeriod"
          rules={[{ required: true, message: "請選擇有效期間" }]}
        >
          <RangePicker />
        </Form.Item>
        <Form.Item
          name="code"
          label="折扣代碼"
          rules={[{ required: true, message: "請輸入代碼" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="描述">
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="usage_limit"
          label="優惠券數量"
          rules={[{ required: true, message: "設定優惠券數量" }]}
        >
          <Input type="number" min={0} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CouponModal;
