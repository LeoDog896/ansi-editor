<script lang="ts">
  import { parse } from "./parse"
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import { History } from '@tiptap/extension-history';
	import { Bold } from '@tiptap/extension-bold';
	import { Italic } from '@tiptap/extension-italic';
	import { Strike } from '@tiptap/extension-strike';
	import { Text } from '@tiptap/extension-text';
	import { Document } from '@tiptap/extension-document';
	import { TextStyle } from '@tiptap/extension-text-style';
	import { Color } from '@tiptap/extension-color';
	import { Paragraph } from '@tiptap/extension-paragraph';

	let element: HTMLDivElement;
	let editor: Editor;

	onMount(async () => {
		editor = new Editor({
			element: element,
			extensions: [History, Bold, Italic, Strike, Text, Document, TextStyle, Color, Paragraph],
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

<div class="container">
  {#if editor}
    <button
      on:click={() => editor.chain().focus().toggleBold().run()}
      class:active={editor.isActive('bold')}
    >
      B
    </button>
    <button
      on:click={() => editor.chain().focus().toggleItalic().run()}
      class:active={editor.isActive('italic')}
    >
      I
    </button>
    <button
      on:click={() => editor.chain().focus().toggleStrike().run()}
      class:active={editor.isActive('strike')}
    >
      S
    </button>
    <button
      on:click={() => editor.chain().focus().setColor("#eee").run()}
      class:active={editor.isActive('color')}
    >
      C
    </button>
  {/if}
  <div class="editor" bind:this={element} />
  <p>{JSON.stringify(editor?.getJSON())}</p>
</div>

<style>
  .container {
    padding: 2rem;
    width: calc(100vw - 4rem);
    height: calc(100vh - 4rem);
    color: white;
    background-color: black;
    font-family: monospace;
  }
  .editor {
    font-family: monospace;
  }
  
	button.active {
		background: black;
		color: white;
	}
</style>
