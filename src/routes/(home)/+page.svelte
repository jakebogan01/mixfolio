<script>
	import Hero from '$lib/components/home/home_page/Hero.svelte';
	import Head from '$lib/components/Head.svelte';
	import ContentSection from '$lib/components/home/home_page/ContentSection.svelte';
	import DarkBentoSection from '$lib/components/home/home_page/DarkBentoSection.svelte';
	import Testimonials from '$lib/components/home/home_page/Testimonials.svelte';
	import Footer from '$lib/components/home/home_page/Footer.svelte';
</script>

<Head
	page_title="MixFolio - Home"
	description="Mixfolio lets you easily create and share your personal portfolio. Sign up, customize your profile, and get a unique link to showcase your work with anyone, anywhere."
	keywords="portfolio builder, online portfolio, shareable portfolio, personal website, create portfolio, digital resume, showcase work, portfolio link, professional profile, designer portfolio, developer portfolio, student portfolio, creative portfolio, Mixfolio, portfolio generator, web portfolio, custom portfolio, online presence, portfolio URL"
/>

<div class="overflow-hidden">
	<Hero />
	<main>
		<ContentSection />
		<DarkBentoSection />
	</main>
	<Testimonials />
	<Footer />
</div>
