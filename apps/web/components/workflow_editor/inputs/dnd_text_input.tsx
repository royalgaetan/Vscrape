import {
  extractTextFromHTML,
  isTrulyEmpty,
  toStringSafe,
} from "@/lib/string_utils";
import { cn, debounce } from "@/lib/utils";
import React, {
  HTMLInputTypeAttribute,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  allowedNumberControlKeys,
  restoreCaret,
  waitForElement,
} from "@/lib/dom_utils";
import { useWorkflowEditorStore } from "@/stores/workflowStore";
import { TokenInputType } from "@/lib/workflow_editor/types/w_types";
import { resolveInputTypeFromReference } from "@/lib/workflow_editor/utils/w_utils";

const DnDTextInput = ({
  placeholder,
  onTextChange,
  onKeyDown,
  onBlur,
  inputValue,
  className,
  hasError,
  isDisabled,
  readOnly,

  nodeId,
  itemId,

  onElementDropped,
  reRenderOnInputValueChange,
  replaceContentOnDrop,
  inputType,
  isTextarea,
  disableDnD,
  onClick,
}: {
  inputValue?: string | readonly string[] | number;
  inputType?: HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
  isDisabled?: boolean;
  readOnly?: boolean;
  hasError?: boolean;
  isTextarea?: boolean;
  disableDnD?: boolean;
  reRenderOnInputValueChange?: boolean;
  replaceContentOnDrop?: boolean;

  nodeId?: string;
  itemId?: string;

  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onTextChange?: (text: string | null) => void;
  onElementDropped?: (text: string | null) => void;
  onBlur?: (text?: string) => void;
  onClick?: () => void;
}) => {
  const DnDInputRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [html, setHtml] = useState<string | null | undefined>("");
  // Store
  const toggleSharedOutputsDialog = useWorkflowEditorStore(
    (s) => s.toggleSharedOutputsDialog
  );
  const sharedOutputInputToken = useWorkflowEditorStore(
    (s) => s.sharedOutputInputToken
  );
  const sharedOutputSelected = useWorkflowEditorStore(
    (s) => s.sharedOutputSelectedItem
  );
  // End Store

  const isInputEmpty = () =>
    html === undefined ||
    html === null ||
    (typeof html === "string" &&
      isTrulyEmpty(extractTextFromHTML(toStringSafe(html))));

  const cleanHTML = (html: any) => {
    const cleaned = toStringSafe(html)
      .replace(/(?:<span>(?:\s*|\u200B)*<\/span>)+/g, "")
      .replace(/<br\s*\/?>/g, "")
      .trim();

    return cleaned;
  };

  const parseEditorText = (text: string) => {
    const container = document.createElement("div");
    container.innerHTML = text;

    const regex = /{{\s*[^{}]*?\s*}}/;

    function walk(node: Node): void {
      const content = node.textContent ?? "";
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
          b.setAttribute(
            "data-type",
            resolveInputTypeFromReference({
              valueToResolve: token,
              nodeId: nodeId ?? "",
              itemId: itemId ?? "",
            }) ?? ""
          );
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
    }

    Array.from(container.childNodes).forEach(walk);

    const zwsp = document.createElement("span");
    zwsp.innerText = "\u200B ";
    container.appendChild(zwsp);

    container.innerHTML.replace(/<br\s*\/?>/g, "");

    return container.innerHTML;
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
    let rawText;

    if (replaceContentOnDrop) {
      rawText = inputData;
    } else {
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
      const fragment = document
        .createRange()
        .createContextualFragment(inputData);
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

      rawText = editor.innerHTML;
    }

    // Re-parse editor content after insertion
    const html = parseEditorText(rawText).concat("\u200B ");
    const editorContentCleaned = html.replace(/<br\s*\/?>/g, "");

    editor.innerHTML = editorContentCleaned;

    // Ensure caret is at the end after re-parsing
    const finalRange = document.createRange();
    finalRange.selectNodeContents(editor);
    finalRange.collapse(false);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(finalRange);

    // Update state
    setHtml(editorContentCleaned);
    onTextChange && onTextChange(editorContentCleaned);
    onElementDropped && onElementDropped(editorContentCleaned);
    editor.focus();
  };

  const handleSpace = (e?: KeyboardEvent) => {
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

    const rawText = editor.innerHTML;
    const html = parseEditorText(rawText);

    const editorContentCleaned = cleanHTML(html);
    if (editor.innerHTML !== html) {
      if (!isTextarea) {
        editor.innerHTML = editorContentCleaned;

        restoreCaret(editor, caretPosition);
      }

      // Update state

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

  const openSharedOutputsDialog = (sharedOutputInputToken?: TokenInputType) => {
    const editor = DnDInputRef.current;
    if (!editor) return;
    onTextChange && onTextChange(editor.innerHTML.trim());

    toggleSharedOutputsDialog({
      isSharedOutputsDialogOpen: true,
      sharedOutputInitialNodeId: nodeId,
      sharedOutputInitialItemId: itemId,
      sharedOutputInputToken: sharedOutputInputToken,
    });
  };

  useEffect(() => {
    const elements = document.querySelectorAll(".token-chip");

    const handleClick = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const tokenId = el.id;
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
    if (sharedOutputInputToken?.inputTokenID && sharedOutputSelected) {
      waitForElement("id", sharedOutputInputToken?.inputTokenID).then((el) => {
        setTimeout(() => {
          toggleSharedOutputsDialog({
            isSharedOutputsDialogOpen: false,
            sharedOutputInitialNodeId: undefined,
            sharedOutputInitialItemId: undefined,
            sharedOutputInputToken: undefined,
            sharedOutputSelectedItem: undefined,
          });

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
      onKeyDown={() => {}}
      onClick={() => {
        if (!DnDInputRef.current || isDisabled) return;
        DnDInputRef.current.focus();
        onClick && onClick();
      }}
      className={cn(
        !isTextarea ? "[--DnDInputHeight:1.74rem]" : "[--DnDInputHeight:5rem]",
        "relative text-left text-xs cursor-text rounded-sm border border-gray-300 max-w-[15rem] bg-transparent flex flex-1 justify-center items-center content-center truncate line-clamp-1 overflow-hidden max-h-[var(--DnDInputHeight)] min-h-[var(--DnDInputHeight)] transition-colors file:border-0 file:bg-transparent file:text-xs file:font-medium file:text-foreground placeholder:font-semibold placeholder:text-muted-foreground/70 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
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
        <div
          className={cn(
            "absolute z-[9] left-2 top-[0.3rem] min-h-[var(--DnDInputHeight)] pointer-events-none select-none text-muted-foreground/70",
            isTextarea
              ? "line-clamp-none text-wrap w-[95%]"
              : "truncate w-[90%]"
          )}
        >
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
          if (disableDnD) return;
          e.preventDefault();
          if (!isDragging) setIsDragging(true);
        }}
        onDragLeave={() => {
          if (disableDnD) return;
          if (isDragging) setIsDragging(false);
        }}
        onPaste={(e) => e.preventDefault()}
        onDrop={(e) => {
          if (disableDnD) return;
          e.preventDefault();
          e.stopPropagation();
          handleDrop(e);
        }}
        onBlur={(e) => {
          onBlur && onBlur(cleanHTML(html));
        }}
        onKeyDown={(e) => {
          onKeyDown && onKeyDown(e);
          if (e.key === "Enter" && !isTextarea) {
            e.preventDefault();
            return;
          }
          const isAllowedControl = allowedNumberControlKeys.includes(e.key);
          const ctrlOrMeta = e.ctrlKey || e.metaKey;
          if (ctrlOrMeta || isAllowedControl) return;
          if (inputType === "number") {
            // Allow digits (0–9), control keys, or key combos like Ctrl+C, Ctrl+V
            const isDigit = /^\d$/.test(e.key) || e.key === ".";

            if (!isDigit) {
              // Prevent all other input
              e.preventDefault();
            }
          }

          if (inputType === "tel") {
            // Allow digits, space, hyphen, parentheses, plus
            const isTelChar = /^[\d\s\-()+]$/.test(e.key);
            if (!isTelChar) {
              e.preventDefault();
            }
          }

          if (inputType === "email") {
            // Allow alphanumeric, basic special chars, @, .
            const isEmailChar = /^[a-zA-Z0-9@._\-+]$/.test(e.key);
            if (!isEmailChar) {
              e.preventDefault();
            }
          }

          if (inputType === "url") {
            // Allow URL-safe characters
            const isUrlChar = /^[a-zA-Z0-9/:?&=._\-#]$/.test(e.key);
            if (!isUrlChar) {
              e.preventDefault();
            }
          }
        }}
        tabIndex={0}
        role="textbox"
        suppressContentEditableWarning
        className={cn(
          "flex flex-1 gap-1 line-clamp-1 p-0 min-h-[1.4rem] place-content-center max-h-[1.4rem] outline-none border-none ring-0 focus:outline-none focus:ring-0 w-full overflow-x-scroll",
          isTextarea
            ? "whitespace-pre-wrap break-words hyphens-auto place-content-start min-h-[calc(var(--DnDInputHeight)-0.5rem)] pt-[2.4px] line-clamp-none overflow-y-auto overflow-x-hidden"
            : "scrollbar-hide"
        )}
      ></div>
    </div>
  );
};

export default DnDTextInput;
