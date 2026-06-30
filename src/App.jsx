import { useState } from 'react';
import LightPillar from './components/LightPillar.jsx';
import GradientText from './components/GradientText.jsx';
import ShinyText from './components/ShinyText.jsx';
import SpotlightCard from './components/SpotlightCard.jsx';
import ClickSpark from './components/ClickSpark.jsx';

/* ------------------------------------------------------------------ */
/*  👉  MODIFIE ICI : tes infos et tes liens                          */
/* ------------------------------------------------------------------ */
const PROFILE = {
  name: 'Newgeto',
  bio: "Passionné par l'informatique et les jeux vidéo",
  // Mets l'URL d'une image (ou laisse vide pour afficher les initiales)
  avatar: 'https://avatars.githubusercontent.com/u/134959102?v=4',
};

const LINKS = [
  {
    label: 'GitHub',
    sublabel: 'Mes projets & code source',
    url: 'https://github.com/Newgeto',
    icon: 'github',
    accent: '#ffffff',
  },
  {
    label: 'Portfolio',
    sublabel: 'Découvre mon travail',
    url: 'https://newgeto.github.io/Portfolio/',
    icon: 'portfolio',
    accent: '#FF9FFC',
  },
  {
    label: 'LinkedIn',
    sublabel: 'Mon parcours professionnel',
    url: 'https://www.linkedin.com/in/yanis-mdoughy-558a1028b',
    icon: 'linkedin',
    accent: '#0A66C2',
  },
  {
    label: 'Discord',
    sublabel: 'Aziz_Anakin — clique pour copier',
    copy: 'Aziz_Anakin',
    icon: 'discord',
    accent: '#5865F2',
  },
];
/* ------------------------------------------------------------------ */

const Icon = ({ name, className }) => {
  switch (name) {
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
        </svg>
      );
    case 'github':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.38-1.34-1.75-1.34-1.75-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.13-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.23 0 4.63-2.8 5.65-5.48 5.95.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
        </svg>
      );
    case 'discord':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M20.32 4.37A19.79 19.79 0 0 0 15.45 3a13.6 13.6 0 0 0-.62 1.27 18.27 18.27 0 0 0-5.66 0A13.6 13.6 0 0 0 8.55 3a19.74 19.74 0 0 0-4.88 1.37C.56 8.98-.28 13.48.14 17.92a19.9 19.9 0 0 0 6.03 3.05c.49-.66.92-1.36 1.29-2.1-.71-.27-1.39-.6-2.03-.99.17-.13.34-.26.5-.39a14.21 14.21 0 0 0 12.14 0c.16.14.33.27.5.39-.65.39-1.33.72-2.04.99.37.74.8 1.44 1.29 2.1a19.84 19.84 0 0 0 6.03-3.05c.5-5.18-.84-9.64-3.53-13.55zM8.02 15.33c-1.18 0-2.15-1.08-2.15-2.42 0-1.33.95-2.42 2.15-2.42 1.2 0 2.17 1.09 2.15 2.42 0 1.34-.95 2.42-2.15 2.42zm7.96 0c-1.18 0-2.15-1.08-2.15-2.42 0-1.33.95-2.42 2.15-2.42 1.2 0 2.17 1.09 2.15 2.42 0 1.34-.94 2.42-2.15 2.42z" />
        </svg>
      );
    case 'portfolio':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          <path d="M2 13h20" />
        </svg>
      );
    default:
      return null;
  }
};

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const CopyIcon = ({ copied }) =>
  copied ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-emerald-400">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );

const initials = (name) =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

function LinkCard({ link, index }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link.copy);
    } catch {
      const el = document.createElement('textarea');
      el.value = link.copy;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  // Couche de navigation/action en plein cadre (au-dessus du contenu décoratif)
  const cover = link.copy ? (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copier mon pseudo Discord ${link.copy}`}
      className="absolute inset-0 z-20 cursor-pointer"
    />
  ) : (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={link.label}
      className="absolute inset-0 z-20"
    />
  );

  return (
    <div className="fade-up" style={{ animationDelay: `${0.15 + index * 0.08}s` }}>
      <SpotlightCard
        spotlightColor={`${link.accent}40`}
        className="group !rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08] hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
      >
        {cover}

        <div className="relative z-10 flex items-center gap-3 px-4 py-3 sm:gap-4 sm:py-3.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-11 sm:w-11">
            <Icon name={link.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
          </span>

          <span className="flex-1 min-w-0 text-left">
            <span className="block text-sm font-semibold text-white">{link.label}</span>
            <span className="block truncate text-[11px] text-white/45 sm:text-xs">
              {copied ? 'Copié dans le presse-papier ✓' : link.sublabel}
            </span>
          </span>

          <span className="text-white/40 transition-colors duration-300 group-hover:text-white">
            {link.copy ? <CopyIcon copied={copied} /> : <ArrowIcon />}
          </span>
        </div>
      </SpotlightCard>
    </div>
  );
}

export default function App() {
  return (
    <ClickSpark sparkColor="#FF9FFC" sparkSize={9} sparkRadius={18} sparkCount={9} duration={500}>
      <main className="relative min-h-screen w-full overflow-hidden">
        {/* Background Light Pillar (React Bits) — en diagonale, plus grand et plus lointain */}
        <div className="pointer-events-none fixed inset-0 z-0 origin-center scale-125">
          <LightPillar
            topColor="#5227FF"
            bottomColor="#FF9FFC"
            intensity={0.85}
            rotationSpeed={0.22}
            pillarWidth={4.6}
            pillarHeight={0.32}
            pillarRotation={-38}
            glowAmount={0.0045}
            noiseIntensity={0.35}
          />
        </div>

        {/* Voile sombre pour la lisibilité (radial centré + dégradé vertical) */}
        <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(5,6,10,0.55)_0%,rgba(5,6,10,0.25)_45%,rgba(5,6,10,0.8)_100%)]" />
        <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />

        {/* Contenu */}
        <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-5 py-6 sm:py-16">
          <section className="w-full max-w-md">
            {/* En-tête / profil */}
            <header className="flex flex-col items-center text-center">
              <div className="fade-up relative" style={{ animationDelay: '0s' }}>
                <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#5227FF] to-[#FF9FFC] opacity-70 blur-md" />
                {PROFILE.avatar ? (
                  <img
                    src={PROFILE.avatar}
                    alt={PROFILE.name}
                    className="relative h-24 w-24 rounded-full object-cover ring-2 ring-white/20 sm:h-32 sm:w-32"
                  />
                ) : (
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white/5 text-2xl font-semibold text-white ring-2 ring-white/20 backdrop-blur-sm sm:h-32 sm:w-32 sm:text-3xl">
                    {initials(PROFILE.name)}
                  </div>
                )}
              </div>

              {/* h1 caché pour le SEO + nom animé (GradientText - React Bits) */}
              <h1 className="sr-only">{PROFILE.name}</h1>
              <div className="fade-up mt-4 sm:mt-5" style={{ animationDelay: '0.07s' }} aria-hidden="true">
                <GradientText
                  className="font-display text-3xl font-bold tracking-tight sm:text-4xl"
                  colors={['#5227FF', '#FF9FFC', '#B497CF', '#5227FF']}
                  animationSpeed={7}
                >
                  {PROFILE.name}
                </GradientText>
              </div>

              <p className="fade-up mt-2 max-w-xs text-[13px] leading-relaxed sm:mt-3 sm:text-sm" style={{ animationDelay: '0.12s' }}>
                <ShinyText text={PROFILE.bio} speed={4} color="#a8a2c4" shineColor="#ffffff" />
              </p>
            </header>

            {/* Liens */}
            <nav className="mt-6 flex flex-col gap-2.5 sm:mt-10 sm:gap-3.5">
              {LINKS.map((link, index) => (
                <LinkCard key={link.label} link={link} index={index} />
              ))}
            </nav>

            {/* Footer */}
            <footer className="fade-up mt-6 text-center sm:mt-10" style={{ animationDelay: '0.55s' }}>
              <p className="text-[11px] text-white/30 sm:text-xs">
                © {new Date().getFullYear()} {PROFILE.name} — Tous droits réservés
              </p>
            </footer>
          </section>
        </div>
      </main>
    </ClickSpark>
  );
}
