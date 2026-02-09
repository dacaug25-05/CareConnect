package com.careconnect.beneficiary.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth

                        // =====================
                        // PUBLIC
                        // =====================
                        .requestMatchers(
                                "/api/requests/approved",
                                "/swagger-ui/**",
                                "/v3/api-docs/**",
                                "/swagger-ui.html"
                        ).permitAll()

                        // =====================
                        // BENEFICIARY
                        // =====================
                        // Create request
                        .requestMatchers(HttpMethod.POST, "/api/requests/**")
                        .hasAuthority("BENEFICIARY")

                        // View own requests
                        .requestMatchers(HttpMethod.GET, "/api/requests/beneficiary/**")
                        .hasAuthority("BENEFICIARY")

                        // Beneficiary profile
                        .requestMatchers("/api/beneficiaries/**")
                        .hasAnyAuthority("BENEFICIARY", "ADMIN")

                        // =====================
                        // ADMIN
                        // =====================
                        // Approve / reject / view all / pending / by status
                        .requestMatchers(HttpMethod.PUT, "/api/requests/**")
                        .hasAuthority("ADMIN")

                        .requestMatchers(HttpMethod.GET, "/api/requests/**")
                        .hasAuthority("ADMIN")

                        // =====================
                        // DEFAULT
                        // =====================
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
