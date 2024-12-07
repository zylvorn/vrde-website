import { CircularProgress } from '@mui/material'

export const LoadingFullScreen: React.FC<{ isChild?: boolean }> = ({
  isChild = false,
}) => {
  const className = isChild
    ? 'fixed inset-0 flex items-center justify-center bg-cgray bg-opacity-30 z-50 top-[120px]'
    : 'fixed inset-0 flex items-center justify-center bg-cgray bg-opacity-30 z-50'
  return (
    <div className={className}>
      <CircularProgress size={60} />
    </div>
  )
}
