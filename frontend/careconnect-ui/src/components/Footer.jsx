const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-20">
      <div className="max-w-6xl mx-auto px-4 flex justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">CareConnect</h3>
          <p className="text-sm mt-2">
            Connecting donors with people who truly need help.
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <p>About</p>
          <p>Contact</p>
          <p>Privacy Policy</p>
          <p>Terms</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
