module.exports = `
	type User {
		id: Int!
		username: String!
		password: String!
		fullName: String!
		type: String!
		email: String
		profile_data: String
		Exercise_Plan: [Exercise_Plan]
		Diet_Plan: [Diet_Plan]
		Daily_Record: [Daily_Record]
		Spotter: [Spotter]
		Personal_Record: [Personal_Record]
		Chat_Room: [Chat_Room]
		connection_requests: String
	}

	type Exercise_Plan {
		id: Int!
		name: String!
		regimen: String!
		trainer: User
		client: User
	}

	type Diet_Plan {
		id: Int!
		name: String!
		diet: String!
		trainer: User
		client: User
	}

	type Spotter {
		id: Int!
		trainer: User
		client: User
		type: String!
	}

	type Chat_Room {
		id: Int!
		room_id: String!
		user: User!
	}

	type Daily_Record {
		id: Int!
		user: User!
		data: String!
		created_at: String!
	}

	type Personal_Record {
		id: Int!
		user: User!
		data: String!
	}

	type Query {
		loginUser(username: String!, password: String!): User
		getExercisePlans(id: Int!, type: String!): [Exercise_Plan]
		getDietPlans(id: Int!, type: String!): [Diet_Plan]
		getSpotters(id: Int!, type: String!): [Spotter]
		getDailyRecords(id: Int!, timestamp: String): [Daily_Record]
		getPersonalRecord(id: Int!): Personal_Record
		getChatRooms(id: Int!): [Chat_Room]
		getChatRoomsByRoomId(room_id: String!): [Chat_Room]
		getUsersByFullName(fullName: String!): [User]
		getUserByID(id: Int!): User
	}
	
	type Mutation {
		setUser(username: String!, password: String!, fullName: String!, email: String, type: String!, profile_data: String, connection_requests: String): User
		updateUser(user_id: Int!, profile_data: String!): User
		connectionRequest(id: Int!, connection_requests: String!, delete: Boolean): User
		setExercisePlan(name: String!, regimen: String!, trainer_id: Int!, client_id: Int!): Exercise_Plan
		setDietPlan(name: String!, diet: String!, trainer_id: Int!, client_id: Int!): Diet_Plan
		setSpotter(trainer_id: Int!, client_id: Int!, type: String!): Spotter
		setDailyRecord(user_id: Int!, data: String!): Daily_Record
		setPersonalRecord(user_id: Int!, data: String!): Personal_Record
		setChatRoom(room_id: String!, user_id: Int!): Chat_Room
	}

	type Subscription {
		userSubscription(user_id: Int!): User
	}
	`