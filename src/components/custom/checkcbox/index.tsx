'use client'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

type TProps = {
  checked: boolean
  onClick: (c: boolean) => void
}
const CCheckbox: React.FC<TProps> = ({ checked, onClick }) => {
  return checked ? (
    <CheckBoxIcon
      className='cursor-pointer'
      onClick={() => onClick(!checked)}
    />
  ) : (
    <CheckBoxOutlineBlankIcon
      className='cursor-pointer'
      onClick={() => onClick(!checked)}
    />
  )
  // return (
  //   <div
  //     className={
  //       'border rounded-sm border-blue w-[25px] h-[25px] cursor-pointer ' +
  //       (checked ? 'bg-cblack' : '')
  //     }
  //     onClick={() => onClick(!checked)}
  //   />
  // )
}
export default CCheckbox
