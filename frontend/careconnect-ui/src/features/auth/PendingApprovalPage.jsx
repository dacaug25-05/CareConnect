const PendingApprovalPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          Approval Pending ⏳
        </h2>
        <p className="text-gray-600">
          Your account has been created successfully.
          An admin must approve your account before you can continue.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          Please check back later.
        </p>
      </div>
    </div>
  );
};

export default PendingApprovalPage;
