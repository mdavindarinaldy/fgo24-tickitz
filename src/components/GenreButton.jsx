import React from 'react'

function GenreButton({text, isActive, ...props}) {
    let baseStyle='border-1 rounded-3xl px-3 lg:px-[1.1svw] py-1 lg:py-2 flex justify-center gap-2 items-center text-sm lg:text-[1.1svw]'
    if (isActive === true) {
        baseStyle = baseStyle +' bg-orange-500 text-white'
    } else if (isActive === false) {
        baseStyle = baseStyle +' border-gray-400  text-gray-500'
    }
    return (
        <button type='button' className={baseStyle} {...props}>{text}</button>
    )
}

export default GenreButton