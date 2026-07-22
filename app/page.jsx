
'use client';
import { useEffect } from 'react';

export default function Page() {
    useEffect(() => {
        
        setTimeout(() => {
                const preloader = document.getElementById('preloader');
                if (preloader) {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 1000);
                }
            }, 1800);
    

        // Reveal Animations on Scroll
        const revealElements = document.querySelectorAll('.reveal');
        
        const revealOnScroll = () => {
            const triggerBottom = window.innerHeight / 5 * 4;
            revealElements.forEach(el => {
                const elementTop = el.getBoundingClientRect().top;
                if(elementTop < triggerBottom) {
                    el.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', revealOnScroll);
        // Initial check
        revealOnScroll();

        // Parallax Effect for some elements
        window.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            
            document.querySelectorAll('.hero-glow').forEach(glow => {
                glow.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    

    let journeySwiper = null;
    function initJourneySwiper() {
        if (window.innerWidth < 768) {
            if (!journeySwiper) {
                journeySwiper = new Swiper('.journey-swiper', {
                    effect: 'coverflow',
                    grabCursor: true,
                    centeredSlides: true,
                    slidesPerView: 'auto',
                    initialSlide: 0,
                    loop: true,
                    slideToClickedSlide: true,
                    coverflowEffect: {
                        rotate: 30,
                        stretch: 0,
                        depth: 150,
                        modifier: 1.5,
                        slideShadows: false,
                    },
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    }
                });
            }
        } else {
            if (journeySwiper) {
                journeySwiper.destroy(true, true);
                journeySwiper = null;
            }
        }
    }
    window.addEventListener('resize', initJourneySwiper);
    initJourneySwiper();


    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            if (menu.classList.contains('hidden')) {
                menu.classList.remove('hidden');
                menu.classList.add('flex');
                this.innerHTML = '<span className="material-symbols-outlined">close</span>';
            } else {
                menu.classList.add('hidden');
                menu.classList.remove('flex');
                this.innerHTML = '<span className="material-symbols-outlined">menu</span>';
            }
        });
    }

    }, []);

    return (
        <>
            
    {/*  Preloader  */}
    <div id="preloader" className="fixed inset-0 z-[9999] bg-surface flex items-center justify-center transition-opacity duration-1000">
        <h1 className="text-on-surface font-display-xl font-black text-5xl md:text-7xl tracking-tighter uppercase animate-wipe">
            <span className="text-primary">GAIN</span> BLUEPRINT
        </h1>
    </div>
    
{/*  Navigation Shell  */}
<nav className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-xl border-b border-white/10 shadow-2xl">
<div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
<span className="text-headline-md font-headline-md font-extrabold tracking-tighter text-on-surface uppercase">GAIN BLUEPRINT</span>
<div className="hidden md:flex items-center gap-8">
<a className="text-primary font-bold border-b-2 border-primary pb-1 text-label-sm font-label-sm" href="#">Home</a>
<a className="text-on-surface-variant font-medium hover:text-primary transition-colors text-label-sm font-label-sm" href="/journey">Journey</a>
<a className="text-on-surface-variant font-medium hover:text-primary transition-colors text-label-sm font-label-sm" href="/ebook">eBook</a>
<a className="text-on-surface-variant font-medium hover:text-primary transition-colors text-label-sm font-label-sm" href="/bmi">BMI</a>
<a className="text-on-surface-variant font-medium hover:text-primary transition-colors text-label-sm font-label-sm" href="/contact">Contact</a>
</div>
<div className="flex items-center gap-4">
<button className="hidden md:block bg-primary text-on-primary-container px-6 py-2.5 rounded-full font-headline-md font-bold text-label-sm hover:scale-95 transition-transform active:scale-90">
                Get Started
            </button>
<button id="mobile-menu-btn" className="md:hidden text-on-surface p-2 flex items-center justify-center">
    <span className="material-symbols-outlined">menu</span>
</button>
</div>
</div>
<div id="mobile-menu" className="hidden md:hidden bg-surface-container-highest border-b border-white/10 w-full flex-col px-6 py-6 gap-6 shadow-2xl absolute top-full left-0">
    <a href="#" className="text-primary font-bold text-lg block">Home</a>
    <a href="/journey" className="text-on-surface-variant font-medium text-lg block">Journey</a>
    <a href="/ebook" className="text-on-surface-variant font-medium text-lg block">eBook</a>
    <a href="/bmi" className="text-on-surface-variant font-medium text-lg block">BMI</a>
    <a href="/contact" className="text-on-surface-variant font-medium text-lg block">Contact</a>
    <button className="bg-primary text-on-primary-container px-6 py-3 mt-2 rounded-full font-headline-md font-bold text-label-sm w-full">
        Get Started
    </button>
</div>
</nav>
<main className="relative">
{/*  Hero Section  */}
<section className="min-h-screen flex items-center justify-center pt-16 md:pt-24 px-6 hero-gradient relative overflow-hidden">
<div className="absolute inset-0 z-0">
<img className="w-full h-full object-cover opacity-70 transition-all duration-1000" src="./assets/images/hero-bg.jpg" alt="Gym equipment and protein shaker representing natural performance"/>
<div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background/90"></div>
<div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent"></div>
</div>
<div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10 pt-10">
<div className="reveal flex flex-col items-center">

<h1 className="font-display-xl text-5xl md:text-display-xl lg:text-[110px] lg:leading-[110px] mb-8 text-white tracking-tighter drop-shadow-2xl font-black">
                        <span className="text-primary">Build</span> Muscle
</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-2xl leading-relaxed drop-shadow-xl text-lg">
                        <strong className="text-on-surface font-headline-md font-extrabold text-xl tracking-tight">Eat smarter. Recover better. Build muscle naturally.</strong>
                    </p>
<div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-sm sm:max-w-none mx-auto">
<button onClick={() => { window.location.href="/ebook" }} className="bg-primary text-on-primary-container px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg font-bold text-xs sm:text-sm hover:shadow-[0_0_20px_rgba(75,226,119,0.3)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                            Get the eBook
                            <span className="material-symbols-outlined text-base">menu_book</span>
</button>
<button onClick={() => { window.location.href="/journey" }} className="bg-white/5 backdrop-blur-md border border-white/10 text-on-surface px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg font-bold text-xs sm:text-sm hover:bg-white/10 hover:-translate-y-1 transition-all flex items-center justify-center">
                            Read My Journey
                        </button>
</div>
<div className="mt-16 flex flex-wrap gap-8 justify-center items-center border-t border-white/10 pt-10 w-full max-w-2xl mx-auto">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "\'FILL\' 1"}}>science</span>
<span className="text-label-sm font-label-sm text-on-surface font-bold drop-shadow-md">SCIENCE-BASED</span>
</div>
</div>
</div>
</div>
<div className="absolute bottom-10 left-1/2 -translate-x-1/2 scroll-indicator">
<span className="material-symbols-outlined text-on-surface-variant opacity-40">keyboard_double_arrow_down</span>
</div>
</section>

{/*  Text Animation Gap  */}
<div className="py-8 md:py-16 bg-surface-container-lowest overflow-hidden flex items-center relative border-y border-white/5">
    {/*  Single Row Marquee  */}
    <div className="flex whitespace-nowrap animate-marquee-left w-max">
        <div className="flex items-center gap-16 px-8">
            <span className="text-3xl md:text-5xl font-extrabold text-white tracking-widest uppercase flex items-center gap-4">
                MY COMPLETE <span className="text-[#facc15]">DIET PLAN</span> E-BOOK
            </span>
            <span className="text-3xl md:text-5xl font-extrabold text-white tracking-widest uppercase flex items-center gap-4">
                MY COMPLETE <span className="text-[#facc15]">DIET PLAN</span> E-BOOK
            </span>
            <span className="text-3xl md:text-5xl font-extrabold text-white tracking-widest uppercase flex items-center gap-4">
                MY COMPLETE <span className="text-[#facc15]">DIET PLAN</span> E-BOOK
            </span>
            <span className="text-3xl md:text-5xl font-extrabold text-white tracking-widest uppercase flex items-center gap-4">
                MY COMPLETE <span className="text-[#facc15]">DIET PLAN</span> E-BOOK
            </span>
        </div>
        <div className="flex items-center gap-16 px-8">
            <span className="text-3xl md:text-5xl font-extrabold text-white tracking-widest uppercase flex items-center gap-4">
                MY COMPLETE <span className="text-[#facc15]">DIET PLAN</span> E-BOOK
            </span>
            <span className="text-3xl md:text-5xl font-extrabold text-white tracking-widest uppercase flex items-center gap-4">
                MY COMPLETE <span className="text-[#facc15]">DIET PLAN</span> E-BOOK
            </span>
            <span className="text-3xl md:text-5xl font-extrabold text-white tracking-widest uppercase flex items-center gap-4">
                MY COMPLETE <span className="text-[#facc15]">DIET PLAN</span> E-BOOK
            </span>
            <span className="text-3xl md:text-5xl font-extrabold text-white tracking-widest uppercase flex items-center gap-4">
                MY COMPLETE <span className="text-[#facc15]">DIET PLAN</span> E-BOOK
            </span>
        </div>
    </div>
</div>

{/*  My Journey Section  */}
<section className="py-12 md:py-section-gap px-6 bg-surface-container-lowest">
<div className="max-w-7xl mx-auto">
<div className="text-center mb-16 reveal">
<h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">The Evolution of Excellence</h2>
<p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">A testament to what is possible when discipline meets data. No shortcuts, just natural progression.</p>
</div>
{/*  Mobile Swiper / Desktop Grid  */}
<div className="swiper journey-swiper !pb-12 md:!pb-0">
<div className="swiper-wrapper md:!grid md:grid-cols-4 md:gap-4 md:transform-none">
{/*  Timeline Items  */}
<div className="swiper-slide md:!w-auto !w-[65%]">
<div className="glass-card reveal relative overflow-hidden group aspect-[4/5] md:aspect-[3/4]" style={{transitionDelay: '100ms', }}>
<img className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0" src="./assets/images/year2-image.jpg" alt="Year 0" />
<div className="absolute top-0 left-0 w-full p-8 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10">
<span className="text-primary font-bold text-headline-md block drop-shadow-md">DAY 1</span>
</div>
</div>
</div>
<div className="swiper-slide md:!w-auto !w-[65%]">
<div className="glass-card md:mt-12 reveal relative overflow-hidden group aspect-[4/5] md:aspect-[3/4]" style={{transitionDelay: '200ms', }}>
<img className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0" src="./assets/images/year2-new-image.jpg" alt="2nd Month" />
<div className="absolute top-0 left-0 w-full p-8 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10">
<span className="text-primary font-bold text-xl block mb-1 drop-shadow-md tracking-wide">2ND</span>
<span className="text-primary font-bold text-headline-md block drop-shadow-md">MONTH</span>
</div>
</div>
</div>
<div className="swiper-slide md:!w-auto !w-[65%]">
<div className="glass-card reveal relative overflow-hidden group aspect-[4/5] md:aspect-[3/4]" style={{transitionDelay: '300ms', }}>
<img className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0" src="./assets/images/year4-image.jpg" alt="5th Month" />
<div className="absolute top-0 left-0 w-full p-8 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10">
<span className="text-primary font-bold text-xl block mb-1 drop-shadow-md tracking-wide">5TH</span>
<span className="text-primary font-bold text-headline-md block drop-shadow-md">MONTH</span>
</div>
</div>
</div>
<div className="swiper-slide md:!w-auto !w-[65%]">
<div className="glass-card md:mt-12 reveal relative overflow-hidden group aspect-[4/5] md:aspect-[3/4]" style={{transitionDelay: '400ms', }}>
<img className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0" src="./assets/images/today-image.jpg" alt="Today" />
<div className="absolute top-0 left-0 w-full p-8 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10">
<span className="text-primary font-bold text-sm block mb-1 drop-shadow-md tracking-wide">7TH MONTH</span>
<span className="text-primary font-bold text-headline-md block drop-shadow-md">TODAY</span>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
{/*  About eBook (Feature Grid)  */}
<section className="py-12 md:py-section-gap px-6 relative">
<div className="max-w-7xl mx-auto">
<div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
<div className="reveal">
<h2 className="font-display-xl text-4xl md:text-headline-lg lg:text-display-xl text-on-surface mb-8">Inside the <span className="text-primary">Performance Blueprint</span></h2>
<div className="w-full text-on-surface-variant">
    <div>
        <ul className="space-y-1 text-body-md list-disc list-outside marker:text-primary pl-6">
            <li>Personalized calorie and macro calculations based on your goal.</li>
            <li>A complete breakdown of protein, carbs, fats, fiber, and hydration.</li>
            <li>Step-by-step nutrition strategies for lean bulking, fat loss, and maintenance.</li>
            <li>High-protein meal plans and balanced daily diet templates.</li>
            <li>Pre- and post-workout nutrition to maximize performance and recovery.</li>
            <li>Supplement guidance, including creatine, whey protein, fish oil, and multivitamins.</li>
            <li>High-calorie shake recipes with full calorie and macro breakdowns.</li>
            <li>Budget-friendly grocery lists and smart food choices.</li>
            <li>Answers to the most common fitness and nutrition questions.</li>
            <li>Practical tips to avoid mistakes, build healthy habits, and stay consistent.</li>
        </ul>
    </div>
</div>
</div>
<div className="relative reveal order-first lg:order-last flex justify-center lg:justify-end">
    {/*  Static Gallery Grid  */}
    <div className="relative w-full max-w-[500px] lg:max-w-[550px] aspect-square flex items-center justify-center perspective-1000 group">
        <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full z-0"></div>
        
        {/*  Static Gallery Grid  */}
        <div className="relative w-full h-full z-10">
            <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-full">
                <div className="w-full h-full relative group/img">
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 rounded-tl-3xl rounded-tr-md rounded-bl-md rounded-br-md"></div>
                    <img className="w-full h-full object-cover rounded-tl-3xl rounded-tr-md rounded-bl-md rounded-br-md transition-all duration-500" src="./assets/images/gallery-food.jpg" alt="Gallery Image 1" />
                </div>
                <div className="w-full h-full relative group/img">
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 rounded-tr-3xl rounded-tl-md rounded-br-md rounded-bl-md"></div>
                    <img className="w-full h-full object-cover rounded-tr-3xl rounded-tl-md rounded-br-md rounded-bl-md transition-all duration-500" src="./assets/images/gallery-shake.jpg" alt="Gallery Image 2" />
                </div>
                <div className="col-span-2 w-full h-full relative group/img">
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 rounded-bl-3xl rounded-br-3xl rounded-tl-md rounded-tr-md"></div>
                    <img className="w-full h-full object-cover rounded-bl-3xl rounded-br-3xl rounded-tl-md rounded-tr-md transition-all duration-500" src="./assets/images/gallery-poster.jpg" alt="Gallery Image 3" />
            </div>
        </div>
    </div>
</div>
</div>
</div>
</div>
</section>

</main>
{/*  Footer Shell  */}
<footer className="bg-surface-container-lowest border-t border-white/5">
<div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
<div className="col-span-1 md:col-span-2">
<span className="text-headline-sm font-headline-sm font-bold text-on-surface mb-6 block uppercase">GAIN BLUEPRINT</span>
<p className="text-on-surface-variant text-body-md max-w-sm mb-8">Dedicated to providing high-performance nutrition protocols for natural bodybuilding enthusiasts around the globe.</p>
<div className="flex gap-4">
<a className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">share</span>
</a>
<a className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">video_library</span>
</a>
</div>
</div>
<div>
<h5 className="text-on-surface font-bold mb-6">Explore</h5>
<ul className="space-y-4">
<li><a className="text-on-surface-variant hover:text-primary transition-colors text-label-sm font-label-sm" href="#">Privacy Policy</a></li>
<li><a className="text-on-surface-variant hover:text-primary transition-colors text-label-sm font-label-sm" href="#">Terms of Service</a></li>
<li><a className="text-on-surface-variant hover:text-primary transition-colors text-label-sm font-label-sm" href="#">Disclaimer</a></li>
<li><a className="text-on-surface-variant hover:text-primary transition-colors text-label-sm font-label-sm" href="#">Affiliate Program</a></li>
</ul>
</div>
<div>
<h5 className="text-on-surface font-bold mb-6">Contact</h5>
<p className="text-on-surface-variant text-label-sm font-label-sm mb-4">support@aestheticedge.com</p>
<div className="glass-card p-4">
<p className="text-on-surface-variant text-xs mb-2">Weekly performance newsletter</p>
<div className="flex gap-2">
<input className="bg-transparent border-b border-white/10 text-xs w-full focus:border-primary transition-colors outline-none pb-1" placeholder="Email" type="email"/>
<button className="text-primary material-symbols-outlined">arrow_forward</button>
</div>
</div>
</div>
</div>
<div className="max-w-7xl mx-auto px-6 py-8 border-t border-white/5 text-center md:text-left">
<span className="text-label-sm font-label-sm text-on-surface-variant uppercase opacity-60">© 2024 GAIN BLUEPRINT PERFORMANCE. ALL RIGHTS RESERVED.</span>
</div>
</footer>






        </>
    );
}
