using donation_service.Data;
using donation_service.Entities;
using donation_service.Repositories.Interfaces;

namespace donation_service.Repositories.Implementations;

public class DonationRepository : IDonationRepository
{
    private readonly CareConnectDbContext _context;

    public DonationRepository(CareConnectDbContext context)
    {
        _context = context;
    }

    public void Save(Donation donation)
    {
        _context.Donations.Add(donation);
        _context.SaveChanges();
    }

    public Donation? GetById(int donationId)
    {
        return _context.Donations
            .FirstOrDefault(d => d.DonationId == donationId);
    }

    public List<Donation> GetByDonorId(int donorId)
    {
        return _context.Donations
            .Where(d => d.DonorId == donorId)
            .ToList();
    }

    public void Update(Donation donation)
    {
        _context.Donations.Update(donation);
        _context.SaveChanges();
    }
}
