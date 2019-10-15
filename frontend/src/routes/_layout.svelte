<script>
	import Navigation from '../components/Navigation.svelte';

	export let segment;
</script>

<style>
	main {
		position: relative;
		max-width: 1200px;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<Navigation {segment}/>

<main>
	<slot></slot>
</main>