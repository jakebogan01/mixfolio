export function handleToggleMenuFactory(getOpenFn, setOpenFn) {
	return (e) => {
		e?.stopPropagation?.();

		const isCurrentlyOpen = getOpenFn();
		if (isCurrentlyOpen) {
			setOpenFn(false);
			document.body.removeEventListener('click', close);
		} else {
			setOpenFn(true);
			document.body.addEventListener('click', close);
		}
	};

	function close() {
		setOpenFn(false);
		document.body.removeEventListener('click', close);
	}
}

export function handleMenuCloseFactory(setOpenFn) {
	return () => {
		setOpenFn(false);
		document.body.removeEventListener('click', close);
	};

	function close() {
		setOpenFn(false);
		document.body.removeEventListener('click', close);
	}
}
