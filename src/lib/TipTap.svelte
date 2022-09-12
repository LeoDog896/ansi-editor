<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import { History } from '@tiptap/extension-history';
	import { Bold } from '@tiptap/extension-bold';
	import { Italic } from '@tiptap/extension-italic';
	import { Strike } from '@tiptap/extension-strike';
	import { Text } from '@tiptap/extension-text';

	let element: HTMLDivElement;
	let editor: Editor;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [History, Bold, Italic, Strike, Text],
			content: 'Hello World! 🌍️',
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

{#if editor}
	<button
		on:click={() => editor.chain().focus().setBold().run()}
		class:active={editor.isActive('bold')}
	>
		B
	</button>
	<button
		on:click={() => editor.chain().focus().setItalic().run()}
		class:active={editor.isActive('italic')}
	>
		I
	</button>
	<button
		on:click={() => editor.chain().focus().setStrike().run()}
		class:active={editor.isActive('strike')}
	>
		S
	</button>
{/if}

<div bind:this={element} />

<style>
	button.active {
		background: black;
		color: white;
	}
</style>
