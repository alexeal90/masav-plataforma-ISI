if (Meteor.isClient) {
    /****
    Subscripcion de las listas o bases de datos creadas en el servidor
    **/
     Meteor.subscribe("games"); 
     Meteor.subscribe("users_data"); 
     
     Tracker.autorun(function(){
        var game = Session.get("game");
        Meteor.subscribe("messages_game", game); // Mensajes del chat del juego
        Meteor.subscribe("matches_game", game); // Marcador de las partidas
        
        
    });
    
    
	/**Tracker.autorun(function(){
		Meteor.subscribe("messages_current_game");
	}); **/
	
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
            var array_players = []; // 
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
                        date: Date.now(),
                        array_player_names: array_players.push({name_player:Meteor.userId()})                       
                    });
            })        
        }
    });
                 
   
    // Para unirse una partida

    Template.join_match.events({
        
        'click button': function (){
            //
        var array_players = [];
        $("#join_match").click(function() {
                        matches_game.insert({
                             array_player_names: array_players.push({name_player:Meteor.userId()})         
                        });   
        
        })               
    }
    }); //Nos falta la funcion que nos daran los de la i.a para enchufarles lo que se extraiga del array_player_names

    // Para unirse a un juego (carcassone, alliensInvasion...)
    Template.join_game.events({
       
        'click button': function (){
            $("#join_game").click(function() {
                        games.insert({
                                id_game:id_game,   // obtener el valor de id_game   
                                game_type:game_type // obtener el game_type
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

   
   // Mostrar la puntuación de cada jugador, a partir de la base de datos de users_data
   Template.players.players_points = function(){
      
   var users_data= Users_data.find ({}, {sort: {time:-1}});
    var list_players = [];
    users_data.forEach (function (u) {
        var user = Meteor.users.findOne({_id:partida.usr_id});
        if(user){
            list_players.push({puntos: u.usr_score, player:u.nick}) // El         
        }
    });
    
    return list_players;    
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
    
    
    Meteor.publish('matches_game', function() {
       
         return Matches_games.find ({},{fields:{match_name:1}});
    
    });
    
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
