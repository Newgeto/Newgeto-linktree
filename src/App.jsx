import { useState, useEffect } from 'react';
import LightPillar from './components/LightPillar.jsx';
import GradientText from './components/GradientText.jsx';
import ShinyText from './components/ShinyText.jsx';
import ClickSpark from './components/ClickSpark.jsx';
import Magnet from './components/Magnet.jsx';
import GlareHover from './components/GlareHover.jsx';
import CircularGallery from './components/CircularGallery.jsx';

/* ------------------------------------------------------------------ */
/*  👉  MODIFIE ICI : tes infos, ta musique et tes liens              */
/* ------------------------------------------------------------------ */
const PROFILE = {
  name: 'Aziz Anakin',
  // Mets l'URL d'une image (ou laisse vide pour afficher les initiales)
  avatar: 'https://avatars.githubusercontent.com/u/134959102?v=4',
};

// 🎵 Colle ici le lien YouTube de ta musique (laisse '' pour désactiver le lecteur)
const MUSIC_URL = '';

const LINKS = [
  { label: 'GitHub', url: 'https://github.com/Newgeto', icon: 'github', accent: '#ffffff' },
  { label: 'Portfolio', url: 'https://newgeto.github.io/Portfolio/', icon: 'portfolio', accent: '#FF9FFC' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/yanis-mdoughy-558a1028b', icon: 'linkedin', accent: '#0A66C2' },
  { label: 'Email', url: 'mailto:yanis.mdoughy@outlook.fr', icon: 'email', accent: '#34D399' },
];

// 🎮 Mes jeux préférés — pochettes dans public/games/ (ajoute/retire librement)
const GAMES = [
  { image: '/games/gta-5.png', text: 'GTA V' },
  { image: '/games/minecraft.jpg', text: 'Minecraft' },
  { image: '/games/spider-man-2.jpg', text: 'Spider-Man 2' },
  { image: '/games/batman-arkham-knight.jpg', text: 'Arkham Knight' },
  { image: '/games/forza-horizon-6.jpg', text: 'Forza Horizon 6' },
  { image: '/games/sea-of-thieves.jpg', text: 'Sea of Thieves' },
  { image: '/games/star-citizen.png', text: 'Star Citizen' },
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
      Email: 'yanis.mdoughy@outlook.fr',
    },
    musicOn: 'Couper la musique',
    musicOff: 'Lancer la musique',
    musicNone: 'Ajoute ta musique dans le code',
    langLabel: 'EN',
    langAria: 'Switch to English',
    gamesAria: 'Voir mes jeux vidéo préférés',
    gamesTitle: 'Mes jeux préférés',
    gamesHint: 'Glisse ou scrolle pour parcourir',
    close: 'Fermer',
  },
  en: {
    bio: 'Passionate about IT & video games',
    rights: 'All rights reserved',
    sub: {
      GitHub: 'My projects & source code',
      Portfolio: 'Check out my work',
      LinkedIn: 'My professional journey',
      Email: 'yanis.mdoughy@outlook.fr',
    },
    musicOn: 'Mute music',
    musicOff: 'Play music',
    musicNone: 'Add your music in the code',
    langLabel: 'FR',
    langAria: 'Passer en français',
    gamesAria: 'See my favorite video games',
    gamesTitle: 'My favorite games',
    gamesHint: 'Drag or scroll to browse',
    close: 'Close',
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
    default:
      return null;
  }
};

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const GamepadIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <line x1="6" y1="11" x2="10" y2="11" />
    <line x1="8" y1="9" x2="8" y2="13" />
    <line x1="15" y1="12" x2="15.01" y2="12" />
    <line x1="18" y1="10" x2="18.01" y2="10" />
    <path d="M17.32 5H6.68a4 4 0 0 0-3.98 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.544-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" />
  </svg>
);

const CloseIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const MusicIcon = ({ on }) =>
  on ? (
    <span className="flex h-4 items-end gap-[2px]" aria-hidden="true">
      <span className="eq-bar" style={{ animationDelay: '0ms' }} />
      <span className="eq-bar" style={{ animationDelay: '150ms' }} />
      <span className="eq-bar" style={{ animationDelay: '300ms' }} />
    </span>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <path d="M11 5 6 9H2v6h4l5 4V5z" />
      <line x1="22" y1="9" x2="16" y2="15" />
      <line x1="16" y1="9" x2="22" y2="15" />
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

function getYouTubeId(url) {
  if (!url) return '';
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/))([\w-]{11})/);
  return m ? m[1] : '';
}

function MusicToggle({ t }) {
  const [on, setOn] = useState(false);
  const id = getYouTubeId(MUSIC_URL);
  const disabled = !id;

  const title = disabled ? t.musicNone : on ? t.musicOn : t.musicOff;

  return (
    <>
      <button
        type="button"
        onClick={() => !disabled && setOn((o) => !o)}
        disabled={disabled}
        aria-label={title}
        title={title}
        className={`flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 ${
          disabled
            ? 'cursor-not-allowed border-white/10 bg-white/[0.03] text-white/30'
            : on
              ? 'border-[#FF9FFC]/60 bg-[#FF9FFC]/15 text-[#FF9FFC] shadow-[0_0_18px_rgba(255,159,252,0.45)]'
              : 'border-white/10 bg-white/[0.05] text-white/70 hover:border-white/25 hover:text-white'
        }`}
      >
        <MusicIcon on={on} />
      </button>

      {on && id && (
        <iframe
          title="Lecteur de musique"
          src={`https://www.youtube.com/embed/${id}?autoplay=1&loop=1&playlist=${id}&controls=0&modestbranding=1&playsinline=1`}
          allow="autoplay"
          className="pointer-events-none fixed bottom-0 left-0 h-px w-px opacity-0"
          tabIndex={-1}
        />
      )}
    </>
  );
}

function LinkCard({ link, sublabel, index }) {
  const isExternal = !link.url.startsWith('mailto:');

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
            {/* Lien plein cadre (gère le clic) */}
            <a
              href={link.url}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              aria-label={link.label}
              className="absolute inset-0 z-20"
            />

            <div className="relative z-10 flex w-full items-center gap-3 px-4 py-3 sm:gap-4 sm:py-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-11 sm:w-11">
                <Icon name={link.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
              </span>

              <span className="min-w-0 flex-1 text-left">
                <span className="block text-sm font-semibold text-white">{link.label}</span>
                <span className="block truncate text-[11px] text-white/45 sm:text-xs">{sublabel}</span>
              </span>

              <span className="text-white/40 transition-colors duration-300 group-hover:text-white">
                <ArrowIcon />
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
  const [gamesOpen, setGamesOpen] = useState(false);
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

  // Ferme la galerie de jeux avec la touche Échap
  useEffect(() => {
    if (!gamesOpen) return;
    const onKey = (e) => e.key === 'Escape' && setGamesOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [gamesOpen]);

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

        {/* Barre de contrôles (jeux + musique + langue) */}
        <div className="fixed right-3 top-3 z-30 flex items-center gap-2 sm:right-5 sm:top-5">
          <button
            type="button"
            onClick={() => setGamesOpen(true)}
            aria-label={t.gamesAria}
            title={t.gamesAria}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/70 backdrop-blur-md transition-all duration-300 hover:border-[#FF9FFC]/60 hover:text-[#FF9FFC]"
          >
            <GamepadIcon className="h-5 w-5" />
          </button>
          <MusicToggle t={t} />
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

        {/* Galerie de jeux préférés (CircularGallery — React Bits) */}
        {gamesOpen && (
          <div
            className="modal-fade fixed inset-0 z-50 flex flex-col bg-[#05060a]/85 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label={t.gamesTitle}
            onClick={() => setGamesOpen(false)}
          >
            <div className="flex items-center justify-between px-5 pt-5 sm:px-8 sm:pt-7" onClick={(e) => e.stopPropagation()}>
              <div>
                <h2 className="font-display text-xl font-bold text-white sm:text-2xl">{t.gamesTitle}</h2>
                <p className="mt-0.5 text-[11px] text-white/40 sm:text-xs">{t.gamesHint}</p>
              </div>
              <button
                type="button"
                onClick={() => setGamesOpen(false)}
                aria-label={t.close}
                title={t.close}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/70 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:text-white"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="relative min-h-0 flex-1" onClick={(e) => e.stopPropagation()}>
              <CircularGallery
                items={GAMES}
                bend={3}
                textColor="#ffffff"
                borderRadius={0.05}
                scrollEase={0.05}
                font="bold 30px Space Grotesk"
                fontUrl="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap"
              />
            </div>
          </div>
        )}

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
                <LinkCard key={link.label} link={link} sublabel={t.sub[link.label]} index={index} />
              ))}
            </nav>
          </section>
        </div>
      </main>
    </ClickSpark>
  );
}
