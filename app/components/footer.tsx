export default function Footer() {
  return (
    <footer className="mb-16">
      <p className="text-slate-600 dark:text-slate-300 text-xs">
        © {new Date().getFullYear()} MIT Licensed
      </p>
    </footer>
  );
}
