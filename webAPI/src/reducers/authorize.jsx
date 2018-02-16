import axios from 'axios'


export default function authReducer (state={
	auth: null,
	user: '',
	id: '',
	fetching: false,
	email: '',
	fetched: false,
	error: null,
	goals: []
}, action){
	console.log('whats the action', action)

	switch (action.type) {
		case 'AUTH_USER' : {
			return {
				...state,
				auth: action.payload.auth,
				PR: action.payload.PR,
				Exercise_Plan: action.payload.Exercise_Plan,
				Chat_Room: action.payload.Chat_Room,
				fullName: action.payload.fullName,
				email: action.payload.email,
				type: action.payload.type,
				id: action.payload.id,
				spotters : action.payload.spotters,
				user: action.payload.fullName,
				goals: action.payload.goals,
				connection_requests: JSON.parse(action.payload.connection_requests),
				photoKeys: action.payload.photoKeys,
				profile_data: action.payload.profile_data
			}
		}

		case 'AUTH_BYPASS' : {
			return {
				user: action.payload.ClientUsername || action.payload.TrainerUsername,
				password: action.payload.ClientPassword || action.payload.TrainerPassword,
				auth: state.auth,
				type: action.payload.type,
				fetching: true,
				fetched: state.fetched,
				error: state.error,
				goals: state.goals
			}
		}
		case 'AUTH_LOGOUT' : {
			console.log('are we loging out??')
			return {
				auth: null,
	            user: '',
	            id: '',
	            fetching: false,
	            email: '',
	            fetched: false,
	            error: null,
	            goals: []
			}
		}
		case 'AUTH_USER_REJECTED' : {
			return {
				auth: null,
	            user: state.user,
	            password: 'NotPassword',
	            fetching: false,
	            fetched: false,
				error: action.payload
			}
		}
		case 'GOALS_SUBMIT' : {
			return {
				auth: state.auth,
				user: state.user,
				password: state.password,
				fetching: state.fetching,
				fethced: state.fetched,
				error: null,
				goals: action.payload
			}
		}
		default : {
			console.log('defaulting')
			return state
		}

	}
}