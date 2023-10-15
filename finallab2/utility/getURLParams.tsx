export default (url: string): { [key: string]: string } => {
    const paramstring = url.includes('?') ? url.split('?')[1].split('&') : [];
    const params: { [key: string]: string } = {};
    paramstring.forEach((param) => {
      const paramSplit = param.split('=');
      params[paramSplit[0]] = paramSplit[1];
    });
    return params;
  };
  