/*
	criptaritmos.js
	28/2/2020
	11/2/2020


	pendiente de resolver la letra Ñ

	a partir de la version para C++
	CPP program for solving cryptographic puzzles 
	https://tutorialspoint.dev/algorithm/backtracking-algorithms/c-code-article-backtracking-set-8-solving-cryptarithmetic-puzzles


*/

//Aliases
"use strict";

//=========
// constantes
//=========
const 
  versionString="0.5.0", //  lleva el numero de version actual
  //	DEBUG = true,          //  para depurar código
  DEBUG = false,          //  para depurar código
  DEBUG2 = false;

  
// vector stores 1 corresponding to index 
// number which is already assigned 
// to any char, otherwise stores 0 
var use = new Array(10);			//	<int> use(10); 
  
// structure to store char and its corresponding integer 
//	var node = { 
//	    c:'', 
//	    v:0 
//	}; 
  
var				//		s1,	s2,	s3,
	nodeArr ;

	
	//	function init() {
	//		for (var i=0;i<use.length ;i++ )use[i]=0;
	//	main();
	//	};


// function check for correct solution 
function check(nodeArr, count, s1, s2, s3)		//	node* nodeArr, const int count, string s1, string s2, string s3) 
{ 
    var val1 = 0, val2 = 0, val3 = 0, m = 1, j, i, ch ;		//	int val1 = 0, val2 = 0, val3 = 0, m = 1, j, i; 
  
    // calculate number corresponding to first string 
    for (i = s1.length - 1; i >= 0; i--) 
    { 
        ch = s1[i];			//	char ch = s1[i]; 
        for (j = 0; j < count; j++) 
            if (nodeArr[j].c == ch) 
                break; 
  
        val1 += m * nodeArr[j].v; 
        m *= 10; 
    } 
    m = 1; 
  
    // calculate number corresponding to second string 
    for (i = s2.length - 1; i >= 0; i--) 
    { 
        ch = s2[i];			//char ch = s2[i]; 
        for (j = 0; j < count; j++) 
            if (nodeArr[j].c == ch) 
                break; 
  
        val2 += m * nodeArr[j].v; 
        m *= 10; 
    } 
    m = 1; 
  
    // calculate number corresponding to third string 
    for (i = s3.length - 1; i >= 0; i--) 
    { 
        ch = s3[i];			//char ch = s3[i]; 
        for (j = 0; j < count; j++) 
            if (nodeArr[j].c == ch) 
                break; 
  
        val3 += m * nodeArr[j].v; 
        m *= 10; 
    } 
  
		//	console.log( 'val1, val2, val3: ', val1, val2, val3 );
		//	console.log( '(val1)+( val2), (val3) : ', (val1)+( val2),'=', (val3) );
		//	console.log( '(val3 == (val1 + val2)): ', (val3 == (val1 + val2)) );

    // sum of first two number equal to third return true 
    if (val3 == (val1 + val2)) 
        return true;		//	1; 
  
    // else return false 
    return false;			//	0; 
} 
  
// Recursive function to check solution for all permutations 
function permutation(count, nodeArr, n, s1, s2, s3) 
{ 
	//	console.log('count, ' ,count, ' n:',n);
	var num1,	num2,	num3;			//	,	regex, char;

	//	console.log('n ,count: ', n ,count);
	// Base case 
	if (n == count - 1) 
	{ 
		// check for all numbers not used yet 
		for (var i = 0; i < 10; i++) 
		{ 
			// if not used 
			if (use[i] == 0) 
			{ 
				// assign char at index n integer i 
				nodeArr[n].v = i; 

				// if solution found 
				if (check(nodeArr, count, s1, s2, s3) == true ) 
				{ 
					//	console.trace();
					var resultado = "Solucion encontrada: \n";			//	cout << "Solution found: "; 

					for (var j = 0; j < count; j++) 
							resultado += "  " + nodeArr[j].c + " = " + nodeArr[j].v + '\n'; 
					//	console.log( resultado ) ;			//	cout << "Solution found: "; 

					//	document.getElementById("resultado").innerHTML=resultado;

					//-------------------------------------------------------
					//	a titulo experimental / revisar
					var	
						cCar ='',
						cNum ='';

					for (var i=0;i<nodeArr.length ; i++)
					{
						cCar += nodeArr[i].c
						cNum += nodeArr[i].v.toString();

					}
					//	console.log('cCar: ', cCar );
					//	console.log('cNum: ', cNum );

					num1 = s1;
					num2 = s2;
					num3 = s3;
					//	console.log( 'num1: ',num1 );

					num1 = transponer( s1, cCar	, cNum );		//	genera cadena con digitos equivalentes
					num2 = transponer( s2, cCar	, cNum );		//	genera cadena con digitos equivalentes
					num3 = transponer( s3, cCar	, cNum );		//	genera cadena con digitos equivalentes


					document.getElementById("digit_suma1").innerHTML = num1;
					document.getElementById("digit_suma2").innerHTML = num2;
					document.getElementById("digit_total").innerHTML = num3;

					return true; 
				} 
			} 
		} 
		return false; 
	} 


	for ( var i = 0; i < 10; i++) 
	{ 
			// if ith integer not used yet 
			if (use[i] == 0) 
			{   
					// assign char at index n integer i 
					nodeArr[n].v = i; 

					// mark it as not available for other char 
					use[i] = 1; 

					// call recursive function 
					if (permutation(count, nodeArr, n + 1, s1, s2, s3)) 
							return true; 

					// backtrack for all other possible solutions 
					use[i] = 0; 
			} 
	} 
	return false; 
} 

function transponer( cCad, cCar, cNum ) {
	//	genera una cadena de numeros reemplazando las letras de la cadena original
	//	cCad es la cadena que se quiere transponer
	//	cCar es la cadena de letras
	//	cNum es la cadena de numeros
	var newCad = '',		//	es la cadena que se va a devolver
		nInd,						//	indice del nodeArr donde se encuentra letra buscada (cCar)
		car;						//	la letra de cCad a la que le buscaremos el numero que le corresponde

	for (var i=0;i< cCad.length;i++ )
	{
		//	nInd = nodeArr.findIndex(checkNodearr);
		car = cCad.charAt(i);

		//	nInd = checkNodearr(car)
		//	nInd = nodeArr[i].v;				//	checkNodearr(car)
		nInd = cCar.indexOf(car);

		//	console.log('i, car, nInd: ' , i, car, nInd );

		newCad += cNum[nInd];
	}
	//	console.log( 'newCad: ',newCad );

	return newCad;
};
 
//	function checkNodeArr(char) {
function checkNodeArr(element, index, array) {

  //	return char == cCar;
  return element == cCar;
}




function solveCryptographic(s1, s2, s3)		//	bool solveCryptographic(string s1, string s2, string s3) 
{ 
    // count to store number of unique char 
    var count = 0; 
  
    // Length of all three strings 
    var l1 = s1.length; 
    var l2 = s2.length; 
    var l3 = s3.length; 
  
    // vector to store frequency of each char 
    var freq = Array(26);			//	<int> freq(26); ojo con Ñ
    for (var i = 0; i < 26; i++) 
			freq[i]=0; 
  


    for (var i = 0; i < l1; i++)
        ++freq[s1.charCodeAt(i)-65]; 

		for (var i = 0; i < l2; i++) 
        ++freq[s2.charCodeAt(i)-65]; 
  
    for (var i = 0; i < l3; i++) 
        ++freq[s3.charCodeAt(i)-65]; 

  
    // count number of unique char 
    for (var i = 0; i < 26; i++) 
        if (freq[i] > 0) 
            count++; 
  
    // solution not possible for count greater than 10 
    if (count > 10) 
    { 
        alert( count + " caracteres. Cadena inválida"); 
        return false; 
    } 

		// array of nodes 
    nodeArr = new Array(count); 

		//	inicializamos array de letras - numeros
		for (var i = 0; i < nodeArr.length; i++) {
			nodeArr[i] = {c:'',v:-1};	// 		++freq[s1.charCodeAt(i)-65]; 
		}
		

    // store all unique char in nodeArr 
		var j = 0;
    for (var i = 0; i < 26; i++) 
    //	for (var i = 0; i < 26; i++) 
    { 
        if (freq[i] > 0) 
        { 
            nodeArr[j].c = String.fromCharCode(i + 65);		//	char(i + 'A');						
            j++; 
        } 
    } 

		if (DEBUG)
		{
			var txt = 'nodeArr: \n';
	    for (var i = 0; i < nodeArr.length; i++) 
			{
				txt += nodeArr[i].c +', '+ nodeArr[i].v + '\n';
			}
			console.log(txt);
			console.trace();
		}

		var lReturn = permutation(count, nodeArr, 0, s1, s2, s3);

		if (DEBUG)
		{
			var txt = 'nodeArr: \n';
	    for (var i = 0; i < nodeArr.length; i++) 
			{
				txt += nodeArr[i].c +', '+ nodeArr[i].v + '\n';
			}
			console.log(txt);
			console.log( 'permutation(count, nodeArr, 0, s1, s2, s3): ', lReturn );
			console.log( 'count, s1, s2, s3): ', count, s1, s2, s3 );

		} 

    return lReturn;				//	permutation(count, nodeArr, 0, s1, s2, s3); 
} 
  
// Driver function 
function main() //int main() 
{ 
//		let tmp = undefined;
//		//	var s1 = "SEND", 
//	  //	  s2 = "MORE", 
//	  //	  s3 = "MONEY"; 
//			tmp = document.getElementById("sumando1").value;
//			s1 = tmp.toUpperCase();
//			tmp = document.getElementById("sumando2").value;
//			s2 = tmp.toUpperCase();
//			tmp = document.getElementById("Total").value;
//			s3 = tmp.toUpperCase();

	//	limpiamos solucion anterior
	document.getElementById("digit_suma1").innerHTML = '';
	document.getElementById("digit_suma2").innerHTML = '';
	document.getElementById("digit_total").innerHTML = '';


	var s1 = document.getElementById("sumando1").value,
		s2 = document.getElementById("sumando2").value,
		s3 = document.getElementById("Total").value;

	s1 = s1.toUpperCase();
	s2 = s2.toUpperCase();
	s3 = s3.toUpperCase();

	for (var i=0;i<use.length ;i++ )use[i]=0;

	if (DEBUG){ console.log('='.repeat(32), '\ns1, s2, s3: ' ,s1, s2, s3)	};

	//	s2 = s2.toUpperCase( document.getElementById("sumando2").value);
	//	s3 = s3.toUpperCase( document.getElementById("Total").value);

	if (solveCryptographic(s1, s2, s3) == false) 
		alert( "Sin solución"); 
	return 0; 
}


//-------------------------------------------------
//  funciones exclusivas para depuracion
//-------------------------------------------------

function mostrarPropiedades(objeto, nombreObjeto) {
  //  https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Trabajando_con_objectos

  var resultado = "";
  for (var i in objeto) {
    //  if (objeto.hasOwnProperty(i)) {
      resultado += nombreObjeto + "." + i + " = " + objeto[i] + "\n";
    //  }
  }
  return resultado;
}

