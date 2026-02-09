package com.careconnect.beneficiary.security;

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
        System.out.println("BENEFICIARY JWT_SECRET = " + secret);
        System.out.println("BENEFICIARY JWT_SECRET length = " + secret.length());
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

    public String extractEmail(String token) {
        Claims claims = parseClaims(token);
        return claims.getSubject();
    }

    public String extractRole(String token) {
        Claims claims = parseClaims(token);
        return claims.get("role", String.class);
    }

    private Claims parseClaims(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
