import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="bg-background flex-grow py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="font-outfit mb-6 text-4xl font-bold lg:text-5xl">Privacy Policy</h1>
          <div className="prose text-muted-foreground max-w-none">
            <p>
              Your privacy is important to me. This policy explains what information is collected, why it is collected,
              and how it is used.
            </p>
            <h2>Information I collect</h2>
            <p>
              I do not collect any personal information from visitors to this site. If you contact me via the contact
              form or email, those messages are sent through a third-party service and I only receive the information
              you choose to provide.
            </p>
            <h2>Cookies and tracking</h2>
            <p>
              This site uses OpenPanel, a privacy-friendly, open-source analytics service that does not use cookies or
              collect personal data. OpenPanel collects only aggregated, anonymized data about:
            </p>
            <ul>
              <li>Page views and screen transitions</li>
              <li>Outbound link clicks</li>
              <li>Interactive features and performance metrics (e.g. Web Vitals)</li>
            </ul>
            <p>
              No personally identifiable information or cross-site tracking data is collected or stored. For more
              details, see the{' '}
              <a
                href="https://openpanel.dev/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline"
              >
                OpenPanel Privacy Policy
              </a>
              .
            </p>
            <h2>External links</h2>
            <p>
              Links to other websites are provided for convenience. I am not responsible for the content or privacy
              practices of those external sites.
            </p>
            <h2>Changes to this policy</h2>
            <p>
              I may update this policy from time to time. The date at the top of the page indicates when it was last
              revised.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
