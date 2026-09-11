import { type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Clock3,
  MapPin,
  Martini,
  Menu as MenuIcon,
  Phone,
  Sparkles,
  Utensils,
  X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const base = import.meta.env.BASE_URL;
const asset = (name: string) => `${base}images/${name}`;

const menuItems = {
  "from-the-grill": [
    { name: 'The Grill Burger', note: 'brisket blend, smoked bacon, sharp cheddar, house sauce', price: '$19' },
    { name: 'SW Chicken Sandwich', note: 'crispy chicken, pickles, lettuce, spicy honey', price: '$17' },
    { name: 'Grilled Mahi Tacos', note: 'three tortillas, cabbage, avocado crema, citrus salsa', price: '$18' },
  ],
  "light & bright": [
    { name: 'Watermelon Avocado Salad', note: 'feta, cucumber, mint, arugula, lime vinaigrette', price: '$15' },
    { name: 'The Club Caesar', note: 'romaine, parmesan, crispy shallot, caesar dressing', price: '$13' },
    { name: 'Seasonal Grain Bowl', note: 'market vegetables, herbs, toasted seeds, green goddess', price: '$16' },
  ],
  "at the bar": [
    { name: 'SW Margarita', note: 'blanco tequila, grapefruit, lime, agave, chili salt', price: '$14' },
    { name: 'Bourbon Old Fashioned', note: 'bourbon, orange, demerara, aromatic bitters', price: '$15' },
    { name: 'House Whiskey Pour', note: 'a thoughtful list of American and single malt bottles', price: 'market' },
  ],
} as const;

type MenuCategory = keyof typeof menuItems;

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuCategory, setMenuCategory] = useState<MenuCategory>('from-the-grill');
  const [reservationOpen, setReservationOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = reservationOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [reservationOpen]);

  const navigate = (id: string) => {
    setMobileOpen(false);
    scrollToSection(id);
  };

  return (
    <main className="min-h-[100dvh] overflow-hidden bg-[#eee9dc] text-[#27231d]">
      <div className="bg-[#c98d28] px-4 py-2 text-center text-[10px] font-semibold uppercase tracking-[.22em] text-[#211c16] sm:text-xs">
        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#211c16] align-middle" />
        Open to golfers & non-golfers · lunch, dinner & drinks
      </div>

      <header className="absolute left-0 right-0 top-8 z-20 border-b border-white/15 bg-[#161512]/80 text-[#f1eadb] backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <a href="#top" className="flex items-center gap-3" data-testid="link-logo">
            <span className="display text-[25px] italic leading-none text-[#efbd4a]">SW</span>
            <span className="border-l border-white/30 pl-3 text-[10px] font-semibold uppercase tracking-[.26em]">Grill</span>
          </a>
          <nav className="hidden items-center gap-8 text-[11px] font-semibold uppercase tracking-[.19em] lg:flex" aria-label="Main navigation">
            <a href="#story" className="line-link hover:text-[#efbd4a]" data-testid="link-story">The story</a>
            <a href="#menu" className="line-link hover:text-[#efbd4a]" data-testid="link-menu">Menu</a>
            <a href="#patio" className="line-link hover:text-[#efbd4a]" data-testid="link-patio">The patio</a>
            <a href="#visit" className="line-link hover:text-[#efbd4a]" data-testid="link-visit">Find us</a>
          </nav>
          <button
            type="button"
            onClick={() => setReservationOpen(true)}
            className="hidden items-center gap-2 bg-[#efbd4a] px-5 py-3 text-[10px] font-bold uppercase tracking-[.18em] text-[#211c16] transition-transform hover:-translate-y-0.5 sm:flex"
            data-testid="button-reserve-header"
          >
            Reserve a table <ArrowUpRight size={14} strokeWidth={1.8} />
          </button>
          <button
            type="button"
            className="rounded-sm border border-white/30 p-2 lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            data-testid="button-mobile-menu"
          >
            {mobileOpen ? <X size={19} /> : <MenuIcon size={19} />}
          </button>
        </div>
        {mobileOpen && (
          <div className="border-t border-white/15 bg-[#211f1a] px-5 py-5 lg:hidden">
            <nav className="flex flex-col gap-5 text-xs font-semibold uppercase tracking-[.2em]" aria-label="Mobile navigation">
              <button type="button" onClick={() => navigate('story')} className="text-left hover:text-[#efbd4a]" data-testid="mobile-link-story">The story</button>
              <button type="button" onClick={() => navigate('menu')} className="text-left hover:text-[#efbd4a]" data-testid="mobile-link-menu">Menu</button>
              <button type="button" onClick={() => navigate('patio')} className="text-left hover:text-[#efbd4a]" data-testid="mobile-link-patio">The patio</button>
              <button type="button" onClick={() => navigate('visit')} className="text-left hover:text-[#efbd4a]" data-testid="mobile-link-visit">Find us</button>
              <button type="button" onClick={() => { setMobileOpen(false); setReservationOpen(true); }} className="flex items-center justify-between border-t border-white/15 pt-5 text-[#efbd4a]" data-testid="mobile-button-reserve">Reserve a table <ArrowUpRight size={15} /></button>
            </nav>
          </div>
        )}
      </header>

      <section id="top" className="texture relative isolate min-h-[720px] bg-[#171614] text-[#f5eee1] sm:min-h-[790px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_40%,rgba(122,92,39,.22),transparent_35%),linear-gradient(110deg,rgba(16,15,13,.98)_12%,rgba(23,22,19,.83)_57%,rgba(23,22,19,.93))]" />
        <div className="relative mx-auto flex min-h-[720px] max-w-[1440px] flex-col justify-end px-5 pb-14 pt-36 sm:min-h-[790px] sm:px-8 sm:pb-20 lg:px-12">
          <div className="grid items-end gap-12 lg:grid-cols-[1.1fr_.9fr]">
            <div className="max-w-[780px]">
              <p className="reveal mono mb-7 text-[10px] uppercase tracking-[.3em] text-[#efbd4a] sm:text-xs">Boca Golf & Racquet Club · Boca Raton, Florida</p>
              <h1 className="reveal reveal-delay-1 display max-w-[760px] text-[clamp(4.3rem,11vw,10rem)] leading-[.79] tracking-[-.045em]">
                Meet us<br /><em className="text-[#efbd4a]">after</em> the round.
              </h1>
              <div className="reveal reveal-delay-2 mt-9 flex max-w-[545px] flex-col gap-5 border-l border-[#efbd4a]/70 pl-5 text-[15px] leading-7 text-[#d1c9b9] sm:flex-row sm:gap-8 sm:pl-6">
                <p>Easygoing food, good pours, and a patio that makes staying for one more feel like the right call.</p>
                <button type="button" onClick={() => navigate('menu')} className="flex shrink-0 items-center gap-2 self-start text-[10px] font-bold uppercase tracking-[.19em] text-[#efbd4a] hover:text-white" data-testid="button-explore-menu">
                  Explore the menu <ChevronRight size={15} />
                </button>
              </div>
            </div>
            <div className="reveal reveal-delay-3 flex items-end justify-start gap-5 sm:justify-end lg:pb-3">
              <div className="max-w-[130px] text-right text-[10px] uppercase leading-5 tracking-[.16em] text-[#a7a092]">On the grounds<br />of Boca Golf<br />& Racquet Club</div>
              <div className="flex h-[150px] w-[150px] items-center justify-center bg-[#eee9dc] p-2 shadow-2xl shadow-black/30 sm:h-[190px] sm:w-[190px]">
                <img src={asset('sw-logo.png')} alt="SW Grill" className="h-full w-full object-contain" data-testid="img-sw-logo" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-5 right-5 hidden items-center gap-3 text-[9px] uppercase tracking-[.2em] text-[#aba396] sm:flex lg:right-12">
          Scroll to settle in <span className="h-8 w-px bg-[#efbd4a]" />
        </div>
      </section>

      <div className="flex overflow-hidden whitespace-nowrap border-b border-[#d2c9b7] bg-[#d9cfbb] py-3 text-[10px] font-semibold uppercase tracking-[.25em] text-[#5f543f]">
        <div className="animate-[marquee_24s_linear_infinite] flex min-w-max gap-10">
          <span>Good food · cold drinks · green views</span><span>•</span><span>Lunch · dinner · patio hours</span><span>•</span><span>Good food · cold drinks · green views</span><span>•</span><span>Lunch · dinner · patio hours</span>
        </div>
      </div>

      <section id="story" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[.82fr_1.18fr] lg:gap-24">
          <div>
            <p className="mono mb-5 text-[10px] font-medium uppercase tracking-[.27em] text-[#a2691c]">01 / A place to land</p>
            <h2 className="display max-w-[420px] text-[clamp(3.2rem,6vw,6rem)] leading-[.88] tracking-[-.04em]">Come as you are.<br /><em>Stay awhile.</em></h2>
          </div>
          <div className="max-w-[620px] pt-1 lg:pt-12">
            <p className="text-xl leading-8 text-[#4e473b] sm:text-2xl sm:leading-9">SW Grill is the clubhouse’s easy answer to “where should we eat?” A relaxed destination for golfers, neighbors, and anyone looking for a good meal with a little room to breathe.</p>
            <div className="mt-12 grid gap-8 border-t border-[#c9beab] pt-8 sm:grid-cols-2">
              <div>
                <Utensils size={19} strokeWidth={1.5} className="mb-4 text-[#b37922]" />
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-[.12em]">Made for the table</h3>
                <p className="text-sm leading-6 text-[#726858]">From shareable bites to the burger you’ll think about on the drive home.</p>
              </div>
              <div>
                <Martini size={19} strokeWidth={1.5} className="mb-4 text-[#b37922]" />
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-[.12em]">Pour another</h3>
                <p className="text-sm leading-6 text-[#726858]">Margaritas in the sun, whiskey after dark, and something for every pace in between.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="bg-[#c9b897] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-12 flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div>
              <p className="mono mb-5 text-[10px] font-medium uppercase tracking-[.27em] text-[#735019]">02 / What’s on</p>
              <h2 className="display text-[clamp(3.3rem,7vw,6.5rem)] leading-[.82] tracking-[-.04em]">A little<br /><em>something good.</em></h2>
            </div>
            <a href="https://swgrillboca.com" target="_blank" rel="noreferrer" className="line-link flex items-center gap-2 self-start text-[10px] font-bold uppercase tracking-[.18em] text-[#493a25]" data-testid="link-full-menu">See the full menu <ArrowUpRight size={15} /></a>
          </div>
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="max-w-[320px] text-base leading-7 text-[#60513c]">Our menu moves with the room: bright at lunch, generous after a round, and ready for a long night at the bar.</p>
              <div className="mt-10 flex flex-col items-start gap-1" role="tablist" aria-label="Menu categories">
                {(Object.keys(menuItems) as MenuCategory[]).map((category, index) => (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={menuCategory === category}
                    onClick={() => setMenuCategory(category)}
                    className={`group flex w-full max-w-[330px] items-center justify-between border-b py-4 text-left text-[11px] font-bold uppercase tracking-[.17em] transition-colors ${menuCategory === category ? 'border-[#27231d] text-[#27231d]' : 'border-[#ad9b7a] text-[#817054] hover:text-[#27231d]'}`}
                    data-testid={`button-menu-category-${index}`}
                  >
                    <span><span className="mr-4 text-[#a16a20]">0{index + 1}</span>{category.replaceAll('-', ' ')}</span>
                    <ChevronRight size={15} className={menuCategory === category ? 'translate-x-1 transition-transform' : 'transition-transform'} />
                  </button>
                ))}
              </div>
            </div>
            <div className="min-h-[330px] border-t border-[#ad9b7a]">
              {menuItems[menuCategory].map((item, index) => (
                <div key={item.name} className="group flex items-start justify-between gap-5 border-b border-[#ad9b7a] py-6 transition-colors hover:bg-[#d0c2a7]" data-testid={`menu-item-${index}`}>
                  <div>
                    <h3 className="display text-[27px] leading-none sm:text-[31px]">{item.name}</h3>
                    <p className="mt-2 max-w-[420px] text-sm leading-6 text-[#75654c]">{item.note}</p>
                  </div>
                  <span className="mono pt-1 text-xs text-[#735019]">{item.price}</span>
                </div>
              ))}
              <p className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[.16em] text-[#735019]"><Sparkles size={13} /> Ask about today’s specials</p>
            </div>
          </div>
        </div>
      </section>

      <section id="patio" className="relative isolate min-h-[620px] overflow-hidden bg-[#25251f] text-[#f3eddf]">
        <img src={asset('gallery-food.jpg')} alt="Colorful margaritas on the SW Grill patio" className="absolute inset-0 h-full w-full object-cover opacity-65 mix-blend-screen" data-testid="img-patio-drinks" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(25,24,19,.96)_0%,rgba(25,24,19,.7)_42%,rgba(25,24,19,.25)_100%)]" />
        <div className="relative mx-auto flex min-h-[620px] max-w-[1440px] items-end px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="max-w-[570px]">
            <p className="mono mb-6 text-[10px] uppercase tracking-[.27em] text-[#efbd4a]">03 / Out here</p>
            <h2 className="display text-[clamp(3.4rem,7vw,7rem)] leading-[.83] tracking-[-.04em]">The best seat<br /><em>is outside.</em></h2>
            <p className="mt-7 max-w-[430px] text-base leading-7 text-[#d7d0c2]">Pull up a chair on the patio, order something cold, and watch the afternoon turn gold across the surrounding greens.</p>
            <button type="button" onClick={() => setReservationOpen(true)} className="mt-9 flex items-center gap-3 border-b border-[#efbd4a] pb-2 text-[10px] font-bold uppercase tracking-[.19em] text-[#efbd4a] hover:border-white hover:text-white" data-testid="button-patio-reserve">Save a seat outside <ArrowUpRight size={15} /></button>
          </div>
        </div>
      </section>

      <section className="bg-[#eee9dc] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-12 flex items-end justify-between gap-5">
            <div>
              <p className="mono mb-5 text-[10px] uppercase tracking-[.27em] text-[#a2691c]">04 / Around here</p>
              <h2 className="display text-[clamp(3rem,6vw,5.7rem)] leading-[.83] tracking-[-.04em]">Good things<br /><em>in rotation.</em></h2>
            </div>
            <span className="hidden text-right text-[10px] uppercase leading-5 tracking-[.14em] text-[#827664] sm:block">Fresh air /<br />full glasses</span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            <figure className="group col-span-2 overflow-hidden bg-[#d7cebe] lg:col-span-2">
              <img src={asset('gallery-1.jpg')} alt="SW Grill burger and fries" className="aspect-[1.35] h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" data-testid="img-gallery-burger" />
            </figure>
            <figure className="group overflow-hidden bg-[#d7cebe]">
              <img src={asset('gallery-3.jpg')} alt="Watermelon avocado salad and tacos" className="aspect-[.82] h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" data-testid="img-gallery-salad" />
            </figure>
            <figure className="group overflow-hidden bg-[#d7cebe]">
              <img src={asset('gallery-2.jpg')} alt="Whiskey selection at the bar" className="aspect-[.82] h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" data-testid="img-gallery-whiskey" />
            </figure>
          </div>
        </div>
      </section>

      <section id="visit" className="texture bg-[#201e19] px-5 py-20 text-[#eee7d7] sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-14 lg:grid-cols-[1fr_.85fr] lg:gap-28">
            <div>
              <p className="mono mb-5 text-[10px] uppercase tracking-[.27em] text-[#efbd4a]">05 / Come find us</p>
              <h2 className="display max-w-[700px] text-[clamp(3.5rem,8vw,8rem)] leading-[.8] tracking-[-.045em]">See you<br /><em className="text-[#efbd4a]">at the club.</em></h2>
              <p className="mt-8 max-w-[470px] text-base leading-7 text-[#bcb4a5]">Inside Boca Golf and Racquet Club, with a front-row view of the greens and a welcome that doesn’t require a tee time.</p>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
                <a href="https://maps.google.com/?q=17751+Boca+Club+Blvd+Boca+Raton+FL+33487" target="_blank" rel="noreferrer" className="line-link flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#efbd4a]" data-testid="link-directions"><MapPin size={15} /> Get directions</a>
                <a href="tel:+15613677030" className="line-link flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#efbd4a]" data-testid="link-call"><Phone size={14} /> (561) 367-7030</a>
              </div>
            </div>
            <div className="border-t border-white/20 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <div className="mb-9 flex items-center gap-3 text-[#efbd4a]"><Clock3 size={17} strokeWidth={1.5} /><span className="text-[10px] font-bold uppercase tracking-[.2em]">Plan your visit</span></div>
              <div className="space-y-5 text-sm text-[#c6bdad]">
                <p className="flex justify-between gap-5 border-b border-white/10 pb-4"><span>Lunch & afternoon</span><span className="mono text-xs text-[#eee7d7]">Come as you are</span></p>
                <p className="flex justify-between gap-5 border-b border-white/10 pb-4"><span>Dinner & drinks</span><span className="mono text-xs text-[#eee7d7]">Stay awhile</span></p>
                <p className="flex justify-between gap-5 border-b border-white/10 pb-4"><span>Address</span><span className="max-w-[170px] text-right text-xs leading-5 text-[#eee7d7]">17751 Boca Club Blvd<br />Boca Raton, FL 33487</span></p>
              </div>
              <button type="button" onClick={() => setReservationOpen(true)} className="mt-9 flex w-full items-center justify-between bg-[#efbd4a] px-5 py-4 text-left text-[10px] font-bold uppercase tracking-[.18em] text-[#211c16] transition-colors hover:bg-[#f7d27f]" data-testid="button-reserve-visit">Make a reservation <ArrowUpRight size={16} /></button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#171614] px-5 py-8 text-[#eee7d7] sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-7 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3"><span className="display text-3xl italic text-[#efbd4a]">SW</span><span className="text-[10px] uppercase tracking-[.25em] text-[#a7a092]">Grill · Boca Raton</span></div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] uppercase tracking-[.16em] text-[#a7a092]">
            <a href="https://swgrillboca.com" target="_blank" rel="noreferrer" className="line-link hover:text-[#efbd4a]" data-testid="link-website">swgrillboca.com</a>
            <a href="tel:+15613677030" className="line-link hover:text-[#efbd4a]" data-testid="footer-link-phone">Call the grill</a>
          </div>
        </div>
      </footer>

      {reservationOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#12110f]/75 p-0 backdrop-blur-sm sm:items-center sm:p-5" role="dialog" aria-modal="true" aria-labelledby="reserve-title">
          <div className="relative w-full max-w-[540px] bg-[#eee9dc] p-7 text-[#27231d] shadow-2xl sm:p-10">
            <button type="button" onClick={() => setReservationOpen(false)} className="absolute right-5 top-5 p-2 text-[#706553] hover:text-[#27231d]" aria-label="Close reservation dialog" data-testid="button-close-reservation"><X size={19} /></button>
            <p className="mono mb-4 text-[10px] uppercase tracking-[.25em] text-[#a2691c]">A table with your name on it</p>
            <h2 id="reserve-title" className="display text-5xl leading-[.85]">Let’s make<br /><em>an evening of it.</em></h2>
            <p className="mt-6 max-w-[390px] text-sm leading-6 text-[#615849]">For reservations and the latest availability, give the grill a call or visit the official SW Grill site.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <a href="tel:+15613677030" className="flex items-center justify-between bg-[#27231d] px-5 py-4 text-[10px] font-bold uppercase tracking-[.16em] text-[#f2e9d8] hover:bg-[#3c352b]" data-testid="modal-link-call">Call (561) 367-7030 <Phone size={15} /></a>
              <a href="https://swgrillboca.com" target="_blank" rel="noreferrer" className="flex items-center justify-between border border-[#a99c87] px-5 py-4 text-[10px] font-bold uppercase tracking-[.16em] hover:border-[#27231d]" data-testid="modal-link-website">Official website <ArrowUpRight size={15} /></a>
            </div>
            <p className="mt-7 flex items-center gap-2 text-[10px] uppercase tracking-[.15em] text-[#8a7b65]"><MapPin size={13} /> 17751 Boca Club Blvd, Boca Raton</p>
          </div>
        </div>
      )}
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;