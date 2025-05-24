import pandas as pd

def merge_two_excel_files(file1, file2, output_file):
    # Đọc hai file Excel
    data1 = pd.read_excel(file1)
    data2 = pd.read_excel(file2)
    
    # Gộp dữ liệu từ hai file
    merged_data = pd.concat([data1, data2], ignore_index=True)
    
    # Ghi dữ liệu gộp vào file Excel mới
    merged_data.to_excel(output_file, index=False)
    print(f"Files have been merged and saved to {output_file}")

# Đường dẫn file Excel đầu vào
file1 = r"C:\Users\LENOVO\Desktop\selenium\merged_output.xlsx"
file2 = r"C:\Users\LENOVO\Desktop\selenium\merged_output2.xlsx"
output_file = r"C:\Users\LENOVO\Desktop\selenium\merged_output_final.xlsx"

merge_two_excel_files(file1, file2, output_file)