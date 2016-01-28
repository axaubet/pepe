var COLLECTION_ACHIEVEMENT_MASTER = "prova3";
var NUM_MAX_ACHIEVEMENTS = 197;

var ERROR_CORRECTO = "ERR000";
var ERROR_COMPONENTES_INSUFICIENTE = "ERR001";
var ERROR_YA_RETADO = "ERR002";
var ERROR_DESCONOCIDO = "ERR003";
var ERROR_CREDITOS_INSUFICIENTES = "ERR004";
var ERROR_BLOQUEADO = "ERR005";
var ERROR_BLOQUEADO_POR_NIVEL = "ERR006";
var ERROR_USUARIO_NO_EXISTE = "ERR007";
var ERROR_ENTRENAMIENTOS_INSUFICIENTES = "ERR008";
var ERROR_ENTRADAS_INSUFICIENTES = "ERR009";
var ERROR_BEBIDAS_INSUFICIENTES = "ERR010";

var loginfo = "";
var logros = [];

var textLog = "";

function achievementFormat(logros, statistics){
    var lista = {};
     var query = "{}";//{$or:[{$and:[{temp:null},{avaiable:true},{$and:[{variable:{$ne:\"\"}},{variable:{$ne:null}}]}]},{idAchievement:{$in:["+logros+"]}}]}";
     var sort = "{group:1, idAchievement:1}";
     textLog += "query("+COLLECTION_ACHIEVEMENT_MASTER+"):"+query+", sort:"+sort;
     gamedonia.data.search(COLLECTION_ACHIEVEMENT_MASTER, query, NUM_MAX_ACHIEVEMENTS, sort, {
         success: function(result) {

             textLog += "Preparando "+result.size()+" logros que necesitan datos extra.//[";
             for(var i = 0; i < result.size(); i++){
                addAchievement(lista, result.get(i), statistics, 0);
             }
             textLog += "]";
             var resul = lista;
             log.info(textLog);
             response.success(resul);
         },
         error : function(fail) {
             log.error("Search "+COLLECTION_ACHIEVEMENT_MASTER+" not found. query: "+query+". Error: "+fail.message);
             response.error(ERROR_DESCONOCIDO);
         }
     });
}


function addAchievement(lista, master, statistics, group){
   var id = master.idAchievement;
   var idname = id.toString();
   out.println("MANDANGA: "+typeof idname);
    var pos = logros.indexOf(id);
   var logro = {
                progress: 0,
                achieved: true,
                idAchievement: master.idAchievement,
                type: 0,
                group: group
             };
     if(pos < 0){
         logro.achieved = false;
     }
     else{
         logros.splice(pos, 1);
     }
     
     if(!master.variable.equals("")){
         logro.type = 1;
         logro.progress = statistics[master.variable];
     }
     textLog += master.idAchievement+", ";
     if(master.idAchievement != null) {
         lista[idname] = logro;
     }
}
achievementFormat(181,{});