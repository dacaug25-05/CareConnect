using donation_service.DTOs;
using donation_service.Security;
using donation_service.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace donation_service.Controllers;

[ApiController]
[Route("api/donations")]
[Authorize]
public class DonationController : ControllerBase
{
    private readonly IDonationService _donationService;

    public DonationController(IDonationService donationService)
    {
        _donationService = donationService;
    }

    [HttpPost]
    [Authorize(Roles = "INDIVIDUAL_DONOR,ORGANIZATION_DONOR")]
    public IActionResult CreateDonation([FromBody] DonationCreateDto dto)
    {
        int donorId = JwtClaimsHelper.GetUserId(User);
        _donationService.CreateDonation(donorId, dto);
        return Ok("Donation INITIATED");
    }

    [HttpGet("me")]
    [Authorize(Roles = "INDIVIDUAL_DONOR,ORGANIZATION_DONOR")]
    public IActionResult GetMyDonations()
    {
        int donorId = JwtClaimsHelper.GetUserId(User);
        return Ok(_donationService.GetMyDonations(donorId));
    }

    [HttpPut("{donationId}/complete")]
    [Authorize(Roles = "ADMIN")]
    public IActionResult CompleteDonation(int donationId)
    {
        _donationService.CompleteDonation(donationId);
        return Ok($"Donation {donationId} marked COMPLETED");
    }

    [HttpPut("{donationId}/cancel")]
    [Authorize(Roles = "ADMIN,INDIVIDUAL_DONOR,ORGANIZATION_DONOR")]
    public IActionResult CancelDonation(int donationId)
    {
        _donationService.CancelDonation(donationId);
        return Ok($"Donation {donationId} CANCELLED");
    }
}
