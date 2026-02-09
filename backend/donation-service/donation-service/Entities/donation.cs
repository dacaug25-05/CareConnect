using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace donation_service.Entities;

[Table("donations")]
public class Donation
{
    [Key]
    [Column("donation_id")]
    public int DonationId { get; set; }

    [Column("request_id")]
    public int RequestId { get; set; }

    [Column("donor_id")]
    public int DonorId { get; set; }

    [Column("donation_type")]
    public string DonationType { get; set; } = null!;

    [Column("quantity")]
    public int Quantity { get; set; }

    [Column("is_anonymous")]
    public bool IsAnonymous { get; set; }

    [Column("status")]
    public string Status { get; set; } = "INITIATED";

    [Column("donated_at")]
    public DateTime DonatedAt { get; set; }
}
