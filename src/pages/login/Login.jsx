import e from 'cors'
import React, { useState} from 'react'
import { Link } from 'react-router-dom'
import './login.scss'

export default function Login() {
    const [user, setUser] = useState("")
    const [room, setRoom] = useState("")
    return (
<body>
    <div class="login-wrap">
	<div class="login-html">
    <input id="tab-1" type="radio" name="tab" class="sign-in" checked/>
            <label for="tab-1" class="tab">Sign In</label>
		<input id="tab-2" type="radio" name="tab" class="for-pwd"/>
            <label for="tab-2" class="tab">Forgot Password</label>
		<div class="login-form">
			<div class="sign-in-htm">
				<div class="group">
					<label for="user" class="label">Username</label>
					<input onChange={(e) => setUser(e.target.value)} id="user" type="text" class="input"/>
				</div>
				<div class="group">
					<label for="pass" class="label">Room</label>
					<input onChange={(e) => setRoom(e.target.value)} id="pass" class="input" data-type="Room"/>
				</div>
				<div class="group">
                    <Link onClick={(e) => (!user || !room) ? e.preventDefault() : null} to={`/chat?name=${user}&room=${room}`}>
                        <input type="submit" class="button" value="Create Room"/>
                    </Link>
				</div>
				<div class="hr"></div>
			</div>
			{/* <div class="for-pwd-htm">
				<div class="group">
					<label for="user" class="label">Username or Email</label>
					<input id="user" type="text" class="input"/>
				</div>
				<div class="group">
					<input type="submit" class="button" value="Reset Password"/>
				</div>
				<div class="hr"></div>
			</div> */}
		</div>
	</div>
</div>
</body>



    )
}
