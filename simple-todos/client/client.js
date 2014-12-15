
    /****
    Subscripcion de las listas o bases de datos creadas en el servidor
    **/
     Meteor.subscribe("all_games"); 
     Meteor.subscribe("users_data"); 
     
     Tracker.autorun(function(){
        var current_game = Session.get("current_game");
        Meteor.subscribe("messages_current_game", current_game); // Mensajes del chat del juego
        Meteor.subscribe("matches_game", current_game); // Marcador de las partidas
             
    });
    
    Meteor.startup(function(){
        Session.set("current_game", "none");
            $('#gamecontainer').hide();
    			$('#container').hide();
    			$('#gamecarcas').hide();
    			$('#waiting_matches').hide();
    			
            $(document).on("click", ".alert .close", function(e) {
            	$(this).parent().hide();       
        });
        $('#game_features').hide();
        $('waiting_for_players').hide();
    });


   Template.options.events({
        'click #start_game': function () {
            // Cuando hacen click aquí tenemos que crear una partida
            match_name= parse($('#nombre').val());
            var score= 0;
            var status= 'waiting';
            n_players= parseInt($('input[name=n_players]:checked', '#game_features').val());         
            $("#start_game").click(function() {
                    $('#game_features').hide();
                    $('#display_matches').hide();
                    $('waiting_for_players').show();
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
        },
        'click #close_options': function () {
                $('#game_features').hide();
                $('#display_matches').hide();
                var game = Games.findOne({name:"Carcassonne"});
		     		 Session.set("current_game", game._id);
        }
    });
                 

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
    // Template.join_game.events({
       
    //     'click button': function (){
    //         $("#join_game").click(function() {
    //                     games.insert({
    //                             id_game:id_game,   // obtener el valor de id_game   
    //                             game_type:game_type // obtener el game_type
    //                     });   
    //     			})
    // 			}      
    // });

//	Template.menu_bar.games = function (){
//		 return Games.find();
//	}

	Template.menu_bar.events = {
		 'click #AI_button': function () {
console.log("Template.menu_bar.events");
		     $('#container').show();
		     $('#gamecontainer').hide();
		     $('#gamecarcas').hide();
		     $('#waiting_matches').hide();
		     var game = Games.findOne({name:"AlienInvasion"});
		     Session.set("current_game", game._id);
		 },
		 'click #FW_button': function () {
		     $('#container').hide();
		     $('#gamecontainer').show();
		     $('#gamecarcas').hide();
		     $('#waiting_matches').hide();
		     var game = Games.findOne({name:"FrootWars"});
		     Session.set("current_game", game._id);
		 },
		 'click #CC_button': function () {
		     $('#container').hide();
		     $('#gamecontainer').hide();
		     $('#gamecarcas').hide();
		     $('#waiting_matches').show();
		     $('#display_matches').show();
		     $('#game_features').hide();
		     var game = Games.findOne({name:"Carcassonne"});
		     Session.set("current_game", game._id);
		 },
		 'click #New_G': function () {
			  $('#container').hide();
		     $('#gamecontainer').hide();
		     $('#game_features').show();
		     $('#waiting_matches').show();
           $('#display_matches').hide();
   

		 }
	}


    /*
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
	    var userName = Meteor.users.findOne(m.user_id).username;
	    messages.push({message: m.message});
	});
	
	return messages;
    }
    
    Template.input.gameName = function (){
	var game_id = Session.get("current_game");
	if (game_id)
	    var game_name = Games.findOne({_id: game_id}).name;
	return game_name;
    }
    
    
   // Mostrar la puntuación de cada jugador, a partir de la base de datos de users_data
    // Template.players.players_points = function(){
      
    // 		 var users_data= Users_data.find ({}, {sort: {time:-1}});
    // 		 var list_players = [];
    // 		 users_data.forEach (function (u) {
    // 		     var user = Meteor.users.findOne({_id:partida.usr_id});
    // 		     if(user){
    // 		         list_players.push({puntos: u.usr_score, player:u.nick}) // El         
    // 		     }
    // 		 });
    
    // 	 return list_players;    
    //  }



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
