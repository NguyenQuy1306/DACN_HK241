import { PlusOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Form, Image, Input, InputNumber, Radio, Row, Select, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { RxUpdate } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import drinkLogo from "../../assets/images/drink.svg";
import drinkIncLogo from "../../assets/images/drinkinc.svg";
import foodLogo from "../../assets/images/food.svg";
import foodIncLogo from "../../assets/images/foodinc.svg";
import { getFoodById, updateFood } from "../../redux/features/foodSlice";
import StatisticCard from "../MenuList_Owner/components/StatisticCard";
import styles from "./style.module.css";
import { getAllCategory } from "../../redux/features/categorySlice";
import { useParams } from "react-router-dom";
import { deleteFoodImage, getFoodImage, uploadFoodImage } from "../../redux/api";
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

function MenuDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const category = useSelector((state) => state.category);
    const [categoryList, setCategoryList] = useState([]);
    const foodInformation = useSelector((state) => state.food);
    const [foodRender, setFoodRender] = useState({});
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const restaurantOwner = useSelector((state) => state.authentication.restaurantOwner);
    const [fileList, setFileList] = useState([]);

    const [foodImage, setFoodImage] = useState([]);

    useEffect(() => {
        const handleGetFoodImage = async () => {
            const result = await getFoodImage([{ foodId: id, restaurantId: restaurantOwner.maSoNhaHang }]);
            setFoodImage(result.payload);
        };
        handleGetFoodImage();
    }, [restaurantOwner.maSoNhaHang, id]);

    useEffect(() => {
        console.log("FOOD IMAGE: ", foodImage);
    }, [foodImage]);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const handleChange = ({ fileList: newFileList, file: currentFile }) => {
        setFileList(newFileList);
        // if (currentFile.status === "done" && currentFile.originFileObj) {
        //     uploadFoodImage({
        //         restaurantId: restaurantOwner.maSoNhaHang,
        //         categoryId: foodRender.danhMuc.maSoDanhMuc,
        //         foodId: id,
        //         file: currentFile.originFileObj, // Đảm bảo gửi file gốc
        //     });
        // }
    };
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
        console.log("Value of form:", { ...values, id: Number(id) });
        dispatch(updateFood({ ...values, id: Number(id) }));
    };

    useEffect(() => {
        dispatch(getAllCategory({ restaurantId: restaurantOwner?.maSoNhaHang }));
    }, []);

    useEffect(() => {
        setCategoryList(category.category);
    }, [category.category]);

    useEffect(() => {
        dispatch(getFoodById({ restaurantId: restaurantOwner?.maSoNhaHang, foodId: id }));
    }, []);

    useEffect(() => {
        setFoodRender(foodInformation.food);
    }, [foodInformation.food]);

    useEffect(() => {
        const currentImage = foodImage?.map((img) => {
            const randomIndex = Math.floor(Math.random() * img.imageUrl.length);
            return {
                uid: "-1",
                name: "image.png",
                status: "done",
                url:
                    img.imageUrl.length > 0
                        ? `https:/themealbucket1.s3.amazonaws.com/${img.imageUrl[randomIndex]}`
                        : ``,
            };
        });
        setFileList(currentImage);
    }, [foodImage]);

    useEffect(() => {
        if (foodRender) {
            form.setFieldsValue({
                name: foodRender.ten,
                price: foodRender.gia,
                description: foodRender.moTa,
                category: foodRender.danhMuc?.ten,
                type: foodRender.trangThai === "available" ? 1 : 2,
                discount: 0,
            });
        }
    }, [foodRender]);

    const cateOption = categoryList?.map((cate) => ({
        label: cate.ten,
        value: cate.maSoDanhMuc,
    }));

    const handleDeleteImage = async ({ restaurantId, foodId, url }) => {
        const params = {
            restaurantId,
            foodId,
            url,
        };
        const result = await deleteFoodImage(params);
        setFileList((prevList) => prevList.filter((file) => file.url !== url));
        return result.payload;
    };

    return (
        <div className={styles.container}>
            <div className={styles.body}>
                <Breadcrumb
                    style={{ margin: "8px" }}
                    items={[
                        {
                            title: "Chi tiết món ăn",
                        },
                        {
                            title: foodRender.ten,
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
                                <Input
                                    onChange={(e) => e.preventDefault()}
                                    placeholder="Name of dish"
                                />
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
                                    options={cateOption}
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
                                        // required: true,
                                        message: "Please input price of dish!",
                                    },
                                ]}
                            >
                                <Upload
                                    action={`http://localhost:8080/api/food/restaurants/${restaurantOwner.maSoNhaHang}/categories/${foodRender.danhMuc?.maSoDanhMuc}/foods/${id}/image`}
                                    listType="picture-circle"
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                    onRemove={(file) =>
                                        handleDeleteImage({
                                            restaurantId: restaurantOwner.maSoNhaHang,
                                            foodId: id,
                                            url: file.url.replace("https:/themealbucket1.s3.amazonaws.com/", ""),
                                        })
                                    }
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
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ backgroundColor: "rgb(0,102,92)" }}
                        >
                            <RxUpdate />
                            Cập nhật
                        </Button>
                    </Form.Item>
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
