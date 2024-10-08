'use client'

import React, { CSSProperties } from 'react'
import Slider, { Settings } from 'react-slick'
import NextIcon from '@mui/icons-material/KeyboardArrowRight'
import BeforeIcon from '@mui/icons-material/KeyboardArrowLeft'

interface ImageCarouselProps {
  images: { src: string; alt?: string }[]
}

type TPropsArrow = {
  className?: string
  style?: CSSProperties
  onClick?: () => void
}
const NextArrow = (props: TPropsArrow) => {
  const { className, style, onClick } = props
  return (
    <NextIcon
      onClick={onClick}
      className={className}
      style={{ ...style, color: 'black' }}
    />
  )
}
const PrevArrow = (props: TPropsArrow) => {
  const { className, style, onClick } = props
  return (
    <BeforeIcon
      onClick={onClick}
      className={className}
      style={{ ...style, color: 'black' }}
    />
  )
}
const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const settings: Settings = {
    dots: true, // Show dots for navigation
    infinite: true, // Infinite scrolling
    speed: 500, // Speed of the transition
    slidesToShow: 1, // Number of slides to show
    slidesToScroll: 1, // Number of slides to scroll
    autoplay: true, // Automatically scroll the slides
    autoplaySpeed: 3000, // Autoplay interval (in ms)
    lazyLoad: 'progressive',
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768, // For screens smaller than 768px
        settings: {
          slidesToShow: 1, // Show 1 slide at a time on mobile
        },
      },
      {
        breakpoint: 1024, // For screens smaller than 1024px
        settings: {
          slidesToShow: 1, // Show 2 slides at a time on tablets
        },
      },
      {
        breakpoint: 1400, // For screens smaller than 1400px
        settings: {
          slidesToShow: 1, // Show 3 slides at a time on desktops
        },
      },
    ],
  }

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <img
            src={image.src}
            alt={image.alt || `Image ${index + 1}`}
            className='img-fit transition ease-out duration-500'
            style={{ objectFit: 'cover', height: 600 }}
          />
        </div>
      ))}
    </Slider>
  )
}

export default ImageCarousel
