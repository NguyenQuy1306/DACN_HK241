import { Button, Col, DatePicker, Form, Input, message, Row } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../../redux/api";
import styles from "./style.module.css";
import { fetchUser } from "../../redux/features/authenticationSlice";

function PersonalInfo() {
  const [form] = Form.useForm();
  const { user } = useSelector((state) => state.authentication);
  console.log("USER AT HOMEPAGE: ", user);
  const dispatch = useDispatch();
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 14,
      },
    },
  };

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user?.hoTen,
        phone: user.sdt,
        dob: user.ngaySinh ? moment(user.ngaySinh) : null,
        address: user.diaChi,
        email: user.email,
      });
    }
  }, [user, form]);

  const handleUpdateInfo = async () => {
    try {
      const values = await form.validateFields();

      const payload = {
        id: user?.maSoNguoiDung, // ensure this matches your backend field
        fullName: values.name,
        email: values.email,
        phoneNumber: values.phone,
        address: values.address,
        birthDate: values.dob ? moment(values.dob).format("YYYY-MM-DD") : null,
      };

      console.log("Payload: ", payload);

      const response = await updateUserInfo(payload);
      console.log("Update successful", response);
      message.success("Cập nhật thông tin thành công!");
      dispatch(fetchUser({ userId: user?.maSoNguoiDung }));
      // You can show a success message here
    } catch (error) {
      console.error("Update failed", error);
      // You can show an error message here
      // message.error("Cập nhật thông tin thất bại!");
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>Thông tin tài khoản</h3>
      <div className={styles.body}>
        <h3 className={styles["body-title"]}>Quản lý thông tin cá nhân</h3>
        <p className={styles["body-sub-title"]}>
          Thông tin liên lạc của bạn sẽ được gửi đến nhà hàng khi đặt bàn
        </p>
        <Form
          {...formItemLayout}
          style={{
            marginTop: "36px",
          }}
          form={form}
          onFinish={handleUpdateInfo}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Họ và tên"
                name="name"
                labelCol={{ span: 8 }}
                wrapperCol={8}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập đầy đủ họ và tên đệm của bạn!",
                  },
                ]}
              >
                <Input value={user?.hoTen} placeholder="Nhập họ và tên" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                labelCol={{ span: 6 }}
                labelAlign="right"
                wrapperCol={{ span: 18 }}
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Vui lòng nhập email hợp lệ!",
                  },
                ]}
              >
                <Input disabled placeholder="Nhập email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                labelAlign="left"
                labelCol={{ span: 8 }}
                wrapperCol={8}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại của bạn!",
                  },
                ]}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Ngày sinh"
                name="dob"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn đúng ngày sinh của bạn!",
                  },
                ]}
              >
                <DatePicker placeholder="Chọn ngày" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Địa chỉ"
            name="address"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            labelAlign="left"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập đầy đủ địa chỉ của bạn của bạn!",
              },
            ]}
          >
            <Input placeholder="Nhập địa chỉ" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 11,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "#0a6c3d" }}
            >
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default PersonalInfo;
