export function bake_cookie(name, value) {
    var cookie = `${name}=${JSON.stringify(value)};`//[name, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
    console.log(cookie);
    document.cookie = cookie;
}
export function read_cookie(name) {
    var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
    result && (result = JSON.parse(result[1]));
    return result;
}
export function delete_cookie(name) {
    console.log("Calling cooke delete",name);
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    // document.cookie = [name, '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=.', window.location.host.toString()].join('');
  }
  