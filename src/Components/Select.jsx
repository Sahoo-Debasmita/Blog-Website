import React,{useId} from 'react'

function Select({Options,label,classname='',...props},ref) {
    const Id=useId();
  return (
    <div className='w-full'>
     {label && <label htmlFor={Id}></label>}
     <select id={Id} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full  ${classname}`} {...props} ref={ref}>
        {Options?.map((option)=>(
            <option key={option} value={option}>
                {option}
            </option>
        ))}
     </select>
    </div>
  )
}

export default React.forwardRef(Select)
