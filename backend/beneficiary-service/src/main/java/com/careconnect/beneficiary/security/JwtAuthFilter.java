package com.careconnect.beneficiary.security;

import jakarta.annotation.Nonnull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            @Nonnull HttpServletResponse response,
            @Nonnull FilterChain filterChain
    ) throws ServletException, IOException {

        String path = request.getRequestURI();

        // 🔓 Skip JWT check for public APIs
        if (path.startsWith("/api/requests/approved")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Avoid re-authentication
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            filterChain.doFilter(request, response);
            return;
        }

        String header = request.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = header.substring(7).trim();

        if (token.isEmpty() || token.equalsIgnoreCase("null")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            String email = jwtUtil.extractEmail(token);
            String role = jwtUtil.extractRole(token); // ADMIN / BENEFICIARY

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            email,
                            null,
                            List.of(new SimpleGrantedAuthority(role)) // ✅ NO ROLE_
                    );

            authentication.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request)
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            System.out.println("AUTH OK → " + email + " | " + role);

        } catch (Exception e) {
            System.err.println("Invalid JWT: " + e.getMessage());
        }

        filterChain.doFilter(request, response);
    }
}
