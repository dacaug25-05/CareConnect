import { ROLES } from "./roles";

export const getRedirectPathByRole = (user) => {
  if (!user) return "/login";

  if (user.approved === false) {
    if (
      user.role === ROLES.INDIVIDUAL_DONOR ||
      user.role === ROLES.ORGANIZATION_DONOR
    ) {
      return "/donor/profile";
    }

    if (user.role === ROLES.BENEFICIARY) {
      return "/beneficiary/profile";
    }

    return "/pending-approval";
  }

  switch (user.role) {
    case ROLES.INDIVIDUAL_DONOR:
            return "/donor/ind"; 

    case ROLES.ORGANIZATION_DONOR:
      return "/donor/org"; 

    case ROLES.BENEFICIARY:
      return "/beneficiary";

    case ROLES.ADMIN:
      return "/admin";

    default:
      return "/403";
  }
};
