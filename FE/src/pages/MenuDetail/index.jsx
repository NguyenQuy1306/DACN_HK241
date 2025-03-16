import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import SidebarOwner from "../../components/SidebarOwner";
import { Breadcrumb, Button, Col, Form, Input, InputNumber, Radio, Row, Select } from "antd";
import StatisticCard from "../MenuList_Owner/components/StatisticCard";
import foodLogo from "../../assets/images/food.svg";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import drinkLogo from "../../assets/images/drink.svg";
import foodIncLogo from "../../assets/images/foodinc.svg";
import drinkIncLogo from "../../assets/images/drinkinc.svg";
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

function MenuDetail() {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState([
        {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
    ]);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: "none",
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );
    const [collapsed, setCollapsed] = useState(false);
    const [form] = Form.useForm();
    const [clientReady, setClientReady] = useState(false);

    // To disable submit button at the beginning.
    useEffect(() => {
        setClientReady(true);
    }, []);
    const onFinish = (values) => {
        console.log("Finish:", values);
    };
    return (
        <div className={styles.container}>
            <SidebarOwner collapsed={collapsed} />
            <div className={styles.body}>
                <Breadcrumb
                    style={{ margin: "8px" }}
                    items={[
                        {
                            title: "Danh sách món ăn",
                        },
                        {
                            title: "Salad hoa quả",
                        },
                    ]}
                />
                <Form
                    form={form}
                    name="horizontal_login"
                    layout="vertical"
                    onFinish={onFinish}
                    style={{ padding: "12px" }}
                >
                    <Row gutter={[64]}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Tên món ăn"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input name of dish!",
                                    },
                                ]}
                            >
                                <Input placeholder="Name of dish" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="type"
                                label="Trạng thái"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please choose type of dish!",
                                    },
                                ]}
                            >
                                <Radio.Group
                                    name="radiogroup"
                                    defaultValue={1}
                                    options={[
                                        {
                                            value: 1,
                                            label: "Chính thức",
                                        },
                                        {
                                            value: 2,
                                            label: "Nháp",
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[64]}>
                        <Col span={12}>
                            <Form.Item
                                name="category"
                                label="Danh mục món ăn"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select category!",
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a category"
                                    optionFilterProp="label"
                                    style={{ border: "1px solid #ccc", borderRadius: "4px" }}
                                    options={[
                                        {
                                            value: "lau",
                                            label: "Lẩu",
                                        },
                                        {
                                            value: "nuong",
                                            label: "Nướng",
                                        },
                                        {
                                            value: "kho",
                                            label: "Kho",
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="discount"
                                label="Giảm giá"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input discount percent!",
                                    },
                                ]}
                            >
                                <InputNumber
                                    addonAfter="%"
                                    defaultValue={0}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[64]}>
                        <Col span={12}>
                            <Form.Item
                                name="price"
                                label="Giá"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input price of dish!",
                                    },
                                ]}
                            >
                                <InputNumber
                                    addonAfter="đ"
                                    defaultValue={0}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="image"
                                label="Upload hình ảnh"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input price of dish!",
                                    },
                                ]}
                            >
                                <Upload
                                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                    listType="picture-circle"
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                >
                                    {fileList.length >= 8 ? null : uploadButton}
                                </Upload>
                            </Form.Item>
                            {previewImage && (
                                <Image
                                    wrapperStyle={{
                                        display: "none",
                                    }}
                                    preview={{
                                        visible: previewOpen,
                                        onVisibleChange: (visible) => setPreviewOpen(visible),
                                        afterOpenChange: (visible) => !visible && setPreviewImage(""),
                                    }}
                                    src={previewImage}
                                />
                            )}
                        </Col>
                    </Row>

                    <Col span={12}>
                        <Form.Item
                            name="description"
                            label="Mô tả"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input description of the dish!",
                                },
                            ]}
                        >
                            <TextArea
                                placeholder="Description of the dish"
                                allowClear
                            />
                        </Form.Item>
                    </Col>
                </Form>
            </div>
            <div className={styles.statistics}>
                <StatisticCard
                    title="Tổng số món ăn"
                    quantity={45}
                    img={foodLogo}
                />
                <StatisticCard
                    title="Tổng số thức uống"
                    quantity={12}
                    img={drinkLogo}
                />
                <StatisticCard
                    title="Món ăn bán chạy nhất"
                    quantity={"Lẩu gà Bình Thuận"}
                    img={foodIncLogo}
                />
                <StatisticCard
                    title="Thức uống bán chạy nhất"
                    quantity={"Trà mãng cầu"}
                    img={drinkIncLogo}
                />
            </div>
        </div>
    );
}

export default MenuDetail;
