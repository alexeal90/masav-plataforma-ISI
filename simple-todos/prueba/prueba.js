if (Meteor.isClient) {
    /****
    Subscripcion de las listas o bases de datos creadas en el servidor
    
    // Meteor.subscribe("usersNick"); //Usersnicks referido a la lista de los usarios registrados en la aplicacion
    Tracker.autorun(function(){
        var game = Session.get("game");
        Meteor.subscribe("messages_game", game); // Mensajes del chat del juego
        Meteor.subscribe("matches_game", game); // Marcador de las partidas
    });
    */
    
	Meteor.subscribe("messages_game"); // N Mensajes del chat del juego
        Meteor.subscribe("matches_game"); // N Marcador de las partidas
	Meteor.subscribe("users_data"); // N

	Tracker.autorun(function(){
		Meteor.subscribe("messages_current_game");
	});
	
    /*** Aqui empieza la ejecución del juego: desde el momento en que se cree la partida
    */
    // counter starts at 0
    //
    Meteor.startup(function(){
        Session.set("game", "none");
            $('#CarcassoneContainer').hide();
            $(document).on("click", ".alert .close", function(e) {
            $('#CarcassoneContainer').show();       
        });
    });
    Session.setDefault("counter", 0);
    Template.hello.helpers({
    counter: function () {
    return Session.get("counter");
    }
    });


    Template.create.events({
        'click button': function () {
            // Cuando hacen click aquí tenemos que crear una partida
            match_name= parse($('#nombre').val());
            var score= 0;
            var status= 'waiting';
            num_players= parseInt($('#num_jugadores').val());
            difficulty= $('input[name=level]:checked', '#game_features').val();         
            $("#start_game").click(function() {
                    matches_game.insert({
                        match_name: match_name,
                        num_players: num_players,
                        difficulty: difficulty,
                        owner: Meteor.userId(),                   
                        owner_name: Meteor.user().username,
                        score: score,
                        status: status,
                        date: Date.now()                        
                    });
            })        
        }
    });



    Template.join_match.events({
        // Cuando hacen click aquí tenemos que unirnos a una plantilla
        'click button': function (){
            $("#join_game").click(function() {
                        matches_game.insert({
                                      
                        });   
        })               
    }
    });

    Template.join_game.events({
        // Cuando hacen click aquí tenemos que unirnos a una plantilla
        'click button': function (){
            $("#join_game").click(function() {
                        matches_game.insert({
                                      
                        });   
        			})
			}      
    });


    /*Template.chat.events = {
		$("#chat_general").click(function() {
			
		}
		$("#chat_partida").click(function() {

		}
	};

    Template.draw_matches.events({   
        var Match_owner = [];            
        var Match_owners_Coll = Matches_games.find({status: 'waiting'}, {sort: { date:-1}});//lo primero que tenemos que hacer es                                                                                          extraer las ids de creadores de las 
                                                        //partidas en waiting con esas ids relleno el resto de datos  | tengo que
                                                        //extarer todos los campos con el find y luego ir extrayendo las ids de 
                                                        //cada uno con un for each    
        var Match_name = [];
        var Match_players = [];
        var Match_name = Matches_games.find({}, {sort: { date:-1}});//Rellenar bien
        var Match_players = Matches_games.find({}, {sort: { date:-1}});//Rellenar bien            
    });

*/
    Template.chat_messages.messages = function () {
	var messagesColl = Messages_games.find({}, { sort: { time: -1 }});
	var messages = [];
	messagesColl.forEach(function(m){
	        messages.push({message: m.message});
	});
	return messages;
    }

    Template.menu_bar.events = {'click #New_G': function(){
        $('#options').hide();
        }
    }

    Template.input.events = {
        'keydown input#message' : function (event){
            if (event.which == 13){
               //Aqui tenemos que comprobar si el usuario esta autenticado
               //Aqui buscamos el id de usuario
               var message = $('#message')
               if (message.value.length == 0){
               	message.val('');
               }else{
                  message.val('');
                  Messages_games.insert({
               		//usr_id:Meteor.userId(),
                     message:message.value,
                     date: Date.now(),
                     //game_id: Session.get("current_game") // Pendiente
                  });
               }
           }
      	}
     }
     Accounts.ui.config({
               passwordSignupFields: "USERNAME_ONLY"
     });
}





if (Meteor.isServer) {
    Meteor.publish('messages_game', function() {
        // publish only the field username of every user
        return Messages_games.find ({}, {sort: {time:-1}});
    });  //
    

   /* ARREGLAR Meteor.publish('matches_game', function() { //N
        // publish only the field username of every user N
        return Matches_games.find ({}, {fields: {match_name:1;num_players:1;difficulty:1;owner:1;owner_name:1;score:1;status:1;players_array:1;}});  //N
    }); //N
    */
    
    //Meteor.publish("UsersNick", function() {
        // publish only the field username of every user
    //    return Meteor.users.find ({}, {fields: {username:1}});
    
    
    Meteor.startup(function () {
        // code to run on server at startup
    });

    // Publicacion del campo puntuacion para que puedan acceder los clientes.
    Meteor.publish("users_data", function () { //N
	return Meteor.users.find({},{fields: {nick:1,usr_score:1, played_games:1,won_games:1}}); //N
    }); //N
    
    /* ARREGLAR
	Meteor.startup(function () { // N
        // code to run on server at startup //N
	if (Games.find().count() == 0) { //N
		Games.insert({name: "FrootWars"}); //N
		Games.insert({name: "AlienInvasion"}); //N
		Games.insert({name: "Carcassone"}); //N
   	};
    });*/
    
}
  
