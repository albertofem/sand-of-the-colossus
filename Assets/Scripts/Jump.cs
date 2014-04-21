using UnityEngine;
using System.Collections;

public class Jump : MonoBehaviour {

    public float JumpSpeed = .25f;
    public bool Jumping;
    Vector3 jumpVec;

    void Start () {
    Jumping = false;
    }

    void Update () {

        if (Jumping)
        {
            transform.position += jumpVec * Time.deltaTime;
            jumpVec += (Vector3.down * Time.deltaTime);
            //accelerate downward one unit per second per second                           
        }
        else
        {
            if (Input.anyKeyDown)
            {
                Jumping = true;
                jumpVec = Vector3.up * (JumpSpeed * Time.smoothDeltaTime);
                // impulse up @ jumpSpeed units per second
            }
        }
    }

    void LateUpdate()
    {
        if (transform.position.y < 0)
        {
            transform.position = new Vector3(transform.position.x, 0, transform.position.z);
            Jumping = false;
        }
    }
}