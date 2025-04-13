from river import linear_model, preprocessing
import pickle

# Khởi tạo mô hình online learning cơ bản
model = preprocessing.StandardScaler() | linear_model.LogisticRegression()

# Lưu lại vào file
with open("online_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("✅ Đã tạo model online_model.pkl thành công!")
