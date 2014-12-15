
    Meteor.publish("messages_current_game", function (current_game) {
    		return Messages_games.find({game_id: current_game}, 
					{limit:10, sort: {time:-1}});
	 });
    
    
    Meteor.publish('matches_game', function() {
       
         return Matches_games.find ({},{fields:{match_name:1}});
    
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

