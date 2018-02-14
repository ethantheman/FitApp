// import { PubSub, withFilter } from ‘graphql-subscriptions’;
let PubSub = require('graphql-subscriptions').PubSub;
let withFilter = require('graphql-subscriptions').withFilter;
const pubsub = new PubSub();

module.exports = {
	Query: {
		loginUser: (parent, { username, password }, db) => {
			return db.loginUser(username, password);
		},
		getExercisePlans: (parent, { id, type }, db) => {
			return db.getExercisePlans(id, type);
		},
		getDietPlans: (parent, { id, type }, db) => {
			return db.getDietPlans(id, type);
		},
		getSpotters: (parent, { id, type }, db) => {
			return db.getSpotters(id, type);
		},
		getDailyRecords: (parent, {id}, db) => {
			return db.getDailyRecords(id);
		},
		getPersonalRecord: (parent, {id}, db) => {
			return db.getPersonalRecord(id);
		},
		getChatRooms: (parent, {id}, db) => {
			return db.getChatRooms(id);
			// .then((rooms)=>{
			// 	// console.log("in then", rooms)
				
			// 	return Promise.all(rooms.map( (ele)=>{
			// 		console.log("in Map", ele)
			// 		 db.getChatRoomsByRoomId(ele.room_id)
			// 	}))
			// }).then((rooms)=>{
			// 	console.log("here", rooms)
			// 	return rooms;
			// });
		},
		getUsersByFullName: (parent, {fullName}, db) => {
			return db.getUsersByFullName(fullName);
		},
		getUserByID: (parent, {id}, db) => {
			return db.getUserByID(id);
		},
		getChatRoomsByRoomId: (parent, {room_id}, db) => {
			// console.log('resolver has id: ', id);
			return db.getChatRoomsByRoomId(room_id);
		}
	},

	Mutation: {
		setUser: (parent, obj, db) => {
			return db.setUser(obj);
		},
		updateUser: (parent, obj, db) => {
			return db.updateUser(obj);
		},
		setExercisePlan: (parent, obj, db) => {
			console.log('are we resoliving anyhting??')
			return db.setExercisePlan(obj);
		},
		setDietPlan: (parent, obj, db) => {
			return db.setDietPlan(obj);
		},
		setSpotter: async (parent, obj, db) => {
			// let result = {};
			spotter = await db.setSpotter(obj);
			console.log('we are running setSpotter: ', spotter);
			pubsub.publish('userSubscription', {'userSubscription': spotter})

			return spotter;
		},
		setDailyRecord: (parent, obj, db) => {
			return db.setDailyRecord(obj);
		},
		setPersonalRecord: (parent, obj, db) => {
			return db.setPersonalRecord(obj);
		},
		setChatRoom: (parent, obj, db) => {
			return db.setChatRoom(obj);
		},
		connectionRequest:(parent, obj, db) => {
			return db.connectionRequest(obj);
		}
	},

	Subscription: {
		userSubscription: {
			subscribe: withFilter(
				(...args) => {
					console.log('WHAT IS DIS', ...args);
					return pubsub.asyncIterator('userSubscription');
				},
				(payload, variables) => {
					console.log('payload: ', payload, 'variables: ', variables);
					return true;
				}
				)
		}
	},

	User: {
		Exercise_Plan: (parent, args, db) => {
			return db.getExercisePlans(parent.id, parent.type)
		},
		Spotter: (parent, args, db) => {
			return db.getSpotters(parent.id, parent.type)
		},
		Personal_Record: (parent, args, db) => {
			return db.getPersonalRecord(parent.id, parent.type)
		},
		Chat_Room: (parent, args, db) => {
			return db.getChatRooms(parent.id, parent.type)
		}

	},

	Diet_Plan: {
		client: (parent, args, db) => {
			// console.log(parent)
			return db.getUserByID(parent.client_id);
		},

		trainer: (parent, args, db) => {
			// console.log(parent)
			return db.getUserByID(parent.trainer_id);
		}
	},

	Exercise_Plan: {
		client: (parent, args, db)=>{
			return db.getUserByID(parent.client_id)
		},
		trainer: (parent, args, db) =>{
			return db.getUserByID(parent.trainer_id)
		}
	},

	Spotter: {
		client: (parent, args, db)=>{
			return db.getUserByID(parent.client_id)
		},
		trainer: (parent, args, db)=>{
			return db.getUserByID(parent.trainer_id)
		}
	},

	Daily_Record:{
		user:(parent, args, db)=>{
			return db.getUserByID(parent.user_id)
		}
	},

	Personal_Record:{
		user: (parent, args, db)=> {
			return db.getUserByID(parent.user_id);
		}
	},

	Chat_Room:{
		user: (parent, args, db) => {
			return db.getUserByID(parent.user_id);
		}
	}
}