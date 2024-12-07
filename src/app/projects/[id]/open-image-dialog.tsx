import React from 'react'
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Image from 'next/image'

interface OpenImageDialogProps {
  isOpen: boolean
  onClose: () => void
  image: string
}

const OpenImageDialog: React.FC<OpenImageDialogProps> = ({
  isOpen,
  onClose,
  image,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth='lg' fullWidth>
      <DialogTitle>
        Image Preview
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers className='no-scrollbar'>
        <Image
          src={image}
          loading='lazy'
          alt='Preview'
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </DialogContent>
    </Dialog>
  )
}

export default OpenImageDialog
