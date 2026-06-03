import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@gv-tech/ui-web';
import { ExternalLink, FileText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CertProps {
  title: string;
  image: string;
  url: string;
  authority: string;
  completed: string;
  description: string;
}

export function CertCard({ cert }: { cert: CertProps }) {
  // Extract specialization verification or certificate code from URL/path if needed.
  // The path literal is `/coursera/cirtificates/Coursera 7OILY7UNYA5A.pdf`
  // Verification URL for specializations on Coursera: https://coursera.org/verify/specialization/7OILY7UNYA5A
  const isCoursera =
    cert.url.includes('coursera') ||
    cert.authority.toLowerCase().includes('coursera') ||
    cert.authority.toLowerCase().includes('google');
  const codeMatch = cert.url.match(/Coursera\s+([A-Z0-9]+)\.pdf/i);
  const certCode = codeMatch ? codeMatch[1] : null;
  const verifyUrl = certCode && isCoursera ? `https://coursera.org/verify/specialization/${certCode}` : cert.url;

  return (
    <Card className="hover:bg-accent/30 h-full transition-all hover:shadow-md">
      <div className="bg-muted/20 relative flex aspect-[4/3] items-center justify-center overflow-hidden p-6">
        <Image
          src={cert.image}
          alt={cert.title}
          width={280}
          height={210}
          className="object-contain transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <Link
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            title="View PDF Certificate"
            className="bg-background/80 hover:bg-background border-border text-muted-foreground hover:text-primary flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-sm transition-colors"
          >
            <FileText className="h-4 w-4" />
          </Link>
          <Link
            href={verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Verify Certificate"
            className="bg-background/80 hover:bg-background border-border text-muted-foreground hover:text-primary flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-sm transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="font-outfit line-clamp-2 text-lg font-bold">{cert.title}</CardTitle>
            <CardDescription className="mt-1">{cert.authority}</CardDescription>
          </div>
          <span className="text-muted-foreground bg-muted/50 rounded px-2 py-0.5 text-xs font-semibold whitespace-nowrap">
            {cert.completed}
          </span>
        </div>
      </CardHeader>
      <CardContent className="mt-auto">
        <p className="text-muted-foreground line-clamp-3 text-sm">{cert.description}</p>
      </CardContent>
    </Card>
  );
}
