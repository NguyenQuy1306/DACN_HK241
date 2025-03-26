import {
  Breadcrumb,
  Button,
  Form,
  Input,
  message,
  Modal,
  Pagination,
  Popconfirm,
  Result,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import foodLogo from "../../assets/images/food.svg";
import foodIncLogo from "../../assets/images/foodinc.svg";
import hamberger from "../../assets/images/hamburger.jpg";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  searchCategory,
  updateCategory,
} from "../../redux/features/categorySlice";
import StatisticCard from "../MenuList_Owner/components/StatisticCard";
import CategoryItem from "./components/CategoryItem";
import styles from "./style.module.css";
import { PlusOutlined } from "@ant-design/icons";
import { formControlClasses } from "@mui/base";
import { useForm } from "antd/es/form/Form";

const { Search } = Input;
function CategoryOwner() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = useForm();
  const [searchKey, setSearchKey] = useState(null);
  const [categories, setCategories] = useState([]);

  const onSearch = () => {
    dispatch(searchCategory({ keyword: searchKey, restaurantId: 72 }));
  };
  const categoryList = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllCategory({ restaurantId: 72 }));
  }, []);

  useEffect(() => {
    setCategories(categoryList.category);
  }, [categoryList.category]);

  const viewClick = (categoryId) => {
    navigate(`/owner/menu/list?category=${categoryId}`);
  };

  const deleteClick = (categoryId) => {
    dispatch(deleteCategory({ restaurantId: 72, categoryId: categoryId }));
  };

  const [titleBreadCrumb, setTitleBreadCrumb] = useState("Tất cả");

  useEffect(() => {
    if (searchKey) {
      setTitleBreadCrumb(searchKey);
    } else {
      setTitleBreadCrumb("Tất cả");
    }
  }, [searchKey]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [currentCategory, setCurrentCategory] = useState(null);

  const editClick = (categoryId) => {
    setCurrentCategory(
      categoryList.category?.find(
        (category) => category.maSoDanhMuc === categoryId
      )
    );
    showModal();
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  useEffect(() => {
    form.setFieldsValue({ name: currentCategory?.ten });
  }, [currentCategory, form]);

  const handleUpdateCategory = (categoryId, formData) => {
    dispatch(
      updateCategory({
        categoryId,
        params: {
          ...formData,
          restaurantId: 72,
        },
      })
    );
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      {/* <SidebarOwner collapsed={collapsed} /> */}
      <div className={styles.body}>
        <Search
          placeholder="Nhập tên danh mục để tìm kiếm"
          onSearch={onSearch}
          onChange={(e) => setSearchKey(e.target.value)}
          enterButton
          style={{ marginTop: "12px" }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "8px",
          }}
        >
          <Breadcrumb
            style={{ margin: "8px" }}
            items={[
              {
                title: "Danh mục món ăn",
              },
              {
                title: titleBreadCrumb,
              },
            ]}
          />

          <Button
            type="primary"
            onClick={() => dispatch(createCategory({ restaurantId: 72 }))}
          >
            <IoIosAddCircleOutline />
            Thêm danh mục
          </Button>
        </div>
        <div className={styles["category-wrap"]}>
          <div className={styles["category-list"]}>
            {categories?.length > 0 ? (
              categories?.map((category, index) => {
                return (
                  <CategoryItem
                    img={hamberger}
                    name={category.ten}
                    quantity={category.soLuongMon}
                    key={index}
                    minPrice={category.minPrice}
                    maxPrice={category.maxPrice}
                    viewClick={() => viewClick(category.maSoDanhMuc)}
                    deleteClick={() => deleteClick(category.maSoDanhMuc)}
                    categoryId={category.maSoDanhMuc}
                    editClick={() => editClick(category.maSoDanhMuc)}
                  />
                );
              })
            ) : (
              <div className={styles["not-found"]}>
                <Result
                  style={{ textAlign: "center" }}
                  status="404"
                  title="404"
                  subTitle="Xin lỗi, Không tìm thấy danh mục món ăn!"
                />
              </div>
            )}
          </div>
          <div className={styles.pagination}>
            {categories?.length > 0 && (
              <Pagination
                defaultCurrent={1}
                total={categories?.length}
                pageSize={6}
              />
            )}
          </div>
          <Modal
            title=<h3 style={{ textAlign: "center" }}>Cập nhật danh mục</h3>
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Cập nhật"
          >
            <Form
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              style={{
                maxWidth: 600,
              }}
              form={form}
              enterButton
              onFinish={(formData) =>
                handleUpdateCategory(currentCategory?.maSoDanhMuc, formData)
              }
            >
              <Form.Item required name="name" label="Tên danh mục">
                <Input />
              </Form.Item>

              <Form.Item
                required
                name="imageUrl"
                label="Ảnh danh mục"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload
                  action="/upload.do"
                  listType="picture-card"
                  defaultFileList={[
                    {
                      uid: "1",
                      url: "https://png.pngtree.com/background/20230520/original/pngtree-an-image-of-a-hamburger-with-various-ingredients-picture-image_2674929.jpg",
                      name: "image.png",
                      status: "done",
                    },
                  ]}
                >
                  <button
                    style={{
                      color: "inherit",
                      cursor: "inherit",
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
                </Upload>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
      <div className={styles.statistics}>
        <StatisticCard
          title="Tổng số danh mục"
          quantity={categories?.length}
          img={foodLogo}
        />

        <StatisticCard
          title="Danh mục bán chạy nhất"
          quantity={"Lẩu truyền thống"}
          img={foodIncLogo}
        />
      </div>
    </div>
  );
}

export default CategoryOwner;
