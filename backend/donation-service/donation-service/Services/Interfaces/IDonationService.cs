using donation_service.DTOs;

namespace donation_service.Services.Interfaces;

public interface IDonationService
{
    void CreateDonation(int donorId, DonationCreateDto dto);
    List<DonationResponseDto> GetMyDonations(int donorId);
    void CompleteDonation(int donationId);
    void CancelDonation(int donationId);
}
