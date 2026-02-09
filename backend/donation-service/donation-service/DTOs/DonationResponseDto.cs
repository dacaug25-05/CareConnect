namespace donation_service.DTOs;

public class DonationResponseDto
{
    public int DonationId { get; set; }
    public int RequestId { get; set; }
    public int DonorId { get; set; }
    public string DonationType { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public string Status { get; set; } = string.Empty;
    public DateTime DonatedAt { get; set; }
}
