const ErrMsg = ({msg}) =>{
  if (msg === '')
      return null
  else{
      return (
          <div className='msg'>
              {msg}
          </div>
      )
  }
}

export default ErrMsg