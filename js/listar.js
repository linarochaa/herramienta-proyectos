$("#btn-listar").click(function () {
    let cr_1 = cr1.selected();
    let cr_3 = cr3.selected();
    let cr_4 = cr4.selected();
    let cr_6 = cr6.selected();
    let cr_7 = cr7.selected();

    let lista = []

    if (cr_1 == "" || cr_3 == "" || cr_4 == "" || cr_6 == "" || cr_7 == "") {
        alert("Por favor seleccione una opción para todos los criterios")
    } else {
        fetch("data/Procesos.json")
            .then((resp) => resp.json())
            .then((data) => {
                let arr_proc = []
                data.criterios.forEach(criterio => {

                    if (criterio.id == 1) {
                        let t = criterio.etiqueta.find((cri) => cri.nombre == cr_1);
                        t.procesos.forEach(pr => {
                            arr_proc.push(pr)
                        });
                    }

                    if (criterio.id == 3) {
                        let t = criterio.etiqueta.find((cri) => cri.nombre == cr_3);
                        t.procesos.forEach(pr => {
                            arr_proc.push(pr)
                        });
                    }

                    if (criterio.id == 4) {
                        let t = criterio.etiqueta.find((cri) => cri.nombre == cr_4);
                        t.procesos.forEach(pr => {
                            arr_proc.push(pr)
                        });
                    }

                    if (criterio.id == 6) {
                        let t = criterio.etiqueta.find((cri) => cri.nombre == cr_6);
                        t.procesos.forEach(pr => {
                            arr_proc.push(pr)
                        });
                    }

                    if (criterio.id == 7) {
                        let t = criterio.etiqueta.find((cri) => cri.nombre == cr_7);
                        t.procesos.forEach(pr => {
                            arr_proc.push(pr)
                        });
                    }
                });

                if (cr_2 >= 0 && cr_2 <= 600) {
                    let t = [5.5, 7.3, 7.4, 12.2, 12.3]
                    t.forEach(pr => {
                        arr_proc.push(pr)
                    });
                } else if (cr_2 >= 601 && cr_2 <= 1500) {
                    let t = [5.5, 5.6, 7.3, 7.4, 12.2, 12.3]
                    t.forEach(pr => {
                        arr_proc.push(pr)
                    });
                } else if (cr_2 >= 1501 && cr_2 <= 4000) {
                    let t = [4.2, 4.3, 4.4, 4.5, 4.6, 5.5, 5.6, 7.1, 7.2, 7.3, 7.4, 11.1, 11.6, 11.7, 12.1, 12.2, 12.3]
                    t.forEach(pr => {
                        arr_proc.push(pr)
                    });
                }

                if (cr_5 >= 0 && cr_5 <= 6750) {
                    let t = [8.3, 13.3]
                    t.forEach(pr => {
                        arr_proc.push(pr)
                    });
                } else if (cr_5 >= 6751 && cr_5 <= 24000) {
                    let t = [8.3, 13.1]
                    t.forEach(pr => {
                        arr_proc.push(pr)
                    });
                } else if (cr_5 == 24001) {
                    let t = [4.2, 4.3, 4.5, 8.1, 8.2, 8.3, 13.1, 13.2, 13.3, 13.4]
                    t.forEach(pr => {
                        arr_proc.push(pr)
                    });
                }

                arr_proc.sort(function (a, b) {
                    return a - b;
                });

                temp = arr_proc;
                arr_proc = [];
                $.each(temp, function (i, el) {
                    if ($.inArray(el, arr_proc) === -1) arr_proc.push(el);
                });

                arr_proc.forEach(proc_id => {
                    let sep = proc_id.toString().split(".")
                    data.procesos.forEach(proceso => {
                        if (proceso.id == sep[0]) {
                            lista.push(proceso.procesos.find((pro) => pro.id == proc_id));
                        }
                    });
                });

                let table = document.createElement('table');
                table.className = "table table-striped";
                table.style = "width:80%; margin-left: auto; margin-right: auto; border-style: outset; margin-top: 25px; font-family: 'Questrial', serif;";

                let thead = document.createElement("thead");
                thead.innerHTML = `                    
                <tr>
                    <th scope="col" style="width:130px; text-align:center;">Proceso</th>
                    <th scope="col" style="width:300px">Nombre</th>
                    <th scope="col">Información</th>
                 </tr>`;

                table.appendChild(thead)

                let tbody = document.createElement("tbody");

                lista.forEach(proc => {
                    let tr = document.createElement("tr");

                    let entradas = ""
                    for (let i = 0; i < proc.definicion.entradas.length; i++) {
                        const ent = proc.definicion.entradas[i];
                        if(i==proc.definicion.entradas.length-1){
                            entradas += ent + "."
                        }else{
                            entradas += ent + ", "
                        } 
                    }

                    let herramientas = ""
                    for (let i = 0; i < proc.definicion.herramientas.length; i++) {
                        const her = proc.definicion.herramientas[i];
                        if(i==proc.definicion.herramientas.length-1){
                            herramientas += her + "."
                        }else{
                            herramientas += her + ", "
                        } 
                    }

                    let salidas = ""
                    for (let i = 0; i < proc.definicion.salidas.length; i++) {
                        const sal = proc.definicion.salidas[i];
                        if(i==proc.definicion.salidas.length-1){
                            salidas += sal + "."
                        }else{
                            salidas += sal + ", "
                        }   
                    }


                    tr.innerHTML = `                    
                    <tr>
                        <th scope="row">${proc.id}</th>
                        <td>${proc.nombre}</td>
                        <td>
                            <button type="button" class="collapsible">Click para más información</button>
                            <div class="content">
                              <p>
                                <br>
                                <b>Definición: </b>${proc.definicion.texto}
                                <br>
                                <br>
                                <b>Entradas: </b>${entradas}
                                <br>
                                <br>
                                <b>Herramientas: </b>${herramientas}
                                <br>
                                <br>
                                <b>Salidas: </b>${salidas}
                              </p>
                            </div>
                        </td>
                    </tr>`;
                    tbody.appendChild(tr);
                });

                table.appendChild(tbody);

                document.getElementById('tabla').innerHTML = "";

                document.getElementById('tabla').appendChild(table);

                var coll = document.getElementsByClassName("collapsible");
                var i;

                for (i = 0; i < coll.length; i++) {
                    coll[i].addEventListener("click", function () {
                        this.classList.toggle("active");
                        var content = this.nextElementSibling;
                        if (content.style.display === "block") {
                            content.style.display = "none";
                        } else {
                            content.style.display = "block";
                        }
                    });
                }

            });
    }
});