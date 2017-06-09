using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RayCasting : MonoBehaviour {

    public int gunDamage = 1;
    public float fireRate = 0.25f;
    public float weaponRange = 100f;
    public float hitForce = 100f;
    public Transform gundEnd;

    private Camera fpscam;
    private WaitForSeconds shotDuration = new WaitForSeconds(0.07f);
    private AudioSource gunAudio;
    private LineRenderer laserLine;
    private float nextFire;
    private SixenseHand[] m_hands;



    void Start () {
        laserLine = GetComponent<LineRenderer> ();
        gunAudio = GetComponent<AudioSource>();
        fpscam = GetComponentInParent<Camera>();
        m_hands = GetComponents<SixenseHand>();
	}
	
	
	void Update () {
        foreach (SixenseHand hand in m_hands)
        {
            if (hand.m_controller.Trigger == 1 )//&& Time.time > nextFire)
            {
                nextFire = Time.time + fireRate;
                StartCoroutine(ShotEffect());
                Vector3 rayOrigin = fpscam.ViewportToWorldPoint(new Vector3(0.5f, 0.5f, 0));
                RaycastHit hit;
                laserLine.SetPosition(0, gundEnd.position);
                if (Physics.Raycast(rayOrigin, fpscam.transform.forward, out hit, weaponRange))
                {
                    laserLine.SetPosition(1, hit.point);
                }
                else
                {
                    laserLine.SetPosition(1, rayOrigin + (fpscam.transform.forward * weaponRange));
                }
            }
        }
	}

    private IEnumerator ShotEffect()
    {
        gunAudio.Play();
        laserLine.enabled = true;
        yield return shotDuration;
        laserLine.enabled = false; 
    }
}
