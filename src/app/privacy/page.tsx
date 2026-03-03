import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { PlausibleOptOutToggle } from '@/components/plausible-opt-out-toggle';

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
              This site uses Plausible Analytics, a privacy-friendly analytics service that does not use cookies or
              collect personal data. Plausible collects only aggregated, anonymized data about:
            </p>
            <ul>
              <li>Page views</li>
              <li>Form submissions</li>
              <li>Outbound link clicks</li>
              <li>File downloads (PDFs, documents, etc.)</li>
            </ul>
            <p>
              Custom properties such as page titles are also tracked to help understand content engagement. No
              personally identifiable information is collected or stored. For more details, see the{' '}
              <a
                href="https://plausible.io/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline"
              >
                Plausible Privacy Policy
              </a>
              .
            </p>
            <h2>Opting out of analytics</h2>
            <p>
              If you prefer not to be included in analytics, you can opt out using your browser's developer tools or by
              visiting this page and using the opt-out button (if available). When you opt out, Plausible will not
              collect any data about your visits. To opt out, run this command in your browser's console:
            </p>
            <code className="bg-muted block rounded p-2">localStorage.plausible_ignore = "true"</code>
            <p>To opt back in, you can remove this setting or use:</p>
            <code className="bg-muted block rounded p-2">localStorage.removeItem("plausible_ignore")</code>
          </div>
          <div className="mt-8">
            <PlausibleOptOutToggle />
          </div>
          <div className="prose text-muted-foreground mt-8 max-w-none">
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
