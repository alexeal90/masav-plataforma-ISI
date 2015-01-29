masav-plataforma-ISI
====================
Hola:

Este es un proyecto docente en el que participan estudiantes de cuarto curso del Grado de Tecnologías de Telecomunicación.
Nuestra tarea se  centra en implementar una plataforma para juegos http://masav.meteor.com



# Iniciar partida:
# Crear partida:
    Para ello es necesatio estar logueado y mediante la siguiente llamda usuid = Meteor.userId() extraemos de la base de datos el identifica del usuario que crea la partida y el resto de datos los obtenemos através un formulario que ofrecemos al usuario. El parámetro status indica el estado de la partida que está inicializada a "Waitting" y el otro posible valor es "Started". 
        
      Matches_games.insert({
             id_user: usuid,
             match_name: match_name,
             num_players: n_players,
             owner: usu.username,
             status: status,
        });
    

# Apuntarse a una partida:
     Cualquier usuario logueado puede unirse a una partida. El código en el lado del cliente que inserta en la base de datos al jugador que se a unido es el siguiente. array_players es un campo que guarda los ids de los jugadores.
     matches_game.insert({
           array_player_names: array_players.push({name_player:Meteor.userId()})
});

# Cancelar una partida
   Para ello buscamos el identificador de la partida en la base de datos y llamar a remove pasándole dicha id
   match_id = Matches_games.findOne({match_name:match_name});
   Matches_games.remove(match_id._id)


# Empezar una partida
Aquí empieza a ejecutarse el código de la I.A <br>
   
  reactiva = Turno.find();
   reactiva.forEach(function(m){
   if(m.Comando === "EmpezarPartida" && m.ladoscroll == ""){
     console.log("1111");
     $('#tablero').show(); ....
    EmpezarTodo(m.ID_Partida, m.Jugadores, m.User_id);
    .....

# 
