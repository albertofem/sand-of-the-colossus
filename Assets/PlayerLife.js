#pragma strict

public var health : int = 20;

private var currentWell : Well;

public var digging : boolean = true;
private var flashLight : Flashlight;

private var insideTornado : boolean = false;
private var currentTornado : GameObject;
private var tornadoPullSpeed : float = 0.1;

var footstepSound : AudioSource;
var drinkSound : AudioSource;

public var customGuiStyle : GUIStyle;
public var won = false;
public var died = false;

function Start()
{
	var hit : RaycastHit;
	var down = transform.TransformDirection (Vector3.down);
	flashLight = gameObject.Find("Flashlight").GetComponent(Flashlight);
	
	if (Physics.Raycast(transform.position, down, hit))
	{
		transform.position = Vector3(hit.point.x, hit.point.y+10, hit.point.z);
	}
}

function Update()
{
	if(Input.GetMouseButtonDown(1))
	{
		// destroy enemies
		var hit : RaycastHit;
		var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		
		if(Physics.Raycast(ray, hit, 100))
		{
			print("Hitted " + hit.collider.gameObject);
			if(hit.collider.CompareTag("Enemy"))
			{
				print("Hitted an enemy");
				hit.collider.gameObject.GetComponent(Enemy).OnPlayerAttack();
			}
		}
	}
	
	if(health <= 0)
	{
		died = true;
		return true;
	}
}

function LateUpdate()
{
    if (Input.GetKeyDown ("w"))
    {
    	footstepSound.Play();
    }
     
    if (Input.GetKeyUp ("w"))
    {
    	footstepSound.Stop();
    }
}

function OnTriggerEnter(other : Collider)
{
	if(other.collider.gameObject.CompareTag("Damage"))
	{
		hit(other.collider.gameObject.GetComponent(Damage).damage);
		// TODO: do some fancy effect
	}
	
	if(other.collider.gameObject.CompareTag("Well"))
	{
		print("Entering well");
		currentWell = other.collider.gameObject.GetComponent(Well);
		
		if(!currentWell.IsDryed())
		{
			drinkSound.Stop();
			drinkSound.Play();
			
			InvokeRepeating("ConsumeWell", currentWell.lifePoints, currentWell.lifePoints);
		}
	}
	
	if(other.collider.gameObject.CompareTag("NoDigging"))
	{
		print("Entering no digging zone");
		digging = false;
	}
	
	if(other.collider.gameObject.CompareTag("Tornado"))
	{
		kill();
	}
	
	if(other.collider.gameObject.CompareTag("Gate"))
	{
		won = true;
	}
}

function OnTriggerExit(other : Collider)
{
	if(other.collider.gameObject.CompareTag("Well"))
	{
		CancelInvoke("ConsumeWell");
	}
	
	if(other.collider.gameObject.CompareTag("NoDigging"))
	{
		digging = true;
	}	
	
	if(other.collider.gameObject.CompareTag("Tornado"))
	{
		insideTornado = false;
	}
}

function hit(damage : int)
{
	health -= damage;
	print("Player hitted: " + health);
}

function heal(points : int)
{
	health += points;
}

function kill()
{
	health = 0;
	died = true;
}

function ConsumeWell()
{
	heal(1);
	currentWell.ConsumeLifePoint();
	
	if(currentWell.IsDryed())
		CancelInvoke("ConsumeWell");
}

function IsDigMode()
{
	if(flashLight.mode == 0)
		return true;
		
	return false;
}

function GetFlashlight()
{
	return flashLight;
}

function OnGUI () {
	GUI.Box(Rect(Screen.width - 250,20,100,20), "" + health, customGuiStyle);
	
	var centeredStyle = GUI.skin.GetStyle("Label");
	centeredStyle.alignment = TextAnchor.UpperCenter;
	
	if(won)
	{
		GUI.Label (Rect (Screen.width/2-200, Screen.height/2-250, 400, 500), "Has conseguido abordar al coloso y salir con vida del desierto\n\n¿quién sabe cuál de las dos es mayor maravilla?\n\nAhora estás preparado para volver al mundo civilizado...\n\nAunque, quién sabe...\n\nTal vez el mundo civilizado no esté listo \n\npara tu llegada.\n\nFIN", centeredStyle);
	}
	
	if(died)
	{
		GUI.Label (Rect (Screen.width/2-200, Screen.height/2-250, 400, 500), "Has muerto\n\nAla, vete a hacer algo mas productivo", centeredStyle);
	}
}