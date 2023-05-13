import Image from 'next/image'
import { useRouter } from 'next/router'

const myLoader = ({ src, width, quality }) => {
	const router = useRouter()
  // console.log(`${process.env.NODE_ENV !== 'production' && !src.includes('http') ? 'http://localhost:3535' : ""}${src}?w=${width}&q=${quality || 75}`)
  // return `${process.env.NODE_ENV !== 'production' ? 'http://localhost:3535' : router.basePath}/${src}?w=${width}&q=${quality || 75}`
	// return `${process.env.NODE_ENV !== 'production' ? 'http://localhost:3535' : ""}${src}?w=${width}&q=${quality || 75}`
  return `${process.env.NODE_ENV !== 'production' && !src.includes('http') ? !src.includes('sia.') ? 'http://localhost:3535' : "https://" : ""}${src}?w=${width}&q=${quality || 75}`
}

const ImageWithLoader = (props) => {
  return (
    <img
      loader={myLoader}
			{...props}
    />
  )
}

export default ImageWithLoader