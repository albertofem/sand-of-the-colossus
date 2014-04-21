#pragma strict

var distance = 10.0;

function Start()
{
	light.range = 10;
}
 
function Update ()
{
	var mousePos = Input.mousePosition;
	transform.position = Camera.main.ScreenToWorldPoint(Vector3(mousePos.x, mousePos.y+20, distance));
}