var floatup;
var target : Transform;
var smoothTime = 0.3;
var xOffset : float = 1.0;
var yOffset : float = 1.0;
var velocity : Vector2;
var damage : int;
var sideSpeed: float = 2.5;
var spawningTime : float;
var health : int = 12;
var speed : int;
var range : int;
var nextFire = 1;
var fireRate = 3;
var enemyBullet : Transform;
var soundFly : AudioSource;
var soundDie : AudioSource;
var soundOut : AudioSource;
var soundShoot : AudioSource;
static var numberOfDrones : int = 0;

private var spawnPosition: Vector3;
private var spawning : boolean = false;
private var died : boolean = false;
    
function Start()
{
	spawning = true;
	spawnPosition = Vector3(transform.position.x-5, transform.position.y+20, transform.position.z-5);
	SmoothMove(transform.position, spawnPosition, 1.0);
	target = GameObject.FindWithTag("Player").transform;
	numberOfDrones++;
}

function Update()
{
	if(died)
		return;
	
	if(health <= 0)
		Die();
		
    if(CanAttackTarget())
    {
	    if(Time.time >= nextFire)
	    {
	    	nextFire = Time.time + fireRate;
	    	var bullet = Instantiate(enemyBullet, transform.position, transform.rotation);
	    	
	    	soundShoot.Stop();
	    	soundShoot.Play();
	    	
	    	bullet.parent = gameObject.transform;
	    	bullet.LookAt(target);
	    	bullet.rigidbody.velocity = transform.forward * speed;
	    }
    }		

	if(floatup)
		floatingup();
	else if(!floatup)
		floatingdown();
}

function Die()
{
	print("Enemy died!");
	
	soundDie.Play();
	died = true;
	
	rigidbody.velocity = Vector3.zero;
	rigidbody.useGravity = true;
	
	numberOfDrones--;
}

function floatingup()
{
	transform.position.y += 0.3 * Time.deltaTime;
	yield WaitForSeconds(1);
	floatup = false;
}

function floatingdown()
{
	transform.position.y -= 0.3 * Time.deltaTime;;
	yield WaitForSeconds(1);
	floatup = true;
}
     
function LateUpdate()
{
	if(spawning || died)
		return;

	transform.position.x = Mathf.Lerp(transform.position.x, target.position.x + xOffset, Time.deltaTime * smoothTime);
	transform.position.y = Mathf.Lerp(transform.position.y, target.position.y + yOffset, Time.deltaTime * smoothTime);
	
	transform.LookAt(target);
}

function SmoothMove (startpos : Vector3, endpos : Vector3, seconds : float)
{
	var t = 0.0;
	
	while (t <= 1.0)
	{
		if(died)
			break;
	
		t += Time.deltaTime/seconds;
		transform.position = Vector3.Lerp(startpos,
		endpos, Mathf.SmoothStep(0.0, 1.0, t));
		yield;
	}
	
	spawning = false;
}

function OnPlayerAttack()
{
	if(died)
		return;

	health -= 1;
	print("Enemy hitted: " + health);
}

function CanAttackTarget()
{
	//check if in range
	if(Vector3.Distance(transform.position, target.position) > range)
	{
		return false;
	} 
	
	return true; 
}