namespace donation_service.DTOs;

public class DonationCreateDto
{
    public int RequestId { get; set; }
    public string DonationType { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public bool IsAnonymous { get; set; }
}
