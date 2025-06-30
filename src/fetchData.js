export const exerciseOptions = 
{
    method: 'GET',
	// hostname: 'exercisedb.p.rapidapi.com',
	// port: null,
	// path: '/exercises/bodyPart/back?limit=10&offset=0',
	// headers: {
	// 	'x-rapidapi-key': '15a50c5f78msh08b43123dc933dap173f84jsn4d856d41588c',
	// 	'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
	// }
    headers: {
		'x-rapidapi-key': '15a50c5f78msh08b43123dc933dap173f84jsn4d856d41588c',
		'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
	}
}
export const fetchData = async(url, options)=>
{
    const response = await fetch(url, options)
    const data = await response.json()
    return data;
}