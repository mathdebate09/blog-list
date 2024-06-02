import Notification from './Notification'
import PropTypes from 'prop-types'

const LoginForm = ({ message, handleLogin, username, handleUsernameChange, password, handlePasswordChange }) => {
    return (
        <div>
            <h2>Log in to application</h2>
            <Notification message={message} />
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        data-testid='username'
                        value={username}
                        name="Username"
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        data-testid='password'
                        value={password}
                        name="Password"
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }

export default LoginForm