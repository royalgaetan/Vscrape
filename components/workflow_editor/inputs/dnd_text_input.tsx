import { isTrulyEmpty, toStringSafe } from "@/lib/string_utils";
import { cn } from "@/lib/utils";
import React, {
  HTMLInputTypeAttribute,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type HtmlPossibleType = string | number | readonly string[] | undefined | null;

const DnDTextInput = ({
  placeholder,
  onTextChange,
  onBlur,
  inputValue,
  className,
  hasError,
  isDisabled,
  readOnly,
  inputType,
}: {
  inputValue?: string | readonly string[] | number;
  inputType?: HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
  isDisabled?: boolean;
  readOnly?: boolean;
  hasError?: boolean;
  onTextChange?: (text: string | null) => void;
  onBlur?: () => void;
}) => {
  const DnDInputRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dnDInputContainerRef = useRef<HTMLDivElement>(null);
  const [html, setHtml] = useState<string | null | undefined>("");
  const [htmlParsed, setHtmlParsed] = useState<string | null | undefined>("");

  const isInputEmpty = (text: HtmlPossibleType) =>
    text === null || (typeof text === "string" && isTrulyEmpty(text));

  const parseText = (text: string) => {
    const parsedText = text
      .replace(
        /{{\s*(Variables|Prev Node|Last Operation)([^}]*)\s*}}/g,
        (_, keyword) =>
          `<span class="inputData">${keyword}<button type="button" class="delete-btn" onclick="handleDelete(this)">✕</button></span>`
      )
      .replace(/\u200B/g, "")
      .trim();

    return isTrulyEmpty(parsedText) ? null : parsedText;
  };

  const handleInput = (inputText: string) => {
    setHtml(inputText);
  };

  const parseContent = () => {
    const formatted = parseText(toStringSafe(html));
    console.log("PARSED", formatted);
    setHtmlParsed(formatted);

    onTextChange && onTextChange(formatted);
  };

  useEffect(() => {
    initComponent();
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isDisabled) return;
    setIsDragging(false);

    const inputData = e.dataTransfer.getData(
      "application/workflowEditor_inputdata"
    );

    handleInput(inputData);
    isInputEmpty(html) && setHtml(inputData);

    // Get drop position
    // let range;
    // if (document.caretRangeFromPoint) {
    //   range = document.caretRangeFromPoint(e.clientX, e.clientY);
    // } else if ((document as any).caretPositionFromPoint) {
    //   const pos = (document as any).caretPositionFromPoint(
    //     e.clientX,
    //     e.clientY
    //   );
    //   range = document.createRange();
    //   range.setStart(pos.offsetNode, pos.offset);
    // }

    // if (range) {
    //   // Insert HTML at caret position
    //   const fragment = range.createContextualFragment(inputData);
    //   range.deleteContents(); // optional, replaces selected
    //   range.insertNode(fragment);
    //   handleInput(inputData);
    //   isInputEmpty(html) && setHtml(inputData);
    // }

    if (!DnDInputRef.current) return;
    DnDInputRef.current.focus();
  };

  const initComponent = useCallback(() => {
    setHtml(undefined);
    if (DnDInputRef.current) {
      handleInput(toStringSafe(inputValue));
    }

    const onContainerClick = () => {
      if (!DnDInputRef.current || isDisabled) return;
      DnDInputRef.current.focus();
    };
    if (dnDInputContainerRef.current) {
      dnDInputContainerRef.current.addEventListener("click", onContainerClick);
    }

    return () => {
      dnDInputContainerRef.current &&
        dnDInputContainerRef.current.removeEventListener(
          "click",
          onContainerClick
        );
    };
  }, [inputValue]);

  const handleDeleteInputData = (button: HTMLButtonElement): void => {
    const inputData = button.closest(".inputData") as HTMLSpanElement | null;
    if (inputData) {
      inputData.remove();
    }
  };

  return (
    <div
      ref={dnDInputContainerRef}
      className={cn(
        "relative min-w-20 max-w-20 text-xs md:text-xs cursor-text rounded-sm border border-gray-300 bg-white flex flex-1 justify-center truncate line-clamp-1 overflow-hidden [--DnDInputHeight:1.73rem] max-h-[var(--DnDInputHeight)] min-h-[var(--DnDInputHeight)] transition-colors file:border-0 file:bg-transparent file:text-xs file:font-medium file:text-foreground placeholder:font-semibold placeholder:text-muted-foreground/70 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        !isDisabled &&
          "focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/50 focus-within:outline-none transition-all duration-300",
        className,
        hasError && "border-destructive/70 ring-2 ring-destructive/60",
        isDisabled &&
          "cursor-default bg-slate-100/40 focus-within:border-transparent focus-within:ring-0 focus-within:outline-none",
        "px-2 py-1 overflow-hidden",
        !isDisabled && isDragging && "border-primary/60 ring-2 ring-primary/50"
      )}
    >
      {/* PlaceHolder */}
      {html !== undefined && isInputEmpty(html) && (
        <div className="absolute z-[9] left-2 line-clamp-1 text-wrap pointer-events-none select-none text-muted-foreground/70">
          {placeholder ?? "Type something..."}
        </div>
      )}
      <div
        dangerouslySetInnerHTML={{ __html: toStringSafe(htmlParsed) }}
        ref={DnDInputRef}
        contentEditable={!isDisabled || !readOnly}
        onInput={(e: React.FormEvent<HTMLDivElement>) => {
          const text = e.currentTarget.innerHTML;
          // handleInput(text);
        }}
        onBlur={() => {
          parseContent();
          onBlur && onBlur();
        }}
        onDragLeave={() => {
          setIsDragging(false);
        }}
        onDragOver={(e: React.DragEvent) => {
          e.preventDefault();
          setIsDragging(true);
          e.dataTransfer.dropEffect = "move";
        }}
        onDrop={onDrop}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        role="textbox"
        tabIndex={1}
        suppressContentEditableWarning
        className={cn(
          "flex flex-1 gap-1 line-clamp-1 bg-transparent outline-none border-none ring-0 focus:outline-none focus:ring-0 w-full overflow-x-scroll scrollbar-hide"
        )}
      ></div>
    </div>
  );
};

export default DnDTextInput;
