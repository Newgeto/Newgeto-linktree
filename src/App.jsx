import { useState, useEffect, useRef } from 'react';
import LightPillar from './components/LightPillar.jsx';
import GradientText from './components/GradientText.jsx';
import ShinyText from './components/ShinyText.jsx';
import ClickSpark from './components/ClickSpark.jsx';
import Magnet from './components/Magnet.jsx';
import GlareHover from './components/GlareHover.jsx';

/* ------------------------------------------------------------------ */
/*  👉  MODIFIE ICI : tes infos et tes liens                          */
/* ------------------------------------------------------------------ */
const PROFILE = {
  name: 'Aziz Anakin',
  // Mets l'URL d'une image (ou laisse vide pour afficher les initiales)
  avatar: 'https://avatars.githubusercontent.com/u/134959102?v=4',
};

const LINKS = [
  { label: 'GitHub', url: 'https://github.com/Aziz-Anakin', icon: 'github', accent: '#ffffff' },
  { label: 'Portfolio', url: 'https://aziz-anakin.github.io/Portfolio/', icon: 'portfolio', accent: '#FF9FFC' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/yanis-mdoughy-558a1028b', icon: 'linkedin', accent: '#0A66C2' },
  { label: 'Steam', url: 'https://steamcommunity.com/id/Aziz-anakin/', icon: 'steam', accent: '#66C0F4' },
  { label: 'Email', url: 'mailto:yanis.mdoughy@outlook.fr', icon: 'email', accent: '#34D399' },
];

// 🌐 Traductions FR / EN
const STRINGS = {
  fr: {
    bio: "Passionné par l'informatique et les jeux vidéo",
    rights: 'Tous droits réservés',
    sub: {
      GitHub: 'Mes projets & code source',
      Portfolio: 'Découvre mon travail',
      LinkedIn: 'Mon parcours professionnel',
      Steam: 'Mon profil & mes jeux',
      Email: 'yanis.mdoughy@outlook.fr',
    },
    copied: 'Copié !',
    langAria: 'Switch to English',
  },
  en: {
    bio: 'Passionate about IT & video games',
    rights: 'All rights reserved',
    sub: {
      GitHub: 'My projects & source code',
      Portfolio: 'Check out my work',
      LinkedIn: 'My professional journey',
      Steam: 'My profile & games',
      Email: 'yanis.mdoughy@outlook.fr',
    },
    copied: 'Copied!',
    langAria: 'Passer en français',
  },
};
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
    case 'portfolio':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          <path d="M2 13h20" />
        </svg>
      );
    case 'email':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m2 6 10 7L22 6" />
        </svg>
      );
    case 'steam':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.252 0-2.265-1.014-2.265-2.265z" />
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

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const FlagFR = ({ className }) => (
  <svg viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
    <rect width="3" height="2" fill="#fff" />
    <rect width="1" height="2" fill="#0055A4" />
    <rect x="2" width="1" height="2" fill="#EF4135" />
  </svg>
);

const FlagGB = ({ className }) => (
  <svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
    <clipPath id="gb-clip">
      <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
    </clipPath>
    <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
    <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#gb-clip)" stroke="#C8102E" strokeWidth="4" />
    <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
    <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
  </svg>
);

const initials = (name) =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

function LinkCard({ link, sublabel, index, copiedLabel }) {
  const isCopy = Boolean(link.copyText);
  const isExternal = !isCopy && link.url && !link.url.startsWith('mailto:');
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link.copyText);
    } catch {
      // Presse-papiers indisponible — on affiche quand même le retour visuel.
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  };

  return (
    <Magnet
      padding={40}
      magnetStrength={12}
      wrapperClassName="fade-up"
      innerClassName="block w-full"
      style={{ display: 'block', width: '100%', animationDelay: `${0.15 + index * 0.08}s` }}
    >
      <div className="link-star group">
        <div className="inner-content">
          <GlareHover
            width="100%"
            height="auto"
            background="transparent"
            borderColor="transparent"
            borderRadius="16px"
            glareColor="#ffffff"
            glareOpacity={0.18}
            glareAngle={-40}
            glareSize={220}
            transitionDuration={750}
            className="link-glare"
          >
            {/* Élément plein cadre qui gère le clic (lien ou copie) */}
            {isCopy ? (
              <button
                type="button"
                onClick={handleCopy}
                aria-label={`${link.label} — ${copiedLabel}`}
                className="absolute inset-0 z-20 cursor-pointer"
              />
            ) : (
              <a
                href={link.url}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                aria-label={link.label}
                className="absolute inset-0 z-20"
              />
            )}

            <div className="relative z-10 flex w-full items-center gap-3 px-4 py-3 sm:gap-4 sm:py-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-11 sm:w-11">
                <Icon name={link.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
              </span>

              <span className="min-w-0 flex-1 text-left">
                <span className="block text-sm font-semibold text-white">{link.label}</span>
                <span
                  className={`block truncate text-[11px] sm:text-xs ${
                    isCopy && copied ? 'text-[#34D399]' : 'text-white/45'
                  }`}
                >
                  {isCopy && copied ? copiedLabel : sublabel}
                </span>
              </span>

              <span
                className={`transition-colors duration-300 group-hover:text-white ${
                  isCopy && copied ? 'text-[#34D399]' : 'text-white/40'
                }`}
              >
                {isCopy ? copied ? <CheckIcon /> : <CopyIcon /> : <ArrowIcon />}
              </span>
            </div>
          </GlareHover>
        </div>
      </div>
    </Magnet>
  );
}

export default function App() {
  const [lang, setLang] = useState('fr');
  const t = STRINGS[lang];

  // Bloque le copier-coller et le menu contextuel sur toute la page
  useEffect(() => {
    const prevent = (e) => e.preventDefault();
    document.addEventListener('copy', prevent);
    document.addEventListener('cut', prevent);
    document.addEventListener('contextmenu', prevent);
    return () => {
      document.removeEventListener('copy', prevent);
      document.removeEventListener('cut', prevent);
      document.removeEventListener('contextmenu', prevent);
    };
  }, []);

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

        {/* Sélecteur de langue (FR / EN) */}
        <div className="fixed right-3 top-3 z-30 flex items-center gap-2 sm:right-5 sm:top-5">
          <button
            type="button"
            onClick={() => setLang((l) => (l === 'fr' ? 'en' : 'fr'))}
            aria-label={t.langAria}
            title={t.langAria}
            className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/30"
          >
            {lang === 'fr' ? <FlagGB className="h-full w-full" /> : <FlagFR className="h-full w-full" />}
          </button>
        </div>

        {/* Contenu */}
        <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-5 py-5 sm:py-16">
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
                <ShinyText text={t.bio} speed={4} color="#a8a2c4" shineColor="#ffffff" />
              </p>
            </header>

            {/* Liens */}
            <nav className="mt-5 flex flex-col gap-2 sm:mt-10 sm:gap-3.5">
              {LINKS.map((link, index) => (
                <LinkCard
                  key={link.label}
                  link={link}
                  sublabel={t.sub[link.label]}
                  index={index}
                  copiedLabel={t.copied}
                />
              ))}
            </nav>
          </section>
        </div>
      </main>
    </ClickSpark>
  );
}
