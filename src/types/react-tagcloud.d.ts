declare module 'react-tagcloud' {
  import { FC, ReactElement } from 'react';

  export interface Tag {
    value: string;
    count: number;
  }

  export interface TagCloudProps {
    minSize?: number;
    maxSize?: number;
    tags: Tag[];
    className?: string;
    shuffle?: boolean;
    colorOptions?: {
      luminosity?: string;
      hue?: string;
    };
    onClick?: (tag: Tag) => void;
    renderer?: (tag: Tag, size: number, color: string) => ReactElement;
  }

  export const TagCloud: FC<TagCloudProps>;
}
