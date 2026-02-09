using donation_service.DTOs;
using donation_service.Mappers;
using donation_service.Repositories.Interfaces;
using donation_service.Services.Interfaces;

namespace donation_service.Services.Implementations;

public class DonationService : IDonationService
{
    private readonly IDonationRepository _repository;

    public DonationService(IDonationRepository repository)
    {
        _repository = repository;
    }

    public void CreateDonation(int donorId, DonationCreateDto dto)
    {
        var donation = DonationMapper.ToEntity(dto, donorId);
        _repository.Save(donation);
    }

    public List<DonationResponseDto> GetMyDonations(int donorId)
    {
        return _repository
            .GetByDonorId(donorId)
            .Select(DonationMapper.ToDto)
            .ToList();
    }

    public void CompleteDonation(int donationId)
    {
        var donation = _repository.GetById(donationId)
            ?? throw new Exception("Donation not found");

        donation.Status = "COMPLETED";
        _repository.Update(donation);
    }

    public void CancelDonation(int donationId)
    {
        var donation = _repository.GetById(donationId)
            ?? throw new Exception("Donation not found");

        donation.Status = "CANCELLED";
        _repository.Update(donation);
    }
}
