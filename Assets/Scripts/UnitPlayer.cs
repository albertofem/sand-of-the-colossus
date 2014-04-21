using UnityEngine;
using System.Collections;

public class UnitPlayer : Unit
{
	// Use this for initialization
	public override void Start ()
	{
		base.Start ();
	}
	
	// Update is called once per frame
	public override void Update ()
	{
		// movement
		
		move = new Vector3(Input.GetAxis ("Horizontal"), 0f, Input.GetAxis ("Vertical"));
		
		move.Normalize();
		
		move = transform.TransformDirection (move);
		
		if (Input.GetKey(KeyCode.Space) && control.isGrounded)
		{
			jump = true;
		}
		
		running = Input.GetKey (KeyCode.LeftShift)  || Input.GetKey (KeyCode.RightShift);
		
		base.Update ();
	}
}
