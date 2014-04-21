using UnityEngine;
using System.Collections;

public class tornado01_script : MonoBehaviour 
{
	public float rotationSpeed = 250;
	void Update () {
		transform.Rotate(0, rotationSpeed * Time.deltaTime, 0);
	}
}
