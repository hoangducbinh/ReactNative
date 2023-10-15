export default url =>
{
    const paramString = url.includes('?')? url.split('?') [1].split('$') : [];
    const params = {};
     paramString.forEach(params => {

        const paramSplite = param.split('=');
        params[paramSplite[0]] = paramSplite[1];
        
     });

     return params;
}