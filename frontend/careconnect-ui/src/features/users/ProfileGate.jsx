import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../app/AuthProvider";
import { getMyProfile } from "../../services/userService";
import { getRedirectPathByRole } from "../../utils/roleRedirect";

const ProfileGate = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        // 🔥 Token is sent automatically by Axios interceptor
        const data = await getMyProfile();

        if (!data.approved) {
          navigate("/pending-approval");
          return;
        }

        if (!data.profileExists) {
          if (data.role === "BENEFICIARY") {
            navigate("/beneficiary/profile");
          } else {
            navigate("/donor/profile");
          }
          return;
        }

        navigate(getRedirectPathByRole(data.role));
      } catch (err) {
        logout();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [navigate, logout]);

  if (loading) {
    return <p className="text-center mt-10">Checking account...</p>;
  }

  return null;
};

export default ProfileGate;
