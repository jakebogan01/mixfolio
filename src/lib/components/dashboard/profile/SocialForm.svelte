<script>
	import { z } from 'zod';
	import { fly } from 'svelte/transition';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import reporterDom from '@felte/reporter-dom';
	import Button from '$lib/components/global/Button.svelte';
	import { invalidateAll } from '$app/navigation';

	let { data, toggleSocialMenu = () => {} } = $props();
	let buttonDisabled = $state(false);

	const urlOrEmpty = z
		.string()
		.trim()
		.transform(val => val === '' ? null : val)
		.nullable()
		.optional()
		.refine(val => val === null || /^https?:\/\/.+/.test(val), {
			message: 'Must be a valid URL',
		});

	const schema = z.object({
		instagram: urlOrEmpty,
		linkedin: urlOrEmpty,
		github: urlOrEmpty,
		facebook: urlOrEmpty,
	});

		function createSocialsJSON(values) {
		return Object.fromEntries(
			Object.entries(values).filter(([_, v]) => v && v.trim() !== '')
		);
	}

	const { form } = createForm({
		initialValues: {
			instagram: data?.userProfile?.socials?.instagram || '',
			github: data?.userProfile?.socials?.github || '',
			linkedin: data?.userProfile?.socials?.linkedin || '',
			facebook: data?.userProfile?.socials?.facebook || ''
		},
		extend: [validator({ schema }), reporterDom()],
		onSubmit: async (values) => {
			buttonDisabled = true;
			try {
				const socialsJSON = createSocialsJSON(values);

				const updateData = {
					socials: JSON.stringify(socialsJSON)
				};

				const recordId = data?.userProfile?.id;

				await data.pb.collection('profiles').update(recordId, updateData);

				data.userProfile.socials = socialsJSON;
				await invalidateAll();

				toggleSocialMenu();
			} catch (error) {
				console.error('Update failed:', error);
			} finally {
				buttonDisabled = false;
			}
		}
	});

</script>

<div role="dialog" aria-modal="true" aria-labelledby="drawer-title" class="relative z-50">
	<div class="fixed inset-0"></div>
	<div class="fixed inset-0 overflow-hidden">
		<div class="absolute inset-0 overflow-hidden">
			<div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
				<div
					in:fly|local={{ x: 448, opacity: 1, duration: 300 }}
					out:fly|local={{ x: 448, opacity: 1, duration: 300 }}
					class="border-light-border-theme-light dark:border-light-border-theme-dark pointer-events-auto w-screen max-w-md border-l"
				>
					<form
						class="dark:divide-light-border-theme-dark dark:bg-primary-theme-dark flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
						enctype="multipart/form-data"
						use:form
					>
						<div class="h-0 flex-1 overflow-y-auto">
							<div class="bg-primary px-4 py-6 sm:px-6 dark:bg-gray-950">
								<div class="flex items-center justify-between">
									<h2 id="drawer-title" class="text-base font-semibold text-white">
										Update Your Profile
									</h2>
									<div class="ml-3 flex h-7 items-center">
										<button
											type="button"
											onclick={toggleSocialMenu}
											class="bg-secondary-btn-bg-theme-light dark:bg-secondary-btn-bg-theme-dark relative cursor-pointer rounded-md text-gray-300 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-hidden"
										>
											<span class="absolute -inset-2.5"></span>
											<span class="sr-only">Close panel</span>
											<svg
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="1.5"
												data-slot="icon"
												aria-hidden="true"
												class="size-6"
											>
												<path
													d="M6 18 18 6M6 6l12 12"
													stroke-linecap="round"
													stroke-linejoin="round"
												/>
											</svg>
										</button>
									</div>
								</div>
							</div>
							<div class="flex flex-1 flex-col justify-between">
								<div class="divide-y divide-gray-200 px-4 sm:px-6">
									<div class="space-y-6 pt-6 pb-5">
										{#each ['instagram', 'github', 'linkedin', 'facebook'] as network}
											<div>
												<label
													for={network}
													class="block text-sm/6 font-medium text-gray-900 dark:text-gray-400"
												>
													{network.charAt(0).toUpperCase() + network.slice(1)}
												</label>
												<div class="mt-2">
													<input
														id={network}
														name={network}
														type="url"
														placeholder={`https://www.${network}.com/yourprofile`}
														class="dark:bg-primary-theme-dark dark:outline-light-border-theme-dark block w-full rounded-lg border border-transparent bg-white py-1.5 pl-3 pr-10 text-base shadow-sm outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 dark:text-white"
														aria-describedby={`${network}-validation`}
													/>
												</div>
												<div
													id={`${network}-validation`}
													class="mt-1 text-sm text-red-500"
													data-felte-reporter-dom-for={network}
													aria-live="polite"
													data-felte-reporter-dom-single-message
												></div>
											</div>
										{/each}
									</div>
								</div>
							</div>
						</div>
						<div class="flex justify-end px-4 py-4">
							<div class="flex shrink-0 justify-end">
								<Button
									callBack={toggleSocialMenu}
									text="Cancel"
									class="text-dark-text-theme-light! bg-white  hover:bg-gray-200"
								/>
								<Button
									disabled={buttonDisabled}
									type="submit"
									class="bg-primary-btn-bg-theme-light dark:bg-primary-btn-bg-theme-dark sm:hover:bg-primary-btn-hover-theme-light sm:dark:hover:bg-secondary-btn-hover-theme-dark ml-4 flex h-9 w-[4.5625rem] items-center justify-center"
								>
									{#if buttonDisabled}
										<span class="loader"></span>
									{:else}
										Update
									{/if}
								</Button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
