import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroButton from "../../components/HeroButton";
import Footer from "../../components/Footer";
import api from "../../services/api";

const LandingPage = () => {
  const navigate = useNavigate();

  // ALWAYS keep array
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApprovedRequests();
  }, []);

  const loadApprovedRequests = async () => {
    try {
      const res = await api.get("/api/requests/approved");

      /**
       * Backend-safe extraction
       * Supports:
       * 1. []
       * 2. { data: [] }
       * 3. { content: [] }
       */
      let list = [];

      if (Array.isArray(res.data)) {
        list = res.data;
      } else if (Array.isArray(res.data?.data)) {
        list = res.data.data;
      } else if (Array.isArray(res.data?.content)) {
        list = res.data.content;
      }

      setApprovedRequests(list);
    } catch (err) {
      console.error("Failed to load approved requests", err);
      setApprovedRequests([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50">
      {/* ================= HERO ================= */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white py-28">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            CareConnect
          </h1>
          <p className="mt-6 text-xl max-w-3xl mx-auto text-emerald-50">
            A transparent platform connecting donors with verified people who truly need help.
          </p>

          <div className="mt-10 flex justify-center gap-6">
            <HeroButton onClick={() => navigate("/login")}>
              Donate Now
            </HeroButton>
            <HeroButton
              variant="secondary"
              onClick={() => navigate("/login")}
            >
              Request Help
            </HeroButton>
          </div>
        </div>
      </section>

      {/* ================= APPROVED REQUESTS ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-14">
            Current Requests
          </h2>

          {loading ? (
            <p className="text-center text-gray-500">Loading requests...</p>
          ) : approvedRequests.length === 0 ? (
            <p className="text-center text-gray-500">
              No approved requests available right now.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {approvedRequests.map((req) => (
                <div
                  key={req.requestId}
                  className="bg-slate-50 border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
                >
                  <span className="inline-block text-xs font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                    {req.requestType}
                  </span>

                  <h3 className="mt-4 text-lg font-bold text-gray-900">
                    {req.description}
                  </h3>

                  <p className="mt-3 text-gray-600">
                    Quantity Needed:{" "}
                    <span className="font-semibold text-gray-900">
                      {req.quantity}
                    </span>
                  </p>

                  <button
                    onClick={() => navigate("/login")}
                    className="mt-6 w-full rounded-xl bg-emerald-600 text-white py-3 font-semibold hover:bg-emerald-700 transition"
                  >
                    Donate Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= WHY CARECONNECT ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900">
            Why CareConnect?
          </h2>

          <div className="grid md:grid-cols-3 gap-10 mt-16">
            <Feature
              title="Verified Requests"
              desc="Every help request is reviewed and approved by admins to ensure authenticity."
            />
            <Feature
              title="Transparent Process"
              desc="Track request status, approvals, and donations with full transparency."
            />
            <Feature
              title="Direct Impact"
              desc="Your contribution reaches the exact beneficiary who needs it."
            />
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-10 mt-16 text-center">
            <Step number="1" title="Register">
              Create an account as a donor or beneficiary.
            </Step>
            <Step number="2" title="Request or Donate">
              Beneficiaries raise requests. Donors choose whom to help.
            </Step>
            <Step number="3" title="Track Impact">
              Follow approvals, donations, and fulfillment.
            </Step>
          </div>
        </div>
      </section>

      {/* ================= TRUST ================= */}
      <section className="py-24 bg-gradient-to-r from-slate-100 to-slate-200">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Built on Trust & Transparency
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            Admin approvals, verified beneficiaries, and clear request tracking
            ensure that every contribution creates real impact.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;

/* ================= HELPER COMPONENTS ================= */

const Feature = ({ title, desc }) => (
  <div className="bg-slate-50 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition">
    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
    <p className="mt-3 text-gray-600">{desc}</p>
  </div>
);

const Step = ({ number, title, children }) => (
  <div className="bg-white rounded-2xl p-8 shadow-sm">
    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white font-bold">
      {number}
    </div>
    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
    <p className="mt-3 text-gray-600">{children}</p>
  </div>
);
