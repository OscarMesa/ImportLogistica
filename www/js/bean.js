function User () {
	this.cliente = new cliente();

	this.Estado;
	this.IdPerfil;
	this.IdRol;
	this.Usuario;
	this.enSesion;
	this.ultimoIngreso;
	this.DNI;
	this.deviceRegID;

	this.username = "";
	this.idUser = "";

	this.IngresoMercancia = false;
	this.ReportesContenedor = false;
	this.SalidaMercancia = false;
	this.buscarClientes = false;

	this.listIngresoDeMercancia = new listIngresoDeMercancia();
	this.listSalidaDeMercancia = new listSalidaDeMercancia();
	this.listContenedores = new listContenedores();
	this.listClientesSelect2 = new listClientesSelect2();
	this.listMisNotificaciones = new listMisNotificaciones();
}
function cliente () {
	this.Apellido;
	this.Celular;
	this.Ciudad;
	this.DNI;
	this.Email;
	this.Estado;
	this.Fijo;
	this.Genero;
	this.IdCliente;
	this.IdPerfil;
	this.Nombre;
}
function listIngresoDeMercancia () {
	this.list = new Array(); 
}
function listSalidaDeMercancia () {
	this.list = new Array();
}
function listContenedores () {
	this.list = new Array();
}
function listClientesSelect2 (argument) {
	this.list = new Array();
}
function listMisNotificaciones () {
	this.list = new Array();
}
function IngresoDeMercancia (argument) {
	this.Cliente;
	this.Cubicaje;
	this.FechaIngreso;
	this.NoCajas;
	this.Observaciones;
	this.cajasDisponibles;
	this.cajasEnviadas;
}

function SalidaDeMercancia (argument) {
	this.CMB;
	this.Cliente;
	this.Contenedor;
	this.Descripcion;
	this.FechaEnvio;
	this.TotalCajas;
}
function Contenedores (argument) {
	this.Ciudad;
	this.Cliente;
	this.Contenedor;
	this.Descripcion;
	this.FechaIngreso;
	this.NoComprobante;
	this.Nocajas;
	this.cubicajeSalida;
}
function clientesSelect2 (argument) {
	this.IdCliente;
    this.IdPerfil;
    this.Nombre;
    this.Apellido;
    this.DNI;
    this.Celular;
    this.Fijo;
    this.Email;
    this.Estado;
    this.Genero;
    this.Ciudad;
}

function Mensaje (argument) {
	this.fecha_registro;
	this.id_mensaje;
	this.id_usuario
	this.mensaje;
}