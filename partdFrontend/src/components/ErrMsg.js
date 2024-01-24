const ErrMsg = ({msg}) =>{
  if (msg == null)
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