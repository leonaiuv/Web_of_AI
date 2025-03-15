// 为缺少类型声明的模块添加声明

declare module 'react-parallax-tilt' {
  import React from 'react';
  
  interface TiltProps {
    tiltMaxAngleX?: number;
    tiltMaxAngleY?: number;
    tiltReverse?: boolean;
    tiltEnable?: boolean;
    tiltAngleXInitial?: number;
    tiltAngleYInitial?: number;
    glareEnable?: boolean;
    glareMaxOpacity?: number;
    glareColor?: string;
    glarePosition?: string;
    glareBorderRadius?: string;
    scale?: number;
    transitionSpeed?: number;
    gyroscope?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }
  
  const Tilt: React.FC<TiltProps>;
  export default Tilt;
}

declare module 'react-intersection-observer' {
  import React from 'react';
  
  interface IntersectionOptions {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
    triggerOnce?: boolean;
    skip?: boolean;
    initialInView?: boolean;
    fallbackInView?: boolean;
    trackVisibility?: boolean;
    delay?: number;
  }
  
  export function useInView(options?: IntersectionOptions): [React.RefObject<any>, boolean, IntersectionObserverEntry | undefined];
} 