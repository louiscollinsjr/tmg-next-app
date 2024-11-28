export default function TermsOfUse() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Terms of Use</h1>
      
      <div className="prose max-w-none">
        <p className="mb-6">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
          <p>
            By accessing or using tmg&apos;s website and services, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Description of Services</h2>
          <p>
            tmg provides a platform connecting homeowners with professional service providers. We facilitate the discovery, communication, and booking of home improvement and maintenance services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
          <p className="mb-4">When creating an account, you agree to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Promptly update any changes to your information</li>
            <li>Accept responsibility for all activities under your account</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. User Conduct</h2>
          <p className="mb-4">You agree not to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on intellectual property rights</li>
            <li>Harass or harm other users</li>
            <li>Submit false or misleading information</li>
            <li>Attempt to gain unauthorized access to our systems</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
          <p>
            All content, features, and functionality of our website are owned by tmg and protected by international copyright, trademark, and other intellectual property laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
          <p>
            tmg shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through our website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Contact Information</h2>
          <p>
            For questions about these Terms of Use, please contact us at{" "}
            <a href="mailto:support@trymyguys.com" className="text-blue-600 hover:underline">
              support@trymyguys.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
