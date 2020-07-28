// JavaScript Document

class Nodo {
    valor;
    padre;
    izquierda;
    derecha;
    nivel;

    constructor(valor) {
        this.valor = valor;
        this.padre = null;
        this.izquierda = null;
        this.derecha = null;
        this.nivel = 0;    }

    getPadre() {
        return this.padre;
    }

    setPadre(padre) {
        this.padre = padre;
    }

    getIzquierda() {
        return this.izquierda;
    }

    setIzquierda(izquierda) {
        this.izquierda = izquierda;
    }

    getDerecha() {
        return this.derecha;
    }

    setDerecha(derecha) {
        this.derecha = derecha;
    }

    getValor() {
        return this.valor;
    }

    getNivel() {
        return this.nivel;
    }

    setNivel(nivel) {
        this.nivel = nivel;
    }
}

class NodoLista {
    value;
    next;

    constructor(value) {
        this.value = value;
        this.next = null;
    }

    getNext() {
        return this.next;
    }

    setNext(next) {
        this.next = next;
    }

    getValue() {
        return this.value;
    }
}

class Lista {
    head

    add(value) {

        var newNode = new NodoLista(value);

        if (this.head !== null) {
            var tail = this.getTail();
            tail.setNext(newNode);
        } else {
            this.head = newNode;
        }

        this.id++;
    }

    remove() {
        var removed = this.head;

        if (this.head !== null) {
            this.head = this.head.getNext();
            removed.setNext(null);
        }
        return removed;
    }

    getTail() {
        var tail = this.head;

        if (this.head !== null) {
            while (tail.getNext() !== null) {
                tail = tail.getNext();
            }
        }

        return tail;
    }

    restart() {
        this.head = null;
    }

    toHtml() {
        var temp = this.head;
        //console.log("head");
        //console.log(this.head);
        var string = "";

        if (this.head !== null) {
            while (temp !== null) {
                string += temp.getValue() + "&nbsp;&nbsp;&nbsp;";

                temp = temp.getNext();
            }
        }

        return string;
    }

    getHead() {
        return this.head;
    }

    getNextTo(value) {
        var temp = this.head;

        if (this.head !== null) {
            while (temp !== null) {

                if (parseFloat(temp.getValue()) === value) {
                    return temp.getNext();
                }

                temp = temp.getNext();
            }
        }

        return null;
    }
}

class Arbol {

    raiz;
    inOrdenList;
    preOrdenList;
    posOrdenList;
    nivelesDesorden;
    nivelesOrden;

    constructor() {
        this.raiz = null;
        this.inOrdenList = new Lista();
        this.preOrdenList = new Lista();
        this.posOrdenList = new Lista();

        this.nivelesDesorden = [];
        this.nivelesOrden = [];
    }

    insertarNodo(valor) {
        var nuevo = new Nodo(valor);
        if (this.raiz === null) {
            this.raiz = nuevo;
            //console.log("Nodo: " + nuevo.getValor());
            //console.log("Padre: " + nuevo.getPadre());
            //console.log("**if************************");
        } else {
            this.compararNodo(this.raiz, nuevo);
            //console.log("Nodo: " + nuevo.getValor());
            //console.log("Padre: " + nuevo.getPadre().getValor());
            //console.log("**else************************");
        }
        //console.log(this.raiz);
    }

    compararNodo(referencia, nuevo) {
        var direccion = this.compararValor(referencia, nuevo);

        if (direccion === 0) {
            if (referencia.getIzquierda() === null) {
                referencia.setIzquierda(nuevo);
                nuevo.setPadre(referencia);
            } else {
                this.compararNodo(referencia.getIzquierda(), nuevo);
            }
        } else if (direccion === 1) {
            if (referencia.getDerecha() === null) {
                referencia.setDerecha(nuevo);
                nuevo.setPadre(referencia);
            } else {
                this.compararNodo(referencia.getDerecha(), nuevo);
            }
        } else if (direccion === 3) {
            alert("El valor ya existe en el arbol.");
        }

    }

    compararValor(referencia, nuevo) {
        if (parseFloat(nuevo.getValor()) < parseFloat(referencia.getValor())) {
            return 0;
        } else if (parseFloat(nuevo.getValor()) > parseFloat(referencia.getValor())) {
            return 1;
        } else {
            return 3;//Si retorna un tres es que no se puede poner el nodo
        }

    }

    inOrden(raiz) {
        if (raiz !== null) {
            this.inOrden(raiz.getIzquierda());
            this.inOrdenList.add(raiz.getValor());
            this.inOrden(raiz.getDerecha());
        }
    }

    preOrden(raiz) {
        if (raiz !== null) {
            this.preOrdenList.add(raiz.getValor());
            this.preOrden(raiz.getIzquierda());
            this.preOrden(raiz.getDerecha());
        }
    }

    posOrden(raiz) {
        if (raiz !== null) {
            this.posOrden(raiz.getIzquierda());
            this.posOrden(raiz.getDerecha());
            this.posOrdenList.add(raiz.getValor());
        }
    }

    niveles(raiz, nivel) {
        //SETEAR NIVELES EN CADA NODO
        var level = nivel + 1;
        raiz.setNivel(nivel);
        this.nivelesDesorden.push(raiz);
        
        if (raiz.getIzquierda() !== null) {
            this.niveles(raiz.getIzquierda(), level);
        }
        if (raiz.getDerecha() !== null) {
            this.niveles(raiz.getDerecha(), level);
        }
    }

    obtenerNiveles() {
        
        var level = "";
        this.nivelesDesorden = [];
        this.nivelesOrden = [];
        this.niveles(this.getRaiz(), 1);
        
        //ORDENAR POR NIVELES
        for (var i = 1; i <= this.nivelesDesorden.length; i++) {
            for (var j = 0; j < this.nivelesDesorden.length; j++) {
                if (parseFloat(this.nivelesDesorden[j].getNivel()) === i) {
                    this.nivelesOrden.push(this.nivelesDesorden[j].getValor());
                }
            }
        }

        this.nivelesOrden.forEach(elemento => level += elemento + "&nbsp;&nbsp;");

        return level;
    }

    getOrden(orden) {
        if (orden === "pre") {
            this.preOrdenList.restart();
            this.preOrden(this.raiz);
            return this.preOrdenList.getHead();
        } else if (orden === "in") {
            this.inOrdenList.restart();
            this.inOrden(this.raiz);
            return this.inOrdenList.getHead();
        } else if (orden === "pos") {
            this.posOrdenList.restart();
            this.posOrden(this.raiz);
            return this.posOrdenList.getHead();
        }
    }

    ordenToHtml(orden) {
        var temp = this.getOrden(orden);
        var string = "";

        if (temp !== null) {
            while (temp !== null) {
                string += temp.getValue() + "&nbsp;&nbsp;&nbsp;";

                temp = temp.getNext();
            }
        }

        return string;
    }

    getRaiz() {
        return this.raiz;
    }

    toHTML(head) {
        var html = "";

        if (head === null) {
            return '<li><span class="px-2 py-1">*</span></li>';
        } else {
            var htmlLeft = this.toHTML(head.getIzquierda());
            var htmlRight = this.toHTML(head.getDerecha());

            html = '<li>' +
                    '<div class="rounded-pill px-2 py-1" onclick="eliminar(' + head.getValor() + ')">' +
                    head.getValor() +
                    '</div>';

            if (!(head.getIzquierda() === null && head.getDerecha() === null)) {

                html += '<ul>' +
                        htmlLeft +
                        htmlRight +
                        '</ul>' +
                        '</li>';
            }

            html += '</li>';
        }

        return html;
    }

    eliminar(raiz, valor) {

        if (raiz !== null) {
            if (valor > raiz.getValor()) {
                this.eliminar(raiz.getDerecha(), valor);
            } else if (valor < raiz.getValor()) {
                this.eliminar(raiz.getIzquierda(), valor);
            } else {

                //RAIZ
                var hijoIzquierdaRaiz = raiz.getIzquierda();
                var hijoDerechaRaiz = raiz.getDerecha();
                var padreRaiz = raiz.getPadre();

                if (hijoDerechaRaiz !== null) {//si el valor a eliminar tiene hijo derecho
                    var inOrdenVal = this.inOrdenList.getNextTo(valor).getValue();
                    
                    //INORDEN
                    var nodoInOrden = this.buscar(this.raiz, inOrdenVal);
                    var hijoDerechaInOrden = nodoInOrden.getDerecha();
                    var padreInOrden = nodoInOrden.getPadre();

                    //llevar nodo izquierdo de raiz a inorden
                    nodoInOrden.setIzquierda(hijoIzquierdaRaiz);
                    if (hijoIzquierdaRaiz !== null) {
                        hijoIzquierdaRaiz.setPadre(nodoInOrden);
                    }

                    if (padreInOrden !== raiz) {

                        //llevar nodo derecho de raiz a inorden
                        nodoInOrden.setDerecha(hijoDerechaRaiz);
                        if (hijoDerechaRaiz !== null) {
                            hijoDerechaRaiz.setPadre(nodoInOrden);
                        }

                        //llevar nodo derecha de inorden a izquierdo de padre de inorden
                        padreInOrden.setIzquierda(hijoDerechaInOrden);
                        if (hijoDerechaInOrden !== null) {
                            hijoDerechaInOrden.setPadre(padreInOrden);
                        }
                    }
                    
                    //poner ekl inorden como hijo del padre del nodo eliminado
                    nodoInOrden.setPadre(padreRaiz);
                    if (padreRaiz !== null) {
                        nodoInOrden.setPadre(padreRaiz);
                        if (parseFloat(padreRaiz.getValor()) > nodoInOrden.getValor()) {
                            padreRaiz.setIzquierda(nodoInOrden);
                        } else {
                            padreRaiz.setDerecha(nodoInOrden);
                        }
                    }
                    
                    //Buscar la raiz del arbol para reemplzar la antgua raiz y renovar el arbol
                    var nuevaRaiz = nodoInOrden;
                    while (nuevaRaiz.getPadre() !== null) {
                        nuevaRaiz = nuevaRaiz.getPadre();
                    }

                    this.raiz = nuevaRaiz;

                } else if (hijoIzquierdaRaiz !== null) {//si el valor a eliminar no tiene hijo derecho pero tiene hijo izquierdo
                    
                    //subir el nodo izquierdo a la posicion donde estaba el nodo a eliminar
                    hijoIzquierdaRaiz.setPadre(padreRaiz);
                    if (padreRaiz !== null) {
                        if (parseFloat(padreRaiz.getValor()) > hijoIzquierdaRaiz.getValor()) {
                            padreRaiz.setIzquierda(hijoIzquierdaRaiz);
                        } else {
                            padreRaiz.setDerecha(hijoIzquierdaRaiz);
                        }
                    }
                } else {//si no tiene hijos
                    if (raiz.getPadre() === null) {//si es la cabeza del arbol
                        this.raiz = null;
                    } else {//si es hijo de alguien
                        if (raiz.getPadre().getValor() > valor) {//si es hijo izquierdo
                            raiz.getPadre().setIzquierda(null);
                        } else {//si es hijo derecho
                            raiz.getPadre().setDerecha(null);
                        }
                    }
                }
            }
        }
    }

    buscar(raiz, valor) {//BUSCAR UN NODO, SE USA PARA BUSCAR EL SIGUIENTE INORDEN
        if (raiz !== null) {
            if (parseFloat(valor) === parseFloat(raiz.getValor())) {
                return raiz;
            } else if (parseFloat(valor) > parseFloat(raiz.getValor())) {
                return this.buscar(raiz.getDerecha(), valor);
            } else if (parseFloat(valor) < parseFloat(raiz.getValor())) {
                return this.buscar(raiz.getIzquierda(), valor);
            }
        }
    }
}

var miArbol = new Arbol();

function printTree() {

    //onsole.log(miArbol.getRaiz());
    if (miArbol.getRaiz() === null) {
        $('#treeUl').html("");
    } else {
        $('#treeUl').html(miArbol.toHTML(miArbol.getRaiz()));
    }
    $('#preOrdenString').html(miArbol.ordenToHtml("pre"));
    $('#inOrdenString').html(miArbol.ordenToHtml("in"));
    $('#posOrdenString').html(miArbol.ordenToHtml("pos"));
    $('#levelString').html(miArbol.obtenerNiveles());
}

function addNode() {
    if (!isNaN($('#numberTxt').val()) && $('#numberTxt').val() != "") {
        miArbol.insertarNodo($('#numberTxt').val());
    } else {
        alert("Ingrese un dato valido");
    }
    printTree();
    $("#numberTxt").val("");
    $("#numberTxt").focus();
}

function eliminar(valor) {
    var r = confirm("Desea eliminar el nodo " + valor + "?");
    if (r === true) {
        miArbol.eliminar(miArbol.getRaiz(), valor);
        printTree();
    }
}