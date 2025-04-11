from river import linear_model
from river import metrics
from river import preprocessing

# 1. Khởi tạo pipeline học liên tục
model = preprocessing.StandardScaler() | linear_model.LogisticRegression()

# 2. Khởi tạo metric để đo hiệu suất online
metric = metrics.Accuracy()
