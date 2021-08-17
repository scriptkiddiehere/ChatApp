import { Avatar, Button, IconButton } from '@material-ui/core';
import styled from 'styled-components';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ChatIcon from '@material-ui/icons/Chat';
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from 'email-validator';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import Chat from './Chat';

function Sidebar() {
	const [user] = useAuthState(auth);
	const userChatRef = db
		.collection('chats')
		.where('users', 'array-contains', user.email);
	const [chatSnapshot] = useCollection(userChatRef);
	const createChat = () => {
		const input = prompt(
			'Please enter an email address for the user you wish to chat with'
		);
		if (!input) 
		return null;
		if (
			EmailValidator.validate(input) &&
			!chatAlreadyExists(input) &&
			input !== user.email
		) {
			db.collection('chats').add({
				users: [user.email, input],
			});
		}
	};
	const chatAlreadyExists = (recipientEmail) =>
		!!chatSnapshot?.docs.find(
			(chat) =>
				chat.data().users.find((user) => user === recipientEmail)?.length > 0
		);
	return (
		<Container>
			<Header>
				<IconButton>
					<UserAvatar src={user.photoURL} />
				</IconButton>
				<IconsContainer>
					<IconButton>
						<ChatIcon style={{ color: 'black' }}/>
					</IconButton>
					<IconButton>
						<ExitToAppIcon onClick={() => auth.signOut()} style={{ color: 'black' }}/>
					</IconButton>
				</IconsContainer>
			</Header>
			<Search>
				<SearchIcon />
				<SearchInput placeholder='Search in chats' />
			</Search>
			<SidebarButton onClick={createChat}>Start a new chat</SidebarButton>
			{chatSnapshot?.docs.map((chat) => (
				<Chat key={chat.id} id={chat.id} users={chat.data().users} />
			))}
		</Container>
	);
}

export default Sidebar;
const Container = styled.div`
	flex: 0.45;
	border-right: 1px solid #075E54;
	height: 100vh;
	min-width: 300px;
	max-width: 350px;
	overflow-y: scroll;
	::-webkit-scrollbar {
		display: none;
	}
	--ms-overflow-style: none;
	scrollbar-width: none;
`;
const Header = styled.div`
	display: flex;
	position: sticky;
	top: 0;
	background-color: #128C7E;
	z-index: 1;
	justify-content: space-between;
	align-items: center;
	padding: 15px;
	height: 80px;
	border-right: 1px solid #075E54;
	border-bottom: 1px solid #075E54;
`;
const UserAvatar = styled(Avatar)`
	cursor: pointer;
	:hover {
		opacity: 0.8;
	}
`;
const IconsContainer = styled.div``;
const Search = styled.div`
	display: flex;
	align-self: center;
	padding: 20px;
	border-radius: 2px;
	background-color: whitesmoke;
`;
const SearchInput = styled.input`
	outline-width: 0;
	border: none;
	background-color: whitesmoke;
	flex: 1;
`;
const SidebarButton = styled(Button)`
	width: 100%;
	background-color: #128C7E !important;
	&& {
		border-top: 1px solid #128C7E;
		border-bottom: 1px solid #128C7E;
	}
`;