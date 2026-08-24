import Link from 'next/link';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-50">
      <section className="pt-40 pb-16 px-6 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-zinc-400 text-sm mb-8">Last updated: August 2026</p>

        <div className="space-y-8 text-zinc-400 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-white mb-3">1. Information We Collect</h2>
            <p className="mb-2"><b className="text-white">Account information:</b> Name, email, username, profile image, and role (Creator or Business) provided during sign-up via Clerk authentication.</p>
            <p className="mb-2"><b className="text-white">Profile data:</b> Location, language, business name, website, social links, industry, and estimated monthly spend collected during onboarding.</p>
            <p><b className="text-white">Usage data:</b> Pages visited, campaigns interacted with, clips created, and performance metrics tracked for platform improvement.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To provide and operate the Clyppr marketplace.</li>
              <li>To process payments and verify views.</li>
              <li>To detect and prevent fraud.</li>
              <li>To communicate about campaigns, payouts, and platform updates.</li>
              <li>To improve our services and user experience.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">3. Data Storage and Security</h2>
            <p>Your data is stored securely via Supabase (PostgreSQL + RLS) and Clerk (authentication). We use industry-standard encryption and access controls. Profile images are stored in encrypted cloud storage with public read access for display purposes only.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">4. Third-Party Services</h2>
            <p className="mb-2">Clyppr integrates with the following third-party services:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><b className="text-white">Clerk</b> - Authentication and user management.</li>
              <li><b className="text-white">Supabase</b> - Database and file storage.</li>
              <li><b className="text-white">Vercel</b> - Hosting and deployment.</li>
            </ul>
            <p className="mt-2">Each service has its own privacy policy governing how your data is handled.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">5. Data Sharing</h2>
            <p>We do not sell your personal information. We may share data with:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Brands (for Creators): Only campaign-relevant data like clip performance and payout information.</li>
              <li>Creators (for Brands): Only campaign details and asset access.</li>
              <li>Law enforcement: When required by law or to protect platform integrity.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">6. Your Rights</h2>
            <p>You can access, update, or delete your profile data at any time through your dashboard settings. Account deletion can be requested by contacting support@clyppr.com. We will process deletion requests within 30 days.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">7. Cookies</h2>
            <p>Clyppr uses essential cookies for authentication and session management. We do not use third-party tracking cookies or sell data to advertisers.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">8. Changes to This Policy</h2>
            <p>We may update this privacy policy from time to time. Material changes will be communicated via email or platform notification. Continued use of Clyppr after changes constitutes acceptance.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">9. Contact</h2>
            <p>For privacy-related inquiries, contact us at <a href="mailto:privacy@clyppr.com" className="text-white underline">privacy@clyppr.com</a>.</p>
          </div>
        </div>

        <Link href="/" className="mt-12 inline-block text-white underline">Back to home</Link>
      </section>
    </div>
  );
}
