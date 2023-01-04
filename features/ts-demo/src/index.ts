type Direction = 'right' | 'left' | 'top' | 'bottom';
type CancelContinuousScroll = () => void;

interface ContinuousScrollOptions {
  direction: Direction;
  step: number;
}

interface ScrollDomInfo {
  bottom: number;
  right: number;
  left: number;
  top: number;
}

export interface AutoScrollOptions {
  scrollElement: HTMLElement;
  step?: number;
  trackMouseEvent?: 'mousemove' | 'drag';
  edge: {
    [k in Direction]?: number;
  };
  onDirectionChange?: (direction: Direction) => void;
}

export function scrollable(scrollElement: HTMLElement, direction: Direction) {
  if (scrollElement.scrollHeight === scrollElement.clientHeight) {
    return false;
  }
  if (direction === 'top' && scrollElement.scrollTop === 0) {
    return false;
  }
  if (
    direction === 'bottom' &&
    scrollElement.scrollTop + scrollElement.clientHeight ===
      scrollElement.scrollHeight
  ) {
    return false;
  }
  if (direction === 'left' && scrollElement.scrollLeft === 0) {
    return false;
  }
  if (
    direction === 'right' &&
    scrollElement.scrollLeft + scrollElement.clientWidth ===
      scrollElement.scrollWidth
  ) {
    return false;
  }
  return true;
}

export function continuousScroll(
  scrollElement: HTMLElement,
  { direction, step }: ContinuousScrollOptions
): CancelContinuousScroll | null {
  let rafID: number | null = null;

  const isHorizontal = direction === 'left' || direction === 'right';

  const scroll = () => {
    if (!scrollable(scrollElement, direction)) {
      return null;
    }

    if (isHorizontal) {
      const currentScrollLeft = scrollElement.scrollLeft;
      const nextPos =
        direction === 'left'
          ? currentScrollLeft - step
          : currentScrollLeft + step;
      scrollElement.scrollLeft = nextPos;
    } else {
      const currentScrollTop = scrollElement.scrollTop;
      const nextPos =
        direction === 'top' ? currentScrollTop - step : currentScrollTop + step;
      scrollElement.scrollTop = nextPos;
    }
    rafID = requestAnimationFrame(scroll);
  };

  rafID = requestAnimationFrame(scroll);
  return () => {
    if (rafID) {
      cancelAnimationFrame(rafID);
    }
  };
}

export class AutoScroll {
  private cancelScroll: CancelContinuousScroll | null = null;
  private options: AutoScrollOptions;
  private scrollDomInfo: ScrollDomInfo;
  private scrolling = false;
  constructor(options: AutoScrollOptions) {
    this.options = options;
    this.scrollDomInfo = this.getScrollDomInfo();
  }

  private getScrollDomInfo() {
    const { scrollElement } = this.options;
    const top = scrollElement.clientTop;
    const left = scrollElement.clientLeft;
    const bottom = scrollElement.clientHeight;
    const right = scrollElement.clientWidth;
    return {
      left,
      top,
      right,
      bottom,
    };
  }

  private getScrollingDirection = (e: MouseEvent): Direction | null => {
    const { x, y } = e;
    const { top, bottom, left, right } = this.scrollDomInfo;
    const { edge } = this.options;
    //
    if (edge.top && y >= top && y <= edge.top + top) {
      return 'top';
    }
    if (edge.bottom && y <= bottom && y >= bottom - edge.bottom) {
      return 'bottom';
    }
    //
    if (edge.left && x >= left && x <= left + edge.left) {
      return 'left';
    }
    if (edge.right && x <= right && x >= right - edge.right) {
      return 'right';
    }
    return null;
  };

  private handleMouseMove = (e: MouseEvent) => {
    const { scrollElement, step = 10, onDirectionChange } = this.options;
    const direction = this.getScrollingDirection(e);
    if (direction) {
      if (this.scrolling) {
        // already in scroll
        return;
      }
      this.cancelScroll = continuousScroll(scrollElement, {
        direction: direction,
        step,
      });
      onDirectionChange?.(direction);
      this.scrolling = true;
    } else {
      // out
      this.cancelScroll?.();
      this.scrolling = false;
    }
  };
  active() {
    const { trackMouseEvent = 'mousemove' } = this.options;
    window.addEventListener(trackMouseEvent, this.handleMouseMove);
  }
  inactive() {
    const { trackMouseEvent = 'mousemove' } = this.options;
    window.removeEventListener(trackMouseEvent, this.handleMouseMove);
    this.cancelScroll?.();
    this.scrolling = false;
  }
}
