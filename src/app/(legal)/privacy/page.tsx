export default function PrivacyPolicy() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 ~py-32/40">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose max-w-none">
        <p className="mb-6">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            At tmg, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
          <p className="mb-4">We collect information that you provide directly to us, including:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Name and contact information</li>
            <li>Account credentials</li>
            <li>Profile information</li>
            <li>Payment information</li>
            <li>Communication preferences</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <p className="mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide and maintain our services</li>
            <li>Process your transactions</li>
            <li>Send you service-related communications</li>
            <li>Improve our services</li>
            <li>Protect against fraud and abuse</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Information Sharing</h2>
          <p>
            We do not sell or rent your personal information to third parties. We may share your information with service providers who assist us in operating our website and conducting our business.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:support@trymyguys.com" className="text-blue-600 hover:underline">
              support@trymyguys.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
