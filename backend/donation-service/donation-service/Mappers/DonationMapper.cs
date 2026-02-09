using donation_service.DTOs;
using donation_service.Entities;

namespace donation_service.Mappers;

public static class DonationMapper
{
    public static Donation ToEntity(
        DonationCreateDto dto,
        int donorId
    )
    {
        return new Donation
        {
            RequestId = dto.RequestId,
            DonorId = donorId,
            DonationType = dto.DonationType,
            Quantity = dto.Quantity,
            IsAnonymous = dto.IsAnonymous,
            Status = "INITIATED",
            DonatedAt = DateTime.UtcNow
        };
    }

    public static DonationResponseDto ToDto(Donation entity)
    {
        return new DonationResponseDto
        {
            DonationId = entity.DonationId,
            RequestId = entity.RequestId,
            DonorId = entity.DonorId,
            DonationType = entity.DonationType,
            Quantity = entity.Quantity,
            Status = entity.Status,
            DonatedAt = entity.DonatedAt
        };
    }
}
