import './Notification.css';

const Notification = ({ message }) => {
  if (message === '' || message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}
export default Notification;