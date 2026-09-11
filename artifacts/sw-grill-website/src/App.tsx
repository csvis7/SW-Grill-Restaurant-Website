import { type ReactNode, useEffect, useState } from 'react';
import { ArrowUpRight, ChevronRight, Clock3, MapPin, Menu as MenuIcon, Phone, Utensils, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Router as WouterRouter, Switch, useLocation } from 'wouter';

const queryClient = new QueryClient();
const base = import.meta.env.BASE_URL;
const image = (name: string) => `${base}images/kake-da-minar/${name}`;

const menu = {
  classics: [
    { name: 'Butter Chicken', note: 'silky tomato gravy, cream, kasuri methi', price: 'signature' },
    { name: 'Murgh Patiala', note: 'a robust Punjabi chicken preparation, made for sharing', price: 'house pick' },
    { name: 'Tandoor Selection', note: 'charred chicken, kebabs and breads from the clay oven', price: 'from the tandoor' },
  ],
  biryani: [
    { name: 'Hyderabadi Biryani', note: 'fragrant rice, slow-cooked masala, a generous finish', price: 'order to table' },
    { name: 'Fish Biryani', note: 'delicate fish, aromatic rice and layered spice', price: 'chef’s special' },
    { name: 'Chicken Butter Masala Biryani', note: 'a rich meeting of two beloved house signatures', price: 'family style' },
  ],
  alongside: [
    { name: 'Patiala Lassi', note: 'cool, creamy and served in the spirit of Punjab', price: 'pour generously' },
    { name: 'North Indian Family Plates', note: 'the kind of spread that keeps everyone at the table', price: 'to share' },
    { name: 'Desserts & Chinese Favourites', note: 'something familiar, something sweet, something extra', price: 'ask today' },
  ],
} as const;
type MenuKey = keyof typeof menu;

function go(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }

function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [category, setCategory] = useState<MenuKey>('classics');
  const [orderOpen, setOrderOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = orderOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [orderOpen]);

  const nav = (id: string) => { setMobileOpen(false); go(id); };

  return (
    <main className="min-h-[100dvh] overflow-hidden bg-[#f2ecdf] text-[#241d18]">
      <div className="bg-[#f2c900] px-4 py-2 text-center text-[10px] font-bold uppercase tracking-[.2em] text-[#211912] sm:text-xs">
        Punjabi cuisine &amp; Hyderabadi biryani · Chandrasekharpur, Bhubaneswar
      </div>
      <header className="absolute left-0 right-0 top-8 z-20 border-b border-white/15 bg-[#171514]/88 text-[#f3eddf] backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <a href="#top" className="flex items-center gap-2" data-testid="link-kake-logo">
            <span className="display text-[27px] font-semibold tracking-[-.07em] text-[#f2c900]">Kake Da Minar</span>
          </a>
          <nav className="hidden items-center gap-8 text-[10px] font-bold uppercase tracking-[.2em] lg:flex" aria-label="Main navigation">
            <a href="#story" className="line-link hover:text-[#f2c900]" data-testid="link-story">Our table</a>
            <a href="#menu" className="line-link hover:text-[#f2c900]" data-testid="link-menu">Menu</a>
            <a href="#gallery" className="line-link hover:text-[#f2c900]" data-testid="link-gallery">The room</a>
            <a href="#visit" className="line-link hover:text-[#f2c900]" data-testid="link-visit">Find us</a>
          </nav>
          <button type="button" onClick={() => setOrderOpen(true)} className="hidden items-center gap-2 bg-[#f2c900] px-5 py-3 text-[10px] font-bold uppercase tracking-[.17em] text-[#211912] transition-transform hover:-translate-y-0.5 sm:flex" data-testid="button-order-header">
            Call to order <Phone size={14} />
          </button>
          <button type="button" onClick={() => setMobileOpen(!mobileOpen)} className="rounded-sm border border-white/30 p-2 lg:hidden" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">
            {mobileOpen ? <X size={19} /> : <MenuIcon size={19} />}
          </button>
        </div>
        {mobileOpen && <div className="border-t border-white/15 bg-[#211d1a] px-5 py-5 lg:hidden">
          <nav className="flex flex-col gap-5 text-xs font-bold uppercase tracking-[.18em]" aria-label="Mobile navigation">
            <button type="button" onClick={() => nav('story')} className="text-left hover:text-[#f2c900]" data-testid="mobile-link-story">Our table</button>
            <button type="button" onClick={() => nav('menu')} className="text-left hover:text-[#f2c900]" data-testid="mobile-link-menu">Menu</button>
            <button type="button" onClick={() => nav('gallery')} className="text-left hover:text-[#f2c900]" data-testid="mobile-link-gallery">The room</button>
            <button type="button" onClick={() => nav('visit')} className="text-left hover:text-[#f2c900]" data-testid="mobile-link-visit">Find us</button>
            <button type="button" onClick={() => { setMobileOpen(false); setOrderOpen(true); }} className="flex justify-between border-t border-white/15 pt-5 text-[#f2c900]" data-testid="mobile-button-order">Call to order <Phone size={15} /></button>
          </nav>
        </div>}
      </header>

      <section id="top" className="grain relative isolate min-h-[730px] bg-[#191716] text-[#f3eddf] sm:min-h-[820px]">
        <img src={image('cover.jpg')} alt="A rich Kake Da Minar North Indian dish" className="absolute inset-0 h-full w-full object-cover opacity-60" data-testid="img-hero-dish" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(22,19,17,.98)_8%,rgba(22,19,17,.8)_42%,rgba(22,19,17,.32)_100%)]" />
        <div className="relative mx-auto flex min-h-[730px] max-w-[1440px] items-end px-5 pb-14 pt-36 sm:min-h-[820px] sm:px-8 sm:pb-20 lg:px-12">
          <div className="grid w-full items-end gap-12 lg:grid-cols-[1.15fr_.85fr]">
            <div className="max-w-[850px]">
              <p className="reveal mono mb-7 text-[10px] uppercase tracking-[.3em] text-[#f2c900] sm:text-xs">Chandrasekharpur · Bhubaneswar</p>
              <h1 className="reveal reveal-1 display max-w-[790px] text-[clamp(4.1rem,10.5vw,9.5rem)] font-medium leading-[.82] tracking-[-.06em]">A table full<br />of <em className="text-[#f2c900]">stories.</em></h1>
              <div className="reveal reveal-2 mt-9 flex max-w-[560px] flex-col gap-5 border-l border-[#f2c900] pl-5 text-[15px] leading-7 text-[#ddd4c4] sm:flex-row sm:gap-8 sm:pl-6">
                <p>Rich Punjabi flavours, fragrant biryani and the warm, familiar feeling of being well fed.</p>
                <button type="button" onClick={() => nav('menu')} className="flex shrink-0 items-center gap-2 self-start text-[10px] font-bold uppercase tracking-[.19em] text-[#f2c900] hover:text-white" data-testid="button-explore-menu">Explore the menu <ChevronRight size={15} /></button>
              </div>
            </div>
            <div className="reveal reveal-3 flex items-end justify-start gap-5 sm:justify-end lg:pb-3">
              <div className="max-w-[140px] text-right text-[10px] uppercase leading-5 tracking-[.16em] text-[#bdb3a2]">Punjabi cuisine<br />& Hyderabadi<br />biryani</div>
              <div className="w-[185px] overflow-hidden border-2 border-[#f2c900] bg-[#211d1a] sm:w-[230px]">
                <img src={image('dish-2.jpg')} alt="Kake Da Minar storefront sign" className="aspect-[1.3] w-full object-cover" data-testid="img-storefront-hero" />
                <p className="px-3 py-2 text-center text-[9px] font-bold uppercase tracking-[.13em] text-[#f2c900]">Since the good old days</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-5 right-5 hidden items-center gap-3 text-[9px] uppercase tracking-[.2em] text-[#bdb3a2] sm:flex lg:right-12">Scroll to the table <span className="h-8 w-px bg-[#f2c900]" /></div>
      </section>

      <div className="flex overflow-hidden whitespace-nowrap border-b border-[#d8cdbb] bg-[#e0d4bf] py-3 text-[10px] font-bold uppercase tracking-[.25em] text-[#73553a]">
        <div className="flex min-w-max gap-10 [animation:ticker_24s_linear_infinite]"><span>Punjabi warmth · Hyderabad fragrance · Bhubaneswar soul</span><span>•</span><span>12 noon to 10:30 pm · call to confirm hours</span><span>•</span><span>Punjabi warmth · Hyderabad fragrance · Bhubaneswar soul</span><span>•</span><span>12 noon to 10:30 pm · call to confirm hours</span></div>
      </div>

      <section id="story" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
          <div><p className="mono mb-5 text-[10px] uppercase tracking-[.27em] text-[#a04a22]">01 / Our table</p><h2 className="display max-w-[500px] text-[clamp(3.1rem,6vw,6rem)] leading-[.88] tracking-[-.05em]">The food is<br /><em>the invitation.</em></h2></div>
          <div className="max-w-[640px] pt-1 lg:pt-12">
            <p className="text-xl leading-8 text-[#57483c] sm:text-2xl sm:leading-9">Kake Da Minar brings the generous side of North India to Bhubaneswar. For decades, the room has been about food with presence: tandoor smoke, slow masala, rice that arrives fragrant, and plates meant to be passed around.</p>
            <div className="mt-12 grid gap-8 border-t border-[#cdbfa9] pt-8 sm:grid-cols-2">
              <div><Utensils size={19} strokeWidth={1.5} className="mb-4 text-[#a04a22]" /><h3 className="mb-2 text-sm font-bold uppercase tracking-[.12em]">From the tandoor</h3><p className="text-sm leading-6 text-[#756658]">Char, warmth and the unmistakable depth of food cooked with patience.</p></div>
              <div><span className="mb-4 block text-2xl leading-none text-[#a04a22]">◌</span><h3 className="mb-2 text-sm font-bold uppercase tracking-[.12em]">For the whole table</h3><p className="text-sm leading-6 text-[#756658]">Butter chicken, lassi, biryani and family-style plates worth lingering over.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="bg-[#d9c6a5] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-12 flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><p className="mono mb-5 text-[10px] uppercase tracking-[.27em] text-[#964321]">02 / The menu</p><h2 className="display text-[clamp(3.2rem,7vw,6.4rem)] leading-[.82] tracking-[-.05em]">Come hungry.<br /><em>Leave happy.</em></h2></div><button type="button" onClick={() => setOrderOpen(true)} className="line-link flex items-center gap-2 self-start text-[10px] font-bold uppercase tracking-[.18em] text-[#573e2d]" data-testid="button-menu-order">Call for a table or takeaway <ArrowUpRight size={15} /></button></div>
          <div className="grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-20">
            <div><p className="max-w-[320px] text-base leading-7 text-[#644f3c]">A few signatures to start the conversation. Ask the team what is coming out of the kitchen today.</p><div className="mt-10 flex flex-col items-start gap-1" role="tablist" aria-label="Menu categories">
              {(Object.keys(menu) as MenuKey[]).map((key, index) => <button key={key} type="button" role="tab" aria-selected={category === key} onClick={() => setCategory(key)} className={`group flex w-full max-w-[330px] items-center justify-between border-b py-4 text-left text-[11px] font-bold uppercase tracking-[.17em] transition-colors ${category === key ? 'border-[#241d18] text-[#241d18]' : 'border-[#bda989] text-[#866e52] hover:text-[#241d18]'}`} data-testid={`button-menu-category-${index}`}><span><span className="mr-4 text-[#a04a22]">0{index + 1}</span>{key === 'classics' ? 'Punjabi classics' : key === 'biryani' ? 'Biryani house' : 'Alongside'}</span><ChevronRight size={15} className={category === key ? 'translate-x-1 transition-transform' : 'transition-transform'} /></button>)}
            </div></div>
            <div className="min-h-[330px] border-t border-[#bda989]">{menu[category].map((item, index) => <div key={item.name} className="group flex items-start justify-between gap-5 border-b border-[#bda989] py-6 transition-colors hover:bg-[#e0cfb1]" data-testid={`menu-item-${index}`}><div><h3 className="display text-[26px] leading-none sm:text-[31px]">{item.name}</h3><p className="mt-2 max-w-[430px] text-sm leading-6 text-[#765f49]">{item.note}</p></div><span className="mono pt-1 text-right text-[10px] uppercase leading-4 text-[#964321]">{item.price}</span></div>)}<p className="mt-6 text-[10px] uppercase tracking-[.16em] text-[#964321]">A generous spread is always better shared.</p></div>
          </div>
        </div>
      </section>

      <section id="gallery" className="bg-[#f2ecdf] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="mx-auto max-w-[1280px]"><div className="mb-12 flex items-end justify-between gap-5"><div><p className="mono mb-5 text-[10px] uppercase tracking-[.27em] text-[#a04a22]">03 / At Kake Da Minar</p><h2 className="display text-[clamp(3rem,6vw,5.8rem)] leading-[.84] tracking-[-.05em]">A room with<br /><em>appetite.</em></h2></div><span className="hidden text-right text-[10px] uppercase leading-5 tracking-[.14em] text-[#877461] sm:block">Bhubaneswar /<br />Chandrasekharpur</span></div>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4"><figure className="group col-span-2 overflow-hidden bg-[#ded0bb] lg:col-span-2"><img src={image('dish-1.jpg')} alt="Butter chicken style dish at Kake Da Minar" className="aspect-[1.36] h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" data-testid="img-gallery-butter-chicken" /></figure><figure className="group overflow-hidden bg-[#ded0bb]"><img src={image('featured.jpg')} alt="A rich North Indian curry" className="aspect-[.82] h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" data-testid="img-gallery-featured" /></figure><figure className="group overflow-hidden bg-[#ded0bb]"><img src={image('dish-2.jpg')} alt="Kake Da Minar restaurant storefront" className="aspect-[.82] h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" data-testid="img-gallery-storefront" /></figure></div>
        </div>
      </section>

      <section id="visit" className="grain bg-[#211c19] px-5 py-20 text-[#f3eddf] sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1280px]"><div className="grid gap-14 lg:grid-cols-[1fr_.85fr] lg:gap-28"><div><p className="mono mb-5 text-[10px] uppercase tracking-[.27em] text-[#f2c900]">04 / Find the table</p><h2 className="display max-w-[700px] text-[clamp(3.4rem,8vw,8rem)] leading-[.8] tracking-[-.06em]">Bring your<br /><em className="text-[#f2c900]">people.</em></h2><p className="mt-8 max-w-[480px] text-base leading-7 text-[#c8bdad]">At 139, District Center, Kake Da Minar is right in the heart of Chandrasekharpur — ready for a family meal, a biryani order or a table full of old favourites.</p><div className="mt-10 flex flex-wrap gap-x-8 gap-y-4"><a href="https://maps.google.com/?q=139+District+Center+Niladri+Vihar+Road+Chandrasekharpur+Bhubaneswar" target="_blank" rel="noreferrer" className="line-link flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#f2c900]" data-testid="link-directions"><MapPin size={15} /> Get directions</a><a href="tel:+919124255202" className="line-link flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#f2c900]" data-testid="link-call"><Phone size={14} /> +91 91242 55202</a></div></div>
          <div className="border-t border-white/20 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"><div className="mb-9 flex items-center gap-3 text-[#f2c900]"><Clock3 size={17} strokeWidth={1.5} /><span className="text-[10px] font-bold uppercase tracking-[.2em]">Plan your visit</span></div><div className="space-y-5 text-sm text-[#c8bdad]"><p className="flex justify-between gap-5 border-b border-white/10 pb-4"><span>Publicly listed hours</span><span className="mono text-right text-xs text-[#f3eddf]">12:00 PM — 10:30 PM</span></p><p className="border-b border-white/10 pb-4 text-xs leading-5 text-[#a99e90]">Hours can change. Please call +91 91242 55202 to confirm today’s service.</p><p className="flex justify-between gap-5 border-b border-white/10 pb-4"><span>Address</span><span className="max-w-[190px] text-right text-xs leading-5 text-[#f3eddf]">139, District Center<br />Niladri Vihar Road<br />Chandrasekharpur, Bhubaneswar<br />Odisha 751016</span></p></div><button type="button" onClick={() => setOrderOpen(true)} className="mt-9 flex w-full items-center justify-between bg-[#f2c900] px-5 py-4 text-left text-[10px] font-bold uppercase tracking-[.18em] text-[#211912] transition-colors hover:bg-[#ffe35b]" data-testid="button-order-visit">Call to order or reserve <Phone size={16} /></button></div></div></div>
      </section>

      <footer className="bg-[#171514] px-5 py-8 text-[#eee7d7] sm:px-8 lg:px-12"><div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-7 sm:flex-row sm:items-center"><div><span className="display text-3xl font-semibold tracking-[-.05em] text-[#f2c900]">Kake Da Minar</span><p className="mt-1 text-[9px] uppercase tracking-[.2em] text-[#9e9384]">Punjabi cuisine &amp; Hyderabadi biryani</p></div><div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] uppercase tracking-[.16em] text-[#a7a092]"><a href="tel:+919124255202" className="line-link hover:text-[#f2c900]" data-testid="footer-link-phone">Call the restaurant</a><a href="#top" className="line-link hover:text-[#f2c900]" data-testid="footer-link-top">Back to top</a></div></div></footer>

      {orderOpen && <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#12100f]/80 p-0 backdrop-blur-sm sm:items-center sm:p-5" role="dialog" aria-modal="true" aria-labelledby="order-title"><div className="relative w-full max-w-[540px] bg-[#f2ecdf] p-7 text-[#241d18] shadow-2xl sm:p-10"><button type="button" onClick={() => setOrderOpen(false)} className="absolute right-5 top-5 p-2 text-[#796957] hover:text-[#241d18]" aria-label="Close order dialog" data-testid="button-close-order"><X size={19} /></button><p className="mono mb-4 text-[10px] uppercase tracking-[.25em] text-[#a04a22]">The next best thing to sitting down</p><h2 id="order-title" className="display text-5xl leading-[.86]">Let’s get<br /><em>the table started.</em></h2><p className="mt-6 max-w-[390px] text-sm leading-6 text-[#615548]">Call the Chandrasekharpur restaurant to confirm hours, reserve a table or ask about takeaway and today’s menu.</p><div className="mt-8"><a href="tel:+919124255202" className="flex items-center justify-between bg-[#241d18] px-5 py-4 text-[10px] font-bold uppercase tracking-[.16em] text-[#f3eddf] hover:bg-[#3a2d25]" data-testid="modal-link-call">Call +91 91242 55202 <Phone size={15} /></a></div><p className="mt-7 flex items-start gap-2 text-[10px] uppercase leading-5 tracking-[.13em] text-[#8a7763]"><MapPin size={13} className="mt-1 shrink-0" /> 139, District Center, Niladri Vihar Road, Chandrasekharpur</p></div></div>}
    </main>
  );
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}
function RoutedErrorBoundary({ children }: { children: ReactNode }) { const [location] = useLocation(); return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>; }
function App() { return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>; }
export default App;