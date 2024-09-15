import Image, { ImageProps } from 'next/image'

interface CustomImageProps extends Omit<ImageProps, 'alt'> {
  alt?: string;
  caption?: string;
  fill?: boolean;
}

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

const MDXComponents = {
  CustomImage,
  // Autres composants...
}

export default MDXComponents