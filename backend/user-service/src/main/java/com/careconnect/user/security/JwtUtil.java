package com.careconnect.user.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    private SecretKey secretKey;

    @PostConstruct
    public void logSecret() {
        System.out.println("USER JWT_SECRET = " + secret);
        System.out.println("USER JWT_SECRET length = " + secret.length());
    }

    @PostConstruct
    public void initKey() {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public Integer extractUserId(String token) {
        Claims claims = parseClaims(token);

        Object uid = claims.get("uid");
        if (uid == null) {
            throw new RuntimeException("JWT missing uid claim");
        }

        return Integer.parseInt(uid.toString());
    }

    public String extractUserEmail(String token) {
        Claims claims = parseClaims(token);
        return claims.getSubject();
    }

    public String extractUserRole(String token) {
        Claims claims = parseClaims(token);
        return String.valueOf(claims.get("role"));
    }

    private Claims parseClaims(String token) {
        if (token == null || token.isBlank()) {
            throw new RuntimeException("JWT token is missing");
        }

        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

}
