declare module 'react-tagcloud' {
  import * as React from 'react';
  import { ReactNode } from 'react';

  export interface Tag {
    value: string;
    count: number;
    key?: string;
  }

  export interface TagCloudProps {
    tags: Tag[];
    minSize?: number;
    maxSize?: number;
    colorOptions?: {
      luminosity?: string;
      hue?: string;
    };
    onClick?: (tag: Tag, event: MouseEvent) => void;
    renderer?: (tag: Tag, size: number, color: string) => ReactNode;
    shuffle?: boolean;
    disableRandomColor?: boolean;
    className?: string;
  }

  export class TagCloud extends React.Component<TagCloudProps> {}

  export default TagCloud;
}
