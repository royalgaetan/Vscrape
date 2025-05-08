import {
  extractTextFromHTML,
  isTrulyEmpty,
  toStringSafe,
} from "@/lib/string_utils";
import { cn, debounce } from "@/lib/utils";
import React, {
  HTMLInputTypeAttribute,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { restoreCaret, waitForElement } from "@/lib/dom_utils";
import { useWorkflowEditorStore } from "@/stores/workflowStore";
import { TokenInputType } from "@/lib/workflow_editor/types/w_types";

const DnDTextInput = ({
  placeholder,
  onTextChange,
  onBlur,
  inputValue,
  className,
  hasError,
  isDisabled,
  readOnly,
  onElementDropped,
  reRenderOnInputValueChange,
  inputType,
}: {
  inputValue?: string | readonly string[] | number;
  inputType?: HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
  isDisabled?: boolean;
  readOnly?: boolean;
  hasError?: boolean;
  reRenderOnInputValueChange?: boolean;

  onTextChange?: (text: string | null) => void;
  onElementDropped?: (text: string | null) => void;
  onBlur?: (text?: string) => void;
}) => {
  const DnDInputRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [html, setHtml] = useState<string | null | undefined>("");
  // Store
  const toggleSharedOutputsDialog = useWorkflowEditorStore(
    (s) => s.toggleSharedOutputsDialog
  );
  const inputToken = useWorkflowEditorStore((s) => s.inputToken);
  const sharedOutputSelected = useWorkflowEditorStore(
    (s) => s.sharedOutputSelected
  );
  const setSharedOutputSelected = useWorkflowEditorStore(
    (s) => s.setSharedOutputSelected
  );
  // End Store

  const isInputEmpty = () =>
    html === undefined ||
    html === null ||
    (typeof html === "string" &&
      isTrulyEmpty(extractTextFromHTML(toStringSafe(html))));

  const cleanHTML = (html: any) => {
    return toStringSafe(html)
      .replace(/<br\s*\/?>/g, "")
      .replace(/\u200B/g, "")
      .trim();
  };

  const parseEditorText = (text: string) => {
    const container = document.createElement("div");
    container.innerHTML = text;

    const regex = /{{\s*[^{}]*?\s*}}/;

    function walk(node: Node): void {
      if (node.nodeType === Node.TEXT_NODE) {
        const content = node.textContent || "";
        if (!regex.test(content)) return;

        const parent = node.parentNode;
        if (!parent) return;

        const tokens = content.split(/({{\s*[^{}]*?\s*}})/g).filter(Boolean);
        const fragments = tokens.map((token) => {
          if (regex.test(token)) {
            const b = document.createElement("b");
            b.className = "token-chip";
            b.id = crypto.randomUUID();
            b.textContent = token.replace(/\u200B/g, "").trim();
            return b;
          } else {
            const span = document.createElement("span");
            span.className = "text-neutral-700 font-normal";
            span.textContent = token;
            return span;
          }
        });

        fragments.forEach((frag) => parent.insertBefore(frag, node));
        parent.removeChild(node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if ((node as HTMLElement).classList.contains("token-chip")) return; // Skip existing
        Array.from(node.childNodes).forEach(walk);
      }
    }

    Array.from(container.childNodes).forEach(walk);

    const zwsp = document.createElement("span");
    zwsp.innerText = "\u200B ";
    container.appendChild(zwsp);

    return container.innerHTML.replace(/<br\s*\/?>/g, "");
  };

  const handleDrop = (e: React.DragEvent) => {
    if (isDisabled) return;
    setIsDragging(false);

    const editor = DnDInputRef.current;
    if (!editor) return;

    const inputData = e.dataTransfer.getData(
      "application/workflowEditor_inputdata"
    );
    if (!inputData) return;
    let range: Range | null = null;

    // Get caret range from drop coordinates
    if (document.caretRangeFromPoint) {
      range = document.caretRangeFromPoint(e.clientX, e.clientY);
    } else if ((document as any).caretPositionFromPoint) {
      const pos = (document as any).caretPositionFromPoint(
        e.clientX,
        e.clientY
      );
      range = document.createRange();
      range.setStart(pos.offsetNode, pos.offset);
      range.collapse(true);
    }

    if (!range) return;

    // Insert the data at the drop location
    const fragment = document.createRange().createContextualFragment(inputData);
    range.deleteContents();
    range.insertNode(fragment);

    // Move caret to end of inserted content
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      const endRange = document.createRange();
      endRange.selectNodeContents(editor);
      endRange.collapse(false);
      selection.addRange(endRange);
    }

    // Re-parse editor content after insertion
    const rawText = editor.innerHTML;
    const html = parseEditorText(rawText);
    editor.innerHTML = html;

    // Ensure caret is at the end after re-parsing
    const finalRange = document.createRange();
    finalRange.selectNodeContents(editor);
    finalRange.collapse(false);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(finalRange);

    // Update state
    const editorContentCleaned = editor.innerHTML
      .replace(/<br\s*\/?>/g, "")
      .replace(/\u200B/g, "");

    setHtml(editorContentCleaned);
    onTextChange && onTextChange(editorContentCleaned);
    onElementDropped && onElementDropped(editorContentCleaned);
    editor.focus();
  };

  const handleSpace = (e?: KeyboardEvent) => {
    // if (e.key !== " ") return;

    const editor = DnDInputRef.current;
    if (!editor) return;

    sanitizeEditor(editor);
  };

  const sanitizeEditor = debounce((editor: HTMLElement) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(editor);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    const caretPosition = preCaretRange.toString().length;

    const rawText = editor.innerText;
    const html = parseEditorText(rawText);

    if (editor.innerHTML !== html) {
      editor.innerHTML = html;
      restoreCaret(editor, caretPosition);

      // Update state
      const editorContentCleaned = cleanHTML(html);

      setHtml(editorContentCleaned);
      onTextChange && onTextChange(editorContentCleaned);
      onElementDropped && onElementDropped(editorContentCleaned);
      editor.focus();
    }
  }, 100);

  const initEditor = () => {
    const editor = DnDInputRef.current;
    if (editor) {
      // editor.addEventListener("keydown", handleSpace);
      DnDInputRef.current.innerHTML = cleanHTML(inputValue);
      setHtml(toStringSafe(inputValue));
    }

    return () => {
      // editor?.removeEventListener("keydown", handleSpace);
    };
  };

  useEffect(() => {
    initEditor();
  }, []);

  useEffect(() => {
    if (reRenderOnInputValueChange) {
      initEditor();
    }
  }, [inputValue]);

  const openSharedOutputsDialog = (inputToken?: TokenInputType) => {
    const editor = DnDInputRef.current;
    if (!editor) return;
    onTextChange && onTextChange(editor.innerHTML.trim());

    toggleSharedOutputsDialog(true, inputToken);
  };

  useEffect(() => {
    const elements = document.querySelectorAll(".token-chip");

    const handleClick = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const tokenId = el.id;

      // console.log("inputValue", inputValue, "tokenId", tokenId);
      openSharedOutputsDialog({
        inputTokenID: tokenId,
        inputTokenValue: extractTextFromHTML(el.innerHTML),
      });
    };

    elements.forEach((el) => el.addEventListener("click", handleClick));

    return () => {
      elements.forEach((el) => el.removeEventListener("click", handleClick));
    };
  }, [html, inputValue]);

  useEffect(() => {
    if (inputToken?.inputTokenID && sharedOutputSelected) {
      waitForElement("id", inputToken?.inputTokenID).then((el) => {
        setTimeout(() => {
          setSharedOutputSelected(undefined);
          toggleSharedOutputsDialog(false, undefined);

          el.textContent = `{{ ${sharedOutputSelected.fullPath} }}`;
          el.setAttribute("data-type", sharedOutputSelected.type);

          const editor = DnDInputRef.current;
          if (!editor) return;

          const editorContentCleaned = cleanHTML(editor.innerHTML);
          onElementDropped && onElementDropped(editorContentCleaned);
        }, 0);
      });
    }
  }, [sharedOutputSelected]);

  return (
    <div
      role="button"
      tabIndex={1}
      onClick={() => {
        if (!DnDInputRef.current || isDisabled) return;
        DnDInputRef.current.focus();
      }}
      className={cn(
        "relative min-w-20 max-w-20 text-left text-xs md:text-xs cursor-text rounded-sm border border-gray-300 bg-white flex flex-1 justify-center items-center content-center truncate line-clamp-1 overflow-hidden [--DnDInputHeight:1.74rem] max-h-[var(--DnDInputHeight)] min-h-[var(--DnDInputHeight)] transition-colors file:border-0 file:bg-transparent file:text-xs file:font-medium file:text-foreground placeholder:font-semibold placeholder:text-muted-foreground/70 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        !isDisabled &&
          "focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/50 focus-within:outline-none transition-all duration-300",
        className,
        hasError && "border-destructive/70 ring-2 ring-destructive/60",
        isDisabled &&
          "cursor-default bg-slate-100/40 focus-within:border-transparent focus-within:ring-0 focus-within:outline-none",
        "px-2 pt-[1.9px] !pb-2 overflow-hidden",
        !isDisabled && isDragging && "border-primary/60 ring-2 ring-primary/50"
      )}
    >
      {/* PlaceHolder */}
      {isInputEmpty() && (
        <div className="absolute z-[9] left-2 top-[0.35rem] min-h-[var(--DnDInputHeight)] line-clamp-1 text-wrap pointer-events-none select-none text-muted-foreground/70">
          {placeholder ?? "Type something..."}
        </div>
      )}

      <div
        ref={DnDInputRef}
        contentEditable={!isDisabled && !readOnly}
        onInput={(e: React.FormEvent<HTMLDivElement>) => {
          handleSpace();
        }}
        onDragOver={(e: React.DragEvent) => {
          e.preventDefault();
          if (!isDragging) setIsDragging(true);
          // e.dataTransfer.dropEffect = "move";
        }}
        onDragLeave={() => {
          if (isDragging) setIsDragging(false);
        }}
        onBlur={(e) => {
          onBlur && onBlur(cleanHTML(html));
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleDrop(e);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        tabIndex={0}
        role="textbox"
        suppressContentEditableWarning
        className={cn(
          "flex flex-1 gap-1 line-clamp-1 place-content-center p-0 min-h-[1.4rem] max-h-[1.4rem] outline-none border-none ring-0 focus:outline-none focus:ring-0 w-full overflow-x-scroll scrollbar-hide"
        )}
      ></div>
    </div>
  );
};

export default DnDTextInput;
