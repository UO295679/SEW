import xml.etree.ElementTree as ET

def generar_svg_altimetria(archivo_xml, archivo_svg):
    # Cargar el archivo XML
    tree = ET.parse(archivo_xml)
    root = tree.getroot()

    # Espacio de nombres XML
    ns = {'ns': 'http://www.uniovi.es'}

    # Extraer las distancias y altitudes de los tramos
    distancias = []
    altitudes = []
    total_distancia = 0

    for tramo in root.findall('ns:tramos/ns:tramo/ns:coordenadas_finales', ns):
        distancia = float(tramo.find('ns:distancia', ns).text)
        altitud = float(tramo.find('ns:altitud', ns).text)
        total_distancia += distancia
        distancias.append(total_distancia)
        altitudes.append(altitud)

    # Dimensiones del SVG
    ancho_svg = 800
    alto_svg = 400
    margen = 50

    # Escala para las distancias y altitudes
    max_distancia = max(distancias)
    max_altitud = max(altitudes)

    escala_x = (ancho_svg - 2 * margen) / max_distancia
    escala_y = (alto_svg - 2 * margen) / max_altitud

    # Crear el contenido SVG
    svg_content = f'<svg width="{ancho_svg}" height="{alto_svg}" xmlns="http://www.w3.org/2000/svg">\n'
    svg_content += f'  <polyline points="'

    # Añadir los puntos de la polilínea
    for i in range(len(distancias)):
        x = margen + distancias[i] * escala_x
        y = alto_svg - (margen + altitudes[i] * escala_y)
        svg_content += f'{x},{y} '

    # Cerrar la polilínea sin volver al inicio (sin cerrar el área)
    svg_content += '" style="fill:none;stroke:red;stroke-width:2"/>\n'

    # Añadir ejes
    svg_content += f'  <line x1="{margen}" y1="{alto_svg-margen}" x2="{ancho_svg-margen}" y2="{alto_svg-margen}" stroke="black"/>\n'
    svg_content += f'  <line x1="{margen}" y1="{alto_svg-margen}" x2="{margen}" y2="{margen}" stroke="black"/>\n'

    svg_content += '</svg>'

    # Guardar el archivo SVG
    with open(archivo_svg, 'w') as f:
        f.write(svg_content)

    print(f"Archivo SVG generado: {archivo_svg}")

# Llamar a la función con el archivo XML y el nombre del SVG de salida
generar_svg_altimetria('circuitoEsquema.xml', 'altimetria.svg')
