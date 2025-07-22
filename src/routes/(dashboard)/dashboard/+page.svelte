<script>
	import ProjectsQuickView from '$lib/components/dashboard/home/ProjectsQuickView.svelte';
	import TestimonialsQuickView from '$lib/components/dashboard/home/TestimonialsQuickView.svelte';
	import ProfileQuickView from '$lib/components/dashboard/home/ProfileQuickView.svelte';

	let { data } = $props();
</script>

<div class="mb-12 grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
	<div
		class="relative flex flex-col rounded-xl border border-gray-300 bg-white bg-clip-border text-gray-700"
	>
		<div
			class="absolute mx-4 mt-4 grid h-12 w-12 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-gray-900 to-gray-800 bg-clip-border text-white"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				aria-hidden="true"
				class="h-6 w-6 text-white"
				><path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path><path
					fill-rule="evenodd"
					d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
					clip-rule="evenodd"
				></path><path
					d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"
				></path></svg
			>
		</div>
		<div class="p-4 text-right">
			<p class="block font-sans text-sm leading-normal font-normal">Today's Money</p>
			<h4 class="block font-sans text-2xl leading-snug font-semibold tracking-normal">$53k</h4>
		</div>
		<div class="p-4">
			<p class="block font-sans text-base leading-relaxed font-normal">
				<strong class="text-green-600">+55%</strong>&nbsp;than last week
			</p>
		</div>
	</div>
	<div
		class="relative flex flex-col rounded-xl border border-gray-300 bg-white bg-clip-border text-gray-700"
	>
		<div
			class="absolute mx-4 mt-4 grid h-12 w-12 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-gray-900 to-gray-800 bg-clip-border text-white"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				aria-hidden="true"
				class="h-6 w-6 text-white"
				><path
					d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z"
				></path></svg
			>
		</div>
		<div class="p-4 text-right">
			<p class="block font-sans text-sm leading-normal font-normal">Today's Users</p>
			<h4 class="block font-sans text-2xl leading-snug font-semibold tracking-normal">2,300</h4>
		</div>
		<div class="p-4">
			<p class="block font-sans text-base leading-relaxed font-normal">
				<strong class="text-green-600">+3%</strong>&nbsp;than last month
			</p>
		</div>
	</div>
	<div
		class="relative flex flex-col rounded-xl border border-gray-300 bg-white bg-clip-border text-gray-700"
	>
		<div
			class="absolute mx-4 mt-4 grid h-12 w-12 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-gray-900 to-gray-800 bg-clip-border text-white"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				aria-hidden="true"
				class="h-6 w-6 text-white"
				><path
					d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"
				></path></svg
			>
		</div>
		<div class="p-4 text-right">
			<p class="block font-sans text-sm leading-normal font-normal">New Clients</p>
			<h4 class=" block font-sans text-2xl leading-snug font-semibold tracking-normal">3,462</h4>
		</div>
		<div class="p-4">
			<p class=" block font-sans text-base leading-relaxed font-normal">
				<strong class="text-red-500">-2%</strong>&nbsp;than yesterday
			</p>
		</div>
	</div>
	<div
		class="relative flex flex-col rounded-xl border border-gray-300 bg-white bg-clip-border text-gray-700"
	>
		<div
			class="absolute mx-4 mt-4 grid h-12 w-12 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-gray-900 to-gray-800 bg-clip-border text-white"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				aria-hidden="true"
				class="h-6 w-6 text-white"
				><path
					d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"
				></path></svg
			>
		</div>
		<div class="p-4 text-right">
			<p class=" block font-sans text-sm leading-normal font-normal">Sales</p>
			<h4 class=" block font-sans text-2xl leading-snug font-semibold tracking-normal">$103,430</h4>
		</div>
		<div class="p-4">
			<p class=" block font-sans text-base leading-relaxed font-normal">
				<strong class="text-green-600">+5%</strong>&nbsp;than yesterday
			</p>
		</div>
	</div>
</div>
<div class="mb-6 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
	<ProfileQuickView userProfile={data?.userProfile} />
	<div
		class="relative flex flex-col rounded-xl border border-gray-300 bg-white bg-clip-border text-gray-700"
	>
		<div
			class="relative mx-4 mt-4 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700"
		>
			<div
				type="line"
				height="220"
				series="[object Object]"
				options="[object Object]"
				width="100%"
				style="min-height: 235px;"
			>
				<div
					id="apexcharts3lrktm7c"
					class="apexcharts-canvas apexcharts3lrktm7c apexcharts-theme-light"
					style="width: 353px; height: 220px;"
				>
					<svg
						id="SvgjsSvg1759"
						width="353"
						height="220"
						xmlns="http://www.w3.org/2000/svg"
						version="1.1"
						class="apexcharts-svg apexcharts-zoomable hovering-zoom"
						transform="translate(0, 0)"
						style="background: transparent;"
						><foreignObject x="0" y="0" width="353" height="220"
							><div
								class="apexcharts-legend"
								xmlns="http://www.w3.org/1999/xhtml"
								style="max-height: 110px;"
							></div></foreignObject
						><rect
							id="SvgjsRect1764"
							width="0"
							height="0"
							x="0"
							y="0"
							rx="0"
							ry="0"
							opacity="1"
							stroke-width="0"
							stroke="none"
							stroke-dasharray="0"
							fill="#fefefe"
						></rect><g
							id="SvgjsG1843"
							class="apexcharts-yaxis"
							rel="0"
							transform="translate(18.92500114440918, 0)"
							><g id="SvgjsG1844" class="apexcharts-yaxis-texts-g"
								><text
									id="SvgjsText1846"
									font-family="inherit"
									x="20"
									y="36.6"
									text-anchor="end"
									dominant-baseline="auto"
									font-size="13px"
									font-weight="300"
									fill="#37474f"
									class="apexcharts-text apexcharts-yaxis-label"
									style="font-family: inherit;"
									><tspan id="SvgjsTspan1847">600</tspan><title>600</title></text
								><text
									id="SvgjsText1849"
									font-family="inherit"
									x="20"
									y="60.61866666666666"
									text-anchor="end"
									dominant-baseline="auto"
									font-size="13px"
									font-weight="300"
									fill="#37474f"
									class="apexcharts-text apexcharts-yaxis-label"
									style="font-family: inherit;"
									><tspan id="SvgjsTspan1850">500</tspan><title>500</title></text
								><text
									id="SvgjsText1852"
									font-family="inherit"
									x="20"
									y="84.63733333333332"
									text-anchor="end"
									dominant-baseline="auto"
									font-size="13px"
									font-weight="300"
									fill="#37474f"
									class="apexcharts-text apexcharts-yaxis-label"
									style="font-family: inherit;"
									><tspan id="SvgjsTspan1853">400</tspan><title>400</title></text
								><text
									id="SvgjsText1855"
									font-family="inherit"
									x="20"
									y="108.65599999999998"
									text-anchor="end"
									dominant-baseline="auto"
									font-size="13px"
									font-weight="300"
									fill="#37474f"
									class="apexcharts-text apexcharts-yaxis-label"
									style="font-family: inherit;"
									><tspan id="SvgjsTspan1856">300</tspan><title>300</title></text
								><text
									id="SvgjsText1858"
									font-family="inherit"
									x="20"
									y="132.67466666666664"
									text-anchor="end"
									dominant-baseline="auto"
									font-size="13px"
									font-weight="300"
									fill="#37474f"
									class="apexcharts-text apexcharts-yaxis-label"
									style="font-family: inherit;"
									><tspan id="SvgjsTspan1859">200</tspan><title>200</title></text
								><text
									id="SvgjsText1861"
									font-family="inherit"
									x="20"
									y="156.6933333333333"
									text-anchor="end"
									dominant-baseline="auto"
									font-size="13px"
									font-weight="300"
									fill="#37474f"
									class="apexcharts-text apexcharts-yaxis-label"
									style="font-family: inherit;"
									><tspan id="SvgjsTspan1862">100</tspan><title>100</title></text
								><text
									id="SvgjsText1864"
									font-family="inherit"
									x="20"
									y="180.71199999999996"
									text-anchor="end"
									dominant-baseline="auto"
									font-size="13px"
									font-weight="300"
									fill="#37474f"
									class="apexcharts-text apexcharts-yaxis-label"
									style="font-family: inherit;"
									><tspan id="SvgjsTspan1865">0</tspan><title>0</title></text
								></g
							></g
						><g
							id="SvgjsG1761"
							class="apexcharts-inner apexcharts-graphical"
							transform="translate(48.92500114440918, 35)"
							><defs id="SvgjsDefs1760"
								><clipPath id="gridRectMask3lrktm7c"
									><rect
										id="SvgjsRect1766"
										width="293.0749988555908"
										height="168.112"
										x="-7"
										y="-12"
										rx="0"
										ry="0"
										opacity="1"
										stroke-width="0"
										stroke="none"
										stroke-dasharray="0"
										fill="#fff"
									></rect></clipPath
								><clipPath id="forecastMask3lrktm7c"></clipPath><clipPath
									id="nonForecastMask3lrktm7c"
								></clipPath><clipPath id="gridRectMarkerMask3lrktm7c"
									><rect
										id="SvgjsRect1767"
										width="336.0749988555908"
										height="196.112"
										x="-26"
										y="-26"
										rx="0"
										ry="0"
										opacity="1"
										stroke-width="0"
										stroke="none"
										stroke-dasharray="0"
										fill="#fff"
									></rect></clipPath
								></defs
							><line
								id="SvgjsLine1765"
								x1="212.55624914169312"
								y1="0"
								x2="212.55624914169312"
								y2="144.112"
								stroke="#b6b6b6"
								stroke-dasharray="3"
								stroke-linecap="butt"
								class="apexcharts-xcrosshairs"
								x="212.55624914169312"
								y="0"
								width="1"
								height="144.112"
								fill="#b1b9c4"
								filter="none"
								fill-opacity="0.9"
								stroke-width="1"
							></line><g id="SvgjsG1790" class="apexcharts-grid"
								><g id="SvgjsG1791" class="apexcharts-gridlines-horizontal"
									><line
										id="SvgjsLine1804"
										x1="0"
										y1="24.018666666666665"
										x2="284.0749988555908"
										y2="24.018666666666665"
										stroke="#dddddd"
										stroke-dasharray="5"
										stroke-linecap="butt"
										class="apexcharts-gridline"
									></line><line
										id="SvgjsLine1805"
										x1="0"
										y1="48.03733333333333"
										x2="284.0749988555908"
										y2="48.03733333333333"
										stroke="#dddddd"
										stroke-dasharray="5"
										stroke-linecap="butt"
										class="apexcharts-gridline"
									></line><line
										id="SvgjsLine1806"
										x1="0"
										y1="72.056"
										x2="284.0749988555908"
										y2="72.056"
										stroke="#dddddd"
										stroke-dasharray="5"
										stroke-linecap="butt"
										class="apexcharts-gridline"
									></line><line
										id="SvgjsLine1807"
										x1="0"
										y1="96.07466666666666"
										x2="284.0749988555908"
										y2="96.07466666666666"
										stroke="#dddddd"
										stroke-dasharray="5"
										stroke-linecap="butt"
										class="apexcharts-gridline"
									></line><line
										id="SvgjsLine1808"
										x1="0"
										y1="120.09333333333332"
										x2="284.0749988555908"
										y2="120.09333333333332"
										stroke="#dddddd"
										stroke-dasharray="5"
										stroke-linecap="butt"
										class="apexcharts-gridline"
									></line></g
								><g id="SvgjsG1792" class="apexcharts-gridlines-vertical"
									><line
										id="SvgjsLine1794"
										x1="0"
										y1="0"
										x2="0"
										y2="144.112"
										stroke="#dddddd"
										stroke-dasharray="5"
										stroke-linecap="butt"
										class="apexcharts-gridline"
									></line><line
										id="SvgjsLine1795"
										x1="35.50937485694885"
										y1="0"
										x2="35.50937485694885"
										y2="144.112"
										stroke="#dddddd"
										stroke-dasharray="5"
										stroke-linecap="butt"
										class="apexcharts-gridline"
									></line><line
										id="SvgjsLine1796"
										x1="71.0187497138977"
										y1="0"
										x2="71.0187497138977"
										y2="144.112"
										stroke="#dddddd"
										stroke-dasharray="5"
										stroke-linecap="butt"
										class="apexcharts-gridline"
									></line><line
										id="SvgjsLine1797"
										x1="106.52812457084656"
										y1="0"
										x2="106.52812457084656"
										y2="144.112"
										stroke="#dddddd"
										stroke-dasharray="5"
										stroke-linecap="butt"
										class="apexcharts-gridline"
									></line><line
										id="SvgjsLine1798"
										x1="142.0374994277954"
										y1="0"
										x2="142.0374994277954"
										y2="144.112"
										stroke="#dddddd"
										stroke-dasharray="5"
										stroke-linecap="butt"
										class="apexcharts-gridline"
									></line><line
										id="SvgjsLine1799"
										x1="177.54687428474426"
										y1="0"
										x2="177.54687428474426"
										y2="144.112"
										stroke="#dddddd"
										stroke-dasharray="5"
										stroke-linecap="butt"
										class="apexcharts-gridline"
									></line><line
										id="SvgjsLine1800"
										x1="213.05624914169312"
										y1="0"
										x2="213.05624914169312"
										y2="144.112"
										stroke="#dddddd"
										stroke-dasharray="5"
										stroke-linecap="butt"
										class="apexcharts-gridline"
									></line><line
										id="SvgjsLine1801"
										x1="248.56562399864197"
										y1="0"
										x2="248.56562399864197"
										y2="144.112"
										stroke="#dddddd"
										stroke-dasharray="5"
										stroke-linecap="butt"
										class="apexcharts-gridline"
									></line><line
										id="SvgjsLine1802"
										x1="284.0749988555908"
										y1="0"
										x2="284.0749988555908"
										y2="144.112"
										stroke="#dddddd"
										stroke-dasharray="5"
										stroke-linecap="butt"
										class="apexcharts-gridline"
									></line></g
								><line
									id="SvgjsLine1811"
									x1="0"
									y1="144.112"
									x2="284.0749988555908"
									y2="144.112"
									stroke="transparent"
									stroke-dasharray="0"
									stroke-linecap="butt"
								></line><line
									id="SvgjsLine1810"
									x1="0"
									y1="1"
									x2="0"
									y2="144.112"
									stroke="transparent"
									stroke-dasharray="0"
									stroke-linecap="butt"
								></line></g
							><g id="SvgjsG1793" class="apexcharts-grid-borders"
								><line
									id="SvgjsLine1803"
									x1="0"
									y1="0"
									x2="284.0749988555908"
									y2="0"
									stroke="#dddddd"
									stroke-dasharray="5"
									stroke-linecap="butt"
									class="apexcharts-gridline"
								></line><line
									id="SvgjsLine1809"
									x1="0"
									y1="144.112"
									x2="284.0749988555908"
									y2="144.112"
									stroke="#dddddd"
									stroke-dasharray="5"
									stroke-linecap="butt"
									class="apexcharts-gridline"
								></line></g
							><g id="SvgjsG1768" class="apexcharts-line-series apexcharts-plot-series"
								><g
									id="SvgjsG1769"
									class="apexcharts-series"
									zIndex="0"
									seriesName="Sales"
									data:longestSeries="true"
									rel="1"
									data:realIndex="0"
									><path
										id="SvgjsPath1789"
										d="M 0 132.10266666666666 L 35.50937485694885 134.50453333333334 L 71.0187497138977 72.056 L 106.52812457084656 67.25226666666667 L 142.0374994277954 24.018666666666675 L 177.54687428474426 60.04666666666667 L 213.05624914169312 96.07466666666667 L 248.56562399864197 88.86906666666667 L 284.0749988555908 24.018666666666675"
										fill="none"
										fill-opacity="1"
										stroke="rgba(2,136,209,0.8)"
										stroke-opacity="1"
										stroke-linecap="round"
										stroke-width="5"
										stroke-dasharray="0"
										class="apexcharts-line"
										index="0"
										clip-path="url(#gridRectMask3lrktm7c)"
										pathTo="M 0 132.10266666666666 L 35.50937485694885 134.50453333333334 L 71.0187497138977 72.056 L 106.52812457084656 67.25226666666667 L 142.0374994277954 24.018666666666675 L 177.54687428474426 60.04666666666667 L 213.05624914169312 96.07466666666667 L 248.56562399864197 88.86906666666667 L 284.0749988555908 24.018666666666675"
										pathFrom="M -1 144.112 L -1 144.112 L 35.50937485694885 144.112 L 71.0187497138977 144.112 L 106.52812457084656 144.112 L 142.0374994277954 144.112 L 177.54687428474426 144.112 L 213.05624914169312 144.112 L 248.56562399864197 144.112 L 284.0749988555908 144.112"
										fill-rule="evenodd"
									></path><g
										id="SvgjsG1770"
										class="apexcharts-series-markers-wrap apexcharts-hidden-element-shown"
										data:realIndex="0"
										><g
											id="SvgjsG1772"
											class="apexcharts-series-markers"
											clip-path="url(#gridRectMarkerMask3lrktm7c)"
											><circle
												id="SvgjsCircle1773"
												r="5"
												cx="0"
												cy="132.10266666666666"
												class="apexcharts-marker no-pointer-events w3veg88in"
												stroke="#ffffff"
												fill="#0288d1"
												fill-opacity="1"
												stroke-width="2"
												stroke-opacity="0.9"
												rel="0"
												j="0"
												index="0"
												default-marker-size="5"
											></circle><circle
												id="SvgjsCircle1774"
												r="5"
												cx="35.50937485694885"
												cy="134.50453333333334"
												class="apexcharts-marker no-pointer-events wodr5amc5"
												stroke="#ffffff"
												fill="#0288d1"
												fill-opacity="1"
												stroke-width="2"
												stroke-opacity="0.9"
												rel="1"
												j="1"
												index="0"
												default-marker-size="5"
											></circle></g
										><g
											id="SvgjsG1775"
											class="apexcharts-series-markers"
											clip-path="url(#gridRectMarkerMask3lrktm7c)"
											><circle
												id="SvgjsCircle1776"
												r="5"
												cx="71.0187497138977"
												cy="72.056"
												class="apexcharts-marker no-pointer-events w3dqaqol9"
												stroke="#ffffff"
												fill="#0288d1"
												fill-opacity="1"
												stroke-width="2"
												stroke-opacity="0.9"
												rel="2"
												j="2"
												index="0"
												default-marker-size="5"
											></circle></g
										><g
											id="SvgjsG1777"
											class="apexcharts-series-markers"
											clip-path="url(#gridRectMarkerMask3lrktm7c)"
											><circle
												id="SvgjsCircle1778"
												r="5"
												cx="106.52812457084656"
												cy="67.25226666666667"
												class="apexcharts-marker no-pointer-events wbzvwtrh4"
												stroke="#ffffff"
												fill="#0288d1"
												fill-opacity="1"
												stroke-width="2"
												stroke-opacity="0.9"
												rel="3"
												j="3"
												index="0"
												default-marker-size="5"
											></circle></g
										><g
											id="SvgjsG1779"
											class="apexcharts-series-markers"
											clip-path="url(#gridRectMarkerMask3lrktm7c)"
											><circle
												id="SvgjsCircle1780"
												r="5"
												cx="142.0374994277954"
												cy="24.018666666666675"
												class="apexcharts-marker no-pointer-events wty8atrkf"
												stroke="#ffffff"
												fill="#0288d1"
												fill-opacity="1"
												stroke-width="2"
												stroke-opacity="0.9"
												rel="4"
												j="4"
												index="0"
												default-marker-size="5"
											></circle></g
										><g
											id="SvgjsG1781"
											class="apexcharts-series-markers"
											clip-path="url(#gridRectMarkerMask3lrktm7c)"
											><circle
												id="SvgjsCircle1782"
												r="5"
												cx="177.54687428474426"
												cy="60.04666666666667"
												class="apexcharts-marker no-pointer-events wiy9e9dhz"
												stroke="#ffffff"
												fill="#0288d1"
												fill-opacity="1"
												stroke-width="2"
												stroke-opacity="0.9"
												rel="5"
												j="5"
												index="0"
												default-marker-size="5"
											></circle></g
										><g
											id="SvgjsG1783"
											class="apexcharts-series-markers"
											clip-path="url(#gridRectMarkerMask3lrktm7c)"
											><circle
												id="SvgjsCircle1784"
												r="5"
												cx="213.05624914169312"
												cy="96.07466666666667"
												class="apexcharts-marker no-pointer-events w8zo2x3ef"
												stroke="#ffffff"
												fill="#0288d1"
												fill-opacity="1"
												stroke-width="2"
												stroke-opacity="0.9"
												rel="6"
												j="6"
												index="0"
												default-marker-size="5"
											></circle></g
										><g
											id="SvgjsG1785"
											class="apexcharts-series-markers"
											clip-path="url(#gridRectMarkerMask3lrktm7c)"
											><circle
												id="SvgjsCircle1786"
												r="5"
												cx="248.56562399864197"
												cy="88.86906666666667"
												class="apexcharts-marker no-pointer-events wcyfcdmwo"
												stroke="#ffffff"
												fill="#0288d1"
												fill-opacity="1"
												stroke-width="2"
												stroke-opacity="0.9"
												rel="7"
												j="7"
												index="0"
												default-marker-size="5"
											></circle></g
										><g
											id="SvgjsG1787"
											class="apexcharts-series-markers"
											clip-path="url(#gridRectMarkerMask3lrktm7c)"
											><circle
												id="SvgjsCircle1788"
												r="5"
												cx="284.0749988555908"
												cy="24.018666666666675"
												class="apexcharts-marker no-pointer-events wr6pdnj4w"
												stroke="#ffffff"
												fill="#0288d1"
												fill-opacity="1"
												stroke-width="2"
												stroke-opacity="0.9"
												rel="8"
												j="8"
												index="0"
												default-marker-size="5"
											></circle></g
										></g
									></g
								><g id="SvgjsG1771" class="apexcharts-datalabels" data:realIndex="0"></g></g
							><line
								id="SvgjsLine1812"
								x1="0"
								y1="0"
								x2="284.0749988555908"
								y2="0"
								stroke="#b6b6b6"
								stroke-dasharray="0"
								stroke-width="1"
								stroke-linecap="butt"
								class="apexcharts-ycrosshairs"
							></line><line
								id="SvgjsLine1813"
								x1="0"
								y1="0"
								x2="284.0749988555908"
								y2="0"
								stroke-dasharray="0"
								stroke-width="0"
								stroke-linecap="butt"
								class="apexcharts-ycrosshairs-hidden"
							></line><g id="SvgjsG1814" class="apexcharts-xaxis" transform="translate(0, 0)"
								><g id="SvgjsG1815" class="apexcharts-xaxis-texts-g" transform="translate(0, -4)"
									><text
										id="SvgjsText1817"
										font-family="inherit"
										x="0"
										y="173.112"
										text-anchor="middle"
										dominant-baseline="auto"
										font-size="13px"
										font-weight="300"
										fill="#37474f"
										class="apexcharts-text apexcharts-xaxis-label"
										style="font-family: inherit;"
										><tspan id="SvgjsTspan1818">Apr</tspan><title>Apr</title></text
									><text
										id="SvgjsText1820"
										font-family="inherit"
										x="35.50937485694885"
										y="173.112"
										text-anchor="middle"
										dominant-baseline="auto"
										font-size="13px"
										font-weight="300"
										fill="#37474f"
										class="apexcharts-text apexcharts-xaxis-label"
										style="font-family: inherit;"
										><tspan id="SvgjsTspan1821">May</tspan><title>May</title></text
									><text
										id="SvgjsText1823"
										font-family="inherit"
										x="71.0187497138977"
										y="173.112"
										text-anchor="middle"
										dominant-baseline="auto"
										font-size="13px"
										font-weight="300"
										fill="#37474f"
										class="apexcharts-text apexcharts-xaxis-label"
										style="font-family: inherit;"
										><tspan id="SvgjsTspan1824">Jun</tspan><title>Jun</title></text
									><text
										id="SvgjsText1826"
										font-family="inherit"
										x="106.52812457084656"
										y="173.112"
										text-anchor="middle"
										dominant-baseline="auto"
										font-size="13px"
										font-weight="300"
										fill="#37474f"
										class="apexcharts-text apexcharts-xaxis-label"
										style="font-family: inherit;"
										><tspan id="SvgjsTspan1827">Jul</tspan><title>Jul</title></text
									><text
										id="SvgjsText1829"
										font-family="inherit"
										x="142.0374994277954"
										y="173.112"
										text-anchor="middle"
										dominant-baseline="auto"
										font-size="13px"
										font-weight="300"
										fill="#37474f"
										class="apexcharts-text apexcharts-xaxis-label"
										style="font-family: inherit;"
										><tspan id="SvgjsTspan1830">Aug</tspan><title>Aug</title></text
									><text
										id="SvgjsText1832"
										font-family="inherit"
										x="177.54687428474426"
										y="173.112"
										text-anchor="middle"
										dominant-baseline="auto"
										font-size="13px"
										font-weight="300"
										fill="#37474f"
										class="apexcharts-text apexcharts-xaxis-label"
										style="font-family: inherit;"
										><tspan id="SvgjsTspan1833">Sep</tspan><title>Sep</title></text
									><text
										id="SvgjsText1835"
										font-family="inherit"
										x="213.05624914169312"
										y="173.112"
										text-anchor="middle"
										dominant-baseline="auto"
										font-size="13px"
										font-weight="300"
										fill="#37474f"
										class="apexcharts-text apexcharts-xaxis-label"
										style="font-family: inherit;"
										><tspan id="SvgjsTspan1836">Oct</tspan><title>Oct</title></text
									><text
										id="SvgjsText1838"
										font-family="inherit"
										x="248.56562399864197"
										y="173.112"
										text-anchor="middle"
										dominant-baseline="auto"
										font-size="13px"
										font-weight="300"
										fill="#37474f"
										class="apexcharts-text apexcharts-xaxis-label"
										style="font-family: inherit;"
										><tspan id="SvgjsTspan1839">Nov</tspan><title>Nov</title></text
									><text
										id="SvgjsText1841"
										font-family="inherit"
										x="284.0749988555908"
										y="173.112"
										text-anchor="middle"
										dominant-baseline="auto"
										font-size="13px"
										font-weight="300"
										fill="#37474f"
										class="apexcharts-text apexcharts-xaxis-label"
										style="font-family: inherit;"
										><tspan id="SvgjsTspan1842">Dec</tspan><title>Dec</title></text
									></g
								></g
							><g id="SvgjsG1866" class="apexcharts-yaxis-annotations"></g><g
								id="SvgjsG1867"
								class="apexcharts-xaxis-annotations"
							></g><g id="SvgjsG1868" class="apexcharts-point-annotations"></g><rect
								id="SvgjsRect1869"
								width="0"
								height="0"
								x="0"
								y="0"
								rx="0"
								ry="0"
								opacity="1"
								stroke-width="0"
								stroke="none"
								stroke-dasharray="0"
								fill="#fefefe"
								class="apexcharts-zoom-rect"
							></rect><rect
								id="SvgjsRect1870"
								width="0"
								height="0"
								x="0"
								y="0"
								rx="0"
								ry="0"
								opacity="1"
								stroke-width="0"
								stroke="none"
								stroke-dasharray="0"
								fill="#fefefe"
								class="apexcharts-selection-rect"
							></rect></g
						></svg
					>
					<div
						class="apexcharts-tooltip apexcharts-theme-dark"
						style="left: 153.269px; top: 101.575px;"
					>
						<div
							class="apexcharts-tooltip-title"
							style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;"
						>
							Oct
						</div>
						<div
							class="apexcharts-tooltip-series-group apexcharts-active"
							style="order: 1; display: flex;"
						>
							<span class="apexcharts-tooltip-marker" style="background-color: rgb(2, 136, 209);"
							></span>
							<div
								class="apexcharts-tooltip-text"
								style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;"
							>
								<div class="apexcharts-tooltip-y-group">
									<span class="apexcharts-tooltip-text-y-label">Sales: </span><span
										class="apexcharts-tooltip-text-y-value">200</span
									>
								</div>
								<div class="apexcharts-tooltip-goals-group">
									<span class="apexcharts-tooltip-text-goals-label"></span><span
										class="apexcharts-tooltip-text-goals-value"
									></span>
								</div>
								<div class="apexcharts-tooltip-z-group">
									<span class="apexcharts-tooltip-text-z-label"></span><span
										class="apexcharts-tooltip-text-z-value"
									></span>
								</div>
							</div>
						</div>
					</div>
					<div
						class="apexcharts-xaxistooltip apexcharts-xaxistooltip-bottom apexcharts-theme-dark"
						style="left: 241.344px; top: 181.112px;"
					>
						<div
							class="apexcharts-xaxistooltip-text"
							style="font-family: Helvetica, Arial, sans-serif; font-size: 12px; min-width: 17.1125px;"
						>
							Oct
						</div>
					</div>
					<div
						class="apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-dark"
					>
						<div class="apexcharts-yaxistooltip-text"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="p-6 px-6 pt-0">
			<h6 class=" block font-sans text-base leading-relaxed font-semibold tracking-normal">
				Daily Sales
			</h6>
			<p class=" block font-sans text-sm leading-normal font-normal">15% increase in today sales</p>
		</div>
		<div class=" p-6 px-6 py-5">
			<p class=" flex items-center font-sans text-sm leading-normal font-normal">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					aria-hidden="true"
					stroke-width="2"
					class=" h-4 w-4"
					><path
						fill-rule="evenodd"
						d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
						clip-rule="evenodd"
					></path></svg
				>&nbsp;updated 4 min ago
			</p>
		</div>
	</div>
	<div
		class="relative flex flex-col rounded-xl border border-gray-300 bg-white bg-clip-border text-gray-700"
	>
		<div
			class="relative mx-4 mt-4 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700"
		>
			<div
				type="line"
				height="220"
				series="[object Object]"
				options="[object Object]"
				width="100%"
				style="min-height: 235px;"
			>
				<div
					id="apexchartsabcmtg0q"
					class="apexcharts-canvas apexchartsabcmtg0q apexcharts-theme-light"
					style="width: 353px; height: 220px;"
				>
					<svg
						id="SvgjsSvg1871"
						width="353"
						height="220"
						xmlns="http://www.w3.org/2000/svg"
						version="1.1"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						xmlns:svgjs="http://svgjs.dev"
						class="apexcharts-svg apexcharts-zoomable"
						xmlns:data="ApexChartsNS"
						transform="translate(0, 0)"
						style="background: transparent;"
						><foreignObject x="0" y="0" width="353" height="220"
							><div
								class="apexcharts-legend"
								xmlns="http://www.w3.org/1999/xhtml"
								style="max-height: 110px;"
							></div></foreignObject
						><rect
							id="SvgjsRect1876"
							width="0"
							height="0"
							x="0"
							y="0"
							rx="0"
							ry="0"
							opacity="1"
							stroke-width="0"
							stroke="none"
							stroke-dasharray="0"
							fill="#fefefe"
						></rect><g
							id="SvgjsG1955"
							class="apexcharts-yaxis"
							rel="0"
							transform="translate(18.92500114440918, 0)"
							><g id="SvgjsG1956" class="apexcharts-yaxis-texts-g"
								><text
									id="SvgjsText1958"
									font-family="inherit"
									x="20"
									y="36.6"
									text-anchor="end"
									dominant-baseline="auto"
									font-size="13px"
									font-weight="300"
									fill="#37474f"
									class="apexcharts-text apexcharts-yaxis-label"
									style="font-family: inherit;"
									><tspan id="SvgjsTspan1959">600</tspan><title>600</title></text
								><text
									id="SvgjsText1961"
									font-family="inherit"
									x="20"
									y="60.61866666666666"
									text-anchor="end"
									dominant-baseline="auto"
									font-size="13px"
									font-weight="300"
									fill="#37474f"
									class="apexcharts-text apexcharts-yaxis-label"
									style="font-family: inherit;"
									><tspan id="SvgjsTspan1962">500</tspan><title>500</title></text
								><text
									id="SvgjsText1964"
									font-family="inherit"
									x="20"
									y="84.63733333333332"
									text-anchor="end"
									dominant-baseline="auto"
									font-size="13px"
									font-weight="300"
									fill="#37474f"
									class="apexcharts-text apexcharts-yaxis-label"
									style="font-family: inherit;"
									><tspan id="SvgjsTspan1965">400</tspan><title>400</title></text
								><text
									id="SvgjsText1967"
									font-family="inherit"
									x="20"
									y="108.65599999999998"
									text-anchor="end"
									dominant-baseline="auto"
									font-size="13px"
									font-weight="300"
									fill="#37474f"
									class="apexcharts-text apexcharts-yaxis-label"
									style="font-family: inherit;"
									><tspan id="SvgjsTspan1968">300</tspan><title>300</title></text
								><text
									id="SvgjsText1970"
									font-family="inherit"
									x="20"
									y="132.67466666666664"
									text-anchor="end"
									dominant-baseline="auto"
									font-size="13px"
									font-weight="300"
									fill="#37474f"
									class="apexcharts-text apexcharts-yaxis-label"
									style="font-family: inherit;"
									><tspan id="SvgjsTspan1971">200</tspan><title>200</title></text
								><text
									id="SvgjsText1973"
									font-family="inherit"
									x="20"
									y="156.6933333333333"
									text-anchor="end"
									dominant-baseline="auto"
									font-size="13px"
									font-weight="300"
									fill="#37474f"
									class="apexcharts-text apexcharts-yaxis-label"
									style="font-family: inherit;"
									><tspan id="SvgjsTspan1974">100</tspan><title>100</title></text
								><text
									id="SvgjsText1976"
									font-family="inherit"
									x="20"
									y="180.71199999999996"
									text-anchor="end"
									dominant-baseline="auto"
									font-size="13px"
									font-weight="300"
									fill="#37474f"
									class="apexcharts-text apexcharts-yaxis-label"
									style="font-family: inherit;"
									><tspan id="SvgjsTspan1977">0</tspan><title>0</title></text
								></g
							></g
						><g
							id="SvgjsG1873"
							class="apexcharts-inner apexcharts-graphical"
							transform="translate(48.92500114440918, 35)"
							><defs id="SvgjsDefs1872"
								><clipPath id="gridRectMaskabcmtg0q"
									><rect
										id="SvgjsRect1878"
										width="293.0749988555908"
										height="168.112"
										x="-7"
										y="-12"
										rx="0"
										ry="0"
										opacity="1"
										stroke-width="0"
										stroke="none"
										stroke-dasharray="0"
										fill="#fff"
									></rect></clipPath
								><clipPath id="forecastMaskabcmtg0q"></clipPath><clipPath
									id="nonForecastMaskabcmtg0q"
								></clipPath><clipPath id="gridRectMarkerMaskabcmtg0q"
									><rect
										id="SvgjsRect1879"
										width="336.0749988555908"
										height="196.112"
										x="-26"
										y="-26"
										rx="0"
										ry="0"
										opacity="1"
										stroke-width="0"
										stroke="none"
										stroke-dasharray="0"
										fill="#fff"
									></rect></clipPath
								></defs
							><line
								id="SvgjsLine1877"
								x1="0"
								y1="0"
								x2="0"
								y2="144.112"
								stroke="#b6b6b6"
								stroke-dasharray="3"
								stroke-linecap="butt"
								class="apexcharts-xcrosshairs"
								x="0"
								y="0"
								width="1"
								height="144.112"
								fill="#b1b9c4"
								filter="none"
								fill-opacity="0.9"
								stroke-width="1"
							></line><g id="SvgjsG1902" class="apexcharts-grid"
								><g id="SvgjsG1903" class="apexcharts-gridlines-horizontal"
									><line
										id="SvgjsLine1916"
										x1="0"
										y1="24.018666666666665"
										x2="284.0749988555908"
										y2="24.018666666666665"
										stroke="#dddddd"
										stroke-dasharray="5"
										stroke-linecap="butt"
										class="apexcharts-gridline"
									></line><line
										id="SvgjsLine1917"
										x1="0"
										y1="48.03733333333333"
										x2="284.0749988555908"
										y2="48.03733333333333"
										stroke="#dddddd"
										stroke-dasharray="5"
										stroke-linecap="butt"
										class="apexcharts-gridline"
									></line><line
										id="SvgjsLine1918"
										x1="0"
										y1="72.056"
										x2="284.0749988555908"
										y2="72.056"
										stroke="#dddddd"
										stroke-dasharray="5"
										stroke-linecap="butt"
										class="apexcharts-gridline"
									></line><line
										id="SvgjsLine1919"
										x1="0"
										y1="96.07466666666666"
										x2="284.0749988555908"
										y2="96.07466666666666"
										stroke="#dddddd"
										stroke-dasharray="5"
										stroke-linecap="butt"
										class="apexcharts-gridline"
									></line><line
										id="SvgjsLine1920"
										x1="0"
										y1="120.09333333333332"
										x2="284.0749988555908"
										y2="120.09333333333332"
										stroke="#dddddd"
										stroke-dasharray="5"
										stroke-linecap="butt"
										class="apexcharts-gridline"
									></line></g
								><g id="SvgjsG1904" class="apexcharts-gridlines-vertical"
									><line
										id="SvgjsLine1906"
										x1="0"
										y1="0"
										x2="0"
										y2="144.112"
										stroke="#dddddd"
										stroke-dasharray="5"
										stroke-linecap="butt"
										class="apexcharts-gridline"
									></line><line
										id="SvgjsLine1907"
										x1="35.50937485694885"
										y1="0"
										x2="35.50937485694885"
										y2="144.112"
										stroke="#dddddd"
										stroke-dasharray="5"
										stroke-linecap="butt"
										class="apexcharts-gridline"
									></line><line
										id="SvgjsLine1908"
										x1="71.0187497138977"
										y1="0"
										x2="71.0187497138977"
										y2="144.112"
										stroke="#dddddd"
										stroke-dasharray="5"
										stroke-linecap="butt"
										class="apexcharts-gridline"
									></line><line
										id="SvgjsLine1909"
										x1="106.52812457084656"
										y1="0"
										x2="106.52812457084656"
										y2="144.112"
										stroke="#dddddd"
										stroke-dasharray="5"
										stroke-linecap="butt"
										class="apexcharts-gridline"
									></line><line
										id="SvgjsLine1910"
										x1="142.0374994277954"
										y1="0"
										x2="142.0374994277954"
										y2="144.112"
										stroke="#dddddd"
										stroke-dasharray="5"
										stroke-linecap="butt"
										class="apexcharts-gridline"
									></line><line
										id="SvgjsLine1911"
										x1="177.54687428474426"
										y1="0"
										x2="177.54687428474426"
										y2="144.112"
										stroke="#dddddd"
										stroke-dasharray="5"
										stroke-linecap="butt"
										class="apexcharts-gridline"
									></line><line
										id="SvgjsLine1912"
										x1="213.05624914169312"
										y1="0"
										x2="213.05624914169312"
										y2="144.112"
										stroke="#dddddd"
										stroke-dasharray="5"
										stroke-linecap="butt"
										class="apexcharts-gridline"
									></line><line
										id="SvgjsLine1913"
										x1="248.56562399864197"
										y1="0"
										x2="248.56562399864197"
										y2="144.112"
										stroke="#dddddd"
										stroke-dasharray="5"
										stroke-linecap="butt"
										class="apexcharts-gridline"
									></line><line
										id="SvgjsLine1914"
										x1="284.0749988555908"
										y1="0"
										x2="284.0749988555908"
										y2="144.112"
										stroke="#dddddd"
										stroke-dasharray="5"
										stroke-linecap="butt"
										class="apexcharts-gridline"
									></line></g
								><line
									id="SvgjsLine1923"
									x1="0"
									y1="144.112"
									x2="284.0749988555908"
									y2="144.112"
									stroke="transparent"
									stroke-dasharray="0"
									stroke-linecap="butt"
								></line><line
									id="SvgjsLine1922"
									x1="0"
									y1="1"
									x2="0"
									y2="144.112"
									stroke="transparent"
									stroke-dasharray="0"
									stroke-linecap="butt"
								></line></g
							><g id="SvgjsG1905" class="apexcharts-grid-borders"
								><line
									id="SvgjsLine1915"
									x1="0"
									y1="0"
									x2="284.0749988555908"
									y2="0"
									stroke="#dddddd"
									stroke-dasharray="5"
									stroke-linecap="butt"
									class="apexcharts-gridline"
								></line><line
									id="SvgjsLine1921"
									x1="0"
									y1="144.112"
									x2="284.0749988555908"
									y2="144.112"
									stroke="#dddddd"
									stroke-dasharray="5"
									stroke-linecap="butt"
									class="apexcharts-gridline"
								></line></g
							><g id="SvgjsG1880" class="apexcharts-line-series apexcharts-plot-series"
								><g
									id="SvgjsG1881"
									class="apexcharts-series"
									zIndex="0"
									seriesName="Tasks"
									data:longestSeries="true"
									rel="1"
									data:realIndex="0"
									><path
										id="SvgjsPath1901"
										d="M 0 132.10266666666666 L 35.50937485694885 134.50453333333334 L 71.0187497138977 72.056 L 106.52812457084656 91.27093333333333 L 142.0374994277954 24.018666666666675 L 177.54687428474426 84.06533333333334 L 213.05624914169312 48.037333333333336 L 248.56562399864197 88.86906666666667 L 284.0749988555908 24.018666666666675"
										fill="none"
										fill-opacity="1"
										stroke="rgba(56,142,60,0.8)"
										stroke-opacity="1"
										stroke-linecap="round"
										stroke-width="5"
										stroke-dasharray="0"
										class="apexcharts-line"
										index="0"
										clip-path="url(#gridRectMaskabcmtg0q)"
										pathTo="M 0 132.10266666666666 L 35.50937485694885 134.50453333333334 L 71.0187497138977 72.056 L 106.52812457084656 91.27093333333333 L 142.0374994277954 24.018666666666675 L 177.54687428474426 84.06533333333334 L 213.05624914169312 48.037333333333336 L 248.56562399864197 88.86906666666667 L 284.0749988555908 24.018666666666675"
										pathFrom="M -1 144.112 L -1 144.112 L 35.50937485694885 144.112 L 71.0187497138977 144.112 L 106.52812457084656 144.112 L 142.0374994277954 144.112 L 177.54687428474426 144.112 L 213.05624914169312 144.112 L 248.56562399864197 144.112 L 284.0749988555908 144.112"
										fill-rule="evenodd"
									></path><g
										id="SvgjsG1882"
										class="apexcharts-series-markers-wrap apexcharts-hidden-element-shown"
										data:realIndex="0"
										><g
											id="SvgjsG1884"
											class="apexcharts-series-markers"
											clip-path="url(#gridRectMarkerMaskabcmtg0q)"
											><circle
												id="SvgjsCircle1885"
												r="5"
												cx="0"
												cy="132.10266666666666"
												class="apexcharts-marker no-pointer-events wuvx676zn"
												stroke="#ffffff"
												fill="#388e3c"
												fill-opacity="1"
												stroke-width="2"
												stroke-opacity="0.9"
												rel="0"
												j="0"
												index="0"
												default-marker-size="5"
											></circle><circle
												id="SvgjsCircle1886"
												r="5"
												cx="35.50937485694885"
												cy="134.50453333333334"
												class="apexcharts-marker no-pointer-events wlt5s6fib"
												stroke="#ffffff"
												fill="#388e3c"
												fill-opacity="1"
												stroke-width="2"
												stroke-opacity="0.9"
												rel="1"
												j="1"
												index="0"
												default-marker-size="5"
											></circle></g
										><g
											id="SvgjsG1887"
											class="apexcharts-series-markers"
											clip-path="url(#gridRectMarkerMaskabcmtg0q)"
											><circle
												id="SvgjsCircle1888"
												r="5"
												cx="71.0187497138977"
												cy="72.056"
												class="apexcharts-marker no-pointer-events wq0dm17iu"
												stroke="#ffffff"
												fill="#388e3c"
												fill-opacity="1"
												stroke-width="2"
												stroke-opacity="0.9"
												rel="2"
												j="2"
												index="0"
												default-marker-size="5"
											></circle></g
										><g
											id="SvgjsG1889"
											class="apexcharts-series-markers"
											clip-path="url(#gridRectMarkerMaskabcmtg0q)"
											><circle
												id="SvgjsCircle1890"
												r="5"
												cx="106.52812457084656"
												cy="91.27093333333333"
												class="apexcharts-marker no-pointer-events wgsdt04t"
												stroke="#ffffff"
												fill="#388e3c"
												fill-opacity="1"
												stroke-width="2"
												stroke-opacity="0.9"
												rel="3"
												j="3"
												index="0"
												default-marker-size="5"
											></circle></g
										><g
											id="SvgjsG1891"
											class="apexcharts-series-markers"
											clip-path="url(#gridRectMarkerMaskabcmtg0q)"
											><circle
												id="SvgjsCircle1892"
												r="5"
												cx="142.0374994277954"
												cy="24.018666666666675"
												class="apexcharts-marker no-pointer-events wlhz24y4s"
												stroke="#ffffff"
												fill="#388e3c"
												fill-opacity="1"
												stroke-width="2"
												stroke-opacity="0.9"
												rel="4"
												j="4"
												index="0"
												default-marker-size="5"
											></circle></g
										><g
											id="SvgjsG1893"
											class="apexcharts-series-markers"
											clip-path="url(#gridRectMarkerMaskabcmtg0q)"
											><circle
												id="SvgjsCircle1894"
												r="5"
												cx="177.54687428474426"
												cy="84.06533333333334"
												class="apexcharts-marker no-pointer-events w85jru2gh"
												stroke="#ffffff"
												fill="#388e3c"
												fill-opacity="1"
												stroke-width="2"
												stroke-opacity="0.9"
												rel="5"
												j="5"
												index="0"
												default-marker-size="5"
											></circle></g
										><g
											id="SvgjsG1895"
											class="apexcharts-series-markers"
											clip-path="url(#gridRectMarkerMaskabcmtg0q)"
											><circle
												id="SvgjsCircle1896"
												r="5"
												cx="213.05624914169312"
												cy="48.037333333333336"
												class="apexcharts-marker no-pointer-events wa87n39j6"
												stroke="#ffffff"
												fill="#388e3c"
												fill-opacity="1"
												stroke-width="2"
												stroke-opacity="0.9"
												rel="6"
												j="6"
												index="0"
												default-marker-size="5"
											></circle></g
										><g
											id="SvgjsG1897"
											class="apexcharts-series-markers"
											clip-path="url(#gridRectMarkerMaskabcmtg0q)"
											><circle
												id="SvgjsCircle1898"
												r="5"
												cx="248.56562399864197"
												cy="88.86906666666667"
												class="apexcharts-marker no-pointer-events w1gq61dm9j"
												stroke="#ffffff"
												fill="#388e3c"
												fill-opacity="1"
												stroke-width="2"
												stroke-opacity="0.9"
												rel="7"
												j="7"
												index="0"
												default-marker-size="5"
											></circle></g
										><g
											id="SvgjsG1899"
											class="apexcharts-series-markers"
											clip-path="url(#gridRectMarkerMaskabcmtg0q)"
											><circle
												id="SvgjsCircle1900"
												r="5"
												cx="284.0749988555908"
												cy="24.018666666666675"
												class="apexcharts-marker no-pointer-events w2k8hd4it"
												stroke="#ffffff"
												fill="#388e3c"
												fill-opacity="1"
												stroke-width="2"
												stroke-opacity="0.9"
												rel="8"
												j="8"
												index="0"
												default-marker-size="5"
											></circle></g
										></g
									></g
								><g id="SvgjsG1883" class="apexcharts-datalabels" data:realIndex="0"></g></g
							><line
								id="SvgjsLine1924"
								x1="0"
								y1="0"
								x2="284.0749988555908"
								y2="0"
								stroke="#b6b6b6"
								stroke-dasharray="0"
								stroke-width="1"
								stroke-linecap="butt"
								class="apexcharts-ycrosshairs"
							></line><line
								id="SvgjsLine1925"
								x1="0"
								y1="0"
								x2="284.0749988555908"
								y2="0"
								stroke-dasharray="0"
								stroke-width="0"
								stroke-linecap="butt"
								class="apexcharts-ycrosshairs-hidden"
							></line><g id="SvgjsG1926" class="apexcharts-xaxis" transform="translate(0, 0)"
								><g id="SvgjsG1927" class="apexcharts-xaxis-texts-g" transform="translate(0, -4)"
									><text
										id="SvgjsText1929"
										font-family="inherit"
										x="0"
										y="173.112"
										text-anchor="middle"
										dominant-baseline="auto"
										font-size="13px"
										font-weight="300"
										fill="#37474f"
										class="apexcharts-text apexcharts-xaxis-label"
										style="font-family: inherit;"
										><tspan id="SvgjsTspan1930">Apr</tspan><title>Apr</title></text
									><text
										id="SvgjsText1932"
										font-family="inherit"
										x="35.50937485694885"
										y="173.112"
										text-anchor="middle"
										dominant-baseline="auto"
										font-size="13px"
										font-weight="300"
										fill="#37474f"
										class="apexcharts-text apexcharts-xaxis-label"
										style="font-family: inherit;"
										><tspan id="SvgjsTspan1933">May</tspan><title>May</title></text
									><text
										id="SvgjsText1935"
										font-family="inherit"
										x="71.0187497138977"
										y="173.112"
										text-anchor="middle"
										dominant-baseline="auto"
										font-size="13px"
										font-weight="300"
										fill="#37474f"
										class="apexcharts-text apexcharts-xaxis-label"
										style="font-family: inherit;"
										><tspan id="SvgjsTspan1936">Jun</tspan><title>Jun</title></text
									><text
										id="SvgjsText1938"
										font-family="inherit"
										x="106.52812457084656"
										y="173.112"
										text-anchor="middle"
										dominant-baseline="auto"
										font-size="13px"
										font-weight="300"
										fill="#37474f"
										class="apexcharts-text apexcharts-xaxis-label"
										style="font-family: inherit;"
										><tspan id="SvgjsTspan1939">Jul</tspan><title>Jul</title></text
									><text
										id="SvgjsText1941"
										font-family="inherit"
										x="142.0374994277954"
										y="173.112"
										text-anchor="middle"
										dominant-baseline="auto"
										font-size="13px"
										font-weight="300"
										fill="#37474f"
										class="apexcharts-text apexcharts-xaxis-label"
										style="font-family: inherit;"
										><tspan id="SvgjsTspan1942">Aug</tspan><title>Aug</title></text
									><text
										id="SvgjsText1944"
										font-family="inherit"
										x="177.54687428474426"
										y="173.112"
										text-anchor="middle"
										dominant-baseline="auto"
										font-size="13px"
										font-weight="300"
										fill="#37474f"
										class="apexcharts-text apexcharts-xaxis-label"
										style="font-family: inherit;"
										><tspan id="SvgjsTspan1945">Sep</tspan><title>Sep</title></text
									><text
										id="SvgjsText1947"
										font-family="inherit"
										x="213.05624914169312"
										y="173.112"
										text-anchor="middle"
										dominant-baseline="auto"
										font-size="13px"
										font-weight="300"
										fill="#37474f"
										class="apexcharts-text apexcharts-xaxis-label"
										style="font-family: inherit;"
										><tspan id="SvgjsTspan1948">Oct</tspan><title>Oct</title></text
									><text
										id="SvgjsText1950"
										font-family="inherit"
										x="248.56562399864197"
										y="173.112"
										text-anchor="middle"
										dominant-baseline="auto"
										font-size="13px"
										font-weight="300"
										fill="#37474f"
										class="apexcharts-text apexcharts-xaxis-label"
										style="font-family: inherit;"
										><tspan id="SvgjsTspan1951">Nov</tspan><title>Nov</title></text
									><text
										id="SvgjsText1953"
										font-family="inherit"
										x="284.0749988555908"
										y="173.112"
										text-anchor="middle"
										dominant-baseline="auto"
										font-size="13px"
										font-weight="300"
										fill="#37474f"
										class="apexcharts-text apexcharts-xaxis-label"
										style="font-family: inherit;"
										><tspan id="SvgjsTspan1954">Dec</tspan><title>Dec</title></text
									></g
								></g
							><g id="SvgjsG1978" class="apexcharts-yaxis-annotations"></g><g
								id="SvgjsG1979"
								class="apexcharts-xaxis-annotations"
							></g><g id="SvgjsG1980" class="apexcharts-point-annotations"></g><rect
								id="SvgjsRect1981"
								width="0"
								height="0"
								x="0"
								y="0"
								rx="0"
								ry="0"
								opacity="1"
								stroke-width="0"
								stroke="none"
								stroke-dasharray="0"
								fill="#fefefe"
								class="apexcharts-zoom-rect"
							></rect><rect
								id="SvgjsRect1982"
								width="0"
								height="0"
								x="0"
								y="0"
								rx="0"
								ry="0"
								opacity="1"
								stroke-width="0"
								stroke="none"
								stroke-dasharray="0"
								fill="#fefefe"
								class="apexcharts-selection-rect"
							></rect></g
						></svg
					>
					<div class="apexcharts-tooltip apexcharts-theme-dark">
						<div
							class="apexcharts-tooltip-title"
							style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;"
						></div>
						<div class="apexcharts-tooltip-series-group" style="order: 1;">
							<span class="apexcharts-tooltip-marker" style="background-color: rgb(56, 142, 60);"
							></span>
							<div
								class="apexcharts-tooltip-text"
								style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;"
							>
								<div class="apexcharts-tooltip-y-group">
									<span class="apexcharts-tooltip-text-y-label"></span><span
										class="apexcharts-tooltip-text-y-value"
									></span>
								</div>
								<div class="apexcharts-tooltip-goals-group">
									<span class="apexcharts-tooltip-text-goals-label"></span><span
										class="apexcharts-tooltip-text-goals-value"
									></span>
								</div>
								<div class="apexcharts-tooltip-z-group">
									<span class="apexcharts-tooltip-text-z-label"></span><span
										class="apexcharts-tooltip-text-z-value"
									></span>
								</div>
							</div>
						</div>
					</div>
					<div class="apexcharts-xaxistooltip apexcharts-xaxistooltip-bottom apexcharts-theme-dark">
						<div
							class="apexcharts-xaxistooltip-text"
							style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;"
						></div>
					</div>
					<div
						class="apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-dark"
					>
						<div class="apexcharts-yaxistooltip-text"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="p-6 px-6 pt-0">
			<h6 class=" block font-sans text-base leading-relaxed font-semibold tracking-normal">
				Completed Tasks
			</h6>
			<p class=" block font-sans text-sm leading-normal font-normal">Last Campaign Performance</p>
		</div>
		<div class=" p-6 px-6 py-5">
			<p class=" flex items-center font-sans text-sm leading-normal font-normal">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					aria-hidden="true"
					stroke-width="2"
					class=" h-4 w-4"
					><path
						fill-rule="evenodd"
						d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
						clip-rule="evenodd"
					></path></svg
				>&nbsp;just updated
			</p>
		</div>
	</div>
</div>
<div class="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
	<ProjectsQuickView userProfile={data?.userProfile} />
	<TestimonialsQuickView userProfile={data?.userProfile} />
</div>
