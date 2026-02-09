using System.Security.Claims;

namespace donation_service.Security;

public static class JwtClaimsHelper
{
    public static int GetUserId(ClaimsPrincipal user)
    {
        var uid = user.FindFirst("uid")?.Value
                  ?? throw new UnauthorizedAccessException("JWT missing uid claim");

        if (!int.TryParse(uid, out int userId))
            throw new UnauthorizedAccessException("JWT uid must be an integer");

        return userId;
    }

    public static string GetRole(ClaimsPrincipal user)
    {
        return user.FindFirst("role")?.Value
            ?? throw new UnauthorizedAccessException("JWT missing role claim");
    }

    public static string GetEmail(ClaimsPrincipal user)
    {
        return user.FindFirst("email")?.Value
            ?? throw new UnauthorizedAccessException("JWT missing email claim");
    }
}
