var serviceLoginUrl = 'http://importlogistica.co/site/';
var serviceUrl = "http://importlogistica.co/reportes/";
var user = new User();
var module = ons.bootstrap();
var myApp = angular.module('myApp', ['ui.select2'],['infinite-scroll']);
var listMensajes = undefined;

module.controller('AppCtrl', function ($scope) {
    
    var cliente = null;

    var request = $.ajax({
        url: serviceUrl + 'getClientes',
        method: "POST",
        data: {cliente: cliente},
        dataType: "JSON"
    });
    
    request.done(function (msg) {
        if (msg.status == '200') {
            for (var i = 0; i < msg.num_registros; i++) {
               var cliente = new clientesSelect2();
                cliente.IdCliente = msg[i].IdCliente;
                cliente.IdPerfil = msg[i].IdPerfil;
                cliente.Nombre = msg[i].Nombre;
                cliente.Apellido = msg[i].Apellido;
                cliente.DNI = msg[i].DNI;
                cliente.Celular = msg[i].Celular;
                cliente.Fijo = msg[i].Fijo;
                cliente.Email = msg[i].Email;
                cliente.Estado = msg[i].Estado;
                cliente.Genero = msg[i].Genero;
                cliente.Ciudad = msg[i].Ciudad;
                user.listClientesSelect2.list[i] = cliente;
            };
            $scope.clientesList = user.listClientesSelect2.list;
        } else {
            ons.notification.alert({title: 'Error', message: msg.message});
        }
    });



    request.fail(function (jqXHR, textStatus) {
        ons.notification.alert({title: 'Request failed', message: textStatus});
    });

    $scope.salirR = function ($scope) {
        
        var request = $.ajax({
            url: serviceLoginUrl + 'deleteConnectionGCM',
            method: "POST",
            data: {iduser: user.idUser,deviceRegID: user.deviceRegID},
            dataType: "JSON"
        });

        request.done(function (msg) {
            localStorage.clear();
            location.reload(true);
        });

        request.fail(function (jqXHR, textStatus) {
            ons.notification.alert({title: 'Request failed', message: textStatus});
        });
    };

    $scope.salirApp = function () {

        var request = $.ajax({
            url: serviceLoginUrl + 'deleteConnectionGCM',
            method: "POST",
            data: {iduser: user.idUser,deviceRegID: user.deviceRegID},
            dataType: "JSON"
        });

        request.done(function (msg) {
            $scope.salirNavigator();
        });

        request.fail(function (jqXHR, textStatus) {
            $scope.salirNavigator();
        });
    }

    $scope.salirNavigator = function () {
        localStorage.clear();
        navigator.app.exitApp();
    }

    $scope.menuClik = function ($scope) {
        menu.openMenu();

    };

    $scope.ingresar = function ($scope) {

        var userNameV = $scope.username;
        var passwordV = $scope.password;

        /*var userNameV = 'FOX';
         var passwordV = '12345A';*/

        var sw = true;

        if (sw && userNameV == "" || userNameV == undefined) {
            ons.notification.alert({title: 'Error', message: "El usuario es obligatorio"});
            sw = false;
        }

        if (sw && passwordV == "" || passwordV == undefined) {
            ons.notification.alert({title: 'Error', message: "La contraseña es obligatoria"});
            sw = false;
        }
        if (sw) {

            modalLogin.show();
            var request = $.ajax({
                url: serviceLoginUrl + 'rlogin',
                method: "POST",
                data: {user: userNameV, password: passwordV},
                dataType: "JSON"
            });

            request.done(function (msg) {

                if (msg.result) {
                    user.username = $scope.username;
                    user.idUser = msg.attributes.IdPerfil;

                    user.Estado = msg.attributes.Estado;
                    user.IdPerfil = msg.attributes.IdPerfil;
                    user.IdRol = msg.attributes.IdRol;
                    user.Usuario = msg.attributes.Usuario;
                    user.enSesion = msg.attributes.enSesion;
                    user.ultimoIngreso = msg.attributes.ultimoIngreso;

                    user.cliente.Apellido = msg.cliente.Apellido;
                    user.cliente.Celular = msg.cliente.Celular;
                    user.cliente.Ciudad = msg.cliente.Ciudad;
                    user.cliente.DNI = msg.cliente.DNI;
                    user.cliente.Email = msg.cliente.Email;
                    user.cliente.Estado = msg.cliente.Estado;
                    user.cliente.Fijo = msg.cliente.Fijo;
                    user.cliente.Genero = msg.cliente.Genero;
                    user.cliente.IdCliente = msg.cliente.IdCliente;
                    user.cliente.IdPerfil = msg.cliente.IdPerfil;
                    user.cliente.Nombre = msg.cliente.Nombre;

                    user.cliente.IngresoMercancia = msg.permisos.IngresoMercancia;
                    user.cliente.ReportesContenedor = msg.permisos.ReportesContenedor;
                    user.cliente.SalidaMercancia = msg.permisos.SalidaMercancia;
                    user.cliente.buscarClientes = msg.permisos.buscarClientes;

                    if(!user.cliente.IngresoMercancia){
                        $("#itemMI").hide();
                    };
                    if (!user.cliente.SalidaMercancia) {
                        $("#itemMS").hide();
                    };
                    if (!user.cliente.ReportesContenedor) {
                        $("#itemCD").hide();
                        $("#itemNuevaNotificación").hide();
                    };

                    LoginP.hide();

                    $("#Title_menu").text("Inicio");

                    localStorage["user"] = user;

                    localStorage["user.Nombre"] = user.cliente.Nombre;
                    localStorage["user.Apellido"] = user.cliente.Apellido;

                    localStorage["user.IngresoMercancia"] = user.cliente.IngresoMercancia;
                    localStorage["user.SalidaMercancia"] = user.cliente.SalidaMercancia;
                    localStorage["user.ReportesContenedor"] = user.cliente.ReportesContenedor;

                    localStorage["user.DNI"] = user.cliente.DNI;

                    localStorage["user.idUser"] = user.idUser;

                    localStorage["user.Celular"] = user.cliente.Celular;
                    localStorage["user.Fijo"] = user.cliente.Fijo;
                    localStorage["user.Email"] = user.cliente.Email;
                    localStorage["user.Genero"] = user.cliente.Genero;
                    localStorage["user.Ciudad"] = user.cliente.Ciudad;
                    localStorage["user.DNI"] = user.cliente.DNI;
                    localStorage["user.buscarClientes"] = user.cliente.buscarClientes;

                    $scope.username = "";
                    $scope.password = "";
                    init_register();
                    //registerOn3rdPartyServer('123456');

                } else {
                    $scope.username = "";
                    $scope.password = "";
                    ons.notification.alert({title: 'Error', message: '!Usuario o Contraseña incorrecto¡'});
                }
                modalLogin.hide();
            });

            request.fail(function (jqXHR, textStatus) {
                modalLogin.hide();
                ons.notification.alert({title: 'Request failed', message: textStatus});
            });

        }
    };

});

module.controller('perfiles',function($scope) {
    $("#Nombre").text(user.cliente.Nombre == null || user.cliente.Nombre == "null"? "":user.cliente.Nombre);
    $("#Apellido").text(user.cliente.Apellido == null || user.cliente.Apellido == "null"? "":user.cliente.Apellido);
    $("#Celular").text(user.cliente.Celular == null || user.cliente.Celular == "null"? "":user.cliente.Celular);
    $("#Fijo").text(user.cliente.Fijo == null || user.cliente.Fijo == "null"? "":user.cliente.Fijo);
    $("#Email").text(user.cliente.Email == null || user.cliente.Email == "null"? "":user.cliente.Email);
    $("#Genero").text(user.cliente.Genero == null || user.cliente.Genero == "null"? "":user.cliente.Genero);
    $("#Ciudad").text(user.cliente.Ciudad == null || user.cliente.Ciudad == "null"? "":user.cliente.Ciudad);
    $("#DNI").text(user.cliente.DNI == null || user.cliente.DNI == "null"? "":user.cliente.DNI);

    $("#Title_menu").text("Inicio");
    if(!user.cliente.IngresoMercancia){
        $("#itemMI").hide();
    };
    if (!user.cliente.SalidaMercancia) {
        $("#itemMS").hide();
    };
    if (!user.cliente.ReportesContenedor) {
        $("#itemCD").hide();
        $("#itemNuevaNotificación").hide();
    };
});

module.controller('naviC', function($scope) {
    ons.ready(function() {
        var user_temp = localStorage["user"];
        if(user_temp == null || user_temp == undefined){
            LoginP.show();
        }else{
            user = new User();

            user.cliente.Nombre = localStorage["user.Nombre"];
            user.cliente.Apellido = localStorage["user.Apellido"];

            user.cliente.IngresoMercancia = localStorage["user.IngresoMercancia"] == "true" ? true : false;
            user.cliente.SalidaMercancia = localStorage["user.SalidaMercancia"] == "true" ? true : false;
            user.cliente.ReportesContenedor = localStorage["user.ReportesContenedor"]== "true" ? true : false;

            user.cliente.DNI = localStorage["user.DNI"];
            user.idUser = localStorage["user.idUser"];

            user.cliente.Celular = localStorage["user.Celular"];
            user.cliente.Fijo = localStorage["user.Fijo"];
            user.cliente.Email = localStorage["user.Email"];
            user.cliente.Genero = localStorage["user.Genero"];
            user.cliente.Ciudad = localStorage["user.Ciudad"];
            user.cliente.DNI = localStorage["user.DNI"];
            user.cliente.buscarClientes = localStorage["user.buscarClientes"] == "true" ? true : false;
            user.deviceRegID = localStorage["user.deviceRegID"];

            $("#Nombre").text(user.cliente.Nombre == null || user.cliente.Nombre == "null"? "":user.cliente.Nombre);
            $("#Apellido").text(user.cliente.Apellido == null || user.cliente.Apellido == "null"? "":user.cliente.Apellido);
            $("#Celular").text(user.cliente.Celular == null || user.cliente.Celular == "null"? "":user.cliente.Celular);
            $("#Fijo").text(user.cliente.Fijo == null || user.cliente.Fijo == "null"? "":user.cliente.Fijo);
            $("#Email").text(user.cliente.Email == null || user.cliente.Email == "null"? "":user.cliente.Email);
            $("#Genero").text(user.cliente.Genero == null || user.cliente.Genero == "null"? "":user.cliente.Genero);
            $("#Ciudad").text(user.cliente.Ciudad == null || user.cliente.Ciudad == "null"? "":user.cliente.Ciudad);
            $("#DNI").text(user.cliente.DNI == null || user.cliente.DNI == "null"? "":user.cliente.DNI);

            $("#Title_menu").text("Inicio");
            if(!user.cliente.IngresoMercancia){
                $("#itemMI").hide();
            };
            if (!user.cliente.SalidaMercancia) {
                $("#itemMS").hide();
            };
            if (!user.cliente.ReportesContenedor) {
                $("#itemCD").hide();
                $("#itemNuevaNotificación").hide();
            };
        }
    });
});


module.controller('item1', function($scope,$timeout) {

    ons.ready(function() {

        $(".js-example-basic-multiple").select2();
        if (!user.cliente.buscarClientes) {
            $("#clientesMI").hide();
        };

        var fehcaInicioMI = new Date((new Date).getFullYear(),((new Date).getMonth()),01);
        $scope.fechaInicioMI = fehcaInicioMI;
        $scope.fechaFinalMI = new Date();


        var htmlClientes = '';
        for (var i = 0; i < user.listClientesSelect2.list.length; i++) {
            htmlClientes += '<option value="'+user.listClientesSelect2.list[i].DNI+'">'+ user.listClientesSelect2.list[i].DNI +' | '+user.listClientesSelect2.list[i].Nombre+'</option>';
        };
        $( htmlClientes ).appendTo( ".js-example-basic-multiple" );

        ////////////////////
        //IngresoDeMercancia
        ////////////////////

        $scope.selectMI = function ($scope, i) {
            var item = user.listIngresoDeMercancia.list[i];
            $("#Cliente").text(item.Cliente);
            $("#Comprobante").text(item.Comprobante == null ? 0:item.Comprobante);
            $("#Cubicaje").text(item.Cubicaje);
            $("#FechaIngreso").text(item.FechaIngreso);
            $("#NoCajas").text(item.NoCajas);
            $("#Observaciones").text(item.Observaciones);
            $("#cajasDisponibles").text(item.cajasDisponibles);
            $("#cajasEnviadas").text(item.cajasEnviadas);
            if (!user.cliente.buscarClientes) {
                $("#cliente_item_MI").hide();
            };
            DetalleItem1.show();
        };

        $scope.salirApp = function () {
            var request = $.ajax({
                url: serviceLoginUrl + 'deleteConnectionGCM',
                method: "POST",
                data: {iduser: user.idUser,deviceRegID: user.deviceRegID},
                dataType: "JSON"
            });

            request.done(function (msg) {
                $scope.salirNavigator();
            });

            request.fail(function (jqXHR, textStatus) {
                $scope.salirNavigator();
            });
        }

        $scope.salirNavigator = function(){
            localStorage.clear();
            navigator.app.exitApp();
        }

        $scope.buscarMI = function ($scope) {
            $scope.buscar ($scope,1,true);
        };

        $scope.buscar =  function ($scope,pagina,isEmpty) {
            function pad(s) {
                return (s < 10) ? '0' + s : s;
            }
            var fechaInicioMI = new Date($scope.fechaInicioMI);
            var fechaFinalMI = new Date($scope.fechaFinalMI);
            var clienteMI = new Array();

            if (user.cliente.buscarClientes) {
                clienteMI = $("#clienteMI").val();
            }else{
                clienteMI[0] = user.cliente.DNI;
            }

            var jsonClientes = parseJSONImp(clienteMI);

            fechaInicioMI = [pad(fechaInicioMI.getFullYear()), pad(fechaInicioMI.getMonth() + 1), fechaInicioMI.getDate()].join('-');
            fechaFinalMI = [pad(fechaFinalMI.getFullYear()), pad(fechaFinalMI.getMonth() + 1), fechaFinalMI.getDate()].join('-');

            var sw = true;

            if (sw && fechaInicioMI == "NaN-NaN-NaN" || fechaInicioMI == undefined) {
                ons.notification.alert({title: 'Error', message: "Fecha inicio requerida"});
                sw = false;
            }

            if (sw && fechaFinalMI == "NaN-NaN-NaN" || fechaFinalMI == undefined) {
                ons.notification.alert({title: 'Error', message: "Fecha final requerida"});
                sw = false;
            }


            if (sw) {
                if(pagina !== 1){
                    modalMI.show();
                }
                var request = $.ajax({
                    url: serviceUrl + 'IngresoDeMercancia',
                    method: "POST",
                    data: {idUsuario: user.idUser, fechaInicio: fechaInicioMI, fechaFin: fechaFinalMI, cliente: jsonClientes, pagina:pagina},
                    dataType: "JSON"
                });

                request.done(function (msg) {
                    if(pagina !== 1){
                        modalMI.hide();
                    }
                    if (msg.status == '200') {
                        var arrayResult = new Array();
                        var listHtml = '';
                        for (var i = 0; i < msg.num_registros; i++) {
                            if (!user.cliente.buscarClientes) {
                                listHtml += '<ons-list-item  class="list__item list__item--chevron" ng-click="selectMI(this, '+i+')"> Fecha Ingreso: '+msg[i].FechaIngreso+'</ons-list-item >';
                            }else{
                                listHtml += '<ons-list-item  class="list__item list__item--chevron" ng-click="selectMI(this, '+i+')"> Cliente: '+msg[i].Cliente+' Fecha Ingreso: '+msg[i].FechaIngreso+'</ons-list-item >';
                            }
                            arrayResult[i] = msg[i];
                        }

                        var paginaA = parseInt(msg.paginacion.pagina);
                        angular.element(document.getElementById('footerPaginaMI')).remove();
                        if (paginaA !== msg.paginacion.totalPaginas) {
                            
                            listHtml += '<ons-list-footer id="footerPaginaMI"  style="text-align: left;"><div id="paginacion"><button style="margin: 5px;background: #337AB7;width: 98%;" class="button button--large" ng-click="buscar(this,'+(paginaA+1)+',false)"> Ver mas.. </button></div></ons-list-footer>';
                        };
                        
                        if (isEmpty) {
                            angular.element(document.getElementById('listMI')).empty();
                        };
                        
                        angular.element(document.getElementById('listMI')).append(listHtml);
                        ons.$compile(angular.element(document.getElementById('listMI')))($scope);
                        user.listIngresoDeMercancia.list = arrayResult;
                        $scope.htmlListtIM = arrayResult;
                    } else {
                        ons.notification.alert({title: 'Error', message: msg.message});
                    }

                });

                request.fail(function (jqXHR, textStatus) {
                    if(pagina !== 1){
                        modalMI.hide();
                    }
                    ons.notification.alert({title: 'Error', message: jqXHR.statusText});
                });
            }
        }
        $scope.buscar ($scope,1,true);
    });
    
});

module.controller('item2', function($scope) {
    ons.ready(function() {
        $(".js-example-basic-multiple").select2();
        if (!user.cliente.buscarClientes) {
            $("#clientesMS").hide();
        };

        var fechaInicioSM = new Date((new Date).getFullYear(),((new Date).getMonth()),01);
        $scope.fechaInicioSM = fechaInicioSM;
        $scope.fechaFinalSM = new Date();

        var htmlClientes = '';
        for (var i = 0; i < user.listClientesSelect2.list.length; i++) {
            htmlClientes += '<option value="'+user.listClientesSelect2.list[i].DNI+'">'+ user.listClientesSelect2.list[i].DNI +' | '+user.listClientesSelect2.list[i].Nombre+'</option>';
        };
        $( htmlClientes ).appendTo( ".js-example-basic-multiple" );


        ///////////////////
        //SalidaDeMercancia
        ///////////////////

        $scope.selectSM = function ($scope, i) {
            var item = user.listSalidaDeMercancia.list[i];
            $("#CMB").text(item.CMB);
            $("#Cliente").text(item.Cliente);
            $("#Comprobante").text(item.Comprobante == null ? 0:item.Comprobante);
            $("#Contenedor").text(item.Contenedor);
            $("#Descripcion").text(item.Descripcion);
            $("#FechaEnvio").text(item.FechaEnvio);
            $("#TotalCajas").text(item.TotalCajas);
            if (!user.cliente.buscarClientes) {
                $("#cliente_item_SM").hide();
            };
            DetalleItem2.show();
        };

        $scope.salirApp = function () {
            var request = $.ajax({
                url: serviceLoginUrl + 'deleteConnectionGCM',
                method: "POST",
                data: {iduser: user.idUser,deviceRegID: user.deviceRegID},
                dataType: "JSON"
            });

            request.done(function (msg) {
                $scope.salirNavigator();
            });

            request.fail(function (jqXHR, textStatus) {
                $scope.salirNavigator();
            });
        }

        $scope.salirNavigator = function () {
            localStorage.clear();
            navigator.app.exitApp();
         }

        $scope.buscarSM = function ($scope) {
            $scope.buscar($scope,1,true);
        };

        $scope.buscar = function ($scope,pagina,isEmpty) {
           function pad(s) {
                return (s < 10) ? '0' + s : s;
            }
            var fechaInicio = new Date($scope.fechaInicioSM);
            var fechaFinal = new Date($scope.fechaFinalSM);
            var cliente = new Array();

            if (user.cliente.buscarClientes) {
                cliente = $("#clienteSM").val();
            }else{
                cliente[0] = user.cliente.DNI;
            }

            var jsonClientes = parseJSONImp(cliente);

            fechaInicio = [pad(fechaInicio.getFullYear()), pad(fechaInicio.getMonth() + 1), fechaInicio.getDate()].join('-');
            fechaFinal = [pad(fechaFinal.getFullYear()), pad(fechaFinal.getMonth() + 1), fechaFinal.getDate()].join('-');

            var sw = true;

            if (sw && fechaInicio == "NaN-NaN-NaN" || fechaInicio == undefined) {
                ons.notification.alert({title: 'Error', message: "Fecha inicio requerida"});
                sw = false;
            }

            if (sw && fechaFinal == "NaN-NaN-NaN" || fechaFinal == undefined) {
                ons.notification.alert({title: 'Error', message: "Fecha final requerida"});
                sw = false;
            }
            if (sw) {
                if (pagina !== 1) {
                    modalMS.show();
                };
                var request = $.ajax({
                    url: serviceUrl + 'SalidaDeMercancia',
                    method: "POST",
                    data: {idUsuario: user.idUser, fechaInicio: fechaInicio, fechaFin: fechaFinal, cliente: jsonClientes,pagina:pagina},
                    dataType: "JSON"
                });

                request.done(function (msg) {
                    if (pagina !== 1) {
                        modalMS.hide();
                    };
                    if (msg.status == '200') {
                        var arrayResult = new Array();
                        var listHtml = '';
                        for (var i = 0; i < msg.num_registros; i++) {
                            if (!user.cliente.buscarClientes) {
                                listHtml += '<ons-list-item class="list__item list__item--chevron" ng-click="selectSM(this, '+i+')"> Fecha envio: '+msg[i].FechaEnvio+'</ons-list-item>';
                            }else{
                                listHtml += '<ons-list-item class="list__item list__item--chevron" ng-click="selectSM(this, '+i+')"> Cliente: '+msg[i].Cliente+' Fecha envio: '+msg[i].FechaEnvio+'</ons-list-item>';
                            }
                            arrayResult[i] = msg[i];
                        }
                        var paginaA = parseInt(msg.paginacion.pagina);
                        angular.element(document.getElementById('footerPaginaSM')).remove();
                        if (paginaA !== msg.paginacion.totalPaginas) {
                            
                            listHtml += '<ons-list-footer id="footerPaginaSM"  style="text-align: left;"><div id="paginacion"><button style="margin: 5px;background: #337AB7;width: 98%;" class="button button--large" ng-click="buscar(this,'+(paginaA+1)+',false)"> Ver mas.. </button></div></ons-list-footer>';
                        };
                        
                        if (isEmpty) {
                            angular.element(document.getElementById('listSM')).empty();
                        };
                        angular.element(document.getElementById('listSM')).append(listHtml);
                        ons.$compile(angular.element(document.getElementById('listSM')))($scope);
                        user.listSalidaDeMercancia.list = arrayResult;
                        $scope.htmlListtSM = arrayResult;
                    } else {
                        ons.notification.alert({title: 'Error', message: msg.message});
                    }
                });

                request.fail(function (jqXHR, textStatus) {
                    if (pagina !== 1) {
                        modalMS.hide();
                    };
                    ons.notification.alert({title: 'Error', message: jqXHR.statusText});
                });
            }
        }
        $scope.buscar($scope,1,true);
    });

});

module.controller('item3', function($scope) {
    ons.ready(function() {

        var cdcontenedor = null;

        var request = $.ajax({
            url: serviceUrl + 'getContenedores',
            method: "POST",
            data: {contenedor: cdcontenedor},
            dataType: "JSON"
        });

        request.done(function (msg) {
            if (msg.status == '200') {
                var htmlcontenedores = '';
                for (var i = 0; i < msg.num_registros; i++) {
                    htmlcontenedores += '<option value="'+msg[i].NroContenedor+'">'+ msg[i].NroContenedor+'</option>'; 
                };
                $( htmlcontenedores ).appendTo( ".js-example-basic-multiple" );
            } else {
                ons.notification.alert({title: 'Error', message: msg.message});
            }
        });

        request.fail(function (jqXHR, textStatus) {
            ons.notification.alert({title: 'Request failed', message: textStatus});
        });

        $(".js-example-basic-multiple").select2();

        var fechaInicioCD = new Date((new Date).getFullYear(),((new Date).getMonth()),01);
        $scope.fechaInicioCD = fechaInicioCD;
        $scope.fechaFinalCD = new Date();

        $scope.selectCD = function ($scope, i) {
            var item = user.listContenedores.list[i];
            //$("#CMB").text(item.CMB);
            $("#Ciudad").text(item.Ciudad);
            $("#Cliente").text(item.Cliente);
            $("#Contenedor").text(item.Contenedor);
            $("#Descripcion").text(item.Descripcion);
            $("#FechaIngreso").text(item.FechaIngreso);
            $("#NoComprobante").text(item.NoComprobante);
            $("#Nocajas").text(item.Nocajas);

            if (!user.cliente.buscarClientes) {
                $("#cliente_item_CD").hide();
            };
            DetalleItem3.show();
        };

        $scope.salirApp = function () {
            var request = $.ajax({
                url: serviceLoginUrl + 'deleteConnectionGCM',
                method: "POST",
                data: {iduser: user.idUser,deviceRegID: user.deviceRegID},
                dataType: "JSON"
            });

            request.done(function (msg) {
                $scope.salirNavigator();
            });

            request.fail(function (jqXHR, textStatus) {
                $scope.salirNavigator();
            });
        }

        $scope.salirNavigator = function () {
            localStorage.clear();
            navigator.app.exitApp();
         }

        $scope.buscarCD = function ($scope) {
            $scope.buscar($scope,1,true);
        };

        $scope.buscar = function ($scope,pagina,isEmpty) {
            function pad(s) {
                return (s < 10) ? '0' + s : s;
            }
            var fechaInicio = new Date($scope.fechaInicioCD);
            var fechaFinal = new Date($scope.fechaFinalCD);
            var CodCont = $("#CodContCD").val();

            var jsonContenedores = parseJSONImp(CodCont);

            fechaInicio = [pad(fechaInicio.getFullYear()), pad(fechaInicio.getMonth() + 1), fechaInicio.getDate()].join('-');
            fechaFinal = [pad(fechaFinal.getFullYear()), pad(fechaFinal.getMonth() + 1), fechaFinal.getDate()].join('-');

            /*var fechaInicio = "2014-02-02";
             var fechaFinal = "2015-03-19";
             var CodCont = "";*/

            var sw = true;

            if (sw && fechaInicio == "NaN-NaN-NaN" || fechaInicio == undefined) {
                ons.notification.alert({title: 'Error', message: "Fecha inicio requerida"});
                sw = false;
            }

            if (sw && fechaFinal == "NaN-NaN-NaN" || fechaFinal == undefined) {
                ons.notification.alert({title: 'Error', message: "Fecha final requerida"});
                sw = false;
            }
            if (sw) {
                if (pagina !== 1) {
                    modalCD.show();
                };
                var request = $.ajax({
                    url: serviceUrl + 'Contenedores',
                    method: "POST",
                    data: {idUsuario: user.idUser, fechaInicio: fechaInicio, fechaFin: fechaFinal, CodCont: jsonContenedores,pagina:pagina},
                    dataType: "JSON"
                });

                request.done(function (msg) {
                    if (pagina !== 1) {
                        modalCD.hide();
                    };
                    if (msg.status == '200') {
                        var arrayResult = new Array();
                        var listHtml = '';
                        for (var i = 0; i < msg.num_registros; i++) {
                            if (!user.cliente.buscarClientes) {
                                listHtml += '<ons-list-item class="list__item list__item--chevron" ng-click="selectCD(this, '+i+')">Fecha ingreso: '+msg[i].FechaIngreso+'</ons-list-item>';
                            }else{
                                listHtml += '<ons-list-item class="list__item list__item--chevron" ng-click="selectCD(this, '+i+')"> Cliente: '+msg[i].Cliente+' Fecha ingreso: '+msg[i].FechaIngreso+'</ons-list-item>';
                            }
                            arrayResult[i] = msg[i];
                        }

                        var paginaA = parseInt(msg.paginacion.pagina);
                        angular.element(document.getElementById('footerPaginaCD')).remove();
                        if (paginaA !== msg.paginacion.totalPaginas) {
                            
                            listHtml += '<ons-list-footer id="footerPaginaCD"  style="text-align: left;"><div id="paginacion"><button style="margin: 5px;background: #337AB7;width: 98%;" class="button button--large" ng-click="buscar(this,'+(paginaA+1)+',false)"> Ver mas.. </button></div></ons-list-footer>';
                        };
                        
                        if (isEmpty) {
                            angular.element(document.getElementById('listCD')).empty();
                        };
                        angular.element(document.getElementById('listCD')).append(listHtml);
                        ons.$compile(angular.element(document.getElementById('listCD')))($scope);
                        user.listContenedores.list = arrayResult;
                    } else {
                        ons.notification.alert({title: 'Error', message: msg.message});
                    }
                });

                request.fail(function (jqXHR, textStatus) {
                    if (pagina !== 1) {
                        modalCD.hide();
                    };
                    
                    ons.notification.alert({title: 'Error', message: jqXHR.statusText});
                });
            }
        }
        $scope.buscar($scope,1,true);
    });
});
module.controller('MisNotificaciones', function($scope) {
    ons.ready(function() {
        $scope.selectMisNotificaciones = function ($scope, i) {
            var item = user.listMisNotificaciones.list[i];
            $("#mensaje").text(item.mensaje);

             var request = $.ajax({
                url: serviceLoginUrl + 'changeStateMessage',
                method: "POST",
                data: {idMessage: item.id_mensaje},
                dataType: "JSON"
            });

            request.done(function (msg) {
                $('#alert'+user.listMisNotificaciones.list[i].id_mensaje).hide();
            });

            request.fail(function (jqXHR, textStatus) {
                ons.notification.alert({title: 'Error', message: jqXHR.statusText});
            });

            DetalleMisNotificaciones.show();
        };

        $scope.salirApp = function () {
            var request = $.ajax({
                url: serviceLoginUrl + 'deleteConnectionGCM',
                method: "POST",
                data: {iduser: user.idUser,deviceRegID: user.deviceRegID},
                dataType: "JSON"
            });

            request.done(function (msg) {
                $scope.salirNavigator();
            });

            request.fail(function (jqXHR, textStatus) {
                $scope.salirNavigator();
            });
        }

        $scope.salirNavigator = function () {
            localStorage.clear();
            navigator.app.exitApp();
        }

        $scope.seguientes = function ($scope) {
            modalMisNotificaciones.show();
            var request = $.ajax({
                url: serviceLoginUrl + 'GetMessagesGCMByUser',
                method: "POST",
                data: {iduser: user.idUser},
                dataType: "JSON"
            });

            request.done(function (msg) {
                modalMisNotificaciones.hide();
                var listHtml = '';
                angular.element(document.getElementById('listMisNotificaciones')).empty();
                for (var i = 0; i < msg.colaDeMensajes.length & i<5; i++) {

                    var mensaje = new Mensaje();
                    mensaje.fecha_registro = msg.colaDeMensajes[i].fecha_registro;
                    mensaje.mensaje = msg.colaDeMensajes[i].mensaje.split('||')[1];
                    mensaje.id_mensaje = msg.colaDeMensajes[i].id_mensaje;
                    user.listMisNotificaciones.list[i] = mensaje;

                    listHtml += '<ons-list-item class="list__item list__item--chevron" ng-click="selectMisNotificaciones(this, '+i+')"> Fechas: '+user.listMisNotificaciones.list[i].fecha_registro+' <span id="alert'+user.listMisNotificaciones.list[i].id_mensaje+'" class="notification">Mensaje no leído</span></ons-list-item>';  
                    
                }
                angular.element(document.getElementById('footerPaginaMisNotificaciones')).remove();
                angular.element(document.getElementById('listMisNotificaciones')).append(listHtml);
                ons.$compile(angular.element(document.getElementById('listMisNotificaciones')))($scope);
            });

            request.fail(function (jqXHR, textStatus) {
                modalMisNotificaciones.hide();
                ons.notification.alert({title: 'Request failed', message: textStatus});
            });
        };

        var request = $.ajax({
            url: serviceLoginUrl + 'GetMessagesGCMByUser',
            method: "POST",
            data: {iduser: user.idUser},
            dataType: "JSON"
        });

        request.done(function (msg) {

            var listHtml = '';
            angular.element(document.getElementById('listMisNotificaciones')).empty();
            for (var i = 0; i < msg.colaDeMensajes.length & i<5; i++) {

                var mensaje = new Mensaje();
                mensaje.fecha_registro = msg.colaDeMensajes[i].fecha_registro;
                mensaje.mensaje = msg.colaDeMensajes[i].mensaje.split('||')[1];
                mensaje.id_mensaje = msg.colaDeMensajes[i].id_mensaje;
                user.listMisNotificaciones.list[i] = mensaje;

                listHtml += '<ons-list-item class="list__item list__item--chevron" ng-click="selectMisNotificaciones(this, '+i+')"> Fechas: '+user.listMisNotificaciones.list[i].fecha_registro+' <span id="alert'+user.listMisNotificaciones.list[i].id_mensaje+'" class="notification">Mensaje no leído</span></ons-list-item>';  
                
            }
            if (msg.colaDeMensajes.length !== 0) {
                listHtml += '<ons-list-footer id="footerPaginaMisNotificaciones"  style="text-align: left;"><div id="paginacion"><button style="margin: 5px;background: #337AB7;width: 98%;" class="button button--large" ng-click="seguientes(this)"> Ver mas.. </button></div></ons-list-footer>';
            };
            angular.element(document.getElementById('listMisNotificaciones')).append(listHtml);
            ons.$compile(angular.element(document.getElementById('listMisNotificaciones')))($scope);
        });

        request.fail(function (jqXHR, textStatus) {
            ons.notification.alert({title: 'Request failed', message: textStatus});
        });
    });
});

module.controller('NuevaNotificacion', function($scope) {
    ons.ready(function() {

        var cdcontenedor = null;

        var request = $.ajax({
            url: serviceUrl + 'getContenedores',
            method: "POST",
            data: {contenedor: cdcontenedor},
            dataType: "JSON"
        });

        request.done(function (msg) {
            if (msg.status == '200') {
                var htmlcontenedores = '';
                for (var i = 0; i < msg.num_registros; i++) {
                    htmlcontenedores += '<option value="'+msg[i].NroContenedor+'">'+ msg[i].NroContenedor+'</option>'; 
                };
                $( htmlcontenedores ).appendTo( ".js-example-basic-multiple" );
            } else {
                ons.notification.alert({title: 'Error', message: msg.message});
            }
        });

        request.fail(function (jqXHR, textStatus) {
            ons.notification.alert({title: 'Request failed', message: textStatus});
        });

        $(".js-example-basic-multiple").select2();

        
        $scope.EnviarNuevaNotificacion = function ($scope) {
            $scope.buscar($scope);
        };

        $scope.salirApp = function () {
            var request = $.ajax({
                url: serviceLoginUrl + 'deleteConnectionGCM',
                method: "POST",
                data: {iduser: user.idUser,deviceRegID: user.deviceRegID},
                dataType: "JSON"
            });

            request.done(function (msg) {
                $scope.salirNavigator();
            });

            request.fail(function (jqXHR, textStatus) {
                $scope.salirNavigator();
            });
        }

        $scope.salirNavigator = function () {
            localStorage.clear();
            navigator.app.exitApp();
        }



        $scope.buscar = function ($scope) {
            var mensaje = $scope.textNuevaNotificacion;
            var CodCont = $("#CodContNuevaNotificacion").val()[0];

            modalNuevaNotificacion.show();
            var request = $.ajax({
                url: serviceLoginUrl + 'sendMessageUsersByContainer',
                method: "POST",
                data: {contenedor: CodCont,mensaje: mensaje},
                dataType: "JSON"
            });

            request.done(function (msg) {
                modalNuevaNotificacion.hide();
                ons.notification.alert({title: 'información',message: 'Mensaje enviado'});
            });

            request.fail(function (jqXHR, textStatus) {
                modalNuevaNotificacion.hide();
                ons.notification.alert({title: 'Error', message: jqXHR.statusText});
            });
            
        }
    });
});

ons.ready(function () {
    
    console.log("ons.ready");

    navi.on('postPop', function (event) {
        console.log(event);
    });

    navi.on('postPush', function (event) {
        console.log(event);
    });
});

function parseJSONImp (argument) {
    if (argument !== undefined & argument != null) {
        var jsonClientes = "[";

        for (var i = 0; i < argument.length; i++) {
            jsonClientes +="\"\'"+argument[i]+"\'\",";
        };
        jsonClientes = jsonClientes.substring(0, jsonClientes.length-1);

        return jsonClientes += "]";

    }
    return null;
   
}