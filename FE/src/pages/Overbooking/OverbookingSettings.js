import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOverbookingSettings,
  addThreshold as addThresholdAction,
  removeThreshold as removeThresholdAction,
  updateThreshold as updateThresholdAction,
  saveSettings as saveSettingsAction,
  createOverrides as createOverridesAction,
  updateOverrides as updateOverridesAction,
  deleteOverrides as deleteOverridesAction,
} from "../../redux/features/overbookingSlice";
import {
  Card,
  Switch,
  Form,
  InputNumber,
  TimePicker,
  Button,
  Space,
  Modal,
  Popconfirm,
  Select,
  Row,
  Col,
  Divider,
  message,
  Input,
} from "antd";
import moment from "moment";

const { Option } = Select;

export default function OverbookingSettings() {
  const dispatch = useDispatch();
  const [mainForm] = Form.useForm();
  const [thresholdForm] = Form.useForm();
  const [overrideForm] = Form.useForm();

  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState(null);
  const restaurantOwner = useSelector(
    (state) => state.authentication.restaurantOwner
  );
  const {
    overbookingSettings,
    thresholdResponse,
    timeOveridingResponse,
    error,
    loading,
  } = useSelector((state) => state.overbooking);

  const actions = [
    { label: "Không làm gì", value: "none" },
    {
      label: "Email xác nhận 30 phút, tự động huỷ đơn sau 20min",
      value: "email-warning",
    },

    {
      label: "Thêm overbooking",
      value: "overbooking",
    },
  ];
  console.log("overbookingSettings", overbookingSettings);
  useEffect(() => {
    dispatch(
      getOverbookingSettings({ restaurantId: restaurantOwner.maSoNhaHang })
    );
  }, [dispatch]);

  useEffect(() => {
    if (overbookingSettings) {
      mainForm.setFieldsValue({
        enabled: overbookingSettings.enabled,
      });
    }
  }, [overbookingSettings, mainForm]);

  const handleAddThreshold = async () => {
    try {
      await thresholdForm.validateFields();
      const values = thresholdForm.getFieldsValue();

      if (values.min >= values.max) {
        message.error("Minimum value must be less than maximum value");
        return;
      }
      values.id = overbookingSettings.id;
      await dispatch(addThresholdAction(values));
      thresholdForm.resetFields();
      message.success("Thêm threshold thành công");
      dispatch(
        getOverbookingSettings({ restaurantId: restaurantOwner.maSoNhaHang })
      );
    } catch (error) {
      message.error("Failed to add threshold");
    }
  };

  const handleRemoveThreshold = async (id) => {
    try {
      await dispatch(removeThresholdAction({ id }));
      message.success("Xoá threshold thành công");
      dispatch(
        getOverbookingSettings({ restaurantId: restaurantOwner.maSoNhaHang })
      );
    } catch (error) {
      message.error("Failed to remove threshold");
    }
  };

  const handleSaveSettings = async (values) => {
    try {
      values.id = overbookingSettings.id;
      await dispatch(saveSettingsAction(values));
      message.success("Settings saved successfully");
    } catch (error) {
      message.error("Failed to save settings");
    }
  };

  const openNewOverride = () => {
    setEditing(null);
    overrideForm.resetFields();
    setModalVisible(true);
  };

  const handleOverrideOk = async () => {
    try {
      await overrideForm.validateFields();
      const values = overrideForm.getFieldsValue();

      if (values.start.isAfter(values.end)) {
        message.error("End time must be after start time");
        return;
      }

      const overrideData = {
        start: values.start.format("HH:mm"),
        end: values.end.format("HH:mm"),
        maxExtra: values.maxExtra,
      };

      if (editing) {
        await dispatch(
          updateOverridesAction({ id: editing.id, ...overrideData })
        );
        message.success("Cập nhật override thành công");
        dispatch(
          getOverbookingSettings({ restaurantId: restaurantOwner.maSoNhaHang })
        );
      } else {
        overrideData.id = overbookingSettings.id; // hoặc bất kỳ giá trị nào bạn muốn
        await dispatch(createOverridesAction(overrideData));
        message.success("Xoá override thành công");
        dispatch(
          getOverbookingSettings({ restaurantId: restaurantOwner.maSoNhaHang })
        );
      }

      setModalVisible(false);
      overrideForm.resetFields();
    } catch (error) {
      message.error("Failed to save override");
    }
  };

  const handleOverrideCancel = () => {
    setModalVisible(false);
    overrideForm.resetFields();
  };

  const handleDeleteOverride = async (id) => {
    try {
      await dispatch(deleteOverridesAction({ id }));
      message.success("Xoá override thành công");
      dispatch(
        getOverbookingSettings({ restaurantId: restaurantOwner.maSoNhaHang })
      );
    } catch (error) {
      message.error("Failed to delete override");
    }
  };

  if (loading || !overbookingSettings) {
    return <Card loading={true} />;
  }

  return (
    <Card
      title="Cấu hình Overbooking"
      style={{ maxWidth: 800, margin: "auto" }}
    >
      <Form
        form={mainForm}
        layout="vertical"
        onFinish={handleSaveSettings}
        initialValues={overbookingSettings.enabled}
      >
        <Form.Item
          name="enabled"
          label="Bật Overbooking"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Divider orientation="left">Thresholds (%) & Actions</Divider>

        <Form form={thresholdForm} layout="inline" style={{ marginBottom: 16 }}>
          <Form.Item name="id" noStyle>
            <Input type="hidden" />
          </Form.Item>
          <Form.Item
            name="min"
            rules={[{ required: true, message: "Enter min %" }]}
          >
            <InputNumber placeholder="Min %" min={0} max={99} />
          </Form.Item>
          <Form.Item
            name="max"
            rules={[{ required: true, message: "Enter max %" }]}
          >
            <InputNumber placeholder="Max %" min={1} max={100} />
          </Form.Item>
          <Form.Item
            name="action"
            rules={[{ required: true, message: "Select action" }]}
          >
            <Select placeholder="Action" style={{ width: 220 }}>
              {actions.map((a) => (
                <Option key={a.value} value={a.value}>
                  {a.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleAddThreshold}>
              Thêm Threshold
            </Button>
          </Form.Item>
        </Form>

        {overbookingSettings && overbookingSettings.thresholds.length > 0 ? (
          overbookingSettings.thresholds.map((threshold, index) => (
            <Row
              key={threshold.id || index}
              gutter={16}
              style={{ marginTop: 8 }}
              align="middle"
            >
              <Col xs={6} sm={4}>
                Min: {threshold.min}%
              </Col>
              <Col xs={6} sm={4}>
                Max: {threshold.max}%
              </Col>
              <Col xs={12} sm={12}>
                Action:{" "}
                {actions.find((a) => a.value === threshold.action)?.label ||
                  threshold.action}
              </Col>
              <Col xs={24} sm={4}>
                <Popconfirm
                  title="Bạn có chắc muốn xoá?"
                  onConfirm={() => handleRemoveThreshold(threshold.id)}
                  okText="Có"
                  cancelText="Không"
                >
                  <Button type="link" danger>
                    Xoá
                  </Button>
                </Popconfirm>
              </Col>
            </Row>
          ))
        ) : (
          <p>No thresholds defined.</p>
        )}

        <Divider orientation="left">Override Time Windows</Divider>
        <Button
          type="primary"
          onClick={openNewOverride}
          style={{ marginBottom: 16 }}
        >
          Thêm Override
        </Button>

        {overbookingSettings && overbookingSettings.overrides.length > 0 ? (
          overbookingSettings.overrides.map((override, index) => (
            <Row
              key={override.id || index}
              gutter={16}
              style={{ marginBottom: 8 }}
              align="middle"
            >
              <Col xs={24} sm={6}>
                Start: {override.start}
              </Col>
              <Col xs={24} sm={6}>
                End: {override.end}
              </Col>
              <Col xs={24} sm={6}>
                Max Extra: {override.maxExtra} guests
              </Col>
              <Col xs={24} sm={6}>
                <Space>
                  <Button
                    type="primary"
                    onClick={() => {
                      setEditing(override);
                      overrideForm.setFieldsValue({
                        start: moment(override.start, "HH:mm"),
                        end: moment(override.end, "HH:mm"),
                        maxExtra: override.maxExtra,
                      });
                      setModalVisible(true);
                    }}
                  >
                    Chỉnh sửa
                  </Button>
                  <Popconfirm
                    title="Bạn có chắc muốn xoá?"
                    onConfirm={() => handleDeleteOverride(override.id)}
                    okText="Có"
                    cancelText="Không"
                  >
                    <Button danger type="link">
                      Xoá
                    </Button>
                  </Popconfirm>
                </Space>
              </Col>
            </Row>
          ))
        ) : (
          <p>No time overrides configured.</p>
        )}

        <Divider />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Lưu thay đổi
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title={editing ? "Chỉnh sửa Overbooking" : "Thêm Overbooking"}
        visible={modalVisible}
        onOk={handleOverrideOk}
        onCancel={handleOverrideCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Form layout="vertical" form={overrideForm}>
          <Form.Item
            name="start"
            label="Start Time"
            rules={[{ required: true, message: "Select start time" }]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item
            name="end"
            label="End Time"
            rules={[{ required: true, message: "Select end time" }]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item
            name="maxExtra"
            label="Số lượng cho phép đặt thêm (người)"
            rules={[{ required: true, message: "Enter max extra %" }]}
          >
            <InputNumber min={1} max={100} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
