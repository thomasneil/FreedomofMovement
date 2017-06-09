using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AmmoAnimator : MonoBehaviour {

    public float rotateSpeed;

	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
        transform.rotation *= Quaternion.AngleAxis(1, new Vector3(0,1,0));
    }
}
