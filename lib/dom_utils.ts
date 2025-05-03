export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy!", err);
    return false;
  }
};

export const isElementInViewport = (
  parent: HTMLElement,
  child: HTMLElement
): boolean => {
  const parentRect = parent.getBoundingClientRect();
  const childRect = child.getBoundingClientRect();

  return (
    childRect.top >= parentRect.top &&
    childRect.bottom <= parentRect.bottom &&
    childRect.left >= parentRect.left &&
    childRect.right <= parentRect.right
  );
};

export type SelectorType = "id" | "class" | "data-attr";

export const waitForElement = (
  type: SelectorType,
  selector: string,
  timeout = 5000
): Promise<HTMLElement> => {
  return new Promise((resolve, reject) => {
    let el: HTMLElement | null = null;

    const getElement = () => {
      switch (type) {
        case "id":
          return document.getElementById(selector);
        case "class":
          return document.querySelector(`.${selector}`) as HTMLElement;
        case "data-attr":
          return document.querySelector(`[${selector}]`) as HTMLElement;
        default:
          return null;
      }
    };

    el = getElement();
    if (el) return resolve(el);

    const observer = new MutationObserver(() => {
      const found = getElement();
      if (found) {
        observer.disconnect();
        resolve(found as HTMLElement);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    setTimeout(() => {
      observer.disconnect();
      reject(new Error("Timeout: Element not found"));
    }, timeout);
  });
};

export const isAccordionElementOpen = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const state = element.getAttribute("data-state");
    if (state === "open") return true;
  } else {
    return false;
  }
  return false;
};

export const scrollToEl = ({
  parentId,
  id,
  offsetTopMargin = 15,
  offsetLeftMargin = 0,
}: {
  offsetLeftMargin?: number;
  offsetTopMargin?: number;
  parentId?: string;
  id: string;
}) => {
  const parent = parentId ? document.getElementById(parentId) : window;
  const el = document.getElementById(id);
  if (el && parent) {
    parent.scrollTo({
      top: el.offsetTop - offsetTopMargin,
      left: el.offsetLeft - offsetLeftMargin,
      behavior: "smooth",
    });
  } else {
    console.log(
      `Parent element with ID "${parent}" or child element with ID "${id}" was not found.`
    );
  }
};

export const restoreCaret = (container: HTMLElement, pos: number) => {
  const range = document.createRange();
  const selection = window.getSelection();
  let currentNode: Node | null = null;
  let currentOffset = 0;

  function findNodeAtOffset(node: Node): boolean {
    if (node.nodeType === Node.TEXT_NODE) {
      const textLength = node.textContent?.length ?? 0;
      if (pos <= textLength) {
        currentNode = node;
        currentOffset = pos;
        return true;
      } else {
        pos -= textLength;
      }
    } else {
      for (let child of node.childNodes) {
        if (findNodeAtOffset(child)) return true;
      }
    }
    return false;
  }

  findNodeAtOffset(container);

  if (currentNode) {
    range.setStart(currentNode, currentOffset);
    range.collapse(true);
    selection?.removeAllRanges();
    selection?.addRange(range);
  }
};
