//-----FUNCIONES DEL DISEÑO ADAPTATIVO------//
function isMobile(){
  var screenSize = screen.width;
  if(screenSize<992){
    return true
  }else return false;
}

function inicioOrganizacion(){
  if (isMobile()==true) {
    $('#btnMessage').attr('class', 'btn-floating hide-on-large-only')
    organizarMensaje();
  }
}

function organizarMensaje(){
  $(".numHora").unwrap();
  var horas = $(".numHora");
  for (var i = 0; i < horas.length; i++) {
    $(horas[i]).prependTo($(horas[i]).prev());
  }
  var horasRecibido=$(".recibidos .numHora");
  for (var i = 0; i < horasRecibido.length; i++) {
    $(horasRecibido[i]).next().after(horasRecibido[i]);
  }

}

function slideContactos(direction){
  if (desplegado==false) {
    if (direction=="left") {
      $(".right-side")
      .css({
        position: "absolute",
        zIndex: "3",
        right: "0px",
        display: "none"
      })
      .removeClass("hide-on-small-only")
      .show("slide", { direction: "right" },300)
      desplegado=true;
    }

  }else{
    if (direction=="right") {
      $(".right-side").hide("slide", { direction: "right" }, 300)

      desplegado=false;
    }


  }
}

var desplegado = false;
$(function(){
  //----VARIABLES Y FUNCIONES DEL DISEÑO ADAPTATIVO -----//
  $(".container").css("height",$(window).height());
  inicioOrganizacion();
  if (isMobile()) {
    $(".input-contenedor button").html("<i class='material-icons right'>send</i>")
    $("body").swipe({
      swipe:function(event, direction, distance, duration, fingerCount){
        slideContactos(direction);
      },
      allowPageScroll:"vertical"
    })
    $(".titulo-chat button").on("click", function(){
      slideContactos("left");
    })
  }
})

(function(document, window, undefined, $){
    (function (){
      return Chat = {
        // TODO EL CODIGO
        apiUrl : '/chat',
        $userDataModal: $('#modalCaptura'),
        $btnMessages: $('#btnMessage'),
        $messageText: $('#messageText'),
        userName: ''

        Init: function(){
          var self = this
          this.fetchUserInfo(function (user){
            self.renderUser(user)
          })
        },
        fetchUserInfo: function(callback){
          var self = this
          this.$userDataModal.openModal()
          var $GuardarInfo = $('.guardarInfo')
          $GuardarInfo.on('click', function(){
            var nombre = $('.nombreUsuario').val()
            var user = [{nombre: nombre, img: p2.png}]
            callback(user)

            self.joinUser(user[0])

            self.userName = nombre
            self.$userDataModal.closeModal()

          })

          self.getInitialUsers()

        },
        getInitialUsers: function() {
          var self = this
          var endpoint = self.apiUrl + '/users'
          self.ajaxRequest(endpoint, 'GET', {})
              .done(function (data) {
                var users = data.current
                self.renderUser(users)
              }).fail(function (err) {
                console.log(err)
              })
        },
        ajaxRequest: function(url, type, data) {
          return $.ajax({
            url: url,
            type: type,
            data: data
          })
        },
        joinUser: function(user) {
          var self = this
          var endpoint = self.apiUrl + '/users'
          var userObj = {user: user}
          self.ajaxRequest(endpoint, 'POST', userObj)
              .done(function (confirm) {
                console.log(confirm)
              }).fail(function (error) {
                alert(error)
              })
        },
        renderUser: function(users) {
          var self = this
          var userList = $('.users-list')
          var userTemplate = '<li'
        }

      }
    })
})
