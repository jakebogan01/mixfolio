<script>
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { showImageCropper } from '$lib/stores/showImageCropper.svelte.js';
	import { trackingData } from '$lib/stores/trackingData.svelte.js';
	import { darkMode } from '$lib/stores/darkMode.svelte.js';
	import toast, { Toaster } from 'svelte-5-french-toast';
	import { toastMessage } from '$lib/utils/toast.js';
	import Nav from '$lib/components/dashboard/Nav.svelte';
	import Search from '$lib/components/dashboard/Search.svelte';
	import ImageCropper from '$lib/components/dashboard/ImageCropper.svelte';
	import Button from '$lib/components/global/Button.svelte';

	import { z } from 'zod';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import reporterDom from '@felte/reporter-dom';
	import { invalidateAll } from '$app/navigation';

	let { children, data } = $props();
	let menuOpen = $state(false);
	let scrolled = $state(false);
	let openFeedback = $state(false);
	import { fly, fade, scale } from 'svelte/transition';
	let buttonDisabled = $state(false);

	onMount(async () => {
		if (page?.state?.message) toastMessage(page.state.type, page.state.message);

		try {
			const res = await fetch(`/api/umami/${data?.userProfile?.slug}`);

			if (res.ok) {
				let data = await res.json();
				((trackingData.metrics = data?.metrics || []), (trackingData.events = data?.events || []));
			}
		} catch (error) {
			console.dir(error, { depth: null });
		}
	});

	$effect(() => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > 50;
			if (scrolled !== isScrolled) {
				scrolled = isScrolled;
			}
		};

		handleScroll();
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	const toggleMenu = () => (menuOpen = !menuOpen);

	const toggleFeedback = () => {
		openFeedback = !openFeedback;
		console.log(openFeedback);

	}

	import emailjs from '@emailjs/browser';
	import {
		PUBLIC_EMAILJS_SERVICE_ID,
		PUBLIC_EMAILJS_TEMPLATE_ID,
		PUBLIC_EMAILJS_PUBLIC_KEY
	} from '$env/static/public';
	let feedback = $state('');
	const sendEmail = async (event) => {
		event.preventDefault();
		const templateParams = {
			name: data?.userProfile?.name,
			email: data?.userProfile?.email,
			feedback: feedback,
		};
		try {
			buttonDisabled = true;
			const response = await emailjs.send(
				PUBLIC_EMAILJS_SERVICE_ID,
				PUBLIC_EMAILJS_TEMPLATE_ID,
				templateParams,
				{ publicKey: PUBLIC_EMAILJS_PUBLIC_KEY }
			);
			toggleFeedback();
			console.log('Successfully submitted', response);
			feedback='';
			buttonDisabled = false;
			toast.success('Thank you for your feedback', { position: 'bottom-left' });
		} catch (err) {
			buttonDisabled = false;
			toast.error('Unable to send message', { position: 'bottom-left' });
			console.error('FAILED...');
			console.dir(err, { depth: null });
		}
	};

</script>

<div
	class="relative flex min-h-screen bg-gray-100 pl-0 font-sans xl:pl-76 dark:bg-gray-900 {darkMode.status
		? 'dark'
		: ''}"
>
	<div class="absolute left-0 h-screen w-full max-w-7xl overflow-x-hidden">
		<div
			class="z-0 h-60 w-xl translate-x-60 -translate-y-44 -rotate-10 rounded-full bg-linear-115 from-yellow-100 from-28% via-pink-400 via-70% to-purple-500 blur-3xl
			 md:right-0 xl:translate-x-90 dark:bg-none"
		></div>
	</div>
	<Nav {menuOpen} {toggleMenu} slug={data?.userProfile?.slug} />
	<div
		class="relative z-10 mx-auto flex max-w-400 flex-1 flex-col p-4 transition-[margin] duration-200 ease-linear"
	>
		<Search userProfile={data?.userProfile} {menuOpen} {scrolled} {toggleMenu} {data} />
		<main class="mt-12 flex flex-1 flex-col justify-between">
			<div>
				{@render children()}
			</div>
			<footer class="flex w-full justify-end gap-6 px-2 py-2 items-center">

				<p class=" text-sm leading-normal font-normal text-gray-500  dark:text-gray-500">
					© {new Date().getFullYear()}, Created by <a href="/" class="hover:underline">MixFolio</a>
					Team. | <button onclick="{toggleFeedback}" class="hover:underline cursor-pointer" > Feedback</button>
				</p>
<!--				<Button-->
<!--					class= "text-sm leading-normal font-normal text-gray-500 dark:text-gray-600"z-->
<!--					text="Feedback"-->
<!--					callBack={toggleFeedback}-->
<!--				></Button>-->
			</footer>
		</main>
	</div>


{#if showImageCropper.status}
	<ImageCropper />
{/if}

<Toaster />

{#if openFeedback}
	<div role="dialog" aria-modal="true" aria-labelledby="dialog-title" class="relative z-100">
		<div
			transition:fade
			aria-hidden="true"
			class="fixed inset-0 bg-black/40 transition-opacity"
		></div>
		<div class="fixed inset-0 z-10 w-screen overflow-y-auto">
			<div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
				<div
					transition:scale
					class="dark:bg-primary-theme-dark relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
				>

					<form onsubmit={sendEmail}>
					<div class="m-2">
						<div class="text-left">
							<p id="dialog-title" class="text-base font-semibold text-gray-900 dark:text-white">
								What can we improve on?
							</p>
							<div class="mt-2">
								<p class="text-sm text-gray-500 dark:text-gray-400">
									<textarea id="question1" name="feedback" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Please share your thoughts here..." bind:value={feedback}></textarea>
								</p>
							</div>
						</div>
					</div>
						<div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
<!--						<Button-->
<!--							type="Submit"-->
<!--							text="Submit"-->
<!--							class="bg-primary-btn-bg-theme-light ml-2 dark:bg-primary-btn-bg-theme-dark sm:hover:bg-primary-btn-hover-theme-light sm:dark:hover:bg-secondary-btn-hover-theme-dark"-->
<!--						/>-->

							<Button
								disabled={buttonDisabled}
								type="submit"
								class="bg-primary-btn-bg-theme-light dark:bg-primary-btn-bg-theme-dark sm:hover:bg-primary-btn-hover-theme-light sm:dark:hover:bg-secondary-btn-hover-theme-dark ml-4 flex h-9 w-[4.5625rem] items-center justify-center"
							>
								{#if buttonDisabled}
									<span class="loader"></span>
								{:else}
									Submit
								{/if}
							</Button>
						<Button
							callBack={toggleFeedback}
							text="Cancel"
							class="text-dark-text-theme-light! bg-white  hover:bg-gray-200"
						/>
					</div>
					</form>
				</div>
			</div>
		</div>
	</div>
{/if}
</div>