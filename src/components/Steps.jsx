import React from 'react'

function Steps({text1,text2,text3,statusT1,statusT2,statusT3}) {
  let baseStyle = 'bg-gray-400 size-8 rounded-full text-white py-1 px-3'
  let baseStyle1 = baseStyle
  let baseStyle2 = baseStyle
  let baseStyle3 = baseStyle
  if (statusT1) {
    if (statusT1==='on') {baseStyle1 = baseStyle + ' bg-sky-600'}
    else if (statusT1==='passed') {baseStyle1 = baseStyle + ' bg-green-600'}
  } 
  if (statusT2) {
    if (statusT2==='on') {baseStyle2 = baseStyle + ' bg-sky-600'}
    else if (statusT2==='passed') {baseStyle2 = baseStyle + ' bg-green-600'}
  } 
  if (statusT3) {
    if (statusT3==='on') {baseStyle3 = baseStyle + ' bg-sky-600'}
    else if (statusT3==='passed') {baseStyle3 = baseStyle + ' bg-green-600'}
  } 
  return (
    <div className='flex flex-row gap-5 items-center justify-between box-border'>
        <div className='flex flex-col gap-2 justify-center items-center'>
            <div className={baseStyle1}>1</div>
            <span className='text-sm font-normal text-center'>{text1}</span>
        </div>
        <hr className='border-[0.5px] w-[8svw] h-[1px] border-dashed border-gray-400'/>
        <div className='flex flex-col gap-2 justify-center items-center'>
            <div className={baseStyle2}>2</div>
            <span className='text-sm font-normal'>{text2}</span>
        </div>
        <hr className='border-[0.5px] w-[8svw] h-[1px] border-dashed border-gray-400'/>
        <div className='flex flex-col gap-2 justify-center items-center'>
            <div className={baseStyle3}>3</div>
            <span className='text-sm font-normal'>{text3}</span>
        </div>
    </div>
  )
}

export default Steps