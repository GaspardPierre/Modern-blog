import Image from 'next/image'

const CustomImage = (props) => (
  <div className="my-4">
  <Image
  {...props}
  width={props.width || 600}
  height={props.height || 400}
  fill={props.fill || false}
  alt={props.alt || 'Image'}
  className="rounded-lg shadow-md"
/>

    {props.caption && <p className="text-center text-sm mt-2 text-gray-600">{props.caption}</p>}
  </div>
)
const MDXComponents = {
  CustomImage,
  // Autres composants...
}
export default MDXComponents