/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

// 补充全局Window类型
interface Window {
  mouseMoveX: number;
  mouseMoveY: number;
} 