export default function Legal() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Legal Information</h1>
      
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Company Information</h2>
          <p className="mb-4">
            tmg is operated by Try My Guys, Inc., a company registered in the United States.
          </p>
          <ul className="list-none space-y-2">
            <li><strong>Registration Number:</strong> [Company Registration Number]</li>
            <li><strong>Registered Address:</strong> [Company Address]</li>
            <li><strong>Contact Email:</strong> support@trymyguys.com</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Legal Compliance</h2>
          <p className="mb-4">
            We are committed to complying with all applicable laws and regulations, including but not limited to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Data Protection and Privacy Laws</li>
            <li>Consumer Protection Laws</li>
            <li>Electronic Commerce Regulations</li>
            <li>Anti-Discrimination Laws</li>
            <li>Employment Laws</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Dispute Resolution</h2>
          <p>
            Any disputes arising from the use of our services shall be resolved through arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall take place in [City, State].
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Intellectual Property Rights</h2>
          <p className="mb-4">
            The tmg name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Try My Guys, Inc. or its affiliates. You must not use such marks without our prior written permission.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Licensing Information</h2>
          <p>
            All professional service providers on our platform are required to maintain appropriate licenses and insurance as required by applicable state and local laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Copyright Notice</h2>
          <p>
            © {new Date().getFullYear()} Try My Guys, Inc. All rights reserved. All content on this website is protected by copyright laws and may not be reproduced, distributed, transmitted, displayed, published, or broadcast without our prior written permission.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Legal Department</h2>
          <p>
            For legal inquiries, please contact our legal department at{" "}
            <a href="mailto:legal@trymyguys.com" className="text-blue-600 hover:underline">
              legal@trymyguys.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
