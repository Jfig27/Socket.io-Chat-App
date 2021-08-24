/* eslint-disable jsx-a11y/alt-text */
import './chat.scss'
import React, {useEffect, useState} from 'react'
import io  from "socket.io-client";
let socket;


export default function Chat() {

    const backEndUrl = 'http://localhost:8000'
    const [user, setUser] = useState("")
    const [room, setRoom] = useState("")
    const [msg, setMsg] = useState("")
    const [activeUsers, setActiveUsers] = useState([])
    const [messages, setMessages] = useState([])
    useEffect(() => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const name = params.get('name');
        const room = params.get('room');


        setUser(name)
        setRoom(room)

        socket = io(backEndUrl);

        socket.emit("join", {name:name, room:room}, (error) => {
            if(error){
                alert(error)
            }
        });

        return () => {
            socket.disconnect();
            socket.off();
        }
    }, [])
    
    useEffect(()=> {
        socket.on('message', msg => {
            setMessages(prevMessages => [...prevMessages, msg])

            setTimeout(() => {
                var objDiv = document.getElementById("chat-body");
                objDiv.scrollTop = objDiv.scrollHeight;
            }, 100)
        })

        socket.on('activeUsers', users => {
            setActiveUsers(users)
        })
    }, [])

    const sendMessage =(e) => {
        // e.preventDefault()

        socket.emit('sendMsg', msg, () => {
            setMsg("")}
        )

        setTimeout(() => {
            var objDiv = document.getElementById("chat-body");
            objDiv.scrollTop = objDiv.scrollHeight;
        }, 100)
    }
    return (
        <div>
            	<body>
		<div class="container-fluid h-100">
			<div class="row justify-content-center h-100">
				<div class="col-md-8 col-xl-6 chat">
					<div class="card">
						<div class="card-header msg_head">
							<div class="d-flex bd-highlight">
								<div class="img_cont">
									<img src="https://th.bing.com/th/id/R.3aa58228f1812356b823febe6564e369?rik=d9Kg0QMHsjwc0Q&riu=http%3a%2f%2fvignette2.wikia.nocookie.net%2fjjba%2fimages%2fa%2fab%2fCoco_jumbo_prof.png%2frevision%2flatest%3fcb%3d20140608043315&ehk=SEP68VGMCZjEVpdbJOU6BXgDVJIP8kGfzzgMDOVYhnY%3d&risl=&pid=ImgRaw&r=0" class="rounded-circle user_img"/>
									{/* <span class="online_icon"></span> */}
								</div>
								<div class="user_info">
									<span>Room: {room}</span>
									{/* <p>1767 Messages</p> */}
								</div>
							</div>
                            <div class="activeUsers">
                                Active Users:
                                {
                                    activeUsers.map((each, idx) => (
                                        <div>
                                            <span class="online_icon"></span>
                                            <p key={idx} class="users">{each.name}</p>
                                        </div>

                                    ))
                                }
                            </div>
						</div>
						<div class="card-body msg_card_body" id="chat-body">
                            {
                                messages.map((e, i) => (

                                    e.user !== user?.toLowerCase() && e.user !== "admin" ? <>
                                        <div key={i} class="d-flex justify-content-start mb-4">
                                            <div class="img_cont_msg">
                                                <img src="https://s11.favim.com/orig/7/773/7737/77378/jojos-bizarre-adventure-icons-jojos-icons-anime-Favim.com-7737857.jpg" class="rounded-circle user_img_msg"/>
                                            </div>
                                            <div class="msg_cotainer">
									            {e.text}
									            <span class="msg_time">{e.user}</span>
								            </div>
                                        </div> </> : e.user === user?.toLowerCase() && e.user !== "admin" ?<>						
                                        <div key={i} class="d-flex justify-content-end mb-4">
								            <div class="msg_cotainer_send">
									            {e.text}
									            <span class="msg_time_send">{e.user}</span>
								            </div>
                                            <div class="img_cont_msg">
                                                <img src="https://i.pinimg.com/originals/aa/a4/9f/aaa49f0db95279ad4eeb8fe8117e95ed.png" class="rounded-circle user_img_msg"/>
                                            </div>
							            </div>
                                        </> : <> 
                                        <div key={i} class="d-flex justify-content-center mb-4">
								            <div class="msg_cotainer_admin">
									            {e.text}
									            <span class="msg_time_send">{e.user}</span>
								            </div>
                                            <div class="img_cont_msg">
                                                <img src="https://s11.favim.com/orig/7/773/7737/77378/icons-jojos-bizarre-adventure-jojos-Favim.com-7737861.jpg" class="rounded-circle user_img_msg"/>
                                            </div>
							            </div>
                                        </>
                                ))                                
                            }
							{/* <div class="d-flex justify-content-start mb-4">
								<div class="img_cont_msg">
									<img src="https://s11.favim.com/orig/7/773/7737/77378/jojos-bizarre-adventure-icons-jojos-icons-anime-Favim.com-7737857.jpg" class="rounded-circle user_img_msg"/>
								</div>
								<div class="msg_cotainer">
									Hi, how are you samim?
									<span class="msg_time">8:40 AM, Today</span>
								</div>
							</div>
							<div class="d-flex justify-content-end mb-4">
								<div class="msg_cotainer_send">
									Hi Khalid i am good tnx how about you?
									<span class="msg_time_send">8:55 AM, Today</span>
								</div>
								<div class="img_cont_msg">
							<img src="https://i.pinimg.com/originals/aa/a4/9f/aaa49f0db95279ad4eeb8fe8117e95ed.png" class="rounded-circle user_img_msg"/>
								</div>
							</div> */}
						</div>
						<div class="card-footer">
							<div class="input-group">
								<div class="input-group-append">
									<span class="input-group-text attach_btn"><i class="fas fa-paperclip"></i></span>
								</div>
								<textarea name="" class="form-control type_msg" placeholder="Type your message..."
                                value={msg} 
                                onKeyPress={(e) => e.key==="Enter" ? sendMessage(e) : null } 
                                onChange={(e)=> setMsg(e.target.value)}></textarea>
								<div class="input-group-append">
									<span class="input-group-text send_btn"><i class="fas fa-location-arrow"></i></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</body>


















            {/* ------------------------------------------------------------------------------------------------ */}

        </div>
    )
}
