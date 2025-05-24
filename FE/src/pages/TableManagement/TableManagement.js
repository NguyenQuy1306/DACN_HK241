import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTableForRestaurant,
  deleteTableForRestaurant,
  getTableForRestaurantByOwner,
  setDeleteTableResposne,
} from "../../redux/features/tableSlice";
import styles from "./TableManagement.module.css";

function TableManagement() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [time, setTime] = useState("09:30");
  const [people, setPeople] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const today = new Date().toISOString().split("T")[0];
  const twoWeeksLater = new Date(Date.now() + 12096e5)
    .toISOString()
    .split("T")[0];
  const user = useSelector((state) => state.authentication.user);
  const restaurantOwner = useSelector(
    (state) => state.authentication.restaurantOwner
  );
  const tableList = useSelector((state) => state.table.tablesOwner);
  const deleteTableResposne = useSelector(
    (state) => state.table.deleteTableResposne
  );
  const groupTablesByDateAndTime = (tables) => {
    const grouped = {};

    tables.forEach((table) => {
      const { ngay, gio, ban } = table;

      if (!grouped[ngay]) {
        grouped[ngay] = {};
      }

      if (!grouped[ngay][gio]) {
        grouped[ngay][gio] = [];
      }

      grouped[ngay][gio].push(...ban);
    });

    return grouped;
  };

  useEffect(() => {
    if (restaurantOwner) {
      console.log(
        "call getTableForRestaurantByOwner",
        restaurantOwner.maSoNhaHang
      );
      dispatch(
        getTableForRestaurantByOwner({
          restaurantId: restaurantOwner.maSoNhaHang,
        })
      );
    }
  }, [dispatch, restaurantOwner]);
  useEffect(() => {
    if (deleteTableResposne) {
      dispatch(
        getTableForRestaurantByOwner({
          restaurantId: restaurantOwner.maSoNhaHang,
        })
      );
      dispatch(setDeleteTableResposne(null));
    }
  }, [dispatch, deleteTableResposne]);

  const handleAddTables = () => {
    if (!startDate || !endDate) {
      alert("Vui lòng chọn ngày bắt đầu và ngày kết thúc");
      return;
    }

    const newTables = [];
    const currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
      const formattedDate = currentDate.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      newTables.push({
        Ngay: formattedDate.split("/").reverse().join("-"), // convert to yyyy-MM-dd
        Gio: `${time}:00`, // add seconds for LocalTime format "HH:mm:ss"
        SoNguoi: people, // Java backend sẽ tự map int -> byte nếu được khai báo là byte
        soLuong: quantity,
        maSoNhaHang: restaurantOwner.maSoNhaHang,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }
    console.log("newTables", newTables);
    // Dispatch to add tables to the Redux store if needed, or directly modify the table list here
    dispatch(
      createTableForRestaurant({
        tableRequests: newTables,
        restaurantId: restaurantOwner.maSoNhaHang,
      })
    );
  };

  const handleDeleteTable = (params) => {
    if (window.confirm("Bạn có chắc muốn xóa bàn này không?")) {
      dispatch(deleteTableForRestaurant(params));
    }
  };

  return (
    <section className={styles.tableManagement}>
      <h3 className={styles.sectionTitle}>Quản lý bàn trống</h3>

      <div className={styles.formRow}>
        <div className={styles.formColumn}>
          <label className={styles.label}>Ngày bắt đầu</label>
          <input
            type="date"
            min={today}
            max={twoWeeksLater}
            className={styles.input}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className={styles.formColumn}>
          <label className={styles.label}>Ngày kết thúc</label>
          <input
            type="date"
            min={startDate}
            max={twoWeeksLater}
            className={styles.input}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className={styles.formColumn}>
          <label className={styles.label}>Giờ</label>
          <select
            className={styles.input}
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            <option value="00:00">00:00</option>
            <option value="00:30">00:30</option>
            <option value="01:00">01:00</option>
            <option value="01:30">01:30</option>
            <option value="03:00">03:00</option>
            <option value="03:30">03:30</option>
            <option value="09:30">09:30</option>
            <option value="10:00">10:00</option>
            <option value="10:30">10:30</option>
            <option value="11:00">11:00</option>
            <option value="11:30">11:30</option>
            <option value="12:00">12:00</option>
            <option value="12:30">12:30</option>
            <option value="13:00">13:00</option>
            <option value="13:30">13:30</option>
            <option value="14:00">14:00</option>
            <option value="15:00">15:00</option>
            <option value="16:00">16:00</option>
            <option value="17:00">17:00</option>
            <option value="18:00">18:00</option>
            <option value="18:30">18:30</option>
            <option value="19:00">19:00</option>
            <option value="19:30">19:30</option>
            <option value="20:00">20:00</option>
            <option value="20:30">20:30</option>
            <option value="21:00">21:00</option>
            <option value="21:30">21:30</option>
            <option value="22:00">22:00</option>
            <option value="22:30">22:30</option>
            <option value="23:00">23:00</option>
            <option value="23:30">23:30</option>
          </select>
        </div>

        <div className={styles.formColumn}>
          <label className={styles.label}>Số người/bàn</label>
          <select
            className={styles.input}
            value={people}
            onChange={(e) => setPeople(parseInt(e.target.value))}
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1} người
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formColumn}>
          <label className={styles.label}>Số lượng bàn</label>
          <input
            type="number"
            min="1"
            max="20"
            className={styles.input}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </div>
      </div>

      <button className={styles.addButton} onClick={handleAddTables}>
        Thêm bàn trống
      </button>

      <div className={styles.tableList}>
        <h4 className={styles.listTitle}>Danh sách bàn</h4>

        <div className={styles.tableItems}>
          {tableList && tableList.length > 0
            ? Object.keys(groupTablesByDateAndTime(tableList)).map((date) => (
                <div key={date} className={styles.tableDateGroup}>
                  <h5 className={styles.dateTitle}>{date}</h5>
                  {Object.keys(groupTablesByDateAndTime(tableList)[date]).map(
                    (time) => (
                      <div key={time} className={styles.timeGroup}>
                        <h6 className={styles.timeTitle}>{time}</h6>
                        {groupTablesByDateAndTime(tableList)[date][time].map(
                          (table) => (
                            <div
                              key={table.maSo.thuTuBan}
                              className={styles.tableItem}
                            >
                              <div className={styles.tableInfo}>
                                <div className={styles.tableDate}>
                                  {table.ngay}
                                </div>
                                <div className={styles.tableDetails}>
                                  {table.gio} - {table.soNguoi} người - Số
                                  lượng: {table.soLuong}
                                </div>
                              </div>
                              <button
                                className={styles.deleteButton}
                                onClick={() =>
                                  handleDeleteTable({
                                    restaurantId: restaurantOwner.maSoNhaHang,
                                    thuTuBan: table.maSo.thuTuBan,
                                  })
                                }
                              >
                                Xóa
                              </button>
                            </div>
                          )
                        )}
                      </div>
                    )
                  )}
                </div>
              ))
            : "Chưa có bàn nào được tạo"}
        </div>
      </div>
    </section>
  );
}

export default TableManagement;
