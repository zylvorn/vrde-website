import React, { Fragment, useState } from 'react'

import Image, { ImageProps } from 'next/image'

interface IProps extends ImageProps {
  placeholderStyle?: React.CSSProperties
}

const BluredImg: React.FC<IProps> = ({ ...props }) => {
  const [loadImage, setLoadImage] = useState(true)
  return (
    <Fragment>
      <div
        key={props.key}
        onClick={props.onClick}
        style={props.placeholderStyle}
        className={`opacity-30 ${props.className || ''} bg-placeholder ${
          loadImage ? '' : 'hidden'
        }`}
      />
      <Image {...props} onLoad={() => setLoadImage(false)} />
    </Fragment>
  )
}
export default BluredImg
