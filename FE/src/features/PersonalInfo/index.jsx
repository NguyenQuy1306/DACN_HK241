import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import {
    Button,
    Cascader,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Mentions,
    Radio,
    Row,
    Select,
    TreeSelect,
} from "antd";
import axios from "axios";
import moment from "moment";

function PersonalInfo() {
    const [form] = Form.useForm();
    const id = 1;
    const [sex, setSex] = useState("Nam");
    const { RangePicker } = DatePicker;
    const [customerInfo, setCustomerInfo] = useState({});
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
        const fetchInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/customer/${id}`);
                if (response.status === 200) {
                    setCustomerInfo(response.data);
                    console.log("CUSTOMER: ", customerInfo);
                } else {
                    console.log("Failed to fetch customer information!");
                }
            } catch (e) {
                console.log(e);
            }
        };
        fetchInfo();
    }, [id]);

    useEffect(() => {
        if (customerInfo) {
            form.setFieldsValue({
                fname: customerInfo.hoTen?.split(" ").slice(0, 2).join(" "),
                lname: customerInfo.hoTen?.split(" ")[2],
                phone: customerInfo.sdt,
                dob: moment(customerInfo.ngaySinh, "YYYY-MM-DD"),
                address: customerInfo.diaChi,
            });
        }
    }, [customerInfo, form]);

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
                    initialValues={customerInfo}
                >
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                label="Họ và tên đệm"
                                name="fname"
                                labelCol={{ span: 8 }}
                                wrapperCol={8}
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập đầy đủ họ và tên đệm của bạn!",
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập họ và tên đệm" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Tên"
                                name="lname"
                                labelCol={{ span: 6 }}
                                labelAlign="right"
                                wrapperCol={{ span: 10 }}
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập tên của bạn!",
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập tên" />
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
                                        message: "Vui lòng nhập đầy đủ số điện thoại của bạn!",
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
