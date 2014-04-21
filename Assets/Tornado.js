#pragma strict

public var target : Transform;

public var lifeDuration : int = 30;
public var spawnTime : int = 2;
public var speed : float = 10.0;

private var moving : boolean = false;
private var rotationSpeed : float = 5;

function Start ()
{
	target = GameObject.FindWithTag("Player").transform;
	Invoke("StartMovement", spawnTime);
}

function Update ()
{
	if(!moving)
		return;

	transform.rotation = Quaternion.Slerp(
		transform.rotation,
		Quaternion.LookRotation(target.position - transform.position), 
		rotationSpeed*Time.deltaTime
	);

	transform.position += transform.forward * speed * Time.deltaTime;
}

function LateUpdate()
{
	var pos : Vector3 = transform.position;
    var x : float = transform.localScale.y/4;
    
    transform.position = Vector3(pos.x,Terrain.activeTerrain.SampleHeight(pos)+(x),pos.z);
}

function StartMovement()
{
	print("Tornado started moving");
	moving = true;
	Invoke("StopTornado", lifeDuration);
	Invoke("StartMovement", spawnTime);
}

function StopTornado()
{
	moving = false;
	print("Tornado");
}