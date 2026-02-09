package com.careconnect.auth.security;

import com.careconnect.auth.entity.User;
import com.careconnect.auth.repository.UserRepository;
import jakarta.annotation.Nonnull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
// we are extending OncePerRequestFilter --> bcz this filter will runs per http request
public class JwtAuthFilter extends OncePerRequestFilter {

    //userRepository → Gets user from database
    private final JwtService jwtService;

    //jwtService → Extracts + validates token
    private final UserRepository userRepository;

    // constructor se injection
    public JwtAuthFilter(JwtService jwtService, UserRepository userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return request.getServletPath().startsWith("/api/auth/");
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    @Nonnull HttpServletResponse response,
                                    @Nonnull FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        // Skip if no token or bad format
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);

        try {
            String email = jwtService.extractUsername(token);

            if (email != null &&
                    SecurityContextHolder.getContext().getAuthentication() == null) {

                User user = userRepository.findByEmail(email).orElse(null);

                if (user != null && jwtService.isTokenValid(token)) {

                    List<GrantedAuthority> authorities = List.of(
                            new SimpleGrantedAuthority(user.getRole().getName())
                    );

                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    user.getEmail(),
                                    null,
                                    authorities
                            );

                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }

        } catch (Exception e) {

            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        filterChain.doFilter(request, response);
    }

}
