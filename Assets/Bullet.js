#pragma strict

function OnTriggerEnter(collider : Collider)
{
	if(collider.collider.transform != transform.parent)
		Destroy(gameObject);
		
	// TODO: check when collision with terrain ,do some nice effect
}