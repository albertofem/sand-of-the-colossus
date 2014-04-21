using UnityEngine;
using System.Collections;

public class MaterialAlpha : MonoBehaviour {
	
	public float alpha;
	public float  scrollSpeed = 0.1f;
	private Color col;
	private Material mat;

	void Start () {
		mat = renderer.material;
		col = renderer.material.color;
		col.a = alpha / 255.0f;
		renderer.material.color = col;
	}
	
	void Update () {
		float offset = Time.time * scrollSpeed;
		mat.SetTextureOffset ("_MainTex", new Vector2(offset*0.5f, offset*0.5f));
	}
}
