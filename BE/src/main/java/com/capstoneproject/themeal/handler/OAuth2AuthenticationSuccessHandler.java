package com.capstoneproject.themeal.handler;

import com.capstoneproject.themeal.model.entity.User;
import com.capstoneproject.themeal.model.response.LoginResponse;
import com.capstoneproject.themeal.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import com.capstoneproject.themeal.SessionAuthenticationFilter.SessionRegistry;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextImpl;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final SessionRegistry sessionRegistry;
    private static final int SESSION_TIMEOUT = 300;  // 5 phút

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
        String email = (String) oauth2User.getAttributes().get("email");

        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "User not found");
            return;
        }

        User user = userOptional.get();

        // Tạo session mới
        HttpSession newSession = request.getSession(true);
        newSession.setMaxInactiveInterval(SESSION_TIMEOUT);

        LoginResponse userSession = LoginResponse.builder()
                .UserRole("C")
                .Email(user.getEmail())
                .SDT(user.getSDT())
                .DiaChi(user.getDiaChi())
                .NgaySinh(user.getNgaySinh())
                .maSoNguoiDung(user.getMaSoNguoiDung())
                .GioiTinh(user.getGioiTinh())
                .HoTen(user.getHoTen())
                .build();

        newSession.setAttribute("JSESSIONID", userSession);
        sessionRegistry.registerSession(newSession.getId(), user.getMaSoNguoiDung());

        // ✅ Lưu vào SecurityContext để OAuth2 Filter nhận diện
        SecurityContext securityContext = new SecurityContextImpl(authentication);
        SecurityContextHolder.setContext(securityContext);
        newSession.setAttribute("SPRING_SECURITY_CONTEXT", securityContext);

        response.sendRedirect("http://localhost:3000/home?userId=" + user.getMaSoNguoiDung());
    }
}
