#pragma strict

var distance = 10.0;
var mode : int = 0; // 0 -> dig, 1 -> attack
var digColor : Color;
var attackColor : Color;
 
function Update ()
{
	var mousePos = Input.mousePosition;
	transform.LookAt(Camera.main.ScreenToWorldPoint(Vector3(mousePos.x, mousePos.y, distance)));
	
	if (Input.GetKeyDown ("q"))
	{
		if(mode == 1) 
			mode = 0; 
		else 
			mode = 1;
	}
		
	SwitchMode();
}

function SwitchMode()
{
	if(mode == 0)
	{
		gameObject.light.color = digColor;
		gameObject.light.range = 80;
		gameObject.light.spotAngle = 4;
	}
	else
	{
		gameObject.light.color = attackColor;
		gameObject.light.range = 80;
		gameObject.light.spotAngle = 4;
	}
}