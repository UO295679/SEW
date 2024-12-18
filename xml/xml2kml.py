import xml.etree.ElementTree as ET

import xml.etree.ElementTree as ET

def leer_coordenadas(xml_file):
    # Parsear el archivo XML
    tree = ET.parse(xml_file)
    root = tree.getroot()

    # Namespace
    ns = {'ns': 'http://www.uniovi.es'}

    # Extraer las coordenadas
    coordenadas = []

    # Obtener coordenadas iniciales
    for coord in root.findall('.//ns:coordenadas/ns:coordenada', ns):
        longitud = coord.find('ns:longitudCoor', ns).text
        latitud = coord.find('ns:latitud', ns).text
        altitud = coord.find('ns:altitud', ns).text
        coordenadas.append(f"{longitud},{latitud},{altitud}")

    # Obtener coordenadas de tramos
    for tramo in root.findall('.//ns:tramos/ns:tramo', ns):
        coord_final = tramo.find('ns:coordenadas_finales', ns)
        longitud = coord_final.find('ns:longitudCoor', ns).text
        latitud = coord_final.find('ns:latitud', ns).text
        altitud = coord_final.find('ns:altitud', ns).text
        coordenadas.append(f"{longitud},{latitud},{altitud}")

    return coordenadas

def crear_kml(nombre, coordenadas, kml_file):
    # Crear el contenido del archivo KML con estilo para línea roja
    kml_content = f"""<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>{nombre}</name>

    <!-- Definir el estilo de línea roja -->
    <Style id="redLine">
      <LineStyle>
        <color>ff0000ff</color> <!-- Color rojo en formato AABBGGRR -->
        <width>2</width>        <!-- Anchura de la línea -->
      </LineStyle>
    </Style>

    <Placemark>
      <name>Ruta del circuito</name>
      <!-- Aplicar el estilo de línea roja -->
      <styleUrl>#redLine</styleUrl>
      <LineString>
        <coordinates>
          {' '.join(coordenadas)}
        </coordinates>
      </LineString>
    </Placemark>
  </Document>
</kml>
"""
    # Escribir en el archivo KML
    with open(kml_file, 'w') as f:
        f.write(kml_content)

def main():
    xml_file = 'circuitoEsquema.xml'
    kml_file = 'circuito.kml'

    # Leer el nombre del circuito
    tree = ET.parse(xml_file)
    root = tree.getroot()
    ns = {'ns': 'http://www.uniovi.es'}
    nombre = root.find('ns:nombre', ns).text

    # Leer coordenadas
    coordenadas = leer_coordenadas(xml_file)

    # Crear archivo KML con línea roja
    crear_kml(nombre, coordenadas, kml_file)
    print(f'Archivo KML generado: {kml_file}')

if __name__ == '__main__':
    main()
