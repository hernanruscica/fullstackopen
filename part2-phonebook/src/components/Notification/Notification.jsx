import './Notification.css';

const Notification = ({ message, type = 'ok' }) => {
  if (message === '' || message === null) {
    return null
  }

  return (
    <div className = {type} >
      {message}
    </div>
  )
}
export default Notification;