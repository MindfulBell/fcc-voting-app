export default function(props) => {
	return (
		<div className='create-user'>
			<h2> Register </h2>
			<input type='text' value={props.usernameValue} placeHolder='Username'/>
			<input type='password' value={props.passValue1} placeHolder='Password'/>
			<input type='password' value={props.passValue2} placeHolder='Re-enter password'/>
		</div>
	)
}