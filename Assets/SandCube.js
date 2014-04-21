#pragma strict

var falling : boolean = true;
var hit : RaycastHit;

function Start()
{
	var down = transform.TransformDirection (Vector3.down);
	
	if (Physics.Raycast(transform.position, down, hit, 100)) {
		transform.position.y = hit.point.y + 0.5;
		renderer.enabled = true;
	}
}