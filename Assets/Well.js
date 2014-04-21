#pragma strict

public var lifePoints : int = 0;

function Start () {

}

function Update () {

}

function Dry()
{
	// implement
	print("Well is dryed");
	
	Destroy(gameObject.Find("Sparkle"));
	Destroy(gameObject.Find("Water"));
}

function ConsumeLifePoint()
{
	lifePoints -= 1;
	print("Well has " + lifePoints + " left");
	
	if(lifePoints <= 0)
		Dry();
}

function IsDryed()
{
	if(lifePoints <= 0)
		return true;
		
	return false;
}