import toast from 'svelte-5-french-toast';

export const toastMessage = (type = 'success', msg) => {
	switch (type) {
		case 'error':
			return toast.error(msg, { position: 'bottom-right' });
		default:
			return toast.success(msg, { position: 'bottom-right' });
	}
};
