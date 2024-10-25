import Image, { ImageProps } from 'next/image'

interface CustomImageProps extends Omit<ImageProps, 'alt'> {
  alt?: string;
  caption?: string;
  fill?: boolean;
}

type HeadingProps = {
  children?: React.ReactNode;
  id?: string;
  className?: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

const CustomImage = ({ alt = 'Image', caption, width = 600, height = 400, fill = false, ...props }: CustomImageProps) => (
  <div className="my-4">
    <Image
      {...props}
      width={width}
      height={height}
      fill={fill}
      alt={alt}
      className="rounded-lg shadow-md"
    />
    {caption && <p className="text-center text-sm mt-2 text-gray-600">{caption}</p>}
  </div>
)

const H1 = ({ children, ...props }: HeadingProps) => {
  const id = typeof children === 'string' 
    ? children.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    : '';
  
  return (
    <h1 {...props} id={id} className="scroll-mt-20">
      {children}
    </h1>
  );
};

const H2 = ({ children, ...props }: HeadingProps) => {
  const id = typeof children === 'string'
    ? children.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    : '';
  
  return (
    <h2 {...props} id={id} className="scroll-mt-20">
      {children}
    </h2>
  );
};

const H3 = ({ children, ...props }: HeadingProps) => {
  const id = typeof children === 'string'
    ? children.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    : '';
  
  return (
    <h3 {...props} id={id} className="scroll-mt-20">
      {children}
    </h3>
  );
};

const H4 = ({ children, ...props }: HeadingProps) => {
  const id = typeof children === 'string'
    ? children.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    : '';
  
  return (
    <h4 {...props} id={id} className="scroll-mt-20">
      {children}
    </h4>
  );
};

const MDXComponents = {
  CustomImage,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
};

export default MDXComponents;