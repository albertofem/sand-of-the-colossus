using UnityEngine;
using System.Collections;

[AddComponentMenu("Movement/Movement")]
[RequireComponent(typeof(Rigidbody))]
public class Movement : MonoBehaviour {

	public Vector3 direction;
	public Vector3 speedMultiplier = Vector3.one;

	public LimitSpeed limitSpeed = new LimitSpeed(true, false, true, -5, -50, -5, 5, 10, 5);

	void Update() {
		direction.x = Input.GetAxis("Horizontal");
		direction.z = Input.GetAxis("Vertical");

		Vector3 velocity = rigidbody.velocity;
		velocity = limitSpeed.Clamp(velocity);
		rigidbody.velocity = velocity;
	}

	void FixedUpdate() {
		if(direction != Vector3.zero) {
			rigidbody.AddRelativeForce(Vector3.Scale(new Vector3(direction.x, 0, direction.z), speedMultiplier) * Time.deltaTime, ForceMode.VelocityChange);
		}
	}
}

[System.Serializable]
public class LimitSpeed {
	public bool x = false, y = false, z = false;
	public float xMinSpeed, yMinSpeed, zMinSpeed;
	public float xMaxSpeed, yMaxSpeed, zMaxSpeed;

	public LimitSpeed() { }
	public LimitSpeed(bool x, bool y, bool z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
	public LimitSpeed(bool x, bool y, bool z, float xSpeed, float ySpeed, float zSpeed) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.xMinSpeed = -xSpeed;
		this.yMinSpeed = -ySpeed;
		this.zMinSpeed = -zSpeed;
		this.xMaxSpeed = xSpeed;
		this.yMaxSpeed = ySpeed;
		this.zMaxSpeed = zSpeed;
	}
	public LimitSpeed(bool x, bool y, bool z, float xMinSpeed, float yMinSpeed, float zMinSpeed, float xMaxSpeed, float yMaxSpeed, float zMaxSpeed) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.xMinSpeed = xMinSpeed;
		this.yMinSpeed = yMinSpeed;
		this.zMinSpeed = zMinSpeed;
		this.xMaxSpeed = xMaxSpeed;
		this.yMaxSpeed = yMaxSpeed;
		this.zMaxSpeed = zMaxSpeed;
	}

	public Vector3 Clamp(Vector3 speed) {
		if(x) { speed.x = Mathf.Clamp(speed.x, xMinSpeed, xMaxSpeed); }
		if(y) { speed.y = Mathf.Clamp(speed.y, yMinSpeed, yMaxSpeed); }
		if(z) { speed.z = Mathf.Clamp(speed.z, zMinSpeed, zMaxSpeed); }

		return speed;
	}
}
