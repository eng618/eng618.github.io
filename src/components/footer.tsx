export function Footer() {
  return (
    <footer className="border-border bg-background border-t py-12">
      <div className="container mx-auto px-4 text-center lg:px-8">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Eric N. Garcia. Built with Next.js & Tailwind CSS 4.
        </p>
      </div>
    </footer>
  );
}
