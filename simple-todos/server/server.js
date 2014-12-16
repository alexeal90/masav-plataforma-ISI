
    Meteor.publish("messages_current_game", function (current_game) {
    		return Messages_games.find({game_id: current_game}, 
					{limit:10, sort: {time:-1}});
	 });

Meteor.publish('matches_game', function() {
       
        return Matches_games.find ({}, {fields: {match_name:1,num_players:1,difficulty:1,owner:1,owner_name:1,score:1,status:1,players_array:1}});  
    });
    
Meteor.publish("users_data", function () {
	return Meteor.users.find({},{fields: {nick:1,usr_score:1, played_games:1,won_games:1}});
});
    
    
    Meteor.publish("all_games", function () {
		 // publish every field of every game
		 return Games.find();
	 });
	 
	 Messages_games.allow({
		insert: function(userId, doc){
		// Only authenticated users can insert messages
		return Meteor.userId();
    	}
    });
    
	 Meteor.startup(function() {
		 if (Games.find().count() == 0) {
			Games.insert({name: "FrootWars"});
			Games.insert({name: "AlienInvasion"});
			Games.insert({name: "Carcassonne"});
    	 	 };
	 });

Meteor.methods({

add_player: function(owner_name,match_name,num_players,difficulty,score,status,date){
	matches_game.update({$addToSet:{owner:owner_name},$push:{score:0}})
},

})
