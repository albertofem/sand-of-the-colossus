private var tData : TerrainData;
private var saved : float[,];
var savedAM : float[,,];

var cratertex : Texture2D;
var xRes = 1;
var yRes = 1;
var craterData;
var craterExplosion : Transform;
var layers: int;

var enemy : Enemy;
var enemyExplosion : Explosion;
var player : PlayerLife;
var digSound : AudioSource;

private var enemySpawnRate : int = 160000;
private var explosionSpawnRate : int = 200000;

private var holdDigCounter : float = 0.0;
private var holdDigWaitTime : float = 0.0;

var showIntroText = true;

function Start()
{
	tData = Terrain.activeTerrain.terrainData;
	xRes = tData.heightmapWidth;
	yRes = tData.heightmapHeight;
	saved = tData.GetHeights(0,0,xRes,yRes);
	craterData = cratertex.GetPixels();
	layers = tData.alphamapLayers;
	savedAM = tData.GetAlphamaps(0, 0, xRes, yRes);
	ResetEnemySpawnRate();
	
	Invoke("DeleteIntroText", 15);
}

function OnApplicationQuit()
{
	tData.SetHeights(0, 0, saved);
	tData.SetAlphamaps(0,0,savedAM);
}

function Update() 
{
	if(Input.GetMouseButton(0))
	{
		holdDigCounter += Time.deltaTime;
		
	    if(holdDigCounter >= holdDigWaitTime)
	    {
	        DigHole();
	        holdDigCounter -= holdDigWaitTime;
	    }
	}

	if (Input.GetMouseButtonDown(0))
	{
		DigHole();
	}
}

function ResetEnemySpawnRate()
{
	if(player.health > 10)
	{
		enemySpawnRate = 12.0;
		explosionSpawnRate = 20.0;
	}
	else
	{
		enemySpawnRate = 16.0;
		explosionSpawnRate = 25.0;
	}
}

function DigHole()
{
	if(!player.digging || !player.IsDigMode())
			return;
	
	var ray = Camera.main.ScreenPointToRay (Input.mousePosition);
	var hit : RaycastHit;
	
	if(!Physics.Raycast(ray, hit, 25))
		return;
		
	digSound.Stop();
	digSound.Play();

	var x : int = Mathf.Lerp(0, xRes, Mathf.InverseLerp(0, tData.size.x, hit.point.x));
	var z : int = Mathf.Lerp(0, yRes, Mathf.InverseLerp(0, tData.size.z-40, hit.point.z));
	
	x = Mathf.Clamp(x, cratertex.width/2, xRes-cratertex.width/2);
	z = Mathf.Clamp(z, cratertex.height/2, yRes-cratertex.height/2);
	
	var areaT = tData.GetHeights(x-cratertex.width/2, z-cratertex.height/2, cratertex.width, cratertex.height);
	
	for (i = 0; i<cratertex.height; i++) 
	{
		for (j = 0; j<cratertex.width; j++) 
		{
			areaT [i,j] = areaT [i,j] - craterData[i*cratertex.width+j].a*0.008;
		}
	}	
	
	tData.SetHeights(x-cratertex.width/2, z-cratertex.height/2, areaT);		
			
	//Instantiate(craterExplosion, Vector3(hit.point.x, hit.point.y, hit.point.z), Quaternion.identity);
	
	// spawn enemies
	var random : float = Random.Range(1, 20);
	
	if(random == 1)
	{
		SpawnEnemy(hit.point.x, hit.point.y, hit.point.z);
	}
}

function SpawnEnemy(x, y, z)
{
	Instantiate(enemy, Vector3(x, y, z), Quaternion.identity);
}

function SpawnExplosion(x, y, z)
{
	Instantiate(enemyExplosion, Vector3(x, y, z), Quaternion.identity);
}

function OnGUI ()
{
	if(!showIntroText)
		return;
		
	var centeredStyle = GUI.skin.GetStyle("Label");
	centeredStyle.alignment = TextAnchor.UpperCenter;
	
	GUI.Label (Rect (Screen.width/2-200, Screen.height/2-250, 400, 500), "El desierto espera paciente, sin prisa, su próxima víctima.\n\nNadie más que tú sabe cómo has llegado hasta ahí, y nadie sabrá de tí a no ser que consigas salir del desierto. Pero, ¿cómo?\n\nA lo lejos te parece ver el motivo por el que has arriesgado tu vida y llegado hasta aquí. ¿Habrás encontrado realmente el último y mayor vestigio de la civilización que buscabas con tanto ahínco?\n\nPero la pregunta es ¿te dará tiempo a desenterrarlo antes de que la tormenta acabe contigo?\n\nControles:\nASDW: movimiento\nbotón izquierdo del ratón: cavar (en las zonas autorizadas\nbotón derecho del ratón: atacar\nSHIFT: correr\nSPACE: salto", centeredStyle);
}

function DeleteIntroText()
{
	showIntroText = false;
}