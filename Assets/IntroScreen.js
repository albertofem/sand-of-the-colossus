public var customGuiStyle : GUIStyle;

var text = "El desierto espera paciente, sin prisa, su próxima víctima.\n\nNadie más que tú sabe cómo has llegado hasta ahí, y nadie sabrá de tí a no ser que consigas salir del desierto. Pero, ¿cómo?\n\nA lo lejos te parece ver el motivo por el que has arriesgado tu vida y llegado hasta aquí. ¿Habrás encontrado realmente el último y mayor vestigio de la civilización que buscabas con tanto ahínco?\n\nPero la pregunta es ¿te dará tiempo a desenterrarlo antes de que la tormenta acabe contigo?\n\nControles:\nASDW: movimiento\nbotón izquierdo del ratón: cavar (en las zonas autorizadas\nbotón derecho del ratón: atacar\nSHIFT: correr\nSPACE: salto";
var textWidth = text.length * 10;

function OnGUI()
{
	GUI.Label(Rect(Screen.width-textWidth,0,Screen.width,Screen.height),"El desierto espera paciente, sin prisa, su próxima víctima.\n\nNadie más que tú sabe cómo has llegado hasta ahí, y nadie sabrá de tí a no ser que consigas salir del desierto. Pero, ¿cómo?\n\nA lo lejos te parece ver el motivo por el que has arriesgado tu vida y llegado hasta aquí. ¿Habrás encontrado realmente el último y mayor vestigio de la civilización que buscabas con tanto ahínco?\n\nPero la pregunta es ¿te dará tiempo a desenterrarlo antes de que la tormenta acabe contigo?\n\nControles:\nASDW: movimiento\nbotón izquierdo del ratón: cavar (en las zonas autorizadas\nbotón derecho del ratón: atacar\nSHIFT: correr\nSPACE: salto");
}