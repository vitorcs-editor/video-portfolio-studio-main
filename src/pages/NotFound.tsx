import { useLang } from "@/lib/lang";

const NotFound = () => {
  const { t } = useLang();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center px-6">
        <h1 className="font-impact text-8xl text-primary drop-shadow-[0_0_30px_hsl(var(--primary)/0.4)] mb-2">404</h1>
        <p className="mb-6 text-lg text-white/60">{t.notFound.message}</p>
        <a
          href="/"
          className="inline-block px-6 py-3 rounded-full bg-primary text-background font-bold text-sm uppercase tracking-widest hover:brightness-110 transition-all"
        >
          {t.notFound.back}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
