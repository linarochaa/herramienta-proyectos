import json

def data():
    result = {"procesos": []}

    with open("data/otro.json", encoding='utf-8') as json_file:
        data = json.load(json_file)
        for i, proceso in enumerate(data["procesos"]):
            procesos=[]
            for j in range(1,8):
                if not ("SIN DATOS" in proceso["nombre "+str(j)]): 
                    sep1=proceso["nombre "+str(j)].split(";")
                    sep2=proceso["definicion "+str(j)].split("#")

                    entradas=sep2[1].split("\r\n")
                    herramientas=sep2[2].split("\r\n")
                    salidas=sep2[3].split("\r\n")

                    procesos.append({"id": float(sep1[0]), "nombre": sep1[1], "definicion": {"texto": sep2[0], "entradas": entradas, "herramientas": herramientas, "salidas": salidas}})
            
            sep=proceso["nombre_proceso"].split(".")
            result["procesos"].append({"id": int(sep[0]), "nombre": sep[1], "procesos": procesos})
            
            
    with open("data/Procesos.json", "w", encoding='utf-8') as file:
        json_dump = json.dumps(
            result, indent=3, sort_keys=False, ensure_ascii=False).encode("utf-8")
        file.write(json_dump.decode())


data()