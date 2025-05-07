package com.capstoneproject.themeal.controller;

import com.capstoneproject.themeal.model.entity.Rate;
import com.capstoneproject.themeal.model.entity.Restaurant;
import com.capstoneproject.themeal.model.entity.User;
import com.capstoneproject.themeal.repository.RateRepository;
import com.capstoneproject.themeal.repository.RestaurantRepository;
import com.capstoneproject.themeal.repository.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/export")
@RequiredArgsConstructor
public class ExportController {

    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;
    private final RateRepository rateRepository;

    @GetMapping("/users")
    public void exportUsersToCSV(HttpServletResponse response) throws IOException {
        List<User> users = userRepository.findAll();

        response.setContentType("text/csv; charset=UTF-8");
        response.setHeader("Content-Disposition", "attachment; filename=users.csv");

        // Ghi BOM để Excel hiểu là UTF-8
        OutputStream out = response.getOutputStream();
        out.write(new byte[] {(byte) 0xEF, (byte) 0xBB, (byte) 0xBF}); // UTF-8 BOM

        OutputStreamWriter writer = new OutputStreamWriter(out, StandardCharsets.UTF_8);
        BufferedWriter bufferedWriter = new BufferedWriter(writer);

        // Header
        bufferedWriter.write("ID,Full name,Email,Gender,Address");
        bufferedWriter.newLine();

        for (User user : users) {
            bufferedWriter.write(String.format("%d,%s,%s,%s,%s",
                    user.getMaSoNguoiDung(),
                    escape(user.getHoTen()),
                    escape(user.getEmail()),
                    escape(user.getGioiTinh()),
                    escape(user.getDiaChi())));
            bufferedWriter.newLine();
        }

        bufferedWriter.flush();
        bufferedWriter.close();
    }

    @GetMapping("/restaurants")
    public void exportRestaurantsToCSV(HttpServletResponse response) throws IOException {
        List<Restaurant> restaurants = restaurantRepository.findAll();

        response.setContentType("text/csv; charset=UTF-8");
        response.setHeader("Content-Disposition", "attachment; filename=restaurants.csv");

        // Ghi BOM để Excel hiểu là UTF-8
        OutputStream out = response.getOutputStream();
        out.write(new byte[] {(byte) 0xEF, (byte) 0xBB, (byte) 0xBF}); // UTF-8 BOM

        OutputStreamWriter writer = new OutputStreamWriter(out, StandardCharsets.UTF_8);
        BufferedWriter bufferedWriter = new BufferedWriter(writer);

        // Header
        bufferedWriter.write("ID,Name,Address,Style,Price,Hours, Special food, Suitable, Space, Characteristic, Longitude, Latitude, City ");
        bufferedWriter.newLine();

        for (Restaurant restaurant : restaurants) {
            bufferedWriter.write(String.format("%d,%s,%s,%s,%s,%s,%s,%s,%s,%s,%.6f,%.6f,%s",
                    restaurant.getMaSoNhaHang(),
                    escape(restaurant.getTen()),
                    escape(restaurant.getDiaChi()),
                    escape(restaurant.getKieuNhaHang()),
                    escape(restaurant.getKhoangGia()),
                    escape(restaurant.getGioHoatDong()),
                    escape(restaurant.getMonDacSac()),
                    escape(restaurant.getPhuHop()),
                    escape(restaurant.getMoTaKhongGian()),
                    escape(restaurant.getDiemDacTrung()),
                    restaurant.getKinhDo(),   // không cần escape
                    restaurant.getViDo(),     // không cần escape
                    escape(restaurant.getThanhPho())));
            bufferedWriter.newLine();
        }

        bufferedWriter.flush();
        bufferedWriter.close();
    }

    @GetMapping("/ratings")
    public void exportRatingsToCSV(HttpServletResponse response) throws IOException {
        List<Rate> rates = rateRepository.findAll();


        response.setContentType("text/csv; charset=UTF-8");
        response.setHeader("Content-Disposition", "attachment; filename=ratings.csv");

        // Ghi BOM để Excel hiểu là UTF-8
        OutputStream out = response.getOutputStream();
        out.write(new byte[] {(byte) 0xEF, (byte) 0xBB, (byte) 0xBF}); // UTF-8 BOM

        OutputStreamWriter writer = new OutputStreamWriter(out, StandardCharsets.UTF_8);
        BufferedWriter bufferedWriter = new BufferedWriter(writer);

        // Header
        bufferedWriter.write("ID,Content,Rate,Restaurant_id");
        bufferedWriter.newLine();

        for (Rate rate : rates) {
            bufferedWriter.write(String.format("%d,%s,%.2f,%d",
                    rate.getMaSoDanhGia(),
                    escape(rate.getNoiDung()),
                    rate.getSao(),
                    rate.getNhaHang().getMaSoNhaHang()));
            bufferedWriter.newLine();
        }

        bufferedWriter.flush();
        bufferedWriter.close();
    }

    // ✅ Hàm escape CSV
    private String escape(String value) {
        if (value == null) return "";
        boolean hasSpecial = value.contains(",") || value.contains("\"") || value.contains("\n");
        if (hasSpecial) {
            value = value.replace("\"", "\"\""); // Escape dấu "
            return "\"" + value + "\"";          // Bọc toàn bộ bằng dấu "
        }
        return value;
    }
}
