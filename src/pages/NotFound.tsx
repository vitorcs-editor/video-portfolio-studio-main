import { useLang } from "@/lib/lang";

const NotFound = () => {
  const { t } = useLang();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center px-6">
        <h1 className="text-gradient text-9xl font-semibold tracking-[-0.06em] mb-2">404</h1>
        <p className="mb-6 text-lg text-white/60">{t.notFound.message}</p>
        <a
          href="/"
          className="btn-primary"
        >
          {t.notFound.back}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
