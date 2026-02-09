using donation_service.Entities;

namespace donation_service.Repositories.Interfaces;

public interface IDonationRepository
{
    void Save(Donation donation);
    Donation? GetById(int donationId);
    List<Donation> GetByDonorId(int donorId);
    void Update(Donation donation);
}
