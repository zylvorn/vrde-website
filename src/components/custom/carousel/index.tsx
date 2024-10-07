'use client'

import React from 'react'
import Slider from 'react-slick'

interface ImageCarouselProps {
  images: { src: string; alt?: string }[]
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const settings = {
    dots: true, // Show dots for navigation
    infinite: true, // Infinite scrolling
    speed: 500, // Speed of the transition
    slidesToShow: 1, // Number of slides to show
    slidesToScroll: 1, // Number of slides to scroll
    autoplay: true, // Automatically scroll the slides
    autoplaySpeed: 3000, // Autoplay interval (in ms)
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
          slidesToShow: 2, // Show 2 slides at a time on tablets
        },
      },
      {
        breakpoint: 1400, // For screens smaller than 1400px
        settings: {
          slidesToShow: 3, // Show 3 slides at a time on desktops
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
            className='img-fit'
            style={{ objectFit: 'cover', height: 600 }}
          />
        </div>
      ))}
    </Slider>
  )
}

export default ImageCarousel
