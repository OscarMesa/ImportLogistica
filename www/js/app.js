var serviceUrl = 'http://localhost/base/service/';
var serviceLoginUrl = 'http://localhost/base/service/';
//var serviceLoginUrl = 'http://importlogistica.co/site/';
//var serviceUrl = "http://importlogistica.co/reportes/";
var user = new User();
var module = ons.bootstrap();
var myApp = angular.module('myApp', ['ui.select2']);

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
        localStorage.clear();
        location.reload(true);

    };

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


                    $("#Nombre").text(user.cliente.Nombre == null ? "":user.cliente.Nombre);
                    $("#Apellido").text(user.cliente.Apellido == null ? "":user.cliente.Apellido);
                    $("#Celular").text(user.cliente.Celular == null ? "":user.cliente.Celular);
                    $("#Fijo").text(user.cliente.Fijo == null ? "":user.cliente.Fijo);
                    $("#Email").text(user.cliente.Email == null ? "":user.cliente.Email);
                    $("#Genero").text(user.cliente.Genero == null ? "":(user.cliente.Genero == "M" ? "Masculino":"Femenino"));
                    $("#Ciudad").text(user.cliente.Ciudad == null ? "":user.cliente.Ciudad);
                    $("#DNI").text(user.cliente.DNI == null ? "":user.cliente.DNI);
                    
                    $scope.username = "";
                    $scope.password = "";
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

            $("#Nombre").text(user.cliente.Nombre == null ? "":user.cliente.Nombre);
            $("#Apellido").text(user.cliente.Apellido == null ? "":user.cliente.Apellido);
            $("#Celular").text(user.cliente.Celular == null ? "":user.cliente.Celular);
            $("#Fijo").text(user.cliente.Fijo == null ? "":user.cliente.Fijo);
            $("#Email").text(user.cliente.Email == null ? "":user.cliente.Email);
            $("#Genero").text(user.cliente.Genero == null ? "":user.cliente.Genero);
            $("#Ciudad").text(user.cliente.Ciudad == null ? "":user.cliente.Ciudad);
            $("#DNI").text(user.cliente.DNI == null ? "":user.cliente.DNI);

            $("#Title_menu").text("Inicio");
            if(!user.cliente.IngresoMercancia){
                $("#itemMI").hide();
            };
            if (!user.cliente.SalidaMercancia) {
                $("#itemMS").hide();
            };
            if (!user.cliente.ReportesContenedor) {
                $("#itemCD").hide();
            };
        }
    });
});

module.controller('item1', function($scope) {
    ons.ready(function() {
        $(".js-example-basic-multiple").select2();
        if (!user.cliente.buscarClientes) {
            $("#clientesMI").hide();
        };

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

        $scope.buscarMI = function ($scope) {
            $scope.buscar ($scope,1);
        };

        $scope.buscar =  function ($scope,pagina) {
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
                modalMI.show();
                var request = $.ajax({
                    url: serviceUrl + 'IngresoDeMercancia',
                    method: "POST",
                    data: {idUsuario: user.idUser, fechaInicio: fechaInicioMI, fechaFin: fechaFinalMI, cliente: jsonClientes, pagina:pagina},
                    dataType: "JSON"
                });

                request.done(function (msg) {
                    modalMI.hide();
                    if (msg.status == '200') {
                        var arrayResult = new Array();
                        var listHtml = '<ons-list-header>Resultados</ons-list-header>';
                        for (var i = 0; i < msg.num_registros-1; i++) {
                            if (!user.cliente.buscarClientes) {
                                listHtml += '<ons-list-item class="list__item list__item--chevron" ng-click="selectMI(this, '+i+')"> Fecha Ingreso: '+msg[i].FechaIngreso+'</ons-list-item>';
                            }else{
                                listHtml += '<ons-list-item class="list__item list__item--chevron" ng-click="selectMI(this, '+i+')"> Cliente: '+msg[i].Cliente+' Fecha Ingreso: '+msg[i].FechaIngreso+'</ons-list-item>';
                            }
                            arrayResult[i] = msg[i];
                        }

                        listHtml += '<ons-list-footer style="text-align: center;"><div id="paginacion">'+paginacion(msg)+'</div></ons-list-footer>';


                        angular.element(document.getElementById('listMI')).empty();
                        angular.element(document.getElementById('listMI')).append(listHtml);
                        ons.$compile(angular.element(document.getElementById('listMI')))($scope);
                        user.listIngresoDeMercancia.list = arrayResult;
                        $scope.htmlListtIM = arrayResult;
                    } else {
                        ons.notification.alert({title: 'Error', message: msg.message});
                    }

                });

                request.fail(function (jqXHR, textStatus) {
                    modalMI.hide();
                    ons.notification.alert({title: 'Error', message: jqXHR.statusText});
                });
            }
        }


    });


    function paginacion (argument) {
        var pagina = "";
        var paginaA = parseInt(argument.paginacion.pagina);

        if (paginaA == 1 & paginaA == argument.paginacion.totalPaginas) {
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--outline" ng-click="buscar(this,1)"> 1 </button>';
        };

        if (paginaA == 1 & paginaA !== argument.paginacion.totalPaginas) {
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--outline" ng-click="buscar(this,1)"> 1 </button>';
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--cta" ng-click="buscar(this,'+(paginaA+1)+')">'+ (paginaA +1) +'</button>';

            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--cta" ng-click="buscar(this,'+(paginaA+1)+')"> > </button>';
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--cta" ng-click="buscar(this,'+(argument.paginacion.totalPaginas)+')"> >> </button>';
        };

        if (paginaA !== 1 & paginaA < argument.paginacion.totalPaginas) {
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--cta" ng-click="buscar(this,1)"> << </button>';
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--cta" ng-click="buscar(this,'+(paginaA-1 == 0 ? 1:paginaA-1)+')"> < </button>';

            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--cta" ng-click="buscar(this,'+(paginaA-1)+')">'+(paginaA-1)+'</button>';
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--outline" ng-click="buscar(this,'+(paginaA)+')">'+paginaA+'</button>';
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--cta" ng-click="buscar(this,'+(paginaA+1)+')">'+ (paginaA +1) +'</button>';
        
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--cta" ng-click="buscar(this,'+(paginaA+1)+')"> > </button>';
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--cta" ng-click="buscar(this,'+(argument.paginacion.totalPaginas)+')"> >> </button>';
        };

        if (paginaA !== 1 & paginaA == argument.paginacion.totalPaginas & argument.paginacion.totalPaginas !== 0) {
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--cta" ng-click="buscar(this,1)"> << </button>';
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--cta" ng-click="buscar(this,'+(paginaA-1 == 0 ? 1:paginaA-1)+')"> < </button>';

            pagina += '<button style="font-size: 30px;margin: 5px;margin: 5px;" class="button button--cta" ng-click="buscar(this,'+(paginaA-1)+')">'+(paginaA-1)+'</button>';
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--outline" ng-click="buscar(this,'+(paginaA)+')">'+paginaA+'</button>';
        };
        return pagina;
    }
});

module.controller('item2', function($scope) {
    ons.ready(function() {
        $(".js-example-basic-multiple").select2();
        if (!user.cliente.buscarClientes) {
            $("#clientesMS").hide();
        };

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

        $scope.buscarSM = function ($scope) {
            $scope.buscar($scope,1);
        };

        $scope.buscar = function ($scope,pagina) {
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
                modalMS.show();
                var request = $.ajax({
                    url: serviceUrl + 'SalidaDeMercancia',
                    method: "POST",
                    data: {idUsuario: user.idUser, fechaInicio: fechaInicio, fechaFin: fechaFinal, cliente: jsonClientes,pagina:pagina},
                    dataType: "JSON"
                });

                request.done(function (msg) {
                    modalMS.hide();
                    if (msg.status == '200') {
                        var arrayResult = new Array();
                        var listHtml = '<ons-list-header>Resultados</ons-list-header>';
                        for (var i = 0; i < msg.num_registros-1; i++) {
                            if (!user.cliente.buscarClientes) {
                                listHtml += '<ons-list-item class="list__item list__item--chevron" ng-click="selectSM(this, '+i+')"> Fecha envio: '+msg[i].FechaEnvio+'</ons-list-item>';
                            }else{
                                listHtml += '<ons-list-item class="list__item list__item--chevron" ng-click="selectSM(this, '+i+')"> Cliente: '+msg[i].Cliente+' Fecha envio: '+msg[i].FechaEnvio+'</ons-list-item>';
                            }
                            arrayResult[i] = msg[i];
                        }

                        listHtml += '<ons-list-footer style="text-align: center;"><div id="paginacion">'+paginacion(msg)+'</div></ons-list-footer>';


                        angular.element(document.getElementById('listSM')).empty();
                        angular.element(document.getElementById('listSM')).append(listHtml);
                        ons.$compile(angular.element(document.getElementById('listSM')))($scope);
                        user.listSalidaDeMercancia.list = arrayResult;
                        $scope.htmlListtSM = arrayResult;
                    } else {
                        ons.notification.alert({title: 'Error', message: msg.message});
                    }
                });

                request.fail(function (jqXHR, textStatus) {
                    modalMS.hide();
                    ons.notification.alert({title: 'Error', message: jqXHR.statusText});
                });
            }
        }
    });

    
    function paginacion (argument) {
        var pagina = "";
        var paginaA = parseInt(argument.paginacion.pagina);

        if (paginaA == 1 & paginaA == argument.paginacion.totalPaginas) {
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--outline" ng-click="buscar(this,1)"> 1 </button>';
        };

        if (paginaA == 1 & paginaA !== argument.paginacion.totalPaginas) {
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--outline" ng-click="buscar(this,1)"> 1 </button>';
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--cta" ng-click="buscar(this,'+(paginaA+1)+')">'+ (paginaA +1) +'</button>';

            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--cta" ng-click="buscar(this,'+(paginaA+1)+')"> > </button>';
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--cta" ng-click="buscar(this,'+(argument.paginacion.totalPaginas)+')"> >> </button>';
        };

        if (paginaA !== 1 & paginaA < argument.paginacion.totalPaginas) {
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--cta" ng-click="buscar(this,1)"> << </button>';
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--cta" ng-click="buscar(this,'+(paginaA-1 == 0 ? 1:paginaA-1)+')"> < </button>';

            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--cta" ng-click="buscar(this,'+(paginaA-1)+')">'+(paginaA-1)+'</button>';
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--outline" ng-click="buscar(this,'+(paginaA)+')">'+paginaA+'</button>';
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--cta" ng-click="buscar(this,'+(paginaA+1)+')">'+ (paginaA +1) +'</button>';
        
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--cta" ng-click="buscar(this,'+(paginaA+1)+')"> > </button>';
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--cta" ng-click="buscar(this,'+(argument.paginacion.totalPaginas)+')"> >> </button>';
        };

        if (paginaA !== 1 & paginaA == argument.paginacion.totalPaginas & argument.paginacion.totalPaginas !== 0) {
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--cta" ng-click="buscar(this,1)"> << </button>';
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--cta" ng-click="buscar(this,'+(paginaA-1 == 0 ? 1:paginaA-1)+')"> < </button>';

            pagina += '<button style="font-size: 30px;margin: 5px;margin: 5px;" class="button button--cta" ng-click="buscar(this,'+(paginaA-1)+')">'+(paginaA-1)+'</button>';
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--outline" ng-click="buscar(this,'+(paginaA)+')">'+paginaA+'</button>';
        };
        return pagina;
    }
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

        $scope.selectCD = function ($scope, i) {
            var item = user.listContenedores.list[i];
            $("#Ciudad").text(item.Ciudad);
            $("#Cliente").text(item.Cliente);
            $("#Contenedor").text(item.Contenedor);
            $("#Descripcion").text(item.Descripcion);
            $("#FechaIngreso").text(item.FechaIngreso);
            $("#NoComprobante").text(item.NoComprobante);
            $("#Nocajas").text(item.Nocajas);
            $("#cubicajeSalida").text(item.cubicajeSalida);
            if (!user.cliente.buscarClientes) {
                $("#cliente_item_CD").hide();
            };
            DetalleItem3.show();
        };

        $scope.buscarCD = function ($scope) {
            $scope.buscar($scope,1);
        };

        $scope.buscar = function ($scope,pagina) {
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
                modalCD.show();
                var request = $.ajax({
                    url: serviceUrl + 'Contenedores',
                    method: "POST",
                    data: {idUsuario: user.idUser, fechaInicio: fechaInicio, fechaFin: fechaFinal, CodCont: jsonContenedores,pagina:pagina},
                    dataType: "JSON"
                });

                request.done(function (msg) {
                    modalCD.hide();
                    if (msg.status == '200') {
                        var arrayResult = new Array();
                        var listHtml = '<ons-list-header>Resultados</ons-list-header>';
                        for (var i = 0; i < msg.num_registros-1; i++) {
                            if (!user.cliente.buscarClientes) {
                                listHtml += '<ons-list-item class="list__item list__item--chevron" ng-click="selectCD(this, '+i+')">Fecha ingreso: '+msg[i].FechaIngreso+'</ons-list-item>';
                            }else{
                                listHtml += '<ons-list-item class="list__item list__item--chevron" ng-click="selectCD(this, '+i+')"> Cliente: '+msg[i].Cliente+' Fecha ingreso: '+msg[i].FechaIngreso+'</ons-list-item>';
                            }
                            arrayResult[i] = msg[i];
                        }

                        listHtml += '<ons-list-footer style="text-align: center;"><div id="paginacion">'+paginacion(msg)+'</div></ons-list-footer>';


                        angular.element(document.getElementById('listCD')).empty();
                        angular.element(document.getElementById('listCD')).append(listHtml);
                        ons.$compile(angular.element(document.getElementById('listCD')))($scope);
                        user.listContenedores.list = arrayResult;
                    } else {
                        ons.notification.alert({title: 'Error', message: msg.message});
                    }
                });

                request.fail(function (jqXHR, textStatus) {
                    modalCD.hide();
                    ons.notification.alert({title: 'Error', message: jqXHR.statusText});
                });
            }
        }

    });
    
    function paginacion (argument) {
        var pagina = "";
        var paginaA = parseInt(argument.paginacion.pagina);

        if (paginaA == 1 & paginaA == argument.paginacion.totalPaginas) {
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--outline" ng-click="buscar(this,1)"> 1 </button>';
        };

        if (paginaA == 1 & paginaA !== argument.paginacion.totalPaginas) {
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--outline" ng-click="buscar(this,1)"> 1 </button>';
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--cta" ng-click="buscar(this,'+(paginaA+1)+')">'+ (paginaA +1) +'</button>';

            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--cta" ng-click="buscar(this,'+(paginaA+1)+')"> > </button>';
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--cta" ng-click="buscar(this,'+(argument.paginacion.totalPaginas)+')"> >> </button>';
        };

        if (paginaA !== 1 & paginaA < argument.paginacion.totalPaginas) {
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--cta" ng-click="buscar(this,1)"> << </button>';
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--cta" ng-click="buscar(this,'+(paginaA-1 == 0 ? 1:paginaA-1)+')"> < </button>';

            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--cta" ng-click="buscar(this,'+(paginaA-1)+')">'+(paginaA-1)+'</button>';
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--outline" ng-click="buscar(this,'+(paginaA)+')">'+paginaA+'</button>';
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--cta" ng-click="buscar(this,'+(paginaA+1)+')">'+ (paginaA +1) +'</button>';
        
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--cta" ng-click="buscar(this,'+(paginaA+1)+')"> > </button>';
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--cta" ng-click="buscar(this,'+(argument.paginacion.totalPaginas)+')"> >> </button>';
        };

        if (paginaA !== 1 & paginaA == argument.paginacion.totalPaginas & argument.paginacion.totalPaginas !== 0) {
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--cta" ng-click="buscar(this,1)"> << </button>';
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--cta" ng-click="buscar(this,'+(paginaA-1 == 0 ? 1:paginaA-1)+')"> < </button>';

            pagina += '<button style="font-size: 30px;margin: 5px;margin: 5px;" class="button button--cta" ng-click="buscar(this,'+(paginaA-1)+')">'+(paginaA-1)+'</button>';
            pagina += '<button style="font-size: 30px;margin: 5px;" class="button button--outline" ng-click="buscar(this,'+(paginaA)+')">'+paginaA+'</button>';
        };
        return pagina;
    }
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
