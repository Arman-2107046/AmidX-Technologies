import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
    Bold,
    Code,
    Heading2,
    Heading3,
    Image as ImageIcon,
    Italic,
    Link as LinkIcon,
    List,
    ListOrdered,
    Minus,
    Quote,
    Redo,
    Strikethrough,
    Undo,
    Unlink,
} from 'lucide-react';
import { useCallback, useEffect } from 'react';

function ToolbarButton({ onClick, active, disabled, title, children }) {
    return (
        <button
            type="button"
            onMouseDown={(e) => e.preventDefault()} // keep the selection
            onClick={onClick}
            disabled={disabled}
            title={title}
            aria-label={title}
            aria-pressed={active}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-200 disabled:opacity-30 ${
                active
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
        >
            {children}
        </button>
    );
}

function Divider() {
    return <span className="mx-1 h-5 w-px bg-border" />;
}

export default function RichTextEditor({ value, onChange, placeholder }) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [2, 3] },
                codeBlock: { HTMLAttributes: { class: 'rounded-xl' } },
            }),
            Link.configure({
                openOnClick: false,
                autolink: true,
                HTMLAttributes: { rel: 'noopener noreferrer' },
            }),
            Image.configure({ HTMLAttributes: { class: 'rounded-xl' } }),
            Placeholder.configure({
                placeholder: placeholder ?? 'Tell the story…',
            }),
        ],
        content: value || '',
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            // TipTap represents "empty" as <p></p>; store a true empty string
            // so the post body is genuinely null rather than a stray tag.
            onChange(html === '<p></p>' ? '' : html);
        },
        editorProps: {
            attributes: {
                class: 'article-body focus:outline-none min-h-[28rem] px-6 py-6',
            },
        },
    });

    // Keep the editor in sync when the form resets or loads a different post.
    useEffect(() => {
        if (!editor) return;

        const incoming = value || '';
        if (incoming !== editor.getHTML() && !editor.isFocused) {
            editor.commands.setContent(incoming, { emitUpdate: false });
        }
    }, [value, editor]);

    const setLink = useCallback(() => {
        if (!editor) return;

        const previous = editor.getAttributes('link').href ?? '';
        const url = window.prompt('Link URL', previous);

        if (url === null) return; // cancelled

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor
            .chain()
            .focus()
            .extendMarkRange('link')
            .setLink({ href: url })
            .run();
    }, [editor]);

    const addImage = useCallback(() => {
        if (!editor) return;

        const url = window.prompt('Image URL');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    if (!editor) {
        return (
            <div className="min-h-[32rem] animate-pulse rounded-2xl border border-border bg-muted/40" />
        );
    }

    const words = editor.storage.characterCount
        ? editor.storage.characterCount.words()
        : editor.getText().split(/\s+/).filter(Boolean).length;

    return (
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-premium-sm">
            {/* Toolbar */}
            <div className="sticky top-0 z-10 flex flex-wrap items-center gap-0.5 border-b border-border bg-card/95 px-3 py-2 backdrop-blur">
                <ToolbarButton
                    title="Heading"
                    active={editor.isActive('heading', { level: 2 })}
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                >
                    <Heading2 className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    title="Subheading"
                    active={editor.isActive('heading', { level: 3 })}
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                >
                    <Heading3 className="h-4 w-4" />
                </ToolbarButton>

                <Divider />

                <ToolbarButton
                    title="Bold"
                    active={editor.isActive('bold')}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <Bold className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    title="Italic"
                    active={editor.isActive('italic')}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <Italic className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    title="Strikethrough"
                    active={editor.isActive('strike')}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                >
                    <Strikethrough className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    title="Inline code"
                    active={editor.isActive('code')}
                    onClick={() => editor.chain().focus().toggleCode().run()}
                >
                    <Code className="h-4 w-4" />
                </ToolbarButton>

                <Divider />

                <ToolbarButton
                    title="Bullet list"
                    active={editor.isActive('bulletList')}
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                >
                    <List className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    title="Numbered list"
                    active={editor.isActive('orderedList')}
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                >
                    <ListOrdered className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    title="Quote"
                    active={editor.isActive('blockquote')}
                    onClick={() =>
                        editor.chain().focus().toggleBlockquote().run()
                    }
                >
                    <Quote className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    title="Divider"
                    onClick={() =>
                        editor.chain().focus().setHorizontalRule().run()
                    }
                >
                    <Minus className="h-4 w-4" />
                </ToolbarButton>

                <Divider />

                <ToolbarButton
                    title="Link"
                    active={editor.isActive('link')}
                    onClick={setLink}
                >
                    <LinkIcon className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    title="Remove link"
                    disabled={!editor.isActive('link')}
                    onClick={() => editor.chain().focus().unsetLink().run()}
                >
                    <Unlink className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton title="Image" onClick={addImage}>
                    <ImageIcon className="h-4 w-4" />
                </ToolbarButton>

                <div className="ml-auto flex items-center gap-0.5">
                    <ToolbarButton
                        title="Undo"
                        disabled={!editor.can().undo()}
                        onClick={() => editor.chain().focus().undo().run()}
                    >
                        <Undo className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        title="Redo"
                        disabled={!editor.can().redo()}
                        onClick={() => editor.chain().focus().redo().run()}
                    >
                        <Redo className="h-4 w-4" />
                    </ToolbarButton>
                </div>
            </div>

            {/* Canvas - the same .article-body styles the public post uses,
                so what the author sees here matches what readers get. */}
            <EditorContent editor={editor} />

            <div className="flex items-center justify-between border-t border-border px-6 py-2.5 text-xs text-muted-foreground">
                <span>{words} words</span>
                <span>~{Math.max(1, Math.ceil(words / 200))} min read</span>
            </div>
        </div>
    );
}
