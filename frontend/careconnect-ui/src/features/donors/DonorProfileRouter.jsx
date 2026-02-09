import { useAuth } from "../../app/AuthProvider";
import IndividualDonorProfile from "./IndividualDonorProfile";
import OrganizationDonorProfile from "./OrganizationDonorProfile";

const DonorProfileRouter = () => {
  const { user } = useAuth();

  if (user.role === "ORGANIZATION_DONOR") {
    return <OrganizationDonorProfile />;
  }
else{
  return <IndividualDonorProfile />;
}
};

export default DonorProfileRouter;
